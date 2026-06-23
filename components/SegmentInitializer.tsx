"use client";

import { useCookieConsent } from "@/components/CookieContext/useCookieConsent";
import { trackPageView } from "@/utils/analytics";
import { initSegment, isLoaded } from "@/utils/segment";
import { useEffect, useRef } from "react";

export default function SegmentInitializer() {
  const { consent } = useCookieConsent();
  // Keep the initial Segment page view to one event per mount.
  const pageTrackedRef = useRef(false);

  useEffect(() => {
    if (!consent?.statistics) return;

    const initializeSegment = async () => {
      await initSegment(consent);

      // One page view per mount; ref guards against a double-fire (e.g. Strict Mode).
      if (isLoaded() && !pageTrackedRef.current) {
        pageTrackedRef.current = true;
        trackPageView();
      }
    };

    void initializeSegment();
  }, [consent]);

  return null;
}
