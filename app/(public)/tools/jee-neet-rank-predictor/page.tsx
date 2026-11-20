import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JeeNeetRankPredictor } from '@/components/tools/academic-calculators'

export const metadata: Metadata = {
  title: 'JEE Main & NEET Rank vs Percentile Predictor 2026 (Live Cutoffs) | TalentXcel',
  description:
    'Free online JEE Main and NEET UG Rank vs Percentile Predictor. Estimate your All India Rank (AIR), NIT/AIIMS cutoff tiers, and admission eligibility based on NTA percentile or NEET marks.',
  keywords: [
    'JEE main rank predictor 2026',
    'NEET rank predictor marks vs rank',
    'JEE percentile to rank formula',
    'NEET marks to percentile calculator',
    'expected rank in JEE main 98 percentile',
    'NEET 650 marks AIQ rank',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/jee-neet-rank-predictor',
  },
  openGraph: {
    title: 'JEE Main & NEET Rank vs Percentile Predictor 2026',
    description:
      'Predict your JEE Main and NEET All India Rank (AIR) and expected college tier based on official NTA statistical distributions.',
    url: 'https://talentxcel.net/tools/jee-neet-rank-predictor',
    type: 'website',
  },
}

export default function JeeNeetRankPredictorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JEE Main & NEET Rank vs Percentile Predictor',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Online predictive tool to estimate JEE Main and NEET All India Ranks and admission eligibility from NTA percentile scores and exam marks.',
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Predict JEE Main and NEET Ranks',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Exam Target',
        text: 'Choose JEE Main (Engineering) or NEET UG (Medical).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Input Percentile or Score',
        text: 'Enter your NTA Percentile for JEE Main or expected total marks (out of 720) for NEET.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get Instant AIR Prediction',
        text: 'Review your estimated All India Rank and expected NIT/AIIMS college admission tier.',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tools" className="hover:text-blue-600 transition-colors">
            Tools
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">
            JEE &amp; NEET Rank Predictor
          </span>
        </nav>

        <JeeNeetRankPredictor />

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            How Is All India Rank Estimated from Percentile?
          </h3>
          <p className="leading-relaxed">
            The National Testing Agency (NTA) computes percentile scores using normalisation across multi-session shifts. The official formula to estimate your All India Rank (AIR) in JEE Main is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-sm font-bold text-rose-600 dark:text-rose-400">
            Estimated AIR = ((100 - NTA Percentile) × Total Candidates Appeared) / 100
          </div>
          <p className="leading-relaxed">
            For NEET UG, marks out of 720 are calibrated against historical National Testing Agency score percentiles and All India Quota (AIQ) 15% opening and closing ranks for premier Government Medical Colleges.
          </p>
        </div>
      </div>
    </div>
  )
}
