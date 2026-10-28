import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  generateParentChallenge,
  verifyChallengeAndCreateToken,
} from '@/lib/auth/parent-consent-service'

const submitChallengeSchema = z.object({
  challengeId: z.string().min(5),
  answer: z.number().int(),
  affirmativeConsent: z.boolean(),
  parentEmail: z.string().email().optional().or(z.literal('')),
})

export async function GET() {
  const challenge = generateParentChallenge()
  return NextResponse.json({
    success: true,
    ...challenge,
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = submitChallengeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid challenge submission',
          details: parsed.error.format(),
        },
        { status: 400 }
      )
    }

    const result = verifyChallengeAndCreateToken({
      challengeId: parsed.data.challengeId,
      answer: parsed.data.answer,
      affirmativeConsent: parsed.data.affirmativeConsent,
      parentEmail: parsed.data.parentEmail || undefined,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      consentToken: result.consentToken,
      expiresAt: result.expiresAt,
    })
  } catch (error) {
    console.error('[Parent Consent API] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: 'Failed to process adult verification challenge',
      },
      { status: 500 }
    )
  }
}
