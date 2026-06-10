import { beforeEach, describe, expect, it, vi } from "vitest";

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

const importCookieConsentModule = async () => {
  vi.resetModules();
  return import("./cookie-consent");
};

describe("cookie consent storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeConsentCookie();
  });

  it("returns falsy when no consent cookie exists", async () => {
    const { getCookieConsent, hasConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeFalsy();
    expect(hasConsent()).toBe(false);
  });

  it("saves and reads consent", async () => {
    const { getCookieConsent, hasConsent, saveConsent } = await importCookieConsentModule();

    saveConsent(selectedConsent);

    expect(getCookieConsent()).toEqual(selectedConsent);
    expect(hasConsent()).toBe(true);
  });

  it("deletes malformed consent cookies on module import", async () => {
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=not-json; path=/`;

    const { getCookieConsent, hasConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeFalsy();
    expect(hasConsent()).toBe(false);
  });

  it("deletes partial consent cookies on module import", async () => {
    writeConsentCookie({
      necessary: true,
      marketing: true,
    });

    const { getCookieConsent, hasConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeFalsy();
    expect(hasConsent()).toBe(false);
  });

  it("deletes consent cookies where necessary is false on module import", async () => {
    writeConsentCookie({
      necessary: false,
      preferences: true,
      statistics: true,
      marketing: false,
    });

    const { getCookieConsent, hasConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeFalsy();
    expect(hasConsent()).toBe(false);
  });
});
