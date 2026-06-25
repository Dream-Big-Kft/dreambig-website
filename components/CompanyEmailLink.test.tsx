import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CompanyEmailLink } from "./CompanyEmailLink";

describe("CompanyEmailLink", () => {
  it("renders the decoded company email as text", () => {
    render(<CompanyEmailLink />);

    expect(screen.getByText("info@dreambig.hu")).toBeInTheDocument();
  });

  it("links to a mailto: address for the decoded email", () => {
    render(<CompanyEmailLink />);

    const link = screen.getByRole("link", { name: "info@dreambig.hu" });
    expect(link).toHaveAttribute("href", "mailto:info@dreambig.hu");
  });

  it("applies the provided className to the anchor", () => {
    render(<CompanyEmailLink className="custom-class" />);

    expect(screen.getByRole("link")).toHaveClass("custom-class");
  });

  it("renders without a className when none is provided", () => {
    render(<CompanyEmailLink />);

    expect(screen.getByRole("link")).not.toHaveAttribute("class");
  });
});
