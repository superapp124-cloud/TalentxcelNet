import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SSBPsychSimulator } from '@/components/competitive/ssb-psych-simulator'

export const metadata: Metadata = {
  title: 'Free SSB Psychological Tests Simulator (PPDT, WAT, SRT) | TalentXcel',
  description:
    'Practice SSB Day 2 Psychological tests online: 15-second WAT flash drill with recommended officer sentences, 60 real SRT emergency situations, and PPDT story formulation templates.',
  keywords: [
    'SSB psychological test online practice',
    'SSB WAT words with sentences',
    'SSB SRT questions and answers',
    'SSB PPDT pictures and stories',
    'SSB Stage 1 and Stage 2 practice free',
    'officer like qualities olq practice',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/competitive/ssb/psychological-battery',
  },
  openGraph: {
    title: 'Free SSB Psychological Tests Simulator (PPDT, WAT, SRT) | TalentXcel',
    description:
      'Train for SSB Day 2 Psychology: 15-second WAT flash timer, SRT situation reactions, and PPDT sample stories with Officer Like Quality (OLQ) breakdown.',
    url: 'https://talentxcel.net/competitive/ssb/psychological-battery',
    type: 'website',
  },
}

export default function SSBPsychologicalBatteryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'SSB Psychological Battery Training Simulator (PPDT, WAT, SRT)',
    description:
      'Interactive psychological training bench for Services Selection Board candidates preparing for Army, Navy, and Air Force officer commissions.',
    educationalLevel: 'Defence Officer Aspirant (NDA, CDS, AFCAT, TGC)',
    provider: {
      '@type': 'Organization',
      name: 'TalentXcel Academy',
      sameAs: 'https://talentxcel.net',
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org LearningResource */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/competitive" className="hover:text-blue-600 transition-colors">
            Competitive Hub
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/competitive/ssb-oir" className="hover:text-blue-600 transition-colors">
            SSB Hub
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">
            Psychological Battery Simulator
          </span>
        </nav>

        {/* Hero Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-xs py-1 px-3">
            <Award className="h-3.5 w-3.5 mr-1" />
            SSB Stage 1 & Stage 2 Psychology Suite
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            SSB PPDT, WAT & SRT Psychological Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Train your subconscious response velocity for 15-second Word Association (WAT), practical Situation Reactions (SRT), and Picture Perception stories (PPDT) calibrated to project 15 Officer Like Qualities (OLQs).
          </p>
        </div>

        {/* Interactive Simulator */}
        <SSBPsychSimulator />

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link href="/competitive/ssb-oir">
            <button className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white">
              ← Return to SSB OIR Verbal & Non-Verbal Mock Tests
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
