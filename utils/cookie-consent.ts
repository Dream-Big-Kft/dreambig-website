import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";

//TODO: labels should come later from localisation files, but for now we can keep them here
export const cookieCategories = [
  { key: "necessary", label: "Necessary", locked: true },
  { key: "preferences", label: "Preferences", locked: false },
  { key: "statistics", label: "Statistics", locked: false },
  { key: "marketing", label: "Marketing", locked: false },
] as const;

export type CookieCategoryKey = (typeof cookieCategories)[number]["key"];
export type CookieConsent = Record<CookieCategoryKey, boolean>;

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC"; // TODO: Renaming!
const COOKIE_CONSENT_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
const cookies = new Cookies();

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

// Keep this as a function so `window` is read only in the browser, not during Next.js build/prerender module evaluation.
const getCookieOptions = (): CookieSetOptions => {
  return {
    path: "/",
    maxAge: COOKIE_CONSENT_MAX_AGE_SECONDS,
    sameSite: "strict",
    secure: typeof window !== "undefined" && window.location.protocol === "https:",
  };
};

export const getCookieConsent = () => cookies.get<CookieConsent | undefined>(COOKIE_CONSENT_COOKIE_NAME);

const deleteInvalidConsentCookie = (): void => {
  const value = getCookieConsent();
  const consent = value as Partial<Record<string, unknown>> | undefined;

  const isValidConsent =
    value !== undefined
    && typeof value === "object"
    && value !== null
    && consent?.necessary === true
    && typeof consent.preferences === "boolean"
    && typeof consent.statistics === "boolean"
    && typeof consent.marketing === "boolean";

  if (value !== undefined && !isValidConsent) {
    cookies.remove(COOKIE_CONSENT_COOKIE_NAME, { path: "/" });
  }
};

deleteInvalidConsentCookie();

export const saveConsent = (consent: CookieConsent): void => {
  cookies.set(
    COOKIE_CONSENT_COOKIE_NAME,
    consent,
    getCookieOptions(),
  );
};

export const hasConsent = () => !!getCookieConsent();
