import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BoardPercentageCalculator } from '@/components/tools/academic-calculators'

export const metadata: Metadata = {
  title: 'Class 10 & 12 Board Percentage Calculator 2026 (CBSE, ICSE & State Boards) | TalentXcel',
  description:
    'Free online Class 10 and Class 12 board percentage calculator for CBSE, ICSE, and State Boards. Calculate aggregate marks, percentage, division, and grade classification with flexible subjects.',
  keywords: [
    'class 10 board percentage calculator',
    'class 12 percentage calculator',
    'CBSE percentage calculator online free',
    'ICSE 10th percentage calculator',
    'state board marks to percentage converter',
    'calculate board exam percentage',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/board-percentage-calculator',
  },
  openGraph: {
    title: 'Class 10 & 12 Board Percentage Calculator (CBSE, ICSE, State Boards)',
    description:
      'Fast, accurate online percentage calculator for Class 10 and Class 12 students across all boards with division and distinction indicators.',
    url: 'https://talentxcel.net/tools/board-percentage-calculator',
    type: 'website',
  },
}

export default function BoardPercentageCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Class 10 & 12 Board Percentage Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Free online calculation utility for Class 10 and Class 12 board examination aggregate marks and percentage calculation.',
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Class 10 and 12 Board Percentage',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Class & Board',
        text: 'Choose Class 10 or Class 12 and verify your educational board.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Subject Marks',
        text: 'Enter marks obtained and maximum marks for each subject on your marksheet.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'View Aggregate Percentage',
        text: 'The calculator instantly computes your aggregate percentage and division classification.',
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
            Board Percentage Calculator
          </span>
        </nav>

        <BoardPercentageCalculator />

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            How Is Board Percentage Calculated?
          </h3>
          <p className="leading-relaxed">
            The board examination percentage formula is calculated by dividing total marks obtained across all eligible subjects by total maximum marks, multiplied by 100:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
            Percentage (%) = (Total Marks Obtained / Total Maximum Marks) × 100
          </div>
          <p className="leading-relaxed">
            For college admissions and statutory cutoffs, candidates achieving 75% or above receive First Class with Distinction, while 60% or above qualifies for First Division.
          </p>
        </div>
      </div>
    </div>
  )
}
