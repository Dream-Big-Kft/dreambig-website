import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesSection } from "./services-section";

describe("ServicesSection", () => {
  it("renders the services heading and all service cards", () => {
    render(<ServicesSection />);

    expect(screen.getByRole("heading", { name: "How We Help Teams Ship Faster" })).toBeInTheDocument();
    expect(screen.getByText("Custom Web Development")).toBeInTheDocument();
    expect(screen.getByText("Mobile Development")).toBeInTheDocument();
    expect(screen.getByText("Hybrid & Cross-Platform")).toBeInTheDocument();
    expect(screen.getByText("Technology Consulting")).toBeInTheDocument();
    expect(screen.getByText("Team Augmentation")).toBeInTheDocument();
    expect(screen.getByText("Code Audits & Optimization")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ServicesSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
