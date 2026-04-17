import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the main landing sections", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Custom Software That Moves Your Business Forward" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How We Help Teams Ship Faster" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our Development Approach" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Technology Stack" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Need a Software Partner?" })).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });
});
