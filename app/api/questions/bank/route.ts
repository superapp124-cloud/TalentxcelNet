import { NextRequest, NextResponse } from 'next/server'
import { getServerAccess } from '@/lib/auth/server-access'
import {
  MATH_CLASSES_TAXONOMY,
  getUniversalQuestionsForSubjectClassAndChapter,
  getMathBankSummary,
  getUniversalBankSummary,
  UNIVERSAL_SUBJECTS,
  UNIVERSAL_TAXONOMIES_BY_SUBJECT,
} from '@talentxcel/core'
import type { SubjectCode } from '@talentxcel/core'

export async function GET(req: NextRequest | Request) {
  try {
    const access = await getServerAccess('learner')
    if (!access.authorization.allowed) {
      return NextResponse.json(
        {
          error: access.authorization.status === 401 ? 'Authentication required' : 'Insufficient permissions',
          ...(access.authorization.status === 401
            ? { redirectTo: '/auth/login?redirectTo=/dashboard/question-bank' }
            : {}),
        },
        { status: access.authorization.status }
      )
    }

    if (!access.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    const searchParams = new URL(req.url).searchParams
    const rawSubject = (searchParams.get('subjectCode') || searchParams.get('subject') || 'math').toLowerCase()
    const subjectCode: SubjectCode = ['math', 'science', 'english', 'hindi', 'social_science'].includes(rawSubject)
      ? (rawSubject as SubjectCode)
      : 'math'
    const rawClass = parseInt(searchParams.get('classNumber') || '10', 10)
    const classNumber = Math.min(12, Math.max(4, Number.isNaN(rawClass) ? 10 : rawClass))
    const chapterId = searchParams.get('chapterId') || undefined
    const disciplineCode = searchParams.get('disciplineCode') || searchParams.get('branch') || undefined
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const rawBoard = searchParams.get('boardCode') || undefined
    const boardCode = rawBoard === 'CBSE' || rawBoard === 'CISCE' || rawBoard === 'IB' ? rawBoard : undefined

    const { questions, total } = getUniversalQuestionsForSubjectClassAndChapter(
      subjectCode, classNumber, chapterId, offset, limit, boardCode, disciplineCode
    )
    const classTaxonomy = subjectCode === 'math'
      ? MATH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
      : (UNIVERSAL_TAXONOMIES_BY_SUBJECT[subjectCode] || []).find((c) => c.classNumber === classNumber)

    return NextResponse.json({
      success: true,
      authenticatedUserId: access.user.id,
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
      summary: getMathBankSummary(),
      universalSummary: getUniversalBankSummary(),
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to retrieve question bank' }, { status: 500 })
  }
}
