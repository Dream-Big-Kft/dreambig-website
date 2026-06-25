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
  saveConsentIntoCookie,
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

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { reload: vi.fn() },
  });
});

describe("CookieContext cleanup on mount", () => {
  it("no saved consent: cleans up both statistics and marketing storage", () => {
    vi.mocked(getCookieConsent).mockReturnValue(undefined);

    renderHook(() => useCookieConsent(), { wrapper });

    expect(cleanupStatisticsStorage).toHaveBeenCalledTimes(1);
    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
  });

  it("statistics denied (marketing granted): cleans up only statistics storage", () => {
    vi.mocked(getCookieConsent).mockReturnValue({
      ...ALL_GRANTED,
      statistics: false,
    });

    renderHook(() => useCookieConsent(), { wrapper });

    expect(cleanupStatisticsStorage).toHaveBeenCalledTimes(1);
    expect(cleanupMarketingStorage).not.toHaveBeenCalled();
  });

  it("marketing denied (statistics granted): cleans up only marketing storage", () => {
    vi.mocked(getCookieConsent).mockReturnValue({
      ...ALL_GRANTED,
      marketing: false,
    });

    renderHook(() => useCookieConsent(), { wrapper });

    expect(cleanupMarketingStorage).toHaveBeenCalledTimes(1);
    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
  });

  it("all granted: runs no cleanup", () => {
    vi.mocked(getCookieConsent).mockReturnValue(ALL_GRANTED);

    renderHook(() => useCookieConsent(), { wrapper });

    expect(cleanupStatisticsStorage).not.toHaveBeenCalled();
    expect(cleanupMarketingStorage).not.toHaveBeenCalled();
  });
});

describe("CookieContext saveConsent", () => {
  it("first save (no previous consent): persists and updates state without reloading", () => {
    vi.mocked(getCookieConsent).mockReturnValue(undefined);

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    act(() => result.current.saveConsent(ALL_GRANTED));

    expect(saveConsentIntoCookie).toHaveBeenCalledWith(ALL_GRANTED);
    expect(result.current.consent).toEqual(ALL_GRANTED);
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("changing an existing consent: persists then reloads", () => {
    vi.mocked(getCookieConsent).mockReturnValue(ALL_GRANTED);

    const { result } = renderHook(() => useCookieConsent(), { wrapper });

    const revoked = { ...ALL_GRANTED, statistics: false };
    act(() => result.current.saveConsent(revoked));

    expect(saveConsentIntoCookie).toHaveBeenCalledWith(revoked);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
