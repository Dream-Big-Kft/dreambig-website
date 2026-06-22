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
    previousConsentRef.current = consent; // remember for the next render

    if (!consent) return; // no choice made yet

    // Marketing revoked: drop Segment identity storage (ajs_*). Transition-guarded
    // so we don't re-wipe on every render while marketing stays off.
    if (previousConsent?.marketing && !consent.marketing) {
      cleanupMarketingStorage();
    }

    // Statistics revoked: drop GA cookies (_ga*) AND Segment identity (ajs_*).
    // Segment only runs with statistics consent, so withdrawing it tears Segment
    // down and orphans its ids regardless of the marketing flag. Transition-guarded.
    if (previousConsent?.statistics && !consent.statistics) {
      cleanupStatisticsStorage();
      cleanupMarketingStorage();

      if (isLoaded()) {
        // Segment has no unload API; reload is the only way to fully stop it.
        resetSegment();
        window.location.reload();
      }
    }

    // Separate from the transition block so it also covers first mount
    // (previousConsent undefined): never init Segment without statistics consent.
    if (!consent.statistics) {
      return;
    }

    if (
      // Marketing toggled while statistics stays on. Segment's persistence mode
      // (disableClientPersistence) is fixed at load, so reload to re-init cleanly.
      isLoaded() &&
      previousConsent?.marketing !== undefined &&
      previousConsent.marketing !== consent.marketing
    ) {
      window.location.reload();
      return;
    }

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
