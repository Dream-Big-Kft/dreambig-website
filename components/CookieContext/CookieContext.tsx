"use client";
import {
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

const CookieContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCookieConsentBannerOpen, setIsCookieConsentBannerOpen] =
    useState<boolean>(false);
  const [consentCookieState, setConsentCookieState] = useState<
    CookieConsent | undefined
  >(() => getCookieConsent());
  const openBanner = useCallback(() => setIsCookieConsentBannerOpen(true), []);
  const closeBanner = useCallback(
    () => setIsCookieConsentBannerOpen(false),
    [],
  );
  const saveConsent = useCallback((value: CookieConsent) => {
    saveConsentIntoCookie(value);
    setConsentCookieState(value);
  }, []);

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
