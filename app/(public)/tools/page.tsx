import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Free CBSE & Competitive Exam Calculators & Tools | TalentXcel',
  description:
    'Free online academic and entrance calculators: CBSE 10th CGPA to Percentage Calculator, SSB Armed Forces Age Eligibility (NDA/CDS/AFCAT), and JEE Main Rank Estimators.',
  keywords: [
    'CBSE CGPA to percentage calculator',
    'CBSE percentage calculator online free',
    'SSB age calculator NDA CDS',
    'defence eligibility calculator 2026',
    'JEE rank predictor percentile',
    'online academic tools India',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools',
  },
  openGraph: {
    title: 'Free CBSE & Competitive Exam Calculators & Tools | TalentXcel',
    description:
      'Fast, accurate online calculators for CBSE CGPA, Armed Forces SSB eligibility, and competitive exam rank predictions.',
    url: 'https://talentxcel.net/tools',
    type: 'website',
  },
}

export default function ToolsIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TalentXcel Academic & Competitive Exam Calculators',
    description: 'Free interactive calculators for CBSE students and competitive exam aspirants.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CBSE Class 10 CGPA to Percentage Calculator',
        url: 'https://talentxcel.net/tools/cbse-cgpa-calculator',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SSB Armed Forces Age Eligibility Calculator',
        url: 'https://talentxcel.net/tools/ssb-eligibility-calculator',
      },
    ],
  }

  const tools = [
    {
      title: 'CBSE Class 10 CGPA to Percentage Calculator',
      description: 'Convert official 10-point CGPA into equivalent percentage using the statutory CBSE 9.5 multiplier.',
      badge: 'CBSE Official (9.5)',
      href: '/tools/cbse-cgpa-calculator',
      category: 'School Board Metrics',
      icon: Calculator,
      color: 'blue',
    },
    {
      title: 'SSB Armed Forces Age Eligibility Calculator',
      description: 'Check your exact statutory eligibility for NDA, CDS, and AFCAT officer entries by entering your Date of Birth.',
      badge: 'NDA • CDS • AFCAT',
      href: '/tools/ssb-eligibility-calculator',
      category: 'Defence SSB Recruitment',
      icon: Calendar,
      color: 'emerald',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema.org ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            100% Free Academic &amp; Entrance Utilities
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Free Academic &amp; Competitive Exam Calculators
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant, zero-login interactive tools for CBSE grade calculations, UPSC defence entry cut-offs, and competitive entrance preparation metrics.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold">
                    {t.badge}
                  </Badge>
                  <span className="text-xs text-slate-400 font-semibold">{t.category}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link href={t.href}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-5 rounded-xl shadow-sm">
                    Launch Free Calculator
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Link Back to Practice */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold">
              Looking for Chapter Practice &amp; Solutions?
            </h4>
            <p className="text-xs text-blue-100">
              Explore thousands of verified CBSE/ICSE practice questions, formula cheat sheets, and SSB mock tests.
            </p>
          </div>
          <Link href="/practice">
            <Button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs">
              Go to Practice Directory
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
