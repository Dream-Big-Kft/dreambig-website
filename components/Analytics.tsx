"use client";

import { useEffect, useRef } from "react";
import { initSegment, resetSegment, isLoaded } from "@/lib/segment";
import { trackPageView } from "@/lib/analytics";

export default function Analytics() {
  // Multiple Cookiebot events and the mount fallback can run on the same page load,
  // so keep the initial Segment page view to one event per mount.
  const pageTracked = useRef(false);

  useEffect(() => {
    const initializeAnalyticsIfConsented = async () => {
      if (window.Cookiebot?.consent?.statistics !== true) return;

      await initSegment();
      if (!pageTracked.current) {
        pageTracked.current = true;
        trackPageView();
      }
    };

    const handleAccept = async () => {
      await initializeAnalyticsIfConsented();
    };

    const handleDecline = () => {
      if (isLoaded()) {
        resetSegment();
        window.location.reload();
      }
    };

    window.addEventListener("CookiebotOnConsentReady", initializeAnalyticsIfConsented);
    window.addEventListener("CookiebotOnAccept", handleAccept);
    window.addEventListener("CookiebotOnDecline", handleDecline);

    // Handles returning visitors where CookiebotOnLoad fired before
    // this component mounted and consent is already stored.
    initializeAnalyticsIfConsented();

    return () => {
      window.removeEventListener("CookiebotOnConsentReady", initializeAnalyticsIfConsented);
      window.removeEventListener("CookiebotOnAccept", handleAccept);
      window.removeEventListener("CookiebotOnDecline", handleDecline);
    };
  }, []);

  return null;
}
