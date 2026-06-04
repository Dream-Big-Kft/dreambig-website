import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import config from "@/config";
import "./globals.css";
import "./cookiebot.css";
import SegmentInitializer from '@/components/SegmentInitializer';

export const metadata: Metadata = {
  title: "DreamBig Software | Custom Software Development & Consulting",
  description:
    "We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.",
  generator: "v0.app",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: {
      url: "icon.svg",
      type: "image/svg+xml",
    },
    apple: "dreambig-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <SegmentInitializer />
        {/*
                    Load Cookiebot after hydration so its injected banner cannot
                    mutate server-rendered markup before React attaches. Analytics
                    remains consent-gated in our own Segment wrapper, so we do not
                    rely on Cookiebot's pre-hydration auto-blocking mode here.
                */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={config.thirdParty.cookiebot.id}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
