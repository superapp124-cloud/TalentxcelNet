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
    default: 'TalentXcel — Universal Learning, Diagnostic Assessments & Skills Platform',
    template: '%s | TalentXcel Universal Learning',
  },
  description:
    'TalentXcel provides 3,000,000+ verified curriculum questions, 5-question free diagnostic tests for Classes 4–12 (CBSE, ICSE, IB), competitive entrance mocks (JEE, NEET, CUET), and practical skill studio tracks.',
  keywords: [
    'diagnostic test class 4 to 12',
    'CBSE mock tests free',
    'ICSE practice questions',
    'IB curriculum assessment',
    'analytical reasoning quiz',
    'JEE main practice test',
    'NEET biology physics chemistry mocks',
    'class 10 science maths questions',
    'class 12 board exam revision',
    'coding for school students',
    'AI skills capstone',
    'skill gap assessment India',
    'online school learning platform',
    'adaptive diagnostic quiz',
  ],
  authors: [{ name: 'TalentXcel' }],
  creator: 'TalentXcel',
  publisher: 'TalentXcel',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'TalentXcel',
    title: 'TalentXcel — Universal Learning, Assessment & Real Skills for Every Learner',
    description:
      'Rigorous curriculum assessments for Classes 4–12, hands-on skill projects in AI and coding, and verified academic lessons for school students and competitive entrance aspirants.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentXcel — Universal Learning & Assessment Platform',
    description: 'Start 5 free diagnostic questions per subject for Classes 4–12. Verified CBSE, ICSE, IB & competitive mocks.',
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
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'TalentXcel',
      alternateName: ['TalentXcel Academy', 'TalentXcel Universal Learning'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/talentxcel-icon.png`,
        width: 512,
        height: 512,
      },
      description:
        'TalentXcel is a universal learning, diagnostic assessment and skill-building platform for Classes 4–12 (CBSE, ICSE, IB), competitive entrance aspirants (JEE, NEET), and applied AI/coding learners.',
      sameAs: [
        'https://twitter.com/talentxcel',
        'https://www.linkedin.com/company/talentxcel',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'TalentXcel',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/assessment?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
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
