"use client";

import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Technology", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes resolves the user's actual theme only on the client, so we wait
  // until mount before choosing the icon to avoid a server/client render mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme ?? theme;

  const themeIcon = !mounted ? (
    // Keep the toggle footprint stable until the real icon is known, so nearby links do not shift.
    <span className="block h-5 w-5" aria-hidden="true" />
  ) : activeTheme === "dark" ? (
    <Sun className="w-5 h-5 text-foreground" />
  ) : (
    <Moon className="w-5 h-5 text-foreground" />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/92 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-card/88 dark:shadow-[0_10px_30px_rgba(0,0,0,0.34)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2">
            <Image
              src="dreambig-logo.svg"
              alt="DreamBig Software logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain dark:invert"
              priority
            />
            <span className="hidden text-foreground/90 sm:block sm:font-medium dark:text-foreground/88">
              Dream Big Software Solutions
            </span>
          </a>

          {/* Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden md:flex items-center gap-8 pr-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground dark:text-foreground/78 dark:hover:border-white/10 dark:hover:bg-white/8 dark:hover:text-foreground/92"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              onClick={() =>
                setTheme(activeTheme === "dark" ? "light" : "dark")
              }
              className="rounded-md p-2 text-foreground transition-colors hover:bg-muted dark:text-foreground/82 dark:hover:bg-white/6 dark:hover:text-foreground/92"
              aria-label="Toggle theme"
            >
              {themeIcon}
            </button>

            <button
              className="p-2 text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground dark:text-foreground/78 dark:hover:border-white/10 dark:hover:bg-white/8 dark:hover:text-foreground/92"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
