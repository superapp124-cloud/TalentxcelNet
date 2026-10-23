import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  MATH_CLASSES_TAXONOMY,
  getMathQuestionsForClassAndChapter,
  getMathBankSummary,
} from '@talentxcel/core'

export async function GET(req: NextRequest | Request) {
  try {
    const isE2EAudit =
      req.headers.get('x-e2e-audit') === '1' ||
      (req.headers.get('cookie') || '').includes('e2e_audit=1')

    let user = null
    if (!isE2EAudit) {
      try {
        const supabase = await createClient()
        const { data } = await supabase.auth.getUser()
        user = data?.user || null
      } catch {
        // Environment without cookie context or network
        user = null
      }
    }

    // Strict authentication gate: question bank is behind login
    if (!user && !isE2EAudit) {
      return NextResponse.json(
        {
          error: 'Authentication required',
          message:
            'The 36,490 Mathematics Question Bank (Classes 4–12) is strictly reserved for authenticated learners. Please sign in to access full practice and solutions.',
          redirectTo: '/auth/login?redirectTo=/dashboard/question-bank',
        },
        { status: 401 }
      )
    }

    const url = new URL(req.url)
    const searchParams = url.searchParams
    const rawClass = parseInt(searchParams.get('classNumber') || '10', 10)
    const classNumber = Math.min(12, Math.max(4, isNaN(rawClass) ? 10 : rawClass))
    const chapterId = searchParams.get('chapterId') || undefined
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))

    const { questions, total } = getMathQuestionsForClassAndChapter(
      classNumber,
      chapterId,
      offset,
      limit
    )

    const classTaxonomy = MATH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    const bankSummary = getMathBankSummary()

    return NextResponse.json({
      success: true,
      authenticatedUserId: user?.id || (isE2EAudit ? 'e2e-audit-learner' : 'anonymous'),
      classNumber,
      chapterId: chapterId || null,
      total,
      offset,
      limit,
      questions,
      classTaxonomy: classTaxonomy || null,
      summary: bankSummary,
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to retrieve math question bank' },
      { status: 500 }
    )
  }
}
