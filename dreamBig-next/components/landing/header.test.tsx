import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./header";
import { mockSetTheme, mockUseTheme } from "@/test/setup";

describe("Header", () => {
  it("renders the logo and navigation links", () => {
    render(<Header />);

    expect(
      screen.getByRole("img", { name: "DreamBig Software logo" }),
    ).toHaveAttribute("src", "dreambig-logo.svg");

    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Process" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Technology" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Contact" })).toHaveLength(1);
  });

  it("toggles the mobile menu and closes it after selecting a mobile link", () => {
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuButton);

    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(2);

    fireEvent.click(screen.getAllByRole("link", { name: "Services" })[1]);

    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(1);
  });

  it("toggles the theme from light to dark", () => {
    mockUseTheme.mockReturnValue({
      theme: "light",
      resolvedTheme: "light",
      setTheme: mockSetTheme,
    });

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles the theme from dark to light", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: mockSetTheme,
    });

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("renders the mounted dark theme state", () => {
    mockUseTheme.mockReturnValue({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: mockSetTheme,
    });

    const { container } = render(<Header />);

    expect(container.querySelector("svg.lucide-sun")).toBeInTheDocument();
  });
});
