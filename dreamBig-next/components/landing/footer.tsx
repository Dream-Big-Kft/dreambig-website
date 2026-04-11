import { Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Company */}
          <div className="flex items-center gap-3">
            <Image
              src="/dreambig-logo.svg"
              alt="DreamBig Software logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain dark:invert"
            />
            <span className="font-medium text-foreground/90">DreamBig Software</span>
          </div>

          {/* Contact and Social */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="mailto:hello@dreambig.software"
              className="hover:text-foreground transition-colors"
            >
              hello@dreambig.software
            </a>
            <a
              href="https://linkedin.com/company/dreambig"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DreamBig Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
