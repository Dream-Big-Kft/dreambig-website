import { act, renderHook } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CookieContextProvider } from "./CookieContext";
import { useCookieConsent } from "./useCookieConsent";
import type { CookieConsent } from "@/utils/cookie-consent";

vi.mock("@/utils/cookie-consent", () => ({
  getCookieConsent: vi.fn(),
  saveConsentIntoCookie: vi.fn(),
  cleanupStatisticsStorage: vi.fn(),
  cleanupMarketingStorage: vi.fn(),
}));

import {
  getCookieConsent,
  cleanupMarketingStorage,
  cleanupStatisticsStorage,
} from "@/utils/cookie-consent";

const ALL_GRANTED: CookieConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true,
};

const wrapper = ({ children }: { children: ReactNode; }) => (
  <CookieContextProvider>{children}</CookieContextProvider>
);

describe("CookieContext saveConsent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  it("first save: updates state without reloading the page", () => {
    // No saved cookie → first-time visitor
    vi.mocked(getCookieConsent).mockReturnValue(undefined);

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    act(() => result.current.saveConsent(ALL_GRANTED));

    expect(result.current.consent).toEqual(ALL_GRANTED);
    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
    expect(cleanupMarketingStorage).not.toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("statistics revoked: cleans up statistics + marketing storage then reloads", () => {
    // Returning visitor who previously granted everything
    vi.mocked(getCookieConsent).mockReturnValue(ALL_GRANTED);

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    act(() => result.current.saveConsent({ ...ALL_GRANTED, statistics: false }));

    expect(cleanupStatisticsStorage).toHaveBeenCalledTimes(1);
    // ajs_* is Segment identity storage — orphaned when Segment can no longer run
    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("marketing revoked while statistics stays on: cleans up marketing storage then reloads", () => {
    vi.mocked(getCookieConsent).mockReturnValue(ALL_GRANTED);

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    act(() => result.current.saveConsent({ ...ALL_GRANTED, marketing: false }));

    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("any other change (e.g. upgrading statistics): reloads without running cleanup", () => {
    vi.mocked(getCookieConsent).mockReturnValue({
      ...ALL_GRANTED,
      statistics: false,
    });

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    act(() => result.current.saveConsent(ALL_GRANTED));

    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
    expect(cleanupMarketingStorage).not.toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
