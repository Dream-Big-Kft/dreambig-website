import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";

export type CookieConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";
const COOKIE_CONSENT_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
const cookies = new Cookies();

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

export function readCookie<TShape>(
  cookieName: string,
  validator: (value: unknown) => value is TShape,
): TShape | undefined {

  const storedCookie = cookies.get<unknown>(cookieName);

  if (!storedCookie) return undefined;
  if (!validator(storedCookie)) return undefined;

  return storedCookie;
}

export function getCookiConsent() {
  const storedConsent = readCookie(COOKIE_CONSENT_COOKIE_NAME, isValidStoredConsent);
  return storedConsent;
}

export function saveConsent(consent: CookieConsent): void {
  cookies.set(
    COOKIE_CONSENT_COOKIE_NAME,
    { ...consent, necessary: true },
    getCookieOptions(),
  );
}

export function hasConsent(): boolean {
  return !!getCookiConsent();
}

function isValidStoredConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;

  // This is a limited cast so we can inspect possible fields
  const consent = value as Partial<CookieConsent>;

  return (
    typeof consent.necessary === "boolean" &&
    typeof consent.preferences === "boolean" &&
    typeof consent.statistics === "boolean" &&
    typeof consent.marketing === "boolean"
  );
}

function getCookieOptions(): CookieSetOptions {
  return {
    path: "/",
    maxAge: COOKIE_CONSENT_MAX_AGE_SECONDS,
    sameSite: "strict",
    secure: window.location.protocol === "https:",
  };
}
