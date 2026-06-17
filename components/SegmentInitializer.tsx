"use client";

import { useEffect, useRef } from "react";
import { initSegment, isLoaded, resetSegment } from "@/utils/segment";
import { trackPageView } from "@/utils/analytics";
import type { CookieConsent } from "@/utils/cookie-consent";
import { useCookieConsent } from "@/components/CookieContext/useCookieConsent";

export default function SegmentInitializer() {
  const { consent } = useCookieConsent();
  const previousConsentRef = useRef<CookieConsent | undefined>(undefined);
  // Keep the initial Segment page view to one event per mount.
  const pageTrackedRef = useRef(false);

  useEffect(() => {
    const previousConsent = previousConsentRef.current;
    // save current as to be previous consent for the next render
    previousConsentRef.current = consent;

    if (!consent) return;

    if (
      // If Segment is already loaded (meaning statistics were previously allowed) and the new consent has statistics: false
      isLoaded() &&
      !consent.statistics
    ) {
      resetSegment();
      window.location.reload();
      return;
    }

    if (
      //If Segment is already loaded and marketing changes while statistics is still enabled
      isLoaded() &&
      previousConsent?.marketing !== undefined &&
      previousConsent.marketing !== consent.marketing
    ) {
      window.location.reload();
      return;
    }

    if (!consent.statistics) return;

    const initializeSegment = async () => {
      await initSegment(consent);

      if (isLoaded() && !pageTrackedRef.current) {
        pageTrackedRef.current = true;
        trackPageView();
      }
    };

    void initializeSegment();
  }, [consent]);

  return null;
}
