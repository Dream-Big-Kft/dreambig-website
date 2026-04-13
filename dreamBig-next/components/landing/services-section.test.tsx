import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesSection } from "./services-section";

describe("ServicesSection", () => {
  it("renders the services heading and all service cards", () => {
    render(<ServicesSection />);

    expect(screen.getByRole("heading", { name: "How We Help Teams Ship Faster" })).toBeInTheDocument();
    expect(screen.getByText("Custom Application Development")).toBeInTheDocument();
    expect(screen.getByText("Software Consulting")).toBeInTheDocument();
    expect(screen.getByText("Database Solutions")).toBeInTheDocument();
    expect(screen.getByText("Maintenance & Support")).toBeInTheDocument();
    expect(screen.getByText("Team Training")).toBeInTheDocument();
    expect(screen.getByText("Mobile Development")).toBeInTheDocument();
    expect(screen.getByText("Backend & API Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Engineering Consulting")).toBeInTheDocument();
  });
});
