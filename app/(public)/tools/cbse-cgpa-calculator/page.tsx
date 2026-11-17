import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CbseCgpaCalculator } from '@/components/tools/academic-calculators'

export const metadata: Metadata = {
  title: 'CBSE CGPA to Percentage Calculator 2026 (Official 9.5 Formula) | TalentXcel',
  description:
    'Free online CBSE Class 10 CGPA to Percentage Calculator. Convert CGPA to equivalent percentage using the official CBSE 9.5 multiplier with subject-wise breakdown.',
  keywords: [
    'CBSE CGPA to percentage calculator',
    'how to convert CGPA to percentage in CBSE',
    'CBSE 10th CGPA percentage formula 9.5',
    'calculate 10th percentage from CGPA',
    'CBSE grade point converter online',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/cbse-cgpa-calculator',
  },
  openGraph: {
    title: 'CBSE Class 10 CGPA to Percentage Calculator (Official 9.5 Multiplier)',
    description:
      'Convert your CBSE CGPA to marks percentage instantly using the official board formula (Percentage = CGPA × 9.5).',
    url: 'https://talentxcel.net/tools/cbse-cgpa-calculator',
    type: 'website',
  },
}

export default function CbseCgpaCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CBSE Class 10 CGPA to Percentage Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Interactive online utility to convert CBSE Class 10 Cumulative Grade Point Average (CGPA) to percentage using the official 9.5 conversion multiplier.',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tools" className="hover:text-blue-600 transition-colors">
            Tools
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">
            CBSE CGPA to Percentage Calculator
          </span>
        </nav>

        {/* Interactive Calculator Component */}
        <CbseCgpaCalculator />

        {/* SEO Explainer Content for Google Position 0 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            How Does the CBSE CGPA to Percentage Formula Work?
          </h3>
          <p className="leading-relaxed">
            The Central Board of Secondary Education (CBSE) calculates student performance using grade points on a 10-point scale. To convert your overall Cumulative Grade Point Average (CGPA) into an approximate percentage of marks, CBSE established the statutory multiplier of <strong>9.5</strong>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            Overall Percentage (%) = CGPA × 9.5
          </div>
          <p className="leading-relaxed">
            For example, if your CGPA is 9.2, your equivalent percentage is <code>9.2 × 9.5 = 87.4%</code>. This formula was statistically derived by analyzing the score distribution of the top 500 candidates across five years of board results.
          </p>
        </div>
      </div>
    </div>
  )
}
