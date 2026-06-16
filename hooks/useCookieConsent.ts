"use client";

import { useContext } from "react";
import { CookieContext } from "@/components/CookieContext";

export function useCookieConsent() {
  const cookieContext = useContext(CookieContext);

  if (!cookieContext) {
    throw new Error("useCookieConsent must be used within CookieContextProvider");
  }

  return cookieContext;
}