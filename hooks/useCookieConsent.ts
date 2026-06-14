"use client";

import { useContext } from "react";
import { AppContext } from "@/components/AppContext";

export function useCookieConsent() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within AppContextProvider");
  }

  return context.cookieConsent;
}