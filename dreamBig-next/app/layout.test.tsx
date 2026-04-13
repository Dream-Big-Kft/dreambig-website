import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "./layout";
import { mockAnalytics, mockNextThemesProvider } from "@/test/setup";

describe("layout metadata", () => {
  it("exports the expected static metadata", () => {
    expect(metadata.title).toBe(
      "DreamBig Software | Custom Software Development & Consulting",
    );
    expect(metadata.description).toBe(
      "We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.",
    );
    expect(metadata.icons).toMatchObject({
      icon: {
        url: "icon.svg",
        type: "image/svg+xml",
      },
      apple: "dreambig-logo.png",
    });
  });
});

describe("RootLayout", () => {
  it("renders children inside the theme provider", () => {
    render(
      <RootLayout>
        <div>Layout child</div>
      </RootLayout>,
    );

    expect(screen.getByText("Layout child")).toBeInTheDocument();
    expect(mockNextThemesProvider).toHaveBeenCalled();
    expect(mockNextThemesProvider.mock.calls[0]?.[0]).toMatchObject({
      attribute: "class",
      defaultTheme: "light",
      enableSystem: false,
    });
  });

  it("renders analytics when running on vercel", async () => {
    vi.resetModules();
    vi.stubEnv("VERCEL", "1");

    const { default: VercelLayout } = await import("./layout");

    render(
      <VercelLayout>
        <div>With analytics</div>
      </VercelLayout>,
    );

    expect(mockAnalytics).toHaveBeenCalled();

    vi.unstubAllEnvs();
  });
});
