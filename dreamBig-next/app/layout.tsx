import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "DreamBig Software | Custom Software Development & Consulting",
  description:
    "We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.",
  generator: "v0.app",
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
      </body>
    </html>
  );
}
