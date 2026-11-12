import { Metadata } from 'next'
import { requireLearnerPage } from '@/lib/auth/server-access'
import {
  MATH_CLASSES_TAXONOMY,
  getMathQuestionsForClassAndChapter,
  getUniversalBankSummary,
} from '@talentxcel/core'
import { MathQuestionBankClient } from '@/components/math/math-question-bank-client'

export const metadata: Metadata = {
  title: 'Universal Question Bank (Classes 4–12) — TalentXcel',
  description:
    '3,000,000 curriculum-aligned questions across Mathematics, Science, English, Hindi, and Social Science (Classes 4–12) with full step-by-step derivations, textbook citations, and live scoring behind secure learner login.',
}

export default async function MathQuestionBankPage() {
  const { user } = await requireLearnerPage('/dashboard/question-bank')
  const isAuthenticated = true
  const defaultClass = 10
  const initialChapterId = 'math_c10_ch01'

  // Pre-generate initial questions for Class 10 Chapter 1
  const { questions: initialQuestions } = getMathQuestionsForClassAndChapter(
    defaultClass,
    initialChapterId,
    0,
    20
  )

  const summary = getUniversalBankSummary()

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <MathQuestionBankClient
        initialClass={defaultClass}
        initialQuestions={initialQuestions}
        taxonomy={MATH_CLASSES_TAXONOMY}
        summary={summary}
        isAuthenticated={isAuthenticated}
        userEmail={user?.email || null}
      />
    </div>
  )
}
