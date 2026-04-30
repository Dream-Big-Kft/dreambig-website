import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata } from "./layout";

describe("layout metadata", () => {
  it("exports the expected static metadata", () => {
    expect(metadata.title).toBe(
      "DreamBig Software | Custom Software Development & Consulting",
    );
    expect(metadata.description).toBe(
      "We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.",
    );
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    });
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
  it("renders children", () => {
    render(
      <RootLayout>
        <div>Layout child</div>
      </RootLayout>,
    );

    expect(screen.getByText("Layout child")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <RootLayout>
        <div>Layout child</div>
      </RootLayout>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
