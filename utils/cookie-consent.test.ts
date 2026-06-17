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

const writeConsentCookie = (value: string): void => {
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
    const { getCookieConsent, saveConsentIntoCookie } =
      await importCookieConsentModule();

    saveConsentIntoCookie(selectedConsent);

    expect(getCookieConsent()).toEqual(selectedConsent);
  });

  it.each`
    message                                    | invalidCookie
    ${"a non-json value"}                      | ${"not-json"}
    ${"an empty object"}                       | ${JSON.stringify({})}
    ${"a partial consent object"}              | ${JSON.stringify({ necessary: true, marketing: true })}
    ${"a consent object with necessary false"} | ${JSON.stringify({ necessary: false, preferences: true, statistics: true, marketing: false })}
  `("deletes $message on module import", async ({ invalidCookie }) => {
    writeConsentCookie(invalidCookie);

    const { getCookieConsent } = await importCookieConsentModule();

    expect(getCookieConsent()).toBeUndefined();
  });
});
