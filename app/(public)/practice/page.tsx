import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  Calculator,
  FlaskConical,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ACADEMIC_CLASSES,
  SEED_BOARDS,
  getCurriculumChapters,
} from '@/packages/core/src'

export const metadata: Metadata = {
  title: 'Free CBSE & ICSE Online Practice Tests with Solutions | TalentXcel',
  description:
    'Practice thousands of chapter-wise MCQs, questions, and step-by-step solutions for CBSE & ICSE Classes 4 to 12. Instant diagnostic scoring, detailed explanations & verified board curriculum.',
  keywords: [
    'CBSE practice test',
    'ICSE online practice',
    'Class 10 science mcq with answers',
    'Class 10 maths practice questions',
    'NCERT chapterwise test',
    'free online assessment',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/practice',
  },
  openGraph: {
    title: 'Free CBSE & ICSE Online Practice Tests with Solutions | TalentXcel',
    description:
      'Practice thousands of chapter-wise MCQs, questions, and step-by-step solutions for Classes 4 to 12. Instant diagnostic scoring & detailed explanations.',
    url: 'https://talentxcel.net/practice',
    type: 'website',
  },
}

export default function PracticeIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TalentXcel CBSE & ICSE Academic Practice Directory',
    description: 'Comprehensive chapter-wise diagnostic tests and MCQs for Classes 4 to 12.',
    itemListElement: ACADEMIC_CLASSES.map((cls, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${cls.className} Practice Tests`,
      url: `https://talentxcel.net/practice#class-${cls.classNumber}`,
    })),
  }

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
          <Badge className="bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs py-1 px-3">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Verified Academic Question Bank • Classes 4–12
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Free Online Practice Tests & Chapter-Wise Solutions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Master every chapter across Science, Mathematics, English, Hindi, and Social Science. Pre-aligned with CBSE & ICSE syllabus, with instant Socratic feedback and step-by-step solutions.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Free Access
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <Trophy className="h-4 w-4 text-amber-500" /> ₹20 Bonus Credit on Sign-Up
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-blue-500" /> NCERT & Board Aligned
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="space-y-12">
          {ACADEMIC_CLASSES.map((academicClass) => {
            return (
              <section
                key={academicClass.classNumber}
                id={`class-${academicClass.classNumber}`}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
                      {academicClass.classNumber}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {academicClass.className} Practice Tests & Solutions
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {academicClass.stageLabel} • {academicClass.ageGroup}
                      </p>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs font-semibold">
                    {academicClass.subjects.length} Core Subjects Available
                  </Badge>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {academicClass.subjects.map((subj) => {
                    // Fetch top 3 chapters for this subject
                    const chapters = getCurriculumChapters(academicClass.classNumber, subj.code, 'CBSE').slice(0, 4)

                    return (
                      <div
                        key={subj.code}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                              {subj.code === 'math' ? (
                                <Calculator className="h-4 w-4 text-amber-500" />
                              ) : subj.code === 'science' ? (
                                <FlaskConical className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <BookOpen className="h-4 w-4 text-blue-500" />
                              )}
                              {subj.name}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">CBSE</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                            {subj.description}
                          </p>

                          {/* Quick Chapter Links */}
                          <div className="space-y-1.5 mb-4">
                            {chapters.map((ch) => (
                              <Link
                                key={ch.id}
                                href={`/practice/cbse/class-${academicClass.classNumber}/${subj.code}/${ch.id}`}
                                className="text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between py-1 px-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors group"
                              >
                                <span className="truncate pr-2">Ch {ch.chapterNumber}: {ch.title.split(':')[0]}</span>
                                <ChevronRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {chapters.length > 0 && (
                          <Link
                            href={`/practice/cbse/class-${academicClass.classNumber}/${subj.code}/${chapters[0].id}`}
                            className="w-full mt-2"
                          >
                            <Button size="sm" variant="outline" className="w-full text-xs font-semibold justify-between border-slate-300 dark:border-slate-700 hover:border-blue-500">
                              <span>Start Diagnostic Test</span>
                              <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black">
            Prepare with Server-Authoritative Instant Scoring
          </h3>
          <p className="text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
            Every test is evaluated by our deterministic scoring engine. Practice across Television, Laptop, Tablet, and Mobile with verified answer keys.
          </p>
          <div className="pt-2">
            <Link href="/academic">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8">
                Open Full Academic Cockpit
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
