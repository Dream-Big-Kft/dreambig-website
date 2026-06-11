"use client";

import { useEffect, useRef } from "react";
import { initSegment } from "@/utils/segment";
import { trackPageView } from "@/utils/analytics";
import { getCookieConsent } from "@/utils/cookie-consent";

export default function SegmentInitializer() {
  // Keep the initial Segment page view to one event per mount.
  const pageTracked = useRef(false);

  useEffect(() => {
    const initializeAnalyticsIfConsented = async () => {
      const consent = getCookieConsent();
      if (!consent || !consent.statistics) return;

      await initSegment(consent);
      if (!pageTracked.current) {
        pageTracked.current = true;
        trackPageView();
      }
    };

    // Handles returning visitors where consent is already stored.
    initializeAnalyticsIfConsented();
  }, []);

  return null;
}
