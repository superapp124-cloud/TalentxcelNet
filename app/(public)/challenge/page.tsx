import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ChallengeHubView } from '@/components/challenge/challenge-hub-view'

export const metadata: Metadata = {
  title: 'Class Quiz Duel & 60s Speed Challenge | CBSE, ICSE, SSB OIR & JEE | TalentXcel',
  description:
    'Challenge your classmates on WhatsApp with 60-second timed speed quizzes for CBSE Class 10 & 12, SSB OIR, NDA, and JEE Main. Instant scoring, timers, and step-by-step solutions.',
  keywords: [
    'online quiz challenge with friends',
    '60 second speed quiz whatsapp',
    'class 10 maths quiz challenge',
    'ssb oir online speed test practice',
    'nda quiz duel whatsapp',
    'study group competitive quiz',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/challenge',
  },
  openGraph: {
    title: 'Class Quiz Duel & 60s Speed Challenge | TalentXcel',
    description:
      'Challenge your classmates on WhatsApp with 60-second timed speed quizzes for CBSE Class 10 & 12, SSB OIR, NDA, and JEE Main.',
    url: 'https://talentxcel.net/challenge',
    type: 'website',
  },
}

export default function ChallengePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://talentxcel.net' },
      { '@type': 'ListItem', position: 2, name: 'Practice', item: 'https://talentxcel.net/practice' },
      { '@type': 'ListItem', position: 3, name: 'Class Duel & 60s Challenge', item: 'https://talentxcel.net/challenge' },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/practice" className="hover:text-blue-600">Practice</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">Class Speed Duel</span>
        </nav>

        {/* Interactive Challenge Hub */}
        <ChallengeHubView />
      </div>
    </div>
  )
}
