import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechStackSection } from "./tech-stack-section";

describe("TechStackSection", () => {
  it("renders the technology stack heading and technologies", () => {
    render(<TechStackSection />);

    expect(screen.getByRole("heading", { name: "Tools We Trust" })).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("React Native")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TanStack")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("GCP")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("DynamoDB")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("and more")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<TechStackSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
