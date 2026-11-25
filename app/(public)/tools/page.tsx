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
  title: 'Free Maths & Academic Calculators — nCr, nPr, CBSE, JEE | TalentXcel',
  description:
    'Free online calculators: Combination nCr, Permutation nPr, Factorial n!, CBSE CGPA, SSB Age Eligibility, JEE Rank Predictor. Instant answers for Class 11-12 Maths and competitive exams.',
  keywords: [
    'combination calculator nCr',
    'permutation calculator nPr',
    'factorial calculator n!',
    '5c3 value calculator',
    'CBSE CGPA to percentage calculator',
    'SSB age calculator NDA CDS',
    'JEE rank predictor percentile',
    'free maths calculators online India',
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
      { '@type': 'ListItem', position: 1, name: 'CBSE Class 10 CGPA to Percentage Calculator', url: 'https://talentxcel.net/tools/cbse-cgpa-calculator' },
      { '@type': 'ListItem', position: 2, name: 'SSB Armed Forces Age Eligibility Calculator', url: 'https://talentxcel.net/tools/ssb-eligibility-calculator' },
      { '@type': 'ListItem', position: 3, name: 'Class 10 & 12 Board Percentage Calculator', url: 'https://talentxcel.net/tools/board-percentage-calculator' },
      { '@type': 'ListItem', position: 4, name: 'CBSE Best-of-Five Marks Calculator', url: 'https://talentxcel.net/tools/cbse-best-of-five-calculator' },
      { '@type': 'ListItem', position: 5, name: 'JEE Main & NEET Rank vs Percentile Predictor', url: 'https://talentxcel.net/tools/jee-neet-rank-predictor' },
      { '@type': 'ListItem', position: 6, name: 'Combination Calculator nCr', url: 'https://talentxcel.net/tools/combination-calculator' },
      { '@type': 'ListItem', position: 7, name: 'Permutation Calculator nPr', url: 'https://talentxcel.net/tools/permutation-calculator' },
      { '@type': 'ListItem', position: 8, name: 'Factorial Calculator n!', url: 'https://talentxcel.net/tools/factorial-calculator' },
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
      title: 'Class 10 & 12 Board Percentage Calculator',
      description: 'Calculate aggregate marks, percentage, division, and distinction classification across CBSE, ICSE, and State Boards.',
      badge: 'All Boards Aligned',
      href: '/tools/board-percentage-calculator',
      category: 'School Board Metrics',
      icon: Award,
      color: 'emerald',
    },
    {
      title: 'CBSE Best-of-Five Marks Calculator',
      description: 'Compute Class 10 aggregate percentage using official CBSE best-of-5 subject selection with automatic skill subject replacement.',
      badge: 'CBSE Statutory Rule',
      href: '/tools/cbse-best-of-five-calculator',
      category: 'School Board Metrics',
      icon: Zap,
      color: 'indigo',
    },
    {
      title: 'JEE Main & NEET Rank vs Percentile Predictor',
      description: 'Estimate your All India Rank (AIR), expected category cutoff, and NIT/AIIMS college admission tier based on NTA percentile or NEET score.',
      badge: 'NTA Cutoff Calibrated',
      href: '/tools/jee-neet-rank-predictor',
      category: 'Competitive Entrance Exams',
      icon: TrendingUp,
      color: 'rose',
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
    {
      title: 'Combination Calculator — nCr Value',
      description: 'Instantly find 5C3=10, 10C2=45, or any C(n,r) value with formula steps. Covers all Class 11 & 12 Maths, JEE, NDA combination problems.',
      badge: '5C3 • 10C2 • nCr',
      href: '/tools/combination-calculator',
      category: 'Maths Calculators',
      icon: Calculator,
      color: 'blue',
    },
    {
      title: 'Permutation Calculator — nPr Value',
      description: 'Instantly find 5P3=60, 4P2=12, or any P(n,r) value with formula steps. Used in Class 11 & 12 Maths ordered arrangement problems.',
      badge: '5P3 • nPr',
      href: '/tools/permutation-calculator',
      category: 'Maths Calculators',
      icon: Sparkles,
      color: 'purple',
    },
    {
      title: 'Factorial Calculator — n! Value',
      description: 'Compute 5!=120, 10!=3628800, or any n! instantly. Essential for permutations, combinations, and Class 11 & 12 Maths probability.',
      badge: '5! • 10! • n!',
      href: '/tools/factorial-calculator',
      category: 'Maths Calculators',
      icon: Zap,
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
