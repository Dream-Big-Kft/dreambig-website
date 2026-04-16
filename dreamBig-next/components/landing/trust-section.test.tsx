import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrustSection } from "./trust-section";

describe("TrustSection", () => {
  it("renders the trust headline and badge labels", () => {
    render(<TrustSection />);

    expect(screen.getByText("Trusted Engineering Partner")).toBeInTheDocument();
    expect(screen.getAllByText("SaaS Companies").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tech Startups").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Enterprise Teams").length).toBeGreaterThan(0);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<TrustSection />);

    expect(asFragment()).toMatchSnapshot();
  });
});
