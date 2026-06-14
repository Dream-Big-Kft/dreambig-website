import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CookieConsentBanner } from "./CookieConsentBanner";
import {
  DEFAULT_CONSENT,
  getCookieConsent,
  type CookieConsent,
} from "@/utils/cookie-consent";
import { AppContext } from "@/components/AppContext";
import { type ReactNode, useState } from "react";

const COOKIE_CONSENT_COOKIE_NAME = "dreambig_CC";

const removeConsentCookie = (): void => {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
};

function CookieConsentTestProvider({
  children,
  initialConsent,
}: {
  children: ReactNode;
  initialConsent?: CookieConsent;
}) {
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | undefined>(
    initialConsent,
  );

  return (
    <AppContext.Provider
      value={{
        cookieConsent: {
          isBannerOpen,
          openBanner: () => setIsBannerOpen(true),
          closeBanner: () => setIsBannerOpen(false),
          consent,
          setConsent,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const renderCookieConsentBanner = (initialConsent?: CookieConsent) => {
  return render(
    <CookieConsentTestProvider initialConsent={initialConsent}>
      <CookieConsentBanner />
    </CookieConsentTestProvider>,
  );
};

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    removeConsentCookie();
  });

  it("shows the initial cookie choices and action buttons", async () => {
    renderCookieConsentBanner();

    expect(
      await screen.findByRole("heading", {
        name: "This website uses cookies",
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("switch", { name: "Necessary cookies" })).toBeChecked();
    expect(screen.getByRole("switch", { name: "Necessary cookies" })).toBeDisabled();
    expect(screen.getByRole("switch", { name: "Preferences cookies" })).not.toBeChecked();
    expect(screen.getByRole("switch", { name: "Statistics cookies" })).not.toBeChecked();
    expect(screen.getByRole("switch", { name: "Marketing cookies" })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Allow all" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Allow selection" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject" })).toBeInTheDocument();
  });

  it("saves full consent when allowing all cookies", async () => {
    const user = userEvent.setup();

    renderCookieConsentBanner();

    await user.click(await screen.findByRole("button", { name: "Allow all" }));

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    });
    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "This website uses cookies" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("saves the selected cookie categories", async () => {
    const user = userEvent.setup();

    renderCookieConsentBanner();

    await user.click(await screen.findByRole("switch", { name: "Statistics cookies" }));
    await user.click(screen.getByRole("button", { name: "Allow selection" }));

    expect(getCookieConsent()).toEqual({
      necessary: true,
      preferences: false,
      statistics: true,
      marketing: false,
    });
  });

  it("does not render when consent already exists", async () => {
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify({
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      }),
    )}; path=/`;

    renderCookieConsentBanner(DEFAULT_CONSENT);

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "This website uses cookies" }),
      ).not.toBeInTheDocument(),
    );
  });
});
