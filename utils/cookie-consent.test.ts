import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCookieConsent, hasConsent, saveConsent } from "./cookie-consent";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";

const selectedConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: false,
};

const writeConsentCookie = (value: unknown): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/`;
};

const removeConsentCookie = (): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
};

describe("cookie consent storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeConsentCookie();
  });

  it("returns undefined when no consent cookie exists", () => {
    expect(getCookieConsent()).toBeUndefined();
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

  it("saves only known consent keys", () => {
    saveConsent({
      necessary: true,
      preferences: true,
      statistics: false,
      marketing: false,
      extra: true,
    } as never);

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: true,
      statistics: false,
      marketing: false,
    });
  });

  it("treats malformed consent cookies as default false selections", () => {
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=not-json; path=/`;

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    });
    expect(hasConsent()).toBe(true);
  });

  it("reads partial consent cookies with missing categories as false", () => {
    writeConsentCookie({
      necessary: true,
      marketing: true,
    });

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: true,
    });
    expect(hasConsent()).toBe(true);
  });

  it("normalizes necessary consent to true when reading", () => {
    writeConsentCookie({
      necessary: false,
      preferences: true,
      statistics: true,
      marketing: false,
    });

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: false,
    });
  });
});
