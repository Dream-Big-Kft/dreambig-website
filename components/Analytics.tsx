"use client";

import { useEffect, useRef } from "react";
import {
  getAnalyticsConsent,
  initSegment,
  isLoaded,
  resetSegment,
} from "@/lib/segment";
import { trackPageView } from "@/lib/analytics";

export default function Analytics() {
  // Multiple Cookiebot events and the mount fallback can run on the same page load,
  // so keep the initial Segment page view to one event per mount.
  const pageTracked = useRef(false);

  useEffect(() => {
    const initializeAnalyticsIfConsented = async () => {
      const consent = getAnalyticsConsent();
      if (!consent.statistics) return;

      await initSegment();
      if (!pageTracked.current) {
        pageTracked.current = true;
        trackPageView();
      }
    };

    const resetAnalyticsIfLoaded = () => {
      if (isLoaded()) {
        resetSegment();
        window.location.reload();
      }
    };

    // Fires when the user's consent state is ready, either loaded from an
    // existing cookie or submitted from the banner/settings dialog.
    const handleConsentReady = async () => {
      const consent = getAnalyticsConsent();
      if (consent.statistics) {
        await initializeAnalyticsIfConsented();
      } else {
        resetAnalyticsIfLoaded();
      }
    };

    // Fires with window.onload after consent has loaded, including returning
    // visitors with an existing consent choice.
    const handleLoad = async () => {
      await initializeAnalyticsIfConsented();
    };

    // Fires when the user accepts cookies, and also for returning visitors who
    // previously accepted. "Allow selection" lands here when statistics is on.
    const handleAccept = async () => {
      await initializeAnalyticsIfConsented();
    };

    // Fires when the user declines cookies, and also for returning visitors who
    // previously declined.
    const handleDecline = () => {
      resetAnalyticsIfLoaded();
    };

    window.addEventListener("CookiebotOnConsentReady", handleConsentReady);
    window.addEventListener("CookiebotOnLoad", handleLoad);
    window.addEventListener("CookiebotOnAccept", handleAccept);
    window.addEventListener("CookiebotOnDecline", handleDecline);
    
    // Handles returning visitors where CookiebotOnLoad fired before
    // this component mounted and consent is already stored.
    initializeAnalyticsIfConsented();
    
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", handleConsentReady);
      window.removeEventListener("CookiebotOnLoad", handleLoad);
      window.removeEventListener("CookiebotOnAccept", handleAccept);
      window.removeEventListener("CookiebotOnDecline", handleDecline);
    };
  }, []);

  return null;
}
