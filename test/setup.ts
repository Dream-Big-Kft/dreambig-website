import React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { UseThemeProps } from "next-themes";
import { afterEach, beforeEach, vi } from "vitest";

const renderChildren = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export const mockSetTheme = vi.fn();
export const createMockThemeState = (
  overrides: Partial<UseThemeProps> = {},
): UseThemeProps => ({
  themes: ["light", "dark", "system"],
  forcedTheme: undefined,
  theme: "light",
  resolvedTheme: "light",
  systemTheme: "light",
  setTheme: mockSetTheme,
  ...overrides,
});

export const mockUseTheme = vi.fn(() => createMockThemeState());
// Keep the provider mock transparent by default so tests only see their own UI.
export const mockNextThemesProvider = vi.fn(renderChildren);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT = "https://example.com/formspree";
  mockUseTheme.mockReturnValue(createMockThemeState());
  // Restore shared mocks in case a test overrides their behavior.
  mockNextThemesProvider.mockImplementation(renderChildren);
});

afterEach(() => {
  cleanup();
});

// happy-dom does not implement every browser API we touch in tests, so we
// provide matchMedia for components/hooks that expect responsive APIs to exist.
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
    priority: _priority,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    src: string;
  }) =>
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
