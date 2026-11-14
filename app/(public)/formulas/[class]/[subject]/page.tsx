import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calculator,
  FlaskConical,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Zap,
  Bookmark,
  Award,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ACADEMIC_CLASSES,
  getCurriculumChapters,
  getSubjectBoardCitations,
} from '@/packages/core/src'
import type { BoardCode, SubjectCode } from '@/packages/core/src'

interface PageProps {
  params: Promise<{
    class: string
    subject: string
  }>
}

function parseClassNumber(classParam: string): number {
  const match = classParam.match(/\d+/)
  return match ? parseInt(match[0], 10) : 10
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { class: classParam, subject } = await params
  const classNum = parseClassNumber(classParam)
  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  const subjMeta = classMeta?.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const title = `Class ${classNum} ${subjectName} All Formulas & Quick Revision Sheet | CBSE & ICSE`
  const description = `Complete chapter-wise formula sheet, key laws, definitions, and cheat-sheet for CBSE Class ${classNum} ${subjectName}. Quick revision before board exams with NCERT alignment.`
  const canonicalUrl = `https://talentxcel.net/formulas/class-${classNum}/${subject.toLowerCase()}`

  return {
    title,
    description,
    keywords: [
      `class ${classNum} ${subjectName} formulas`,
      `cbse class ${classNum} ${subject} formula sheet pdf`,
      `class ${classNum} quick revision notes`,
      'ncert formulas',
      'board exam cheat sheet',
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

export default async function FormulaSheetPage({ params }: PageProps) {
  const { class: classParam, subject } = await params
  const classNum = parseClassNumber(classParam)
  const classMeta = ACADEMIC_CLASSES.find((c) => c.classNumber === classNum)
  if (!classMeta) notFound()

  const subjMeta = classMeta.subjects.find((s) => s.code === subject)
  const subjectName = subjMeta ? subjMeta.name : subject.toUpperCase()

  const chapters = getCurriculumChapters(classNum, subject, 'CBSE')
  const citations = getSubjectBoardCitations(subject as SubjectCode, classNum, 'CBSE')

  // Schema.org LearningResource & BreadcrumbList
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `Class ${classNum} ${subjectName} Formula Cheat Sheet & Quick Revision`,
    description: `Complete chapter-wise formulas, theorems, and definitions for Class ${classNum} ${subjectName}.`,
    educationalLevel: `Class ${classNum}`,
    learningResourceType: 'Cheat Sheet',
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: `${subjectName} - Class ${classNum}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://talentxcel.net' },
      { '@type': 'ListItem', position: 2, name: 'Practice', item: 'https://talentxcel.net/practice' },
      { '@type': 'ListItem', position: 3, name: `Class ${classNum} ${subjectName}`, item: `https://talentxcel.net/practice#class-${classNum}` },
      { '@type': 'ListItem', position: 4, name: 'Formulas & Cheat Sheet', item: `https://talentxcel.net/formulas/class-${classNum}/${subject}` },
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
          <span>Class {classNum}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">{subjectName} Formulas</span>
        </nav>

        {/* Hero */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-500 text-slate-950 text-xs font-black uppercase">
              <Zap className="h-3 w-3 mr-1" />
              Quick Revision Vault
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold">
              CBSE & ICSE Class {classNum}
            </Badge>
            <Badge variant="outline" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="h-3 w-3 mr-1" />
              100% Board Aligned
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class {classNum} {subjectName} Formulas & Key Concepts Cheat-Sheet
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            The definitive chapter-by-chapter formula sheet, core definitions, and quick revision notes. Use this cheat-sheet for rapid board exam revision, numerical problem-solving, and diagnostic test preparation.
          </p>
        </header>

        {/* Chapters Formula Grid */}
        <div className="space-y-6">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Chapter {ch.chapterNumber}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {ch.title}
                  </h2>
                </div>

                <Link href={`/practice/cbse/class-${classNum}/${subject}/${ch.id}`}>
                  <Button size="sm" variant="outline" className="text-xs font-semibold">
                    Practice Questions
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              {/* Core Topics Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400">Key Concepts & Laws:</span>
                <div className="flex flex-wrap gap-2">
                  {ch.topics.map((t) => (
                    <span
                      key={t.id}
                      className="text-xs py-1 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      • {t.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Links to Sample Questions */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Solved Examples:</span>
                {[1, 2, 3].map((qIdx) => (
                  <Link
                    key={qIdx}
                    href={`/question/${ch.id}_q${String(qIdx).padStart(4, '0')}`}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40"
                  >
                    Question #{qIdx} Solution →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black">
            Master All {chapters.length} Chapters with Unlimited Adaptive Practice
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Take timed diagnostic assessments, get instant Socratic AI feedback, and claim your ₹20 free learning credit.
          </p>
          <div className="pt-2">
            <Link href="/auth/register?referral=formula_sheet">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8">
                Start Free Diagnostic Test
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
