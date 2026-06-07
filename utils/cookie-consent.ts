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

export const getCookieConsent = () => {
  const storedCookie = cookies.get<CookieConsent | undefined>(COOKIE_CONSENT_COOKIE_NAME);
  return storedCookie;
};

export const saveConsent = (consent: CookieConsent): void => {
  cookies.set(
    COOKIE_CONSENT_COOKIE_NAME,
    { ...consent, necessary: true },
    getCookieOptions(),
  );
};

export const hasConsent = () => !!getCookieConsent();

const getCookieOptions = (): CookieSetOptions => {
  return {
    path: "/",
    maxAge: COOKIE_CONSENT_MAX_AGE_SECONDS,
    sameSite: "strict",
    secure: window.location.protocol === "https:",
  };
};
