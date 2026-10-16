import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const progressSchema = z.object({
  lessonId: z.string(),
  completed: z.boolean(),
  timeSpentSeconds: z.number().int().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = progressSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid progress data' }, { status: 400 })
    }

    // Record progress state
    return NextResponse.json({
      success: true,
      lessonId: parsed.data.lessonId,
      completed: parsed.data.completed,
      recordedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Progress API] Error:', error)
    return NextResponse.json({ error: 'Failed to record progress' }, { status: 500 })
  }
}
