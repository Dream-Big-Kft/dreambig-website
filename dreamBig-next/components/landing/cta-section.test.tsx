import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders the closing call to action", () => {
    render(<CTASection />);

    expect(screen.getByRole("heading", { name: "Need a Software Partner?" })).toBeInTheDocument();

    expect(
      screen.getByText(
        /Whether you are building a new product or scaling an existing platform/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Start a Project/i })).toBeInTheDocument();
  });
});
