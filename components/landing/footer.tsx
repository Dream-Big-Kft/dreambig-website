import { Icon } from "@iconify/react";
import linkedinIcon from "@iconify-icons/simple-icons/linkedin";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background/92 py-8 dark:border-white/10 dark:bg-card/88">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Company */}
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="dreambig-logo.svg"
              alt="Dream Big Software logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain dark:invert"
            />
            <span className="font-medium text-foreground/90 dark:text-foreground/88">
              Dream Big Software
            </span>
          </a>

          {/* Contact and Social */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground dark:text-foreground/78">
            <a
              href="https://linkedin.com/company/dreambig"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground dark:hover:text-foreground/92"
              aria-label="LinkedIn"
            >
              <Icon aria-hidden className="h-5 w-5" icon={linkedinIcon} />
            </a>
          </div>

          {/* Copyright + Cookie settings + Privacy */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-foreground/72">
            <p>
              © {new Date().getFullYear()} Dream Big Kft. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground transition-colors dark:hover:text-foreground/92"
            >
              Privacy Policy
            </Link>
            <Link
              href="/website-cookies"
              className="underline underline-offset-4 hover:text-foreground transition-colors dark:hover:text-foreground/92"
            >
              Website-cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
