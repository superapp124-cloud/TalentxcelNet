import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CbseBestOfFiveCalculator } from '@/components/tools/academic-calculators'

export const metadata: Metadata = {
  title: 'CBSE Best of Five Calculator 2026 (Official Rules Explained) | TalentXcel',
  description:
    'Calculate your CBSE Class 10 Best of 5 aggregate percentage according to official board examination rules. Automatic 6th additional subject elimination to maximize percentage.',
  keywords: [
    'CBSE best of five calculator',
    'how to calculate best of 5 in CBSE',
    'CBSE best of 5 rule 10th class',
    'CBSE additional subject percentage rule',
    'is IT included in best of 5 CBSE',
    'calculate 10th percentage best of five',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/cbse-best-of-five-calculator',
  },
  openGraph: {
    title: 'CBSE Best of Five Calculator (Official Board Rules)',
    description:
      'Compute your CBSE Class 10 aggregate percentage using the statutory best-of-5 rule with automatic lowest score exclusion.',
    url: 'https://talentxcel.net/tools/cbse-best-of-five-calculator',
    type: 'website',
  },
}

export default function CbseBestOfFiveCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CBSE Best of Five Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Online utility to calculate CBSE aggregate percentage using the statutory Best of 5 subject selection rule.',
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compute CBSE Best of Five Marks',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Include Mandatory Language',
        text: 'Language 1 (English or Hindi) is mandatory and must always be counted.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Pick Top 4 Remaining Subjects',
        text: 'Select the 4 highest marks among remaining main and vocational/skill subjects.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Compute Aggregate out of 500',
        text: 'Sum the marks of these 5 subjects and divide by 5 to obtain your Best-of-Five percentage.',
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
            CBSE Best of Five Calculator
          </span>
        </nav>

        <CbseBestOfFiveCalculator />

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            What is the Official CBSE Best of Five Rule?
          </h3>
          <p className="leading-relaxed">
            According to CBSE examination guidelines for Class 10:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
            <li><strong>Mandatory Language:</strong> One language subject (usually English or Hindi) must compulsorily be counted in the aggregate.</li>
            <li><strong>Top 4 Electives:</strong> Among the remaining five subjects (Mathematics, Science, Social Science, 2nd Language, and Skill Subject like Information Technology or Artificial Intelligence), the top 4 highest marks are counted.</li>
            <li><strong>Skill Subject Advantage:</strong> If a student scores higher in an additional skill subject than in Science, Social Science, or Math, the skill subject replaces the lower core subject score for percentage calculation.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
