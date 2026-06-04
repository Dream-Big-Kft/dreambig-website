import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechStackSection } from "./tech-stack-section";

describe("TechStackSection", () => {
  it("renders the technology stack heading and technologies", () => {
    render(<TechStackSection />);

    expect(
      screen.getByRole("heading", { name: "Tools We Trust" }),
    ).toBeInTheDocument();

    expect(screen.getByText("React", { selector: "span" })).toBeInTheDocument();
    expect(
      screen.getByText("React Native", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Next.js", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("TanStack", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("TypeScript", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Node.js", { selector: "span" }),
    ).toBeInTheDocument();
    expect(screen.getByText("AWS", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("GCP", { selector: "span" })).toBeInTheDocument();
    expect(
      screen.getByText("PostgreSQL", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("DynamoDB", { selector: "span" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Figma", { selector: "span" })).toBeInTheDocument();
    expect(
      screen.getByText("Claude", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("ChatGPT", { selector: "span" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("and more", { selector: "span" }),
    ).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<TechStackSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
