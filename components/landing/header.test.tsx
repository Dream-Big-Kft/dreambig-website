import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./header";
import { createMockThemeState, mockSetTheme, mockUseTheme } from "@/test/setup";

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
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "light",
      resolvedTheme: "light",
    }));

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles the theme from dark to light", () => {
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "dark",
      resolvedTheme: "dark",
    }));

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("toggles from system-dark to light using the resolved theme", () => {
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "system",
      resolvedTheme: "dark",
    }));

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("renders the mounted dark theme state", () => {
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "dark",
      resolvedTheme: "dark",
    }));

    const { container } = render(<Header />);

    expect(container.querySelector("svg.lucide-sun")).toBeInTheDocument();
  });

  it("renders the dark-mode icon when the system theme resolves to dark", () => {
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "system",
      resolvedTheme: "dark",
    }));

    const { container } = render(<Header />);

    expect(container.querySelector("svg.lucide-sun")).toBeInTheDocument();
  });

  it("falls back to theme when resolvedTheme is unavailable", () => {
    mockUseTheme.mockReturnValue(createMockThemeState({
      theme: "dark",
      resolvedTheme: undefined,
    }));

    const { container } = render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(container.querySelector("svg.lucide-sun")).toBeInTheDocument();
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });
});
