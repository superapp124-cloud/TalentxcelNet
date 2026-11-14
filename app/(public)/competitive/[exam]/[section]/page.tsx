import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getExamSection } from '@/lib/competitive/exam-data'
import { InteractiveCompetitiveTest } from '@/components/competitive/interactive-competitive-test'

interface SectionPracticePageProps {
  params: Promise<{
    exam: string
    section: string
  }>
}

export async function generateMetadata({ params }: SectionPracticePageProps): Promise<Metadata> {
  const { exam: examSlug, section: sectionSlug } = await params
  const res = getExamSection(examSlug, sectionSlug)
  if (!res) return {}

  const { exam, section } = res
  const title = `Free ${section.title} Mock Test with Answers | ${exam.shortName} | TalentXcel`
  const description = `Practice ${section.title} for ${exam.title}. ${section.questionCount} diagnostic practice questions, instant scoring, speed shortcuts, and verified explanations.`

  return {
    title,
    description,
    keywords: [
      `${section.title} questions with answers`,
      `${exam.shortName} ${section.id} practice test`,
      `${exam.shortName} mock test online free`,
      'officer intelligence rating test practice',
      'timed competitive exam practice questions',
    ],
    alternates: {
      canonical: `https://talentxcel.net/competitive/${exam.slug}/${section.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://talentxcel.net/competitive/${exam.slug}/${section.id}`,
      type: 'website',
    },
  }
}

export default async function CompetitiveSectionPracticePage({ params }: SectionPracticePageProps) {
  const { exam: examSlug, section: sectionSlug } = await params
  const res = getExamSection(examSlug, sectionSlug)
  if (!res) notFound()

  const { exam, section } = res

  // Google Quiz Schema for Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `${exam.shortName} - ${section.title}`,
    description: section.subtitle,
    hasPart: section.sampleQuestions.map((q) => ({
      '@type': 'Question',
      name: q.questionText,
      learningResourceType: 'Practice problem',
      educationalAlignment: {
        '@type': 'AlignmentObject',
        alignmentType: 'educationalSubject',
        targetName: exam.shortName,
      },
      suggestedAnswer: q.options.map((opt, idx) => ({
        '@type': 'Answer',
        position: idx + 1,
        text: opt,
      })),
      acceptedAnswer: {
        '@type': 'Answer',
        position: q.correctIndex + 1,
        text: q.options[q.correctIndex],
        comment: {
          '@type': 'Comment',
          text: q.explanation,
        },
      },
    })),
  }

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Competitive Hub',
        item: 'https://talentxcel.net/competitive',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: exam.shortName,
        item: `https://talentxcel.net/competitive/${exam.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: section.title,
        item: `https://talentxcel.net/competitive/${exam.slug}/${section.id}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Quiz & Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
          <Link href="/competitive" className="hover:text-blue-600 transition-colors shrink-0">
            Competitive Hub
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href={`/competitive/${exam.slug}`} className="hover:text-blue-600 transition-colors shrink-0">
            {exam.shortName}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="font-semibold text-slate-900 dark:text-white truncate">
            {section.title}
          </span>
        </nav>

        {/* Section Header Info */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs py-1 px-3">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Verified Examination Pattern • {exam.shortName}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {section.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Interactive Runner Component */}
        <InteractiveCompetitiveTest
          examSlug={exam.slug}
          examTitle={exam.shortName}
          sectionTitle={section.title}
          timeLimitMinutes={section.timeLimitMinutes}
          questions={section.sampleQuestions}
        />
      </div>
    </div>
  )
}
