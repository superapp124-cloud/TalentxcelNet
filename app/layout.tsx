import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TalentXcel Academy — Practical AI, Tech & Business Education',
    template: '%s | TalentXcel Academy',
  },
  description:
    'TalentXcel Academy offers practical, career-oriented programmes in AI Development, Healthcare Technology, Entrepreneurship, and School Foundation. Learn real skills. Build real projects.',
  keywords: ['online learning', 'AI courses', 'tech education', 'skills development', 'India'],
  authors: [{ name: 'TalentXcel Academy' }],
  creator: 'TalentXcel Academy',
  publisher: 'TalentXcel Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://talentxcel.net',
    siteName: 'TalentXcel Academy',
    title: 'TalentXcel Academy — Practical AI, Tech & Business Education',
    description:
      'Learn practical skills. Build real projects. Demonstrate your capabilities.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentXcel Academy',
    description: 'Learn practical skills. Build real projects.',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
