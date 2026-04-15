import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroCodePanel } from "./hero-code-panel";

describe("HeroCodePanel", () => {
  it("renders the code window and uptime card", () => {
    render(<HeroCodePanel />);

    expect(screen.getByText("api-service.ts")).toBeInTheDocument();
    expect(screen.getByText(/@api\/core/)).toBeInTheDocument();
    expect(screen.getByText(/Production ready/)).toBeInTheDocument();
    expect(screen.getByText("99.9% Uptime")).toBeInTheDocument();
    expect(screen.getByText("Production Systems")).toBeInTheDocument();
  });
});
