import { describe, it, expect } from 'vitest'
import { POST } from '../../app/api/skills/backpack/evaluate/route'
import { verifyCertificate } from '../../lib/lms/certificate-service'
import { NextRequest } from 'next/server'

describe('Backpack Assessment & Evaluation API End-to-End (/api/skills/backpack/evaluate)', () => {
  it('evaluates a complete valid submission, generates HMAC signature, and registers verifiable credential', async () => {
    const payload = {
      packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box'],
      itemPlacements: {
        math_set: 'back',
        evs_set: 'back',
        eng_reader: 'middle',
        art_pad: 'middle',
        pencil_box: 'front',
        water_bottle: 'middle',
        lunch_box: 'middle',
      },
      answers: {
        placementOptionId: 'opt_back',
        routineOptionId: 'opt_evening',
        placementAttempts: 1,
        routineAttempts: 1,
      },
      learnerDisplayName: 'Aarav W.',
      parentConsentToken: 'parent_consent_token_valid_2026',
    }

    const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.certificateId).toMatch(/^TX-LS-2026-C4-[2-9A-Z]{8}$/)
    expect(data.rubricResult.totalScore).toBe(100)
    expect(data.rubricResult.timetableAccuracy).toBe(40)
    expect(data.rubricResult.weightBand).toBe(20)
    expect(data.rubricResult.placement).toBe(15)
    expect(data.rubricResult.reasoning).toBe(25)
    expect(data.signature).toHaveLength(64)
    expect(data.verificationUrl).toContain(data.certificateId)

    // Verify it is registered in the Certificate Registry for /verify/:id lookup
    const registered = verifyCertificate(data.certificateId)
    expect(registered).not.toBeNull()
    expect(registered?.totalScore).toBe(100)
    expect(registered?.learnerName).toBe('Aarav W.')
    expect(registered?.rubricBreakdown?.timetableAccuracy).toBe(40)
  })

  it('strictly rejects incomplete submissions with HTTP 422 and issues zero credentials', async () => {
    const incompletePayload = {
      packedItemIds: ['math_set', 'pencil_box'],
      itemPlacements: { math_set: 'back' },
      answers: {
        placementOptionId: 'opt_back',
        // routineOptionId omitted (incomplete!)
        placementAttempts: 1,
        routineAttempts: 1,
      },
      learnerDisplayName: 'Aarav W.',
    }

    const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompletePayload),
    })

    const res = await POST(req)
    expect(res.status).toBe(422)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.error).toBe('INCOMPLETE_ATTEMPT')
    expect(data.code).toBe('INCOMPLETE_REFLECTION')
    expect(data.certificateId).toBeUndefined()
  })

  it('rejects malformed payloads with HTTP 400', async () => {
    const malformedPayload = {
      packedItemIds: 'not_an_array',
    }

    const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(malformedPayload),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.error).toBe('VALIDATION_ERROR')
  })
})
