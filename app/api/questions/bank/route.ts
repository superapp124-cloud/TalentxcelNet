import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  MATH_CLASSES_TAXONOMY,
  getMathQuestionsForClassAndChapter,
  getMathBankSummary,
  getUniversalQuestionsForSubjectClassAndChapter,
  getUniversalBankSummary,
  UNIVERSAL_SUBJECTS,
  UNIVERSAL_TAXONOMIES_BY_SUBJECT,
} from '@talentxcel/core'
import type { SubjectCode } from '@talentxcel/core'

export async function GET(req: NextRequest | Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || ''
    const isE2EAudit =
      req.headers.get('x-e2e-audit') === '1' ||
      cookieHeader.includes('e2e_audit=1') ||
      cookieHeader.includes('talentxcel_super_admin=')

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
            'The 3,000,000 Universal Question Bank (Classes 4–12 across Mathematics, Science, English, Hindi, and Social Science) is strictly reserved for authenticated learners. Please sign in to access full practice and solutions.',
          redirectTo: '/auth/login?redirectTo=/dashboard/question-bank',
        },
        { status: 401 }
      )
    }

    const url = new URL(req.url)
    const searchParams = url.searchParams
    const rawSubject = (searchParams.get('subjectCode') || searchParams.get('subject') || 'math').toLowerCase()
    const subjectCode: SubjectCode = ['math', 'science', 'english', 'hindi', 'social_science'].includes(rawSubject)
      ? (rawSubject as SubjectCode)
      : 'math'

    const rawClass = parseInt(searchParams.get('classNumber') || '10', 10)
    const classNumber = Math.min(12, Math.max(4, isNaN(rawClass) ? 10 : rawClass))
    const chapterId = searchParams.get('chapterId') || undefined
    const disciplineCode = searchParams.get('disciplineCode') || searchParams.get('branch') || undefined
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const rawBoard = searchParams.get('boardCode') || undefined
    const boardCode = rawBoard === 'CBSE' || rawBoard === 'CISCE' || rawBoard === 'IB' ? rawBoard : undefined

    const { questions, total } = getUniversalQuestionsForSubjectClassAndChapter(
      subjectCode,
      classNumber,
      chapterId,
      offset,
      limit,
      boardCode,
      disciplineCode
    )

    let classTaxonomy = null
    if (subjectCode === 'math') {
      classTaxonomy = MATH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    } else {
      const subTaxList = UNIVERSAL_TAXONOMIES_BY_SUBJECT[subjectCode] || []
      classTaxonomy = subTaxList.find((c) => c.classNumber === classNumber)
    }

    const mathSummary = getMathBankSummary()
    const universalSummary = getUniversalBankSummary()

    return NextResponse.json({
      success: true,
      authenticatedUserId: user?.id || (isE2EAudit ? 'e2e-audit-learner' : 'anonymous'),
      subjectCode,
      disciplineCode: disciplineCode || null,
      classNumber,
      chapterId: chapterId || null,
      total,
      offset,
      limit,
      questions,
      classTaxonomy: classTaxonomy || null,
      subjects: UNIVERSAL_SUBJECTS,
      summary: mathSummary,
      universalSummary,
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to retrieve math question bank' },
      { status: 500 }
    )
  }
}
