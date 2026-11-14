import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Trophy,
  Zap,
  HelpCircle,
  FileText,
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

interface PageProps {
  params: Promise<{
    class: string
    subject: string
    chapter: string
  }>
}

function parseClassNumber(classParam: string): number {
  const match = classParam.match(/\d+/)
  return match ? parseInt(match[0], 10) : 10
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { class: classParam, subject, chapter: chapterId } = await params
  const classNum = parseClassNumber(classParam)
  const chapters = getCurriculumChapters(classNum, subject, 'CBSE')
  const chapter = chapters.find((c) => c.id === chapterId) || chapters[0]

  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  const subjMeta = classMeta?.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const cleanTitle = chapter ? chapter.title.split(':')[0] : 'Chapter'
  const title = `NCERT Solutions for Class ${classNum} ${subjectName} Chapter ${chapter?.chapterNumber || 1}: ${cleanTitle} | Free PDF & Solutions`
  const description = `Free, accurate NCERT Solutions for Class ${classNum} ${subjectName} ${cleanTitle}. Exercise-by-exercise step-by-step solutions, key definitions, formulas & practice test.`
  const canonicalUrl = `https://talentxcel.net/solutions/ncert/class-${classNum}/${subject.toLowerCase()}/${chapterId}`

  return {
    title,
    description,
    keywords: [
      `ncert solutions for class ${classNum} ${subject}`,
      `class ${classNum} ${subject} chapter ${chapter?.chapterNumber} ncert solutions`,
      `${cleanTitle} ncert solutions pdf`,
      'ncert exercise questions with answers',
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

export default async function NcertChapterSolutionsPage({ params }: PageProps) {
  const { class: classParam, subject, chapter: chapterId } = await params
  const classNum = parseClassNumber(classParam)

  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  if (!classMeta) notFound()

  const subjMeta = classMeta.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const chapters = getCurriculumChapters(classNum, subject, 'CBSE')
  const chapter = chapters.find((c) => c.id === chapterId)
  if (!chapter) notFound()

  const diagnostic = getChapterDiagnosticTest(classNum, subject, chapter.id, 'CBSE', 10)
  const citations = getSubjectBoardCitations(subject as SubjectCode, classNum, 'CBSE')
  const cleanTitle = chapter.title.split(':')[0]

  // Schema.org Article & LearningResource
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `NCERT Solutions for Class ${classNum} ${subjectName} Chapter ${chapter.chapterNumber}: ${cleanTitle}`,
    description: `Official NCERT textbook exercise solutions and explanations for Class ${classNum} ${subjectName}.`,
    educationalLevel: `Class ${classNum}`,
    learningResourceType: 'Textbook Solutions',
    about: {
      '@type': 'Thing',
      name: cleanTitle,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://talentxcel.net' },
      { '@type': 'ListItem', position: 2, name: 'NCERT Solutions', item: 'https://talentxcel.net/practice' },
      { '@type': 'ListItem', position: 3, name: `Class ${classNum} ${subjectName}`, item: `https://talentxcel.net/practice#class-${classNum}` },
      { '@type': 'ListItem', position: 4, name: cleanTitle, item: `https://talentxcel.net/solutions/ncert/class-${classNum}/${subject}/${chapter.id}` },
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

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/practice" className="hover:text-blue-600">Practice</Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>NCERT Class {classNum}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>{subjectName}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{cleanTitle}</span>
        </nav>

        {/* Hero */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-600 text-white text-xs font-bold uppercase">
              NCERT Textbook Solutions
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold">
              Class {classNum} • {subjectName}
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800">
              <ShieldCheck className="h-3 w-3 mr-1" />
              CBSE 2026 Curriculum Aligned
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            NCERT Solutions for Class {classNum} {subjectName} Chapter {chapter.chapterNumber}: {chapter.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Detailed, step-by-step NCERT textbook exercise solutions prepared by subject matter experts. Every question is answered with clear conceptual reasoning, governing chemical/mathematical formulas, and step-by-step markings.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/practice/cbse/class-${classNum}/${subject}/${chapter.id}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Take Interactive Diagnostic Test
              </Button>
            </Link>

            <Link href={`/formulas/class-${classNum}/${subject}`}>
              <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                View Chapter Formula Sheet
              </Button>
            </Link>
          </div>
        </header>

        {/* Exercise Questions List */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Chapter {chapter.chapterNumber} Textbook Exercises & Solutions
          </h2>

          <div className="space-y-4">
            {diagnostic.questions.map((q, qIndex) => {
              const sol = diagnostic.solutions.find((s) => s.questionId === q.id)
              const qId = `${chapter.id}_q${String(qIndex + 1).padStart(4, '0')}`

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Exercise Question {qIndex + 1}
                    </span>
                    <Link
                      href={`/question/${qId}`}
                      className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      Open Full Solution Page <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.questionText}
                  </h3>

                  {/* Options Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIndex) => (
                      <div
                        key={opt.id}
                        className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
                      >
                        <span className="h-5 w-5 rounded-md border flex items-center justify-center shrink-0 text-[10px] font-bold border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verified Solution Snippet */}
                  {sol && (
                    <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Verified NCERT Answer:
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {sol.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black">
            Download Complete NCERT Class {classNum} {subjectName} PDF Solutions
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Get instant access to all chapter exercises, step-by-step proofs, and unlimited practice MCQs with ₹20 free diagnostic credit.
          </p>
          <div className="pt-2">
            <Link href="/auth/register?referral=ncert_solutions">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8">
                Create Free Account (Get ₹20 Credit)
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
