import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SegmentInitializer from "./SegmentInitializer";
import type { CookieConsent } from "@/utils/cookie-consent";

const { segmentState } = vi.hoisted(() => ({ segmentState: { loaded: false } }));

vi.mock("@/utils/segment", () => ({
  initSegment: vi.fn(() => Promise.resolve()),
  isLoaded: vi.fn(() => segmentState.loaded),
}));

vi.mock("@/utils/analytics", () => ({
  trackPageView: vi.fn(),
}));

vi.mock("@/components/CookieContext/useCookieConsent", () => ({
  useCookieConsent: vi.fn(),
}));

import { initSegment } from "@/utils/segment";
import { trackPageView } from "@/utils/analytics";
import { useCookieConsent } from "@/components/CookieContext/useCookieConsent";

const ALL_GRANTED: CookieConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
};

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
  });

  it("does nothing until the user has made a consent choice", () => {
    setConsent(undefined);

    render(<SegmentInitializer />);

    expect(initSegment).not.toHaveBeenCalled();
  });

  it("loads Segment and tracks a single page view when statistics consent is granted", async () => {
    segmentState.loaded = true;
    setConsent(ALL_GRANTED);

    render(<SegmentInitializer />);

    await waitFor(() => expect(initSegment).toHaveBeenCalledWith(ALL_GRANTED));
    expect(trackPageView).toHaveBeenCalledTimes(1);
  });

  it("does not init Segment when statistics consent is not granted", () => {
    setConsent({ ...ALL_GRANTED, statistics: false });

    render(<SegmentInitializer />);

    expect(initSegment).not.toHaveBeenCalled();
  });
});

