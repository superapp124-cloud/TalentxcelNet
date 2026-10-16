import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { askAITutor } from '@/lib/ai/tutor'
import { createClient } from '@/lib/supabase/server'

const tutorSchema = z.object({
  question: z.string().min(2).max(1000),
  courseContext: z.string().max(2000).default('General curriculum assistance'),
  mode: z.enum(['hint', 'full_solution']).default('hint'),
  hintStep: z.number().int().min(1).max(5).default(1),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const parsed = tutorSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request data', details: parsed.error }, { status: 400 })
    }

    const result = await askAITutor(parsed.data, user?.id)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[AI Tutor] Error:', error)
    return NextResponse.json({ error: 'Failed to process AI tutor request' }, { status: 500 })
  }
}
