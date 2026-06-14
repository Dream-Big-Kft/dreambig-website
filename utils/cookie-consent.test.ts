import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCookieConsent, saveConsentIntoCookie } from "./cookie-consent";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";

const selectedConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: false,
};

const removeConsentCookie = (): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
};

describe("cookie consent cookie storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeConsentCookie();
  });

  it("returns no consent when the user has not made a choice yet", () => {
    expect(getCookieConsent()).toBeFalsy();
  });

  it("stores the user's selected cookie preferences", () => {
    saveConsentIntoCookie(selectedConsent);

    expect(getCookieConsent()).toEqual(selectedConsent);
  });
});
