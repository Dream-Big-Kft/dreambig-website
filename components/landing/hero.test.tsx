import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./hero";

describe("Hero", () => {
  it("renders the headline, supporting copy, value props, and primary CTA", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: "Custom Software That Moves Your Business Forward" })).toBeInTheDocument();

    expect(
      screen.getByText(
        /We design and build scalable web applications, cloud systems, and APIs/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Senior engineers embedded in your team")).toBeInTheDocument();
    expect(screen.getByText("Modern web & cloud architecture")).toBeInTheDocument();
    expect(screen.getByText("Fast delivery without technical debt")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Book a Consultation" })).toBeInTheDocument();
    expect(screen.getByText("99.9% Uptime")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Hero />);

    expect(asFragment()).toMatchSnapshot();
  });
});
