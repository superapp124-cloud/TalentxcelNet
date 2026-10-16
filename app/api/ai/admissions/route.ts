import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { askAdmissionsAssistant } from '@/lib/ai/admissions-assistant'

const admissionsSchema = z.object({
  question: z.string().min(2).max(1000),
  programmeInterest: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = admissionsSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid inquiry', details: parsed.error }, { status: 400 })
    }

    const result = await askAdmissionsAssistant(parsed.data)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[AI Admissions API] Error:', err)
    return NextResponse.json({ error: 'Unable to process admissions inquiry' }, { status: 500 })
  }
}
