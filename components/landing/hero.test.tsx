import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the headline, supporting copy, value props, and primary CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: "Big Dreams Require Exceptional Engineering.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Focus on your core business while we handle the technology/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("End-to-end custom software delivery")).toBeInTheDocument();
    expect(screen.getByText("Robust architecture designed for scale")).toBeInTheDocument();
    expect(screen.getByText("Long-term technical partnership and support")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByText("99.9% Uptime")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Hero />);

    expect(asFragment()).toMatchSnapshot();
  });
});
