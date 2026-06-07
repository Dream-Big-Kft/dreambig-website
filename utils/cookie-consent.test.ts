import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCookieConsent, hasConsent, saveConsent } from "./cookie-consent";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";

const selectedConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: false,
};

describe("cookie consent storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeConsentCookie();
  });

  it("returns an empty value when no consent cookie exists", () => {
    expect(getCookieConsent()).toBe("");
    expect(hasConsent()).toBe(false);
  });

  it("saves and reads consent", () => {
    saveConsent(selectedConsent);

    expect(getCookieConsent()).toEqual(selectedConsent);
    expect(hasConsent()).toBe(true);
  });

  it("always normalizes necessary consent to true", () => {
    saveConsent({
      necessary: false,
      preferences: false,
      statistics: false,
      marketing: false,
    });

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    });
  });

  it("reads malformed consent cookies as their raw value", () => {
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=not-json; path=/`;

    expect(getCookieConsent()).toBe("not-json");
    expect(hasConsent()).toBe(true);
  });

  it("reads stored partial consent cookies", () => {
    const partialConsent = {
      necessary: true,
      marketing: true,
    };

    writeConsentCookie(partialConsent);

    expect(getCookieConsent()).toEqual(partialConsent);
    expect(hasConsent()).toBe(true);
  });
});

const writeConsentCookie = (value: unknown): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/`;
};

const removeConsentCookie = (): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
};
