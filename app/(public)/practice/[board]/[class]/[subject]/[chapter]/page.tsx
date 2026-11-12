import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ACADEMIC_CLASSES,
  getCurriculumChapters,
  getChapterDiagnosticTest,
  getSubjectBoardCitations,
} from '@/packages/core/src'
import type { BoardCode, SubjectCode } from '@/packages/core/src'
import { InteractiveChapterPractice } from '@/components/practice/interactive-chapter-practice'

interface PageProps {
  params: Promise<{
    board: string
    class: string
    subject: string
    chapter: string
  }>
}

function parseClassNumber(classParam: string): number {
  const match = classParam.match(/\d+/)
  return match ? parseInt(match[0], 10) : 10
}

function resolveBoardCode(boardParam: string): BoardCode {
  const upper = boardParam.toUpperCase()
  if (upper === 'ICSE' || upper === 'CISCE') return 'CISCE'
  if (upper === 'IB') return 'IB'
  if (upper === 'STATE') return 'STATE'
  return 'CBSE'
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board, class: classParam, subject, chapter: chapterId } = await params
  const classNum = parseClassNumber(classParam)
  const boardCode = resolveBoardCode(board)

  const chapters = getCurriculumChapters(classNum, subject, boardCode)
  const chapter = chapters.find((c) => c.id === chapterId) || chapters[0]

  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  const subjMeta = classMeta?.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const chapterCleanTitle = chapter ? chapter.title.split(':')[0] : 'Chapter Practice'

  const title = `${chapterCleanTitle} Practice Test & MCQs with Solutions | ${boardCode} Class ${classNum} ${subjectName}`
  const description = `Free online diagnostic test and MCQs for ${chapterCleanTitle} (${boardCode} Class ${classNum} ${subjectName}). Instant scoring, step-by-step explanations, and verified NCERT curriculum alignment.`
  const canonicalUrl = `https://talentxcel.net/practice/${board.toLowerCase()}/${classParam.toLowerCase()}/${subject.toLowerCase()}/${chapterId}`

  return {
    title,
    description,
    keywords: [
      `${chapterCleanTitle} mcq`,
      `${chapterCleanTitle} class ${classNum} questions with answers`,
      `${boardCode} class ${classNum} ${subjectName} practice test`,
      `${chapterCleanTitle} solutions`,
      'online diagnostic test',
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

export default async function ChapterPracticePage({ params }: PageProps) {
  const { board, class: classParam, subject, chapter: chapterId } = await params
  const classNum = parseClassNumber(classParam)
  const boardCode = resolveBoardCode(board)

  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  if (!classMeta) notFound()

  const subjMeta = classMeta.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const chapters = getCurriculumChapters(classNum, subject, boardCode)
  const chapter = chapters.find((c) => c.id === chapterId)

  if (!chapter) {
    notFound()
  }

  // Generate verified questions & solutions for this chapter
  const diagnostic = getChapterDiagnosticTest(classNum, subject, chapter.id, boardCode, 5)
  const citations = getSubjectBoardCitations(subject as SubjectCode, classNum, boardCode)

  const cleanChapterTitle = chapter.title.split(':')[0]
  const fullChapterTitle = chapter.title

  // Format questions for client & schema
  const practiceQuestions = diagnostic.questions.map((q) => {
    const sol = diagnostic.solutions.find((s) => s.questionId === q.id)
    const optionsText = q.options.map((opt) => (typeof opt === 'string' ? opt : opt.text))
    const correctIdx = q.options.findIndex((opt) =>
      sol?.correctOptionIds ? sol.correctOptionIds.includes(opt.id) : false
    )

    return {
      id: q.id,
      questionText: q.questionText,
      options: optionsText,
      marks: q.marks,
      difficulty: (q.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
      explanationSnippet: sol?.explanation || sol?.solutionSteps?.join(' ') || '',
      correctOptionIndex: correctIdx >= 0 ? correctIdx : 0,
    }
  })

  // Google Quiz Schema for Rich SERP Carousel
  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${fullChapterTitle} - ${boardCode} Class ${classNum} ${subjectName} Practice Test`,
    description: `Diagnostic test covering ${fullChapterTitle} for ${boardCode} Class ${classNum} learners.`,
    educationalLevel: `Class ${classNum}`,
    about: {
      '@type': 'Thing',
      name: cleanChapterTitle,
    },
    hasPart: practiceQuestions.map((q) => ({
      '@type': 'Question',
      name: q.questionText,
      suggestedAnswer: q.options.map((opt, i) => ({
        '@type': 'Answer',
        text: opt,
        position: i + 1,
      })),
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options[q.correctOptionIndex],
        comment: {
          '@type': 'Comment',
          text: q.explanationSnippet,
        },
      },
    })),
  }

  // BreadcrumbList Schema for Google Search hierarchy
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
        name: `${boardCode} Class ${classNum}`,
        item: `https://talentxcel.net/practice#class-${classNum}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: subjectName,
        item: `https://talentxcel.net/practice#class-${classNum}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: cleanChapterTitle,
        item: `https://talentxcel.net/practice/${board.toLowerCase()}/${classParam.toLowerCase()}/${subject.toLowerCase()}/${chapter.id}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Inject Structured Data for Google SERP Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
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
          <span>{boardCode} Class {classNum}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>{subjectName}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
            {cleanChapterTitle}
          </span>
        </nav>

        {/* Page Hero */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-600 text-white text-xs font-bold uppercase">
              {boardCode} Syllabus
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold">
              Class {classNum} • {subjectName}
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Verified NCERT Alignment
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {fullChapterTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Free chapter-wise online practice test and assessment. Solve verified multiple choice questions, check your answer instantaneously, and access step-by-step conceptual explanations aligned with the latest {boardCode} academic framework.
          </p>

          {/* Curriculum Topics Pill Tags */}
          {chapter.topics && chapter.topics.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Core Chapter Concepts:
              </span>
              <div className="flex flex-wrap gap-2">
                {chapter.topics.map((top) => (
                  <span
                    key={top.id}
                    className="inline-flex items-center text-xs py-1 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs"
                  >
                    • {top.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Interactive MCQ Practice Card for Learners */}
        <main>
          <InteractiveChapterPractice
            board={boardCode}
            classNumber={classNum}
            subjectName={subjectName}
            chapterTitle={fullChapterTitle}
            questions={practiceQuestions}
          />
        </main>

        {/* Board Citation & Syllabus Alignment Footer */}
        {citations && (
          <aside className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                {citations.boardName} ({citations.status.toUpperCase()} • {citations.coveragePercentage}% Coverage)
              </span>
              <span className="text-[10px] text-slate-400 font-normal">{citations.framework}</span>
            </div>
            {citations.textbooks && citations.textbooks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Prescribed Texts:</span>
                {citations.textbooks.map((tb, i) => (
                  <span key={i} className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                    {tb}
                  </span>
                ))}
              </div>
            )}
          </aside>
        )}

        {/* Internal Linking: Sibling Chapters in this Subject & Class */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              More {subjectName} Chapters (Class {classNum})
            </h2>
            <Link
              href="/practice"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All Classes <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {chapters
              .filter((c) => c.id !== chapter.id)
              .slice(0, 6)
              .map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/practice/${board.toLowerCase()}/${classParam.toLowerCase()}/${subject.toLowerCase()}/${sibling.id}`}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xs transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                    Chapter {sibling.chapterNumber}
                  </span>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {sibling.title}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
