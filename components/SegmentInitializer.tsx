"use client";

import { useEffect, useRef } from "react";
import { initSegment, isLoaded, resetSegment } from "@/utils/segment";
import { trackPageView } from "@/utils/analytics";
import {
  cleanupMarketingStorage,
  cleanupStatisticsStorage,
  type CookieConsent,
} from "@/utils/cookie-consent";
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

    // Consent has not been given yet (banner not interacted with); nothing to do.
    if (!consent) return;

    // Marketing consent was just revoked: remove Segment identity cookies and
    // localStorage/sessionStorage keys (ajs_*) so no user-linked data persists.
    // Guarded to transition only (true → false) so we don't wipe storage on
    // every render when marketing is already off.
    if (previousConsent?.marketing && !consent.marketing) {
      cleanupMarketingStorage();
    }

    // Statistics consent was just revoked: remove GA cookies (_ga*) and any
    // other statistics-scoped storage. If Segment is currently running we must
    // also reset it and reload the page — there is no public Segment API to
    // unload it without a full page cycle. Guarded to transition only (true →
    // false) so cleanup doesn't run repeatedly while statistics stays off.
    if (previousConsent?.statistics && !consent.statistics) {
      cleanupStatisticsStorage();

      if (isLoaded()) {
        // Segment has no unload API; a reload is the only reliable way to stop
        // it from firing further events after consent is withdrawn.
        resetSegment();
        window.location.reload();
      }
    }

    // Statistics consent is currently off: skip initialisation entirely.
    // This is a separate guard from the transition block above so that it also
    // applies on the very first mount when previousConsent is undefined.
    if (!consent.statistics) {
      return;
    }

    if (
      // Marketing consent changed while statistics is still enabled. Segment's
      // persistence mode (disableClientPersistence) depends on marketing
      // consent, so a reload is the simplest way to re-initialise Segment with
      // the correct options without reimplementing teardown logic ourselves.
      isLoaded() &&
      previousConsent?.marketing !== undefined &&
      previousConsent.marketing !== consent.marketing
    ) {
      window.location.reload();
      return;
    }

    const initializeSegment = async () => {
      await initSegment(consent);

      // Track the initial page view once per mount, after Segment is ready.
      // The ref prevents a double-fire if the effect runs again before the
      // component unmounts (e.g. React Strict Mode double-invoke in development).
      if (isLoaded() && !pageTrackedRef.current) {
        pageTrackedRef.current = true;
        trackPageView();
      }
    };

    void initializeSegment();
  }, [consent]);

  return null;
}
