import { Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background/92 py-8 dark:border-white/10 dark:bg-card/88">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Company */}
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/dreambig-logo.svg"
              alt="DreamBig Software logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain dark:invert"
            />
            <span className="font-medium text-foreground/90 dark:text-foreground/88">DreamBig Software</span>
          </a>

          {/* Contact and Social */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground dark:text-foreground/78">
            <a
              href="mailto:hello@dreambig.software"
              className="transition-colors hover:text-foreground dark:hover:text-foreground/92"
            >
              hello@dreambig.software
            </a>
            <a
              href="https://linkedin.com/company/dreambig"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground dark:hover:text-foreground/92"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground dark:text-foreground/72">
            © {new Date().getFullYear()} DreamBig Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
