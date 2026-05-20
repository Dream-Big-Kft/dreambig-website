import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "./cookiebot.css";

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

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/*
          Plain <script> — NOT next/script — intentional.
          Cookiebot must be the first script in <head> to intercept and block
          all other scripts before they run (auto-blocking mode).
          next/script strategy="beforeInteractive" does not guarantee first
          position in <head>, which breaks Cookiebot's blocking mechanism.
          See: https://www.cookiebot.com/en/manual-implementation/
        */}
                <script
                    id="Cookiebot"
                    src="https://consent.cookiebot.com/uc.js"
                    data-cbid={process.env.NEXT_PUBLIC_COOKIEBOT_ID}
                    data-blockingmode="auto"
                    type="text/javascript"
                />
            </head>
            <body className="font-sans antialiased">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
                {/* Analytics is currently disabled */}
                {/* <Analytics /> */}
            </body>
        </html>
    );
}
