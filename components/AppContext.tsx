"use client";
import { CookieConsent, getCookieConsent } from '@/utils/cookie-consent';
import { createContext, FC, ReactNode, useCallback, useState } from "react";

interface IAppContext {
  cookieConsent: {
    isBannerOpen: boolean;
    openBanner: () => void;
    closeBanner: () => void;
    consent: CookieConsent | undefined;
    setConsent: (value: CookieConsent | undefined) => void;
  };
}

const AppContext = createContext<IAppContext | null>(null);

const AppContextProvider: FC<{ children: ReactNode; }> = ({ children }) => {

  const [isCookieConsentBannerOpen, setIsCookieConsentBannerOpen] = useState<boolean>(false);
  const [consentCookieState, setConsentCookieState] = useState<CookieConsent | undefined>(() => getCookieConsent());
  const openBanner = useCallback(() => setIsCookieConsentBannerOpen(true), []);
  const closeBanner = useCallback(() => setIsCookieConsentBannerOpen(false), []);

  const contextValue = {
    cookieConsent: {
      isBannerOpen: isCookieConsentBannerOpen,
      openBanner,
      closeBanner,
      consent: consentCookieState,
      setConsent: setConsentCookieState,
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
