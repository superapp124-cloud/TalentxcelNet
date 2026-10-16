export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const MODULE_1_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Where should Supabase service role keys and payment secrets be stored?',
    options: [
      'In client-side JavaScript bundles for quick access',
      'In Git version control inside `.env.local`',
      'Only on the server runtime via hosting secrets/environment variables',
      'In the public browser localStorage',
    ],
    correctIndex: 2,
    explanation:
      'Service role keys and payment secrets grant privileged administrative access and must never be exposed to the browser or committed to public code repositories.',
  },
  {
    id: 'q2',
    text: 'What is the primary role of PostgreSQL Row Level Security (RLS)?',
    options: [
      'Compress database disk space',
      'Enforce granular tenant and user data access policies directly at the database engine level',
      'Replace database indexes',
      'Convert SQL tables to JSON documents',
    ],
    correctIndex: 1,
    explanation:
      'RLS ensures that even if client-side code makes a query, the PostgreSQL engine will reject any row that the authenticated user does not have permission to view or edit.',
  },
  {
    id: 'q3',
    text: 'Why is idempotency essential for payment webhooks?',
    options: [
      'To prevent double-charging or duplicate course enrolment activations when webhooks are retried',
      'To speed up network round-trips',
      'To bypass HTTPS verification',
      'To encrypt learner passwords',
    ],
    correctIndex: 0,
    explanation:
      'Payment gateways frequently retry webhooks upon transient timeouts. Idempotent processing ensures that multiple identical webhook events are recorded and executed only once.',
  },
]

export function evaluateQuizSubmission(
  answers: Record<string, number>,
  questions: QuizQuestion[] = MODULE_1_QUIZ
) {
  let score = 0
  const results = questions.map((q) => {
    const selected = answers[q.id]
    const isCorrect = selected === q.correctIndex
    if (isCorrect) score += 1
    return {
      questionId: q.id,
      selected,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation,
    }
  })

  const totalQuestions = questions.length
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPassed = percentage >= 60

  return {
    score,
    totalQuestions,
    percentage,
    isPassed,
    results,
  }
}
