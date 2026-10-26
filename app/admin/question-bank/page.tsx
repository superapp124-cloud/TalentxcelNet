import { Metadata } from 'next'
import {
  MATH_CLASSES_TAXONOMY,
  getMathQuestionsForClassAndChapter,
  getMathBankSummary,
} from '@talentxcel/core'
import { MathQuestionBankClient } from '@/components/math/math-question-bank-client'
import { ShieldCheck, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Super Admin Mathematics Bank — TalentXcel Operations',
  description: 'Super Admin operational console for auditing and testing all 200,000 Mathematics questions across Classes 4 through 12.',
  robots: { index: false },
}

export default async function AdminQuestionBankPage() {
  const defaultClass = 10
  const initialChapterId = 'math_c10_ch01'

  // Pre-generate initial questions for Class 10 Chapter 1
  const { questions: initialQuestions } = getMathQuestionsForClassAndChapter(
    defaultClass,
    initialChapterId,
    0,
    20
  )

  const summary = getMathBankSummary()

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Super Admin Authorization Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-sm border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700 text-blue-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Super Admin Operational Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Mathematics Question Bank Ingestion &amp; Quality Audit
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            Authoritative access for <span className="font-semibold text-white">arsh.wani@gmail.com</span> &amp; <span className="font-semibold text-white">talentxcelservices@gmail.com</span> — All 200,000 curriculum questions unlocked.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 bg-blue-950/60 rounded-xl border border-blue-800 text-center">
            <span className="block text-[10px] uppercase font-bold text-blue-300">Role Status</span>
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1 justify-center">
              <UserCheck className="w-3.5 h-3.5" />
              Super Admin Active
            </span>
          </div>
        </div>
      </div>

      {/* Embedded Question Studio with Authenticated State Unlocked */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <MathQuestionBankClient
          initialClass={defaultClass}
          initialQuestions={initialQuestions}
          taxonomy={MATH_CLASSES_TAXONOMY}
          summary={summary}
          isAuthenticated={true}
          userEmail="arsh.wani@gmail.com"
        />
      </div>
    </div>
  )
}
