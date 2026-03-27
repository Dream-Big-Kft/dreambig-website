import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const basePath = process.env.GITHUB_PAGES_REPO // basePath helps Next route the app under /repo-name
  ? `/${process.env.GITHUB_PAGES_REPO}`
  : "";

export const metadata: Metadata = {
  title: 'DreamBig Software | Custom Software Development & Consulting',
  description: 'We design and build scalable web applications, cloud systems, and APIs for startups and growing companies.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: `${basePath}/favicon.ico`,
      },
      {
        url: `${basePath}/dreambig-logo.png`,
        type: 'image/png',
      },
      {
        url: `${basePath}/dreambig-logo.svg`,
        type: 'image/svg+xml',
      },
    ],
    apple: `${basePath}/dreambig-logo.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
