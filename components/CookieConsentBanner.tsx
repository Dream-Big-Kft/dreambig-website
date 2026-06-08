"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DEFAULT_CONSENT,
  hasConsent,
  saveConsent,
  cookieCategories,
  CookieConsent,
} from "@/utils/cookie-consent";
import { cn } from "@/utils/utils";
import Link from "next/link";

const bannerText =
  "Our site uses cookies to tailor content and ads, provide social media functionalities, and analyze our traffic. Information regarding your use of our website is also shared with our trusted social media, advertising, and analytics partners. They may integrate this data with other information you've shared with them or that they've collected through your use of their platforms.";

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState<CookieConsent>(DEFAULT_CONSENT);

  useEffect(() => {
    setVisible(!hasConsent());
  }, []);

  const updateSelection = (key: keyof CookieConsent, checked: boolean) => {
    if (key === "necessary") return;

    setSelection((currentSelection) => ({
      ...currentSelection,
      [key]: checked,
      necessary: true,
    }));
  };

  const acceptAll = () => {
    persistConsent({
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    });
  };

  const acceptSelection = () => {
    persistConsent(selection);
  };

  const rejectAll = () => {
    persistConsent(DEFAULT_CONSENT);
  };

  const persistConsent = (consent: CookieConsent) => {
    saveConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] bg-background/72 p-0 shadow-[0_-24px_80px_rgba(15,23,42,0.14)] backdrop-blur-sm"
    >
      <div className="grid w-full gap-6 border border-border bg-card p-6 text-card-foreground shadow-[0_22px_70px_rgba(15,23,42,0.16)] md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)_17rem] lg:items-center">
        <div className="flex items-center gap-9 md:min-h-48 md:flex-col md:items-center md:justify-center">
          <Image
            src="dreambig-logo.svg"
            alt="Dream Big Software logo"
            width={88}
            height={88}
            className="h-16 w-16 object-contain dark:invert md:h-24 md:w-24"
          />
          <span className="text-sm font-semibold text-foreground md:text-center">
            Dream Big Software
          </span>
        </div>

        <div className="grid gap-8">
          <div className="max-w-5xl">
            <h2 className="text-base font-semibold text-foreground">
              This website uses cookies
            </h2>
            <p className="mt-1 text-sm leading-6 text-foreground md:text-base">
              {bannerText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {cookieCategories.map((category) => (
              <label
                key={category.key}
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold text-foreground",
                  category.locked && "cursor-not-allowed",
                )}
              >
                <span>{category.label}</span>
                <Switch
                  checked={selection[category.key]}
                  disabled={category.locked}
                  aria-label={`${category.label} cookies`}
                  onCheckedChange={(checked) => {
                    updateSelection(category.key, checked);
                  }}
                />
              </label>
            ))}
            <Link
              href="/website-cookies"
              className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground dark:text-foreground/72 dark:hover:text-foreground/92"
            >
              Website-cookies
            </Link>
          </div>

        </div>

        <div className="grid gap-3 md:col-span-2 lg:col-span-1">
          <Button type="button" className="h-12" onClick={acceptAll}>
            Allow all
          </Button>
          <Button type="button" variant="outline" className="h-12" onClick={acceptSelection}>
            Allow selection
          </Button>
          <Button type="button" variant="outline" className="h-12" onClick={rejectAll}>
            Reject
          </Button>
        </div>
      </div>
    </section>
  );
};
