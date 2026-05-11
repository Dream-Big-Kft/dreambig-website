import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders the brand and current year", () => {
    render(<Footer />);

    expect(
      screen.getByRole("img", { name: "Dream Big Software Solutions logo" }),
    ).toHaveAttribute("src", "dreambig-logo.svg");

    expect(
      screen.getByText("Dream Big Software Solutions"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Dream Big Kft\. All rights reserved\./),
    ).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
