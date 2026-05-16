"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { trackContactNavClick } from "@/lib/analytics";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Technology", href: "/#tech" },
  { label: "Contact", href: "/#contact" },
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
    <Sun className="h-5 w-5 text-foreground" />
  ) : (
    <Moon className="h-5 w-5 text-foreground" />
  );

  const handleNavClick = (link: (typeof navLinks)[0]) => () => {
    if (link.label === "Contact") trackContactNavClick();
  };

  const handleMobileNavClick = (link: (typeof navLinks)[0]) => () => {
    if (link.label === "Contact") trackContactNavClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/92 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-card/88 dark:shadow-[0_10px_30px_rgba(0,0,0,0.34)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/#top" className="flex items-center gap-2">
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
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-8 pr-2 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md border-none background-none px-3 py-2 text-base font-medium text-muted-foreground transition-all hover:text-shadow-[0_0_5px_rgba(0,0,0,0.2)] hover:text-foreground dark:text-foreground/78 dark:hover:text-shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:hover:text-foreground/92"
                  onClick={handleNavClick(link)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() =>
                setTheme(activeTheme === "dark" ? "light" : "dark")
              }
              className="cursor-pointer rounded-md p-2 text-foreground transition-colors hover:text-shadow-[0_0_5px_rgba(0,0,0,0.2)] hover:text-foreground dark:text-foreground/78 dark:hover:text-shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:hover:text-foreground/92"
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

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md border-none px-3 py-2 text-base font-medium text-muted-foreground transition-all hover:text-shadow-[0_0_5px_rgba(0,0,0,0.2)] hover:text-foreground dark:text-foreground/78 dark:hover:text-shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:hover:text-foreground/92"
                  onClick={handleMobileNavClick(link)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
