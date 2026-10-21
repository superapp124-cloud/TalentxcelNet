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

/** Production origin — used by Next.js to resolve all relative metadata URLs. */
const SITE_URL = 'https://talentxcel.net'

/** Default social preview image served from /public/images/. */
const OG_IMAGE = {
  url: `${SITE_URL}/images/og-social-preview.jpg`,
  width: 1200,
  height: 630,
  alt: 'TalentXcel Academy — Practical AI, Tech & Business Education',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'TalentXcel Academy',
    title: 'TalentXcel Academy — Practical AI, Tech & Business Education',
    description:
      'Learn practical skills. Build real projects. Demonstrate your capabilities.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentXcel Academy',
    description: 'Learn practical skills. Build real projects.',
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
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

/**
 * JSON-LD structured data for the Academy as an Organization and as a WebSite.
 * Placed once at the root layout so it appears on every page.
 * Details are sourced from verified, visible site content only.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'TalentXcel Academy',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      description:
        'TalentXcel Academy is an AI-first education platform offering practical, career-oriented programmes in AI Development, Healthcare Technology, Entrepreneurship, and School Foundation.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'TalentXcel Academy',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en-IN',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden w-full max-w-full min-w-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
