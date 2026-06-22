import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SegmentInitializer from "./SegmentInitializer";
import type { CookieConsent } from "@/utils/cookie-consent";

// Segment is fully mocked: we only care about how SegmentInitializer orchestrates
// it, not about real network/SDK behavior. `segmentState.loaded` lets a test say
// "Segment is currently running" so we can exercise the teardown path.
const { segmentState } = vi.hoisted(() => ({ segmentState: { loaded: false } }));

vi.mock("@/utils/segment", () => ({
  initSegment: vi.fn(() => Promise.resolve()),
  isLoaded: vi.fn(() => segmentState.loaded),
  resetSegment: vi.fn(),
}));

vi.mock("@/utils/analytics", () => ({
  trackPageView: vi.fn(),
}));

vi.mock("@/utils/cookie-consent", () => ({
  cleanupStatisticsStorage: vi.fn(),
  cleanupMarketingStorage: vi.fn(),
}));

vi.mock("@/components/CookieContext/useCookieConsent", () => ({
  useCookieConsent: vi.fn(),
}));

import { initSegment, resetSegment } from "@/utils/segment";
import { trackPageView } from "@/utils/analytics";
import {
  cleanupMarketingStorage,
  cleanupStatisticsStorage,
} from "@/utils/cookie-consent";
import { useCookieConsent } from "@/components/CookieContext/useCookieConsent";

const ALL_GRANTED: CookieConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
};

// The component only reads `consent`; the rest of the context is filled with
// no-ops so the mocked hook returns a value with the real shape.
const setConsent = (consent: CookieConsent | undefined): void => {
  vi.mocked(useCookieConsent).mockReturnValue({
    consent,
    saveConsent: vi.fn(),
    openBanner: vi.fn(),
    closeBanner: vi.fn(),
    isBannerOpen: false,
  });
};

describe("SegmentInitializer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    segmentState.loaded = false;
    // window.location.reload throws "not implemented" in jsdom, so replace it
    // with a spy we can assert against.
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  it("does nothing until the user has made a consent choice", () => {
    setConsent(undefined);

    render(<SegmentInitializer />);

    expect(initSegment).not.toHaveBeenCalled();
    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
    expect(cleanupMarketingStorage).not.toHaveBeenCalled();
  });

  it("loads Segment and tracks a single page view when statistics consent is granted", async () => {
    // Segment reports as loaded once initSegment has run.
    segmentState.loaded = true;
    setConsent(ALL_GRANTED);

    render(<SegmentInitializer />);

    await waitFor(() => expect(initSegment).toHaveBeenCalledWith(ALL_GRANTED));
    expect(trackPageView).toHaveBeenCalledTimes(1);
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("clears both statistics and marketing storage on statistics withdrawal, even when marketing stays granted", async () => {
    // First render: everything granted, Segment not yet loaded.
    setConsent(ALL_GRANTED);
    const { rerender } = render(<SegmentInitializer />);
    await waitFor(() => expect(initSegment).toHaveBeenCalled());

    // Segment has now loaded; the same component instance is reused so the
    // effect sees the previous consent and detects the statistics transition.
    segmentState.loaded = true;
    setConsent({ ...ALL_GRANTED, statistics: false });
    rerender(<SegmentInitializer />);

    expect(cleanupStatisticsStorage).toHaveBeenCalledTimes(1);
    // ajs_* is Segment's own identity storage and Segment only runs with
    // statistics consent. Withdrawing statistics tears Segment down, so its
    // identifiers must be cleared too — regardless of the marketing flag.
    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
    expect(resetSegment).toHaveBeenCalledTimes(1);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("reconciles stale storage on a fresh load when statistics consent is already off", () => {
    // Fresh mount (no previous consent) with statistics already declined, e.g.
    // a returning visitor or consent withdrawn in another tab. Cleanup must still
    // run so leftover _ga/ajs_ identifiers don't survive. Segment isn't loaded
    // yet, so there's no reset/reload — just the storage sweep.
    setConsent({ ...ALL_GRANTED, statistics: false });

    render(<SegmentInitializer />);

    expect(cleanupStatisticsStorage).toHaveBeenCalledTimes(1);
    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
    expect(resetSegment).not.toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
    expect(initSegment).not.toHaveBeenCalled();
  });
});
