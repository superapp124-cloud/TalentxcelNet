import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { submitParentObservation, getParentObservation } from '@/lib/lms/parent-observation-service'

const observeSchema = z.object({
  certificateId: z.string().min(10),
  daysReported: z.number().int().min(1).max(7),
  consentToken: z.string().min(10),
  notes: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = observeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid observation submission data',
          details: parsed.error.format(),
        },
        { status: 400 }
      )
    }

    const result = submitParentObservation(parsed.data)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: result.error === 'CERTIFICATE_NOT_FOUND' ? 404 : 403 }
      )
    }

    return NextResponse.json({
      success: true,
      updatedCertificate: result.updatedCertificate,
      observation: result.observation,
      message: 'Parent observation recorded successfully',
    })
  } catch (error) {
    console.error('[Parent Observation API] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: 'Failed to record parent observation',
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const certId = searchParams.get('certificateId')

  if (!certId) {
    return NextResponse.json({ error: 'Missing certificateId parameter' }, { status: 400 })
  }

  const observation = getParentObservation(certId)
  if (!observation) {
    return NextResponse.json({ found: false }, { status: 404 })
  }

  return NextResponse.json({ found: true, observation })
}
