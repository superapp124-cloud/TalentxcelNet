import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
  Timer,
  FileText,
  Clock,
  Layers,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCompetitiveExamBySlug, COMPETITIVE_EXAMS } from '@/lib/competitive/exam-data'

interface ExamPageProps {
  params: Promise<{
    exam: string
  }>
}

export async function generateMetadata({ params }: ExamPageProps): Promise<Metadata> {
  const { exam: examSlug } = await params
  const exam = getCompetitiveExamBySlug(examSlug)
  if (!exam) return {}

  const title = `${exam.title} | TalentXcel`
  const description = `${exam.description} Practice chapter-wise online mock tests with instant scoring and Officer Like Quality (OLQ) breakdown.`

  return {
    title,
    description,
    keywords: [
      `${exam.shortName} mock test free`,
      `${exam.shortName} practice questions with answers`,
      `${exam.shortName} syllabus and exam pattern`,
      'online competitive exam mock test',
      'free test series with explanations',
    ],
    alternates: {
      canonical: `https://talentxcel.net/competitive/${exam.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://talentxcel.net/competitive/${exam.slug}`,
      type: 'website',
    },
  }
}

export default async function CompetitiveExamDetailPage({ params }: ExamPageProps) {
  const { exam: examSlug } = await params
  const exam = getCompetitiveExamBySlug(examSlug)
  if (!exam) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: exam.title,
    description: exam.description,
    provider: {
      '@type': 'Organization',
      name: 'TalentXcel Academy',
      sameAs: 'https://talentxcel.net',
    },
    educationalCredentialAwarded: `${exam.shortName} Diagnostic Certificate`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/competitive" className="hover:text-blue-600 transition-colors">
            Competitive Hub
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">{exam.shortName}</span>
        </nav>

        {/* Hero Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs py-1 px-3">
              {exam.badge}
            </Badge>
            <span className="text-xs font-semibold text-slate-500">
              Conducted by: {exam.conductedBy}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {exam.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {exam.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Target Eligibility</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{exam.eligibility}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Testing Stage</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{exam.stage}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Sections Included</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{exam.sections.length} Core Test Modules</span>
            </div>
          </div>
        </div>

        {/* Test Sections List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Interactive Practice Tests & Sectional Mocks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a module to start timed diagnostic testing with instant verified explanations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exam.sections.map((sec) => (
              <div
                key={sec.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {sec.timeLimitMinutes} Mins
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {sec.questionCount} Questions
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.subtitle}
                  </p>

                  <div className="space-y-1 pt-2">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">Key Syllabus Focus:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sec.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link href={`/competitive/${exam.slug}/${sec.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-5 rounded-xl shadow-sm">
                      Start Diagnostic Mock Test Free
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Process Roadmap */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-600" />
            Official Selection Architecture & Timeline
          </h3>

          <div className="space-y-3">
            {exam.selectionProcess.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                <span className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-700 dark:text-slate-300 pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back navigation */}
        <div className="text-center pt-4">
          <Link href="/competitive">
            <Button variant="ghost" className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">
              ← Return to All Competitive & SSB Examinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
