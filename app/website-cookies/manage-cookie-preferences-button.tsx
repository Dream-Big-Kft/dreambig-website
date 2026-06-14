"use client";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from '../../hooks/useCookieConsent';

export function ManageCookiePreferencesButton() {
  const { openBanner } = useCookieConsent();

  const handleManageCookiePreferences = (): void => {
    openBanner();
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleManageCookiePreferences}
    >
      Manage cookie preferences
    </Button>
  );
}
