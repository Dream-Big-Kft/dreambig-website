"use client";

import { Button } from "@/components/ui/button";

export function ManageCookiePreferencesButton() {
  const handleManageCookiePreferences = (): void => {
    // TODO: Decide whether this should reopen the banner with the saved selection or reset consent first.
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
