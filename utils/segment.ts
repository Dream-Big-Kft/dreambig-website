import { AnalyticsBrowser } from "@segment/analytics-next";
import config from "@/config";

// Instance created but NOT loaded — no network activity until initSegment() is called
export const analytics = new AnalyticsBrowser();
let loaded = false;

export type AnalyticsConsent = {
  statistics: boolean;
  marketing: boolean;
  necessary: boolean;
  preferences: boolean;
};

export function getCookieConsent(): AnalyticsConsent {
  if (typeof window === "undefined") {
    return { 
      statistics: false,
      marketing: false,
      necessary: false,
      preferences: false
    };
  }

  return {
    statistics: window.Cookiebot?.consent?.statistics === true,
    marketing: window.Cookiebot?.consent?.marketing === true,
    necessary: window.Cookiebot?.consent?.necessary === true,
    preferences: window.Cookiebot?.consent?.preferences === true,
  };
}

export function isLoaded(): boolean {
  return loaded;
}

export async function initSegment(): Promise<void> {
  if (loaded) return;

  const consent = getCookieConsent();
  if (!consent.statistics) return;

  const writeKey = config.thirdParty.segment.writeKey;
  if (!writeKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] Segment write key is not set — skipping.");
    }
    return;
  }

  try {
    await analytics.load(
      { writeKey },
      {
        // We send the first page view manually after Cookiebot consent is known.
        initialPageview: false,
        // Without Marketing consent, Segment must not persist browser identity.
        disableClientPersistence: !consent.marketing,
      },
    );
    loaded = true;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[analytics] Segment failed to load:", err);
    }
  }
}

export function resetSegment(): void {
  analytics.reset();
  loaded = false;
}
