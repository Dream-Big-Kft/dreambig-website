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
      if (consentCookieState) {
        if (consentCookieState.statistics && !newConsentValue.statistics) {
          // Handle the case where statistics consent is revoked
          cleanupStatisticsStorage();
        }
        if (consentCookieState.marketing && !newConsentValue.marketing) {
          // Handle the case where marketing consent is revoked
          cleanupMarketingStorage();
        }
        saveConsentIntoCookie(newConsentValue);
        setConsentCookieState(newConsentValue);
        window.location.reload();
      } else {
        // If there was no previous consent, just save the new consent value
        saveConsentIntoCookie(newConsentValue);
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

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
};

export { CookieContext, CookieContextProvider };
