import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ACADEMIC_CLASSES } from '@/packages/core/src'

export const metadata: Metadata = {
  title: 'Free All Subject Formulas & Quick Revision Notes (Classes 4–12) | TalentXcel',
  description:
    'Free formula sheets, key theorems, chemical equations, and quick revision notes for CBSE & ICSE Classes 4 to 12. Mathematics, Physics, Chemistry, and Biology.',
  keywords: [
    'maths formulas class 10',
    'physics formulas class 11',
    'chemistry equations class 10',
    'quick revision notes',
    'ncert formula cheat sheet',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/formulas',
  },
}

export default function FormulasDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 text-xs py-1 px-3">
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Formula & Cheat Sheet Library
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Class-Wise Formula Sheets & Quick Revision Notes
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Quickly revise all key formulas, laws, theorems, and chemical equations across CBSE & ICSE Classes 4 to 12. Instant reference before school exams and board tests.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_CLASSES.map((cls) => (
            <div
              key={cls.classNumber}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {cls.classNumber}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {cls.className} Formula Sheets
                  </h2>
                  <p className="text-[11px] text-slate-400">{cls.stageLabel}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {cls.subjects.map((subj) => (
                  <Link
                    key={subj.code}
                    href={`/formulas/class-${cls.classNumber}/${subj.code}`}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      {subj.code === 'math' ? (
                        <Calculator className="h-3.5 w-3.5 text-amber-500" />
                      ) : subj.code === 'science' ? (
                        <FlaskConical className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                      )}
                      {subj.name} Formulas
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
