import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProcessSection } from "./process-section";

describe("ProcessSection", () => {
  it("renders the process heading and all delivery steps", () => {
    render(<ProcessSection />);

    expect(screen.getByRole("heading", { name: "Our Development Approach" })).toBeInTheDocument();

    expect(screen.getByText("Understand")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Deliver")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ProcessSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
