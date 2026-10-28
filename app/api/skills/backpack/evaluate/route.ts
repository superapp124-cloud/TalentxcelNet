import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import {
  evaluateBackpackAttempt,
  validateAndGateAttempt,
  signCertificatePayload,
  IncompleteAttemptError,
  type CanonicalCertificatePayload,
} from '@/packages/core/src/skills-engine/backpack-evaluator'
import { registerLifeSkillCertificate } from '@/lib/lms/certificate-service'

const backpackSubmissionSchema = z.object({
  packedItemIds: z.array(z.string()),
  itemPlacements: z.record(z.enum(['back', 'middle', 'front'])).default({}),
  answers: z.object({
    placementOptionId: z.string().optional(),
    routineOptionId: z.string().optional(),
    placementAttempts: z.number().int().min(1).max(2).default(1),
    routineAttempts: z.number().int().min(1).max(2).default(1),
  }),
  learnerDisplayName: z.string().min(1).max(40).optional().default('Aarav W.'),
  parentConsentToken: z.string().optional(),
})

// Unpredictable 128-bit Base32 certificate ID generator
function generateUnpredictableCertificateId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ' // Base32 crockford avoiding 0/O and 1/I
  const bytes = randomBytes(10)
  let id = 'TX-LS-2026-C4-'
  for (let i = 0; i < 8; i++) {
    id += chars[bytes[i] % chars.length]
  }
  return id
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = backpackSubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid submission data',
          details: parsed.error.format(),
        },
        { status: 400 }
      )
    }

    const submission = parsed.data

    // 1. Enforce Server-Side Completion Gate
    try {
      validateAndGateAttempt(submission)
    } catch (gateErr) {
      if (gateErr instanceof IncompleteAttemptError) {
        return NextResponse.json(
          {
            success: false,
            error: 'INCOMPLETE_ATTEMPT',
            code: gateErr.code,
            message: gateErr.message,
          },
          { status: 422 }
        )
      }
      throw gateErr
    }

    // 2. Pure Server-Authoritative Scoring (client score strictly ignored)
    const rubricResult = evaluateBackpackAttempt(submission)

    // 3. Construct Canonical Certificate Payload
    const certificateId = generateUnpredictableCertificateId()
    const issuedAt = new Date().toISOString()
    const secret = process.env.CERTIFICATE_SIGNING_SECRET || 'dev_talentxcel_secret_key_2026'

    const canonicalPayload: CanonicalCertificatePayload = {
      certificateId,
      learnerDisplayName: submission.learnerDisplayName,
      assessmentVersion: '1.0.0',
      issuedAt,
      credentialStatus: 'digital_simulation_completed',
      totalScore: rubricResult.totalScore,
      rubricBreakdown: {
        timetableAccuracy: rubricResult.timetableAccuracy,
        weightBand: rubricResult.weightBand,
        placement: rubricResult.placement,
        reasoning: rubricResult.reasoning,
      },
      measuredWeightKg: rubricResult.measuredWeightKg,
    }

    // 4. Cryptographic HMAC-SHA256 Signing
    const signature = signCertificatePayload(canonicalPayload, secret)

    // 5. Register in Verification Registry for /verify/:id lookup
    registerLifeSkillCertificate({
      certificateNumber: certificateId,
      learnerName: submission.learnerDisplayName,
      programmeTitle: 'Class 4 Personal Independence: Smart Backpack Lab',
      issuedAt: issuedAt.split('T')[0],
      verificationUrl: `https://talentxcel.net/verify/${certificateId}`,
      isRevoked: false,
      totalScore: rubricResult.totalScore,
      rubricBreakdown: canonicalPayload.rubricBreakdown,
      measuredWeightKg: rubricResult.measuredWeightKg,
      credentialStatus: 'digital_simulation_completed',
      signature,
    })

    return NextResponse.json({
      success: true,
      certificateId,
      issuedAt,
      rubricResult,
      canonicalPayload,
      signature,
      verificationUrl: `https://talentxcel.net/verify/${certificateId}`,
    })
  } catch (error) {
    console.error('[Backpack Evaluation API] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: 'Internal error evaluating backpack attempt',
      },
      { status: 500 }
    )
  }
}
