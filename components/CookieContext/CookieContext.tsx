"use client";
import {
  cleanupMarketingStorage,
  cleanupStatisticsStorage,
  getCookieConsent,
  saveConsentIntoCookie,
} from "@/utils/cookie-consent";
import type { CookieConsent } from "@/utils/cookie-consent";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type CookieContextValue = {
  isBannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  consent: CookieConsent | undefined;
  saveConsent: (value: CookieConsent) => void;
};

const CookieContext = createContext<CookieContextValue | null>(null);

const CookieContextProvider = ({ children }: { children: ReactNode; }) => {
  const [isCookieConsentBannerOpen, setIsCookieConsentBannerOpen] = useState<boolean>(false);
  const [consentCookieState, setConsentCookieState] = useState<CookieConsent | undefined>(() => getCookieConsent());
  const openBanner = useCallback(() => setIsCookieConsentBannerOpen(true), []);
  const closeBanner = useCallback(() => setIsCookieConsentBannerOpen(false), []);
  const saveConsent = useCallback(
    (newConsentValue: CookieConsent) => {
      saveConsentIntoCookie(newConsentValue);
      if (consentCookieState) {
        // Changing an existing choice: reload so Segment/GA is fully reset before the
        // cleanup effect runs on the fresh page (prevents deleted cookies from being rewritten).
        window.location.reload();
      } else {
        // First-ever consent: nothing is loaded yet, so just update state without a jarring reload.
        setConsentCookieState(newConsentValue);
      }
    }, [consentCookieState]);

  const contextValue = useMemo(
    () => ({
      isBannerOpen: isCookieConsentBannerOpen,
      openBanner,
      closeBanner,
      consent: consentCookieState,
      saveConsent,
    }),
    [
      isCookieConsentBannerOpen,
      openBanner,
      closeBanner,
      consentCookieState,
      saveConsent,
    ],
  );

  useEffect(() => {
    if (!consentCookieState?.statistics) {
      cleanupStatisticsStorage();
    }
    if (!consentCookieState?.marketing) {
      cleanupMarketingStorage();
    }
  }, [consentCookieState]);

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
};

export { CookieContext, CookieContextProvider };
