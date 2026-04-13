import React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// This repo currently stays on jsdom 26 because jsdom 29 pulled a dependency
// chain that crashed Vitest workers here with an ESM/CJS compatibility error.
const renderChildren = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

const analyticsStub = () => null;

export const mockSetTheme = vi.fn();
export const mockUseTheme = vi.fn(() => ({
  theme: "light",
  resolvedTheme: "light",
  setTheme: mockSetTheme,
}));
// Keep the provider mock transparent by default so tests only see their own UI.
export const mockNextThemesProvider = vi.fn(renderChildren);
export const mockAnalytics = vi.fn(analyticsStub);

afterEach(() => {
  cleanup();
  mockSetTheme.mockClear();
  mockUseTheme.mockClear();
  mockNextThemesProvider.mockClear();
  mockAnalytics.mockClear();
  mockUseTheme.mockReturnValue({
    theme: "light",
    resolvedTheme: "light",
    setTheme: mockSetTheme,
  });
  // Restore shared mocks in case a test overrides their behavior.
  mockNextThemesProvider.mockImplementation(renderChildren);
  mockAnalytics.mockImplementation(analyticsStub);
});

// jsdom is not a full browser, so we provide matchMedia for components/hooks
// that expect responsive browser APIs to exist.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    React.createElement("img", { alt, src, ...props }),
}));

vi.mock("next/font/google", () => ({
  Geist: () => ({
    className: "mock-geist",
    style: { fontFamily: "mock-geist" },
    variable: "--font-geist",
  }),
  Geist_Mono: () => ({
    className: "mock-geist-mono",
    style: { fontFamily: "mock-geist-mono" },
    variable: "--font-geist-mono",
  }),
}));

vi.mock("next-themes", () => ({
  ThemeProvider: mockNextThemesProvider,
  useTheme: mockUseTheme,
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: mockAnalytics,
}));
