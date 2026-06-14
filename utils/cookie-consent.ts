import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";
import type { CookieConsent } from "./cookie-categories";
export { cookieCategories } from "./cookie-categories";
export type { CookieCategoryKey, CookieConsent } from "./cookie-categories";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const consent = getCookieConsent() as any;

  const isValidConsent =
    consent?.necessary === true
    && typeof consent?.preferences === "boolean"
    && typeof consent?.statistics === "boolean"
    && typeof consent?.marketing === "boolean";

  if (consent !== undefined && !isValidConsent) {
    cookies.remove(COOKIE_CONSENT_COOKIE_NAME, { path: "/" });
  }
};

deleteInvalidConsentCookie();

export const saveConsentIntoCookie = (consent: CookieConsent): void => {
  cookies.set(
    COOKIE_CONSENT_COOKIE_NAME,
    consent,
    getCookieOptions(),
  );
};
