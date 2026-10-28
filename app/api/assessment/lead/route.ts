import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  parentPhone: z.string().min(10, 'Valid phone number required'),
  parentEmail: z.string().email().optional().or(z.literal('')),
  classGrade: z.string().optional(),
  subject: z.string().optional(),
  scoreObtained: z.number().optional(),
  percentage: z.number().optional(),
  source: z.string().default('assessment_diagnostic_scorecard'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid lead details', details: parsed.error.format() },
        { status: 400 }
      )
    }

    // Telemetry and lead logging
    console.log('[Assessment Lead Captured]:', {
      ...parsed.data,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Diagnostic report request received. PDF will be dispatched to WhatsApp/Email within minutes.',
      leadId: `lead_${Date.now()}`,
    })
  } catch (error) {
    console.error('[Assessment Lead API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    )
  }
}
