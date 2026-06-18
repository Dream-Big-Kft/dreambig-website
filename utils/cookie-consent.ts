import Cookies from "universal-cookie";
import type { CookieSetOptions } from "universal-cookie";
import type { CookieConsent } from "./cookie-categories";
export { cookieCategories } from "./cookie-categories";
export type { CookieCategoryKey, CookieConsent } from "./cookie-categories";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC"; // TODO: Renaming!
const COOKIE_CONSENT_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;
const STATISTICS_STORAGE_PREFIXES = ["_ga"];
const MARKETING_STORAGE_PREFIXES = ["ajs_"];
const PRODUCTION_COOKIE_DOMAIN = ".dreambig.hu";
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

const matchesPrefix = (name: string, prefixes: string[]): boolean => {
  return prefixes.some((prefix) => name.startsWith(prefix));
};

const removeCookiesByPrefix = (prefixes: string[]): void => {
  Object.keys(cookies.getAll<Record<string, unknown>>()).forEach((name) => {
    if (matchesPrefix(name, prefixes)) {
      cookies.remove(name, { path: "/" });
      // Production analytics cookies are scoped to `.dreambig.hu`; path-only removal covers localhost and host-only cookies.
      cookies.remove(name, { path: "/", domain: PRODUCTION_COOKIE_DOMAIN });
    }
  });
};

const removeStorageItemsByPrefix = (storage: Storage, prefixes: string[]): void => {
  Object.keys(storage).forEach((key) => {
    if (matchesPrefix(key, prefixes)) {
      storage.removeItem(key);
    }
  });
};

export const cleanupStatisticsStorage = (): void => {
  removeCookiesByPrefix(STATISTICS_STORAGE_PREFIXES);
  removeStorageItemsByPrefix(window.localStorage, STATISTICS_STORAGE_PREFIXES);
  removeStorageItemsByPrefix(window.sessionStorage, STATISTICS_STORAGE_PREFIXES);
};

export const cleanupMarketingStorage = (): void => {
  removeCookiesByPrefix(MARKETING_STORAGE_PREFIXES);
  removeStorageItemsByPrefix(window.localStorage, MARKETING_STORAGE_PREFIXES);
  removeStorageItemsByPrefix(window.sessionStorage, MARKETING_STORAGE_PREFIXES);
};
