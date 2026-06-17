import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CookieContextProvider } from "@/components/CookieContext/CookieContext";
import WebsiteCookiesPage from "./page";

const renderWebsiteCookiesPage = () => {
  return render(
    <CookieContextProvider>
      <WebsiteCookiesPage />
    </CookieContextProvider>,
  );
};

describe("WebsiteCookiesPage", () => {
  it("renders the cookie page content", () => {
    renderWebsiteCookiesPage();

    expect(
      screen.getByRole("heading", { name: "Website Cookies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Manage cookie preferences" }),
    ).toBeInTheDocument();
  });

  it("renders all cookie category sections", () => {
    renderWebsiteCookiesPage();

    expect(
      screen.getByRole("heading", { name: "Necessary cookies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Preferences cookies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Statistics cookies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Marketing cookies" }),
    ).toBeInTheDocument();
  });

  it("renders the necessary cookie details", () => {
    renderWebsiteCookiesPage();

    expect(
      screen.getByRole("heading", { name: "CookieConsent" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("dreambig.hu").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Stores the user's cookie consent state for the current domain.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("1 year").length).toBeGreaterThan(0);
    expect(screen.getAllByText("HTTP Cookie").length).toBeGreaterThan(0);
  });

  it("renders the preferences empty state", () => {
    renderWebsiteCookiesPage();

    expect(
      screen.getByText("We do not use cookies of this type."),
    ).toBeInTheDocument();
  });

  it("renders the statistics cookie details", () => {
    renderWebsiteCookiesPage();

    expect(screen.getByRole("heading", { name: "_ga" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "_ga_*" })).toBeInTheDocument();
    expect(screen.getByText("400 days")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Used by Google Analytics to maintain session state and track unique page views across a user session.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the marketing cookie details", () => {
    renderWebsiteCookiesPage();

    expect(
      screen.getByRole("heading", { name: "ajs_user_id" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "timezone" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ajs_anonymous_id [x2]" }),
    ).toBeInTheDocument();
    expect(screen.getByText("dreambig.hu / segment.com")).toBeInTheDocument();
  });
});
