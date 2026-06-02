import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  COOKIE_CONSENT_COOKIE_NAME,
  COOKIE_CONSENT_MAX_AGE_MS,
  clearConsent,
  hasConsent,
  readConsent,
  saveConsent,
} from "./cookie-consent";

const selectedConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: false,
};

describe("cookie consent storage", () => {
  beforeEach(() => {
    vi.useRealTimers();
    clearConsent();
  });

  it("returns null when no consent cookie exists", () => {
    expect(readConsent()).toBeNull();
    expect(hasConsent()).toBe(false);
  });

  it("saves and reads consent", () => {
    saveConsent(selectedConsent);

    expect(readConsent()).toEqual(selectedConsent);
    expect(hasConsent()).toBe(true);
  });

  it("always normalizes necessary consent to true", () => {
    saveConsent({
      necessary: false,
      preferences: false,
      statistics: false,
      marketing: false,
    });

    expect(readConsent()).toEqual({
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    });
  });

  it("ignores malformed consent cookies", () => {
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=not-json; path=/`;

    expect(readConsent()).toBeNull();
    expect(hasConsent()).toBe(false);
  });

  it("ignores expired consent cookies", () => {
    const expiredDate = new Date(Date.now() - COOKIE_CONSENT_MAX_AGE_MS - 1);

    writeConsentCookie({
      createdAt: expiredDate.toISOString(),
      ...selectedConsent,
    });

    expect(readConsent()).toBeNull();
    expect(hasConsent()).toBe(false);
  });

  it("removes saved consent", () => {
    saveConsent(selectedConsent);

    clearConsent();

    expect(readConsent()).toBeNull();
    expect(hasConsent()).toBe(false);
  });
});

function writeConsentCookie(value: unknown): void {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/`;
}
