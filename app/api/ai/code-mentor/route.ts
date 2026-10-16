import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { reviewStudentCode } from '@/lib/ai/coding-mentor'
import { createClient } from '@/lib/supabase/server'

const codeReviewSchema = z.object({
  code: z.string().min(1).max(10000),
  language: z.string().default('typescript'),
  problemDescription: z.string().max(1000).optional(),
  exerciseRubric: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const parsed = codeReviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid code data', details: parsed.error }, { status: 400 })
    }

    const result = await reviewStudentCode(parsed.data, user?.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[AI Code Mentor] Error:', error)
    return NextResponse.json({ error: 'Failed to review code' }, { status: 500 })
  }
}
