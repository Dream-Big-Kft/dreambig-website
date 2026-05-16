"use client";

import { useEffect, useRef } from "react";
import { initSegment, resetSegment, isLoaded } from "@/lib/segment";
import { trackPageView } from "@/lib/analytics";

export default function Analytics() {
    const pageTracked = useRef(false);

    useEffect(() => {
        const maybeInitAnalytics = async () => {
            if (window.Cookiebot?.consent?.statistics) {
                await initSegment();
                if (!pageTracked.current) {
                    pageTracked.current = true;
                    trackPageView();
                }
            }
        };

        const handleAccept = async () => {
            await maybeInitAnalytics();
        };

        const handleDecline = () => {
            if (isLoaded()) {
                resetSegment();
                window.location.reload();
            }
        };

        window.addEventListener("CookiebotOnConsentReady", maybeInitAnalytics);
        window.addEventListener("CookiebotOnAccept", handleAccept);
        window.addEventListener("CookiebotOnDecline", handleDecline);

        // Handles returning visitors where CookiebotOnLoad fired before
        // this component mounted and consent is already stored.
        maybeInitAnalytics();

        return () => {
            window.removeEventListener("CookiebotOnConsentReady", maybeInitAnalytics);
            window.removeEventListener("CookiebotOnAccept", handleAccept);
            window.removeEventListener("CookiebotOnDecline", handleDecline);
        };
    }, []);

    return null;
}
