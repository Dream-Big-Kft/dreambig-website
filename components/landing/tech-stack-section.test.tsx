import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechStackSection } from "./tech-stack-section";

describe("TechStackSection", () => {
  it("renders the technology stack heading and technologies", () => {
    render(<TechStackSection />);

    expect(screen.getByRole("heading", { name: "Technology Stack" })).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<TechStackSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
