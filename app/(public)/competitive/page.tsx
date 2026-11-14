import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Compass,
  GraduationCap,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { COMPETITIVE_EXAMS } from '@/lib/competitive/exam-data'

export const metadata: Metadata = {
  title: 'SSB OIR Test & Competitive Exams Mock Tests Free | TalentXcel',
  description:
    'Free online practice tests and mock tests for SSB OIR Test, NDA, CDS, SSC CGL, State SSB & JKSSB, NEET UG, and JEE Main. Instant scoring, Officer Like Quality (OLQ) tips & speed shortcuts.',
  keywords: [
    'SSB OIR test practice questions with answers',
    'SSB OIR verbal and non-verbal reasoning test',
    'SSB Stage 1 screening test',
    'NDA maths chapterwise mock test',
    'CDS elementary maths practice questions',
    'SSC CGL quantitative aptitude test online',
    'JKSSB practice test free',
    'NEET biology practice mcq',
    'JEE main physics mock test',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/competitive',
  },
  openGraph: {
    title: 'SSB OIR Test & Competitive Exams Practice Sets | TalentXcel',
    description:
      'Prepare for SSB Screening, NDA, CDS, SSC CGL, State SSB, NEET, and JEE with verified mock tests, speed tricks, and automated evaluation.',
    url: 'https://talentxcel.net/competitive',
    type: 'website',
  },
}

export default function CompetitiveIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TalentXcel Competitive & Defence Exams Directory',
    description: 'Comprehensive mock tests and practice question banks for SSB, Defence, Civil Services and Entrances.',
    itemListElement: COMPETITIVE_EXAMS.map((exam, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: exam.title,
      url: `https://talentxcel.net/competitive/${exam.slug}`,
    })),
  }

  const defenceExams = COMPETITIVE_EXAMS.filter((e) => e.category === 'defence_ssb')
  const govtExams = COMPETITIVE_EXAMS.filter((e) => e.category === 'govt_recruitment')
  const entranceExams = COMPETITIVE_EXAMS.filter((e) => e.category === 'entrance')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema.org ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs py-1 px-3">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            Armed Forces SSB • National Recruitment • Entrances
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            SSB OIR & Competitive Exams Mock Test Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Crack Stage-I SSB screening, UPSC NDA/CDS, SSC CGL, State SSBs, NEET, and JEE. Timed diagnostic test papers, verified answers, Officer Like Quality (OLQ) strategies, and mental speed calculation shortcuts.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free Stage-1 Practice
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <Trophy className="h-4 w-4 text-amber-500" /> OIR-1 Rating Calibrated
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <Zap className="h-4 w-4 text-blue-500" /> Instant Speed Feedback
            </div>
          </div>
        </div>

        {/* Featured Special: SSB Psychological Battery Drill Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs">
                SSB Day-2 Psychology Suite
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black">
                Interactive SSB PPDT, WAT & SRT Psychological Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Practice 15-second WAT flashes with recommended officer sentences, solve 60 real SRT emergency dilemmas, and review high-scoring PPDT story templates.
              </p>
            </div>

            <Link href="/competitive/ssb/psychological-battery">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-lg">
                Launch SSB Psych Simulator
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Category 1: Armed Forces & SSB */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Defence & Services Selection Board (SSB)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                OIR Verbal/Non-Verbal tests, NDA Mathematics, and CDS Elementary Arithmetic
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defenceExams.map((exam) => (
              <div
                key={exam.slug}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {exam.badge}
                    </Badge>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {exam.sections.length} Test Sections
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {exam.shortName}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {exam.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Available Practice Sets:
                    </div>
                    {exam.sections.map((sec) => (
                      <Link
                        key={sec.id}
                        href={`/competitive/${exam.slug}/${sec.id}`}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <span className="truncate">{sec.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={`/competitive/${exam.slug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      Explore Full Exam Hub & Pattern
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Government Staff Selection & Banking */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Government Recruitment & State Selection Boards
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Staff Selection Commission (SSC CGL/CHSL) & State SSBs (JKSSB, etc.)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {govtExams.map((exam) => (
              <div
                key={exam.slug}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {exam.badge}
                    </Badge>
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                      {exam.sections.length} Test Sections
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {exam.shortName}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {exam.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Available Practice Sets:
                    </div>
                    {exam.sections.map((sec) => (
                      <Link
                        key={sec.id}
                        href={`/competitive/${exam.slug}/${sec.id}`}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <span className="truncate">{sec.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={`/competitive/${exam.slug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      Explore Full Exam Hub & Pattern
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: National Engineering & Medical Entrances */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Medical & Engineering Entrances (NEET & JEE)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All-India Pre-Medical and Engineering competitive entrance diagnostics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entranceExams.map((exam) => (
              <div
                key={exam.slug}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {exam.badge}
                    </Badge>
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                      {exam.sections.length} Test Sections
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {exam.shortName}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {exam.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Available Practice Sets:
                    </div>
                    {exam.sections.map((sec) => (
                      <Link
                        key={sec.id}
                        href={`/competitive/${exam.slug}/${sec.id}`}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <span className="truncate">{sec.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={`/competitive/${exam.slug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      Explore Full Exam Hub & Pattern
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Link Back to School Academic Practice */}
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Looking for School Board Practice? (Classes 4–12)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore chapter-wise CBSE & ICSE diagnostic question banks, NCERT solutions, and formula cheat sheets.
            </p>
          </div>
          <Link href="/practice">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
              Go to School Practice Directory
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
