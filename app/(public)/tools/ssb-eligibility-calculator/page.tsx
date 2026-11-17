import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SsbAgeEligibilityCalculator } from '@/components/tools/academic-calculators'

export const metadata: Metadata = {
  title: 'SSB Age Eligibility Calculator 2026 (NDA, CDS, AFCAT) | TalentXcel',
  description:
    'Free SSB Armed Forces Age Eligibility Calculator for NDA, CDS, and AFCAT. Enter your Date of Birth (DOB) to verify exact statutory eligibility against official UPSC cutoff dates.',
  keywords: [
    'SSB age calculator',
    'NDA age limit 2026 calculator',
    'CDS eligibility calculator',
    'AFCAT age limit calculator',
    'defence forces age cut off checker',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/ssb-eligibility-calculator',
  },
  openGraph: {
    title: 'SSB Armed Forces Age Eligibility Calculator (NDA / CDS / AFCAT)',
    description:
      'Check your eligibility for Indian Army, Navy, and Air Force officer commissions in 5 seconds based on official UPSC cutoffs.',
    url: 'https://talentxcel.net/tools/ssb-eligibility-calculator',
    type: 'website',
  },
}

export default function SsbEligibilityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SSB Armed Forces Age Eligibility Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Interactive online utility to calculate exact age eligibility for Services Selection Board (SSB), NDA, CDS, and AFCAT armed forces entries.',
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
            SSB Age Eligibility Calculator
          </span>
        </nav>

        {/* Interactive Calculator Component */}
        <SsbAgeEligibilityCalculator />

        {/* SEO Explainer Content for Google Position 0 */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Official Age Thresholds for Armed Forces Officer Entries
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">NDA &amp; NA (UPSC)</span>
              <p>Age: 16.5 to 19.5 years. Eligibility: 10+2 passed/appearing (Physics &amp; Math for Air Force/Navy).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">CDS Exam (UPSC)</span>
              <p>IMA/INA/AFA: 19 to 24 years. OTA (Officers Training Academy): 19 to 25 years.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">AFCAT (IAF)</span>
              <p>Flying Branch: 20 to 24 years. Ground Duty (Technical &amp; Non-Technical): 20 to 26 years.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
