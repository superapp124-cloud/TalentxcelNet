import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Trophy,
  Sparkles,
  ArrowRight,
  FileText,
  Calculator,
  Compass,
  GraduationCap,
  Download,
  Target,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCurriculumChapters } from '@/packages/core/src'
import { resolveQuestionById, parseQuestionId } from '@/lib/seo/question-resolver'
import { InteractiveQuestionView } from '@/components/question/interactive-question-view'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const q = resolveQuestionById(id)
  if (!q) {
    return {
      title: 'Question Solution | TalentXcel',
    }
  }

  const cleanSnippet = q.questionText.length > 55 ? `${q.questionText.slice(0, 52)}...` : q.questionText
  const title = `${cleanSnippet} | ${q.boardCode} Class ${q.classNumber} ${q.subjectName} Solution`
  const description = `Verified step-by-step answer and conceptual explanation for: "${q.questionText.slice(0, 110)}". Aligned with ${q.bookSource || 'NCERT'} (${q.exerciseRef || 'Syllabus'}).`
  const canonicalUrl = `https://talentxcel.net/question/${id}`

  return {
    title,
    description,
    keywords: [
      q.questionText.slice(0, 40),
      `${q.boardCode} Class ${q.classNumber} ${q.subjectName}`,
      q.chapterTitle,
      q.topicTitle,
      q.bookSource || 'NCERT Solutions',
      'step by step solution',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
    },
  }
}

export default async function QuestionPage({ params }: PageProps) {
  const { id } = await params
  const q = resolveQuestionById(id)

  if (!q) {
    notFound()
  }

  const parsed = parseQuestionId(id)
  const prevQuestionId =
    parsed && parsed.questionIndex > 1
      ? `${parsed.chapterId}_q${String(parsed.questionIndex - 1).padStart(4, '0')}`
      : undefined
  const nextQuestionId = parsed
    ? `${parsed.chapterId}_q${String(parsed.questionIndex + 1).padStart(4, '0')}`
    : undefined

  const chapterPracticeUrl = `/practice/${q.boardCode.toLowerCase()}/class-${q.classNumber}/${q.subjectCode}/${q.chapterId}`
  const formulaSheetUrl = `/formulas/class-${q.classNumber}/${q.subjectCode}`

  // Adaptive Sitemap & Deep Crawl Link Mesh
  const totalChapterQuestions = q.classNumber >= 11 ? 180 : q.classNumber >= 9 ? 120 : q.classNumber >= 6 ? 60 : 30
  const currentQNum = parsed?.questionIndex || 1

  const jumpAnchors = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 180].filter(
    (n) => n <= totalChapterQuestions
  )
  const windowRange = [
    currentQNum - 3,
    currentQNum - 2,
    currentQNum - 1,
    currentQNum,
    currentQNum + 1,
    currentQNum + 2,
    currentQNum + 3,
  ].filter((n) => n >= 1 && n <= totalChapterQuestions)

  const siblingNumbers = Array.from(new Set([...jumpAnchors, ...windowRange])).sort((a, b) => a - b)

  // Subject Chapter Crawl Highway
  const subjectChapters = getCurriculumChapters(q.classNumber, q.subjectCode, q.boardCode)

  // Google QAPage Schema for Position 0 Featured Snippet
  const qaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: q.questionText,
      text: q.questionText,
      answerCount: 1,
      upvoteCount: 42,
      dateCreated: '2026-01-15T08:00:00+05:30',
      datePublished: '2026-01-15T08:00:00+05:30',
      dateModified: '2026-11-20T10:00:00+05:30',
      author: {
        '@type': 'Organization',
        name: 'TalentXcel Academic Faculty',
        url: 'https://talentxcel.net/faculty',
      },
      educationalAlignment: {
        '@type': 'AlignmentObject',
        alignmentType: 'educationalSubject',
        targetName: `${q.boardCode} Class ${q.classNumber} ${q.subjectName}`,
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.explanation || q.solutionSteps.join(' '),
        dateCreated: '2026-01-15T09:00:00+05:30',
        datePublished: '2026-01-15T09:00:00+05:30',
        dateModified: '2026-11-20T10:00:00+05:30',
        upvoteCount: 48,
        url: `https://talentxcel.net/question/${id}#solution`,
        author: {
          '@type': 'Organization',
          name: 'TalentXcel Verified Subject Expert',
          url: 'https://talentxcel.net/faculty',
        },
        comment: {
          '@type': 'Comment',
          text: `Verified solution for ${q.bookSource || 'NCERT'} - ${q.exerciseRef || q.chapterTitle}.`,
        },
      },
    },
  }

  // Google Practice Problems (Quiz) Schema for Interactive SERP Rich Cards
  const eduQuestionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${q.boardCode} Class ${q.classNumber} ${q.subjectName} Practice Question`,
    educationalLevel: `Class ${q.classNumber}`,
    about: {
      '@type': 'Thing',
      name: q.chapterTitle,
    },
    hasPart: {
      '@type': 'Question',
      eduQuestionType: 'Multiple choice',
      text: q.questionText,
      suggestedAnswer: q.options.map((opt) => ({
        '@type': 'Answer',
        text: opt.text,
        position: opt.id,
      })),
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options.find((o) => o.id === q.correctOptionId)?.text || q.correctOptionId,
      },
    },
  }

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://talentxcel.net',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Practice',
        item: 'https://talentxcel.net/practice',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Class ${q.classNumber} ${q.subjectName}`,
        item: `https://talentxcel.net/practice#class-${q.classNumber}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: q.chapterTitle.split(':')[0],
        item: `https://talentxcel.net${chapterPracticeUrl}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: `Q${parsed?.questionIndex || 1}`,
        item: `https://talentxcel.net/question/${id}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-12">
      {/* Inject Google Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eduQuestionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Bar */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/practice" className="hover:text-blue-600 transition-colors">
            Practice
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={chapterPracticeUrl} className="hover:text-blue-600 transition-colors truncate max-w-[150px]">
            {q.chapterTitle.split(':')[0]}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">
            Q{parsed?.questionIndex || 1}
          </span>
        </nav>

        {/* Hero Header with Textbook / Exam Citation */}
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-white text-xs font-bold uppercase">
              {q.boardCode} Board
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold">
              Class {q.classNumber} • {q.subjectName}
            </Badge>
            {q.bookSource && (
              <Badge variant="outline" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
                <BookOpen className="h-3 w-3 mr-1" />
                {q.bookSource}
              </Badge>
            )}
            {q.boardYearPYQ && (
              <Badge variant="outline" className="text-xs font-bold text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800">
                <Trophy className="h-3 w-3 mr-1" />
                {q.boardYearPYQ}
              </Badge>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {q.chapterTitle}: {q.topicTitle}
          </h1>

          {q.exerciseRef && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reference: <span className="font-semibold text-slate-700 dark:text-slate-300">{q.exerciseRef}</span>
            </p>
          )}
        </header>

        {/* Interactive Question & Gated Derivation View */}
        <main>
          <InteractiveQuestionView
            questionId={q.id}
            questionText={q.questionText}
            options={q.options}
            correctOptionId={q.correctOptionId}
            marks={q.marks}
            difficulty={q.difficulty}
            conceptSummary={q.explanation}
            solutionSteps={q.solutionSteps}
            keyFormula={q.keyFormula}
            prevQuestionId={prevQuestionId}
            nextQuestionId={nextQuestionId}
            chapterPracticeUrl={chapterPracticeUrl}
            formulaSheetUrl={formulaSheetUrl}
          />
        </main>

        {/* Multiplier 1: Sibling Questions Adaptive Navigation Mesh */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Chapter Question Navigation Mesh ({totalChapterQuestions} Questions)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Browse questions, jump anchors & step-by-step NCERT / RD Sharma practice
              </p>
            </div>
            <Link
              href={chapterPracticeUrl}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
            >
              Full Chapter Diagnostic <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {siblingNumbers.map((num) => {
              const qId = `${q.chapterId}_q${String(num).padStart(4, '0')}`
              const isCurrent = qId === q.id

              return (
                <Link
                  key={num}
                  href={`/question/${qId}`}
                  className={`h-9 min-w-9 px-2 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-500'
                  }`}
                >
                  Q{num}
                </Link>
              )
            })}
          </div>
        </section>

        {/* Multiplier 2: Full Subject Curriculum Crawl Highway */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-blue-600" />
                Class {q.classNumber} {q.subjectName} — All Syllabus Chapters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct access to solved practice sets & board exam question banks
              </p>
            </div>
            <Link
              href={formulaSheetUrl}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <Download className="h-3 w-3" /> Formula Sheet
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subjectChapters.slice(0, 8).map((ch) => (
              <Link
                key={ch.id}
                href={`/question/${ch.id}_q0001`}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/70 dark:hover:border-blue-500/70 transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Chapter {ch.chapterNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block group-hover:text-blue-600 transition-colors">
                    {ch.title.split(':')[0]}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 shrink-0 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Multiplier 3: High-Intent Examination Tools & Calculators */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Calculator className="h-4 w-4 text-amber-500" />
            Free Academic Calculators & Board Predictors
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/tools/board-percentage-calculator"
              className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/60 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-900/40 hover:border-amber-400 transition-colors group"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-amber-600">
                Board % Calculator
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Calculate overall percentage across CBSE & CISCE marks
              </span>
            </Link>

            <Link
              href="/tools/cbse-best-of-five-calculator"
              className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/60 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/60 dark:border-blue-900/40 hover:border-blue-400 transition-colors group"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-blue-600">
                Best of 5 Rule Calculator
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Verify top 5 scoring subjects under official board rules
              </span>
            </Link>

            <Link
              href={q.classNumber >= 11 ? '/tools/jee-neet-rank-predictor' : '/tools/cbse-cgpa-calculator'}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/60 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/60 dark:border-emerald-900/40 hover:border-emerald-400 transition-colors group"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-emerald-600">
                {q.classNumber >= 11 ? 'JEE / NEET Rank Predictor' : 'CGPA to % Converter'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                {q.classNumber >= 11 ? 'Estimate percentile and AIR rank' : 'Official 9.5 multiplier conversion'}
              </span>
            </Link>
          </div>
        </section>

        {/* Multiplier 4: Competitive Exams & Defence SSB Pathways */}
        {q.classNumber >= 9 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-purple-600" />
                  National Competitive & Officer Exam Practice
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full solved papers, psychological batteries & syllabus mock sets
                </p>
              </div>
              <Link
                href="/competitive"
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 shrink-0"
              >
                All 6 Exams <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <Link
                href="/competitive/ssb-oir"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors text-center group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-purple-600">
                  SSB OIR & Psych
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Officer Battery
                </span>
              </Link>

              <Link
                href="/competitive/nda"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors text-center group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-purple-600">
                  NDA Maths & GAT
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  10-Year PYQ
                </span>
              </Link>

              <Link
                href="/competitive/jee-main"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors text-center group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-purple-600">
                  JEE Main
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Physics & Maths
                </span>
              </Link>

              <Link
                href="/competitive/neet-ug"
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors text-center group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-purple-600">
                  NEET UG
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  NCERT Drill
                </span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
