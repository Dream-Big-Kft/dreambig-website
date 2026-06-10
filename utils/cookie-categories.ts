// TODO: Labels should come later from localisation files, but for now we can keep them here.
export const cookieCategories = [
  { key: "necessary", label: "Necessary", locked: true },
  { key: "preferences", label: "Preferences", locked: false },
  { key: "statistics", label: "Statistics", locked: false },
  { key: "marketing", label: "Marketing", locked: false },
] as const;

export type CookieCategory = (typeof cookieCategories)[number];
export type CookieCategoryKey = CookieCategory["key"];
export type CookieConsent = Record<CookieCategoryKey, boolean>;
