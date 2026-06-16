import { beforeEach, describe, expect, it, vi } from "vitest";

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

const writeConsentCookie = (value: unknown): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/`;
};

const writeRawConsentCookie = (value: string): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/`;
};

const importCookieConsentModule = async () => {
  vi.resetModules();
  return import("./cookie-consent");
};

describe("cookie consent cookie storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeConsentCookie();
  });

  it("returns undefined when the user has not made a choice yet", async () => {
    const { getCookieConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeUndefined();
  });

  it("stores the user's selected cookie preferences", async () => {
    const {
      getCookieConsent,
      saveConsentIntoCookie,
    } = await importCookieConsentModule();

    saveConsentIntoCookie(selectedConsent);

    expect(getCookieConsent()).toEqual(selectedConsent);
  });

  it.each([
    ["a non-json value", () => writeRawConsentCookie("not-json")],
    ["an empty object", () => writeConsentCookie({})],
    ["a partial consent object", () => writeConsentCookie({
      necessary: true,
      marketing: true,
    })],
    ["a consent object with necessary false", () => writeConsentCookie({
      necessary: false,
      preferences: true,
      statistics: true,
      marketing: false,
    })],
  ])("deletes %s on module import", async (_caseName, writeInvalidCookie) => {
    writeInvalidCookie();

    const { getCookieConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeUndefined();
  });
});
