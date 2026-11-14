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
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

  // Google QAPage Schema for Position 0 Featured Snippet
  const qaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: q.questionText,
      text: q.questionText,
      answerCount: 1,
      educationalAlignment: {
        '@type': 'AlignmentObject',
        alignmentType: 'educationalSubject',
        targetName: `${q.boardCode} Class ${q.classNumber} ${q.subjectName}`,
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.explanation || q.solutionSteps.join(' '),
        comment: {
          '@type': 'Comment',
          text: `Verified solution for ${q.bookSource || 'NCERT'} - ${q.exerciseRef || q.chapterTitle}.`,
        },
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Inject Google Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }}
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
          />
        </main>

        {/* Sibling Questions Navigation Mesh */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              More Questions from this Chapter
            </h3>
            <Link
              href={chapterPracticeUrl}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Full Chapter Diagnostic <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const qId = `${q.chapterId}_q${String(num).padStart(4, '0')}`
              const isCurrent = qId === q.id

              return (
                <Link
                  key={num}
                  href={`/question/${qId}`}
                  className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors ${
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
      </div>
    </div>
  )
}
