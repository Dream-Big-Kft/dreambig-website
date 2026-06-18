import { beforeEach, describe, expect, it, vi } from "vitest";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";

const selectedConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: false,
};

const removeTestCookies = (): void => {
  [
    COOKIE_CONSENT_COOKIE_NAME,
    "_ga",
    "_ga_KJ2J679120",
    "ajs_anonymous_id",
  ].forEach((name) => {
    document.cookie = `${name}=; max-age=0; path=/`;
  });
};

const writeConsentCookie = (value: string): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/`;
};

const writeCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
};

const importCookieConsentModule = async () => {
  vi.resetModules();
  return import("./cookie-consent");
};

describe("cookie consent cookie storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    removeTestCookies();
    window.localStorage.clear();
    window.sessionStorage.clear();
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

  it("cleans statistics storage without removing marketing storage or consent", async () => {
    const {
      cleanupStatisticsStorage,
      getCookieConsent,
      saveConsentIntoCookie,
    } = await importCookieConsentModule();

    saveConsentIntoCookie(selectedConsent);
    writeCookie("_ga", "GA1.1.test");
    writeCookie("_ga_KJ2J679120", "GS2.1.test");
    writeCookie("ajs_anonymous_id", "anonymous-id");
    window.localStorage.setItem("ajs_anonymous_id", "anonymous-id");

    cleanupStatisticsStorage();

    expect(document.cookie).not.toContain("_ga=");
    expect(document.cookie).not.toContain("_ga_KJ2J679120=");
    expect(document.cookie).toContain("ajs_anonymous_id=");
    expect(window.localStorage.getItem("ajs_anonymous_id")).toBe("anonymous-id");
    expect(getCookieConsent()).toEqual(selectedConsent);
  });

  it("cleans marketing storage without removing statistics storage or consent", async () => {
    const {
      cleanupMarketingStorage,
      getCookieConsent,
      saveConsentIntoCookie,
    } = await importCookieConsentModule();

    saveConsentIntoCookie(selectedConsent);
    writeCookie("_ga", "GA1.1.test");
    writeCookie("ajs_anonymous_id", "anonymous-id");
    window.localStorage.setItem("ajs_anonymous_id", "anonymous-id");
    window.localStorage.setItem("ajs_user_id", "user-id");
    window.sessionStorage.setItem("ajs_group_id", "group-id");

    cleanupMarketingStorage();

    expect(document.cookie).toContain("_ga=");
    expect(document.cookie).not.toContain("ajs_anonymous_id=");
    expect(window.localStorage.getItem("ajs_anonymous_id")).toBeNull();
    expect(window.localStorage.getItem("ajs_user_id")).toBeNull();
    expect(window.sessionStorage.getItem("ajs_group_id")).toBeNull();
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
