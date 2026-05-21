import { AnalyticsBrowser } from "@segment/analytics-next";

// Instance created but NOT loaded — no network activity until initSegment() is called
export const analytics = new AnalyticsBrowser();

let loaded = false;

export function isLoaded(): boolean {
  return loaded;
}

export async function initSegment(): Promise<void> {
  if (loaded) return;

  // Segment load is the privacy boundary: it may start network requests and
  // load GA4/Hotjar destinations, so default-deny unless Cookiebot has
  // explicitly granted statistics consent.
  if (window.Cookiebot?.consent?.statistics !== true) return;

  const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
  if (!writeKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] NEXT_PUBLIC_SEGMENT_WRITE_KEY is not set — skipping.");
    }
    return;
  }

  try {
    await analytics.load({ writeKey }, { initialPageview: false });
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
