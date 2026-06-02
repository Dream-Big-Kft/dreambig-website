export type CookieConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

type StoredConsent = CookieConsent & {
  createdAt: string;
};

export const COOKIE_CONSENT_COOKIE_NAME = "dreambig_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
const EXPIRED_COOKIE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

export function readConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const rawCookie = readCookie(COOKIE_CONSENT_COOKIE_NAME);
  if (!rawCookie) return null;

  try {
    // JSON.parse returns any; unknown keeps the cookie untrusted.
    const parsed = JSON.parse(decodeURIComponent(rawCookie)) as unknown;

    // Validate shape before reading consent fields.
    if (!isValidStoredConsent(parsed)) return null;
    // Expired consent must behave like missing consent.
    if (isExpired(parsed.createdAt)) return null;

    // Return only the public consent fields.
    return {
      necessary: parsed.necessary,
      preferences: parsed.preferences,
      statistics: parsed.statistics,
      marketing: parsed.marketing,
    };
  } catch {
    // Bad JSON or bad encoding means no usable consent.
    return null;
  }
}

export function saveConsent(consent: CookieConsent): void {
  if (typeof document === "undefined") return;

  const storedConsent: StoredConsent = {
    necessary: true,
    preferences: consent.preferences,
    statistics: consent.statistics,
    marketing: consent.marketing,
    createdAt: new Date().toISOString(),
  };

  const expiresAt = new Date(Date.now() + COOKIE_CONSENT_MAX_AGE_MS);
  document.cookie = [
    `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(storedConsent))}`,
    `expires=${expiresAt.toUTCString()}`,
    "path=/",
    "SameSite=Lax",
    shouldUseSecureCookie() ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearConsent(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; expires=${EXPIRED_COOKIE_DATE}; path=/; SameSite=Lax`;
}

export function hasConsent(): boolean {
  return readConsent() !== null;
}

function readCookie(name: string): string | null {
  // Match only the requested cookie key.
  const prefix = `${name}=`;

  // Browser exposes cookies as one semicolon-separated string.
  const cookie = document.cookie
    // Split into individual "name=value" entries.
    .split(";")
    // Ignore optional whitespace after semicolons.
    .map((entry) => entry.trim())
    // Find the entry that starts with our exact key.
    .find((entry) => entry.startsWith(prefix));

  // Remove "name=" and return only the cookie value.
  return cookie?.slice(prefix.length) ?? null;
}

function isValidStoredConsent(value: unknown): value is StoredConsent {
  if (!value || typeof value !== "object") return false;

  // This is a limited cast so we can inspect possible fields
  const consent = value as Partial<StoredConsent>;

  return (
    typeof consent.createdAt === "string" &&
    typeof consent.necessary === "boolean" &&
    typeof consent.preferences === "boolean" &&
    typeof consent.statistics === "boolean" &&
    typeof consent.marketing === "boolean"
  );
}

function isExpired(createdAt: string): boolean {
  const createdTime = Date.parse(createdAt);

  if (Number.isNaN(createdTime)) return true;

  return Date.now() - createdTime > COOKIE_CONSENT_MAX_AGE_MS;
}

function shouldUseSecureCookie(): boolean {
  // Secure cookies require HTTPS, but local dev often runs on HTTP.
  return window.location.protocol === "https:";
}
