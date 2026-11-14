import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  GraduationCap,
  BookOpen,
  Calculator,
  FlaskConical,
  Award,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Trophy,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ACADEMIC_CLASSES,
  getCurriculumChapters,
  getSubjectBoardCitations,
} from '@/packages/core/src'
import type { BoardCode } from '@/packages/core/src'

interface PageProps {
  params: Promise<{
    board: string
    class: string
  }>
}

function parseClassNumber(classParam: string): number {
  const match = classParam.match(/\d+/)
  return match ? parseInt(match[0], 10) : 12
}

function resolveBoardCode(boardParam: string): BoardCode {
  const upper = boardParam.toUpperCase()
  if (upper === 'ICSE' || upper === 'CISCE') return 'CISCE'
  if (upper === 'IB') return 'IB'
  if (upper === 'STATE') return 'STATE'
  return 'CBSE'
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, class: classParam } = await params
  const classNum = parseClassNumber(classParam)
  const boardCode = resolveBoardCode(board)

  const isSenior = classNum >= 11
  const examFocus = isSenior
    ? `${boardCode} Class ${classNum} Board Exam & Entrance Foundation (JEE / NEET / CUET)`
    : `${boardCode} Class ${classNum} School Exam Preparation`

  const title = `${boardCode} Class ${classNum} Practice Tests, NCERT Solutions & Formulas (2026) | TalentXcel`
  const description = `Free chapter-wise practice tests, NCERT solutions, MCQs and formula sheets for ${boardCode} Class ${classNum}. ${examFocus} with verified answer keys & instant scoring.`
  const canonicalUrl = `https://talentxcel.net/practice/${board.toLowerCase()}/${classParam.toLowerCase()}`

  return {
    title,
    description,
    keywords: [
      `${boardCode} class ${classNum} practice test`,
      `class ${classNum} ncert solutions`,
      `class ${classNum} all formulas`,
      `class ${classNum} mcq test with answers`,
      isSenior ? `class ${classNum} board exam preparation` : `class ${classNum} online test`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  }
}

export default async function ClassPracticeHubPage({ params }: PageProps) {
  const { board, class: classParam } = await params
  const classNum = parseClassNumber(classParam)
  const boardCode = resolveBoardCode(board)

  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  if (!classMeta) notFound()

  const isSenior = classNum >= 11

  // Schema.org Course & ItemList
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${boardCode} Class ${classNum} Comprehensive Academic & Test Prep Curriculum`,
    description: `Complete diagnostic assessments, verified question banks, and NCERT solutions for Class ${classNum}.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'TalentXcel Academy',
      url: 'https://talentxcel.net',
    },
    educationalLevel: `Class ${classNum}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://talentxcel.net' },
      { '@type': 'ListItem', position: 2, name: 'Practice', item: 'https://talentxcel.net/practice' },
      { '@type': 'ListItem', position: 3, name: `${boardCode} Class ${classNum}`, item: `https://talentxcel.net/practice/${board.toLowerCase()}/${classParam.toLowerCase()}` },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/practice" className="hover:text-blue-600">Practice</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {boardCode} Class {classNum}
          </span>
        </nav>

        {/* Hero */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-white text-xs font-bold uppercase">
              {boardCode} Curriculum
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold">
              {classMeta.stageLabel} • {classMeta.ageGroup}
            </Badge>
            {isSenior && (
              <Badge className="bg-amber-500 text-slate-950 text-xs font-black">
                <Trophy className="h-3 w-3 mr-1" />
                Senior Secondary & Board Exam Track
              </Badge>
            )}
            <Badge variant="outline" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="h-3 w-3 mr-1" />
              NCERT & Board Aligned
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {boardCode} Class {classNum} Online Practice, Solutions & Formulas
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {isSenior
              ? `Master Class ${classNum} Physics, Chemistry, Mathematics, Biology, English, and Humanities. Practice chapter-wise diagnostic tests, access NCERT exercise solutions, and revise key formulas for board exams and competitive entrances.`
              : `Comprehensive academic practice tests, chapter-wise MCQs, and NCERT solutions for Class ${classNum}. Prepare with instant scoring, step-by-step reasoning, and diagnostic mastery tracking.`}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/auth/register?referral=class_hub">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 text-xs sm:text-sm">
                <Zap className="h-4 w-4 mr-1.5" />
                Start Diagnostic Test (Claim ₹20 Pass Credit)
              </Button>
            </Link>

            <Link href={`/formulas/class-${classNum}/math`}>
              <Button size="lg" variant="outline" className="text-xs sm:text-sm font-semibold">
                <Calculator className="h-4 w-4 mr-1.5 text-amber-500" />
                Class {classNum} Formulas
              </Button>
            </Link>
          </div>
        </header>

        {/* Subjects & Chapter Hubs */}
        <div className="space-y-8">
          {classMeta.subjects.map((subj) => {
            const chapters = getCurriculumChapters(classNum, subj.code, boardCode)

            return (
              <section
                key={subj.code}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      {subj.code === 'math' ? (
                        <Calculator className="h-5 w-5 text-amber-500" />
                      ) : subj.code === 'science' ? (
                        <FlaskConical className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {subj.name}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {chapters.length} Chapters • Verified Question Bank
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/formulas/class-${classNum}/${subj.code}`}>
                      <Button size="sm" variant="outline" className="text-xs font-semibold">
                        <Zap className="h-3.5 w-3.5 mr-1 text-amber-500" />
                        Formula Sheet
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {chapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex flex-col justify-between space-y-3 group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                          Chapter {ch.chapterNumber}
                        </span>
                        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {ch.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <Link
                          href={`/practice/${board.toLowerCase()}/${classParam.toLowerCase()}/${subj.code}/${ch.id}`}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Practice Test <ArrowRight className="h-3 w-3" />
                        </Link>

                        <Link
                          href={`/solutions/ncert/class-${classNum}/${subj.code}/${ch.id}`}
                          className="text-slate-500 hover:text-emerald-600 font-semibold"
                        >
                          NCERT Solutions
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-black">
            Class {classNum} Full Diagnostic & Mock Board Exams
          </h3>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            Experience server-authoritative scoring, instant Socratic AI tutoring, and comprehensive score reports with your free ₹20 learning pass credit.
          </p>
          <div className="pt-2">
            <Link href="/auth/register?referral=class_hub_footer">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8">
                Create Free Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
