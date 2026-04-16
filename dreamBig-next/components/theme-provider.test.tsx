import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./theme-provider";
import { mockNextThemesProvider } from "@/test/setup";

describe("ThemeProvider", () => {
  it("passes props and children through to next-themes", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div>Theme content</div>
      </ThemeProvider>,
    );

    expect(screen.getByText("Theme content")).toBeInTheDocument();
    expect(mockNextThemesProvider).toHaveBeenCalled();
    expect(mockNextThemesProvider.mock.calls[0]?.[0]).toMatchObject({
      attribute: "class",
      defaultTheme: "light",
      enableSystem: false,
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div>Theme content</div>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
