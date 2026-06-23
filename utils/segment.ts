import config from "@/config";
import { AnalyticsBrowser } from "@segment/analytics-next";
import type { CookieConsent } from "./cookie-consent";

// Instance created but NOT loaded — no network activity until initSegment() is called
export const analytics = new AnalyticsBrowser();
let loaded = false;

export function isLoaded(): boolean {
  return loaded;
}

export async function initSegment(consent: CookieConsent | undefined): Promise<void> {
  if (loaded || !consent?.statistics) return;

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
