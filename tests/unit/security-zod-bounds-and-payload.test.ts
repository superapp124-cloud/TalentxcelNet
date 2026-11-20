import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { parseJsonWithLimit } from '../../lib/security/request-validator'
import { POST as backpackEvaluatePOST } from '../../app/api/skills/backpack/evaluate/route'
import { POST as assessmentAttemptPOST } from '../../app/api/academic/assessment-attempt/route'
import { POST as funnelPOST } from '../../app/api/analytics/funnel/route'
import { POST as verifyPaymentPOST } from '../../app/api/checkout/verify-payment/route'

process.env.CERTIFICATE_SIGNING_SECRET = 'test-only-certificate-secret-for-unit-tests-2026'

describe('Defense-in-Depth Payload Size & Zod Collection Limits (GHSA-mrhx-c7xc-m3w5)', () => {
  describe('parseJsonWithLimit utility & streaming reader', () => {
    it('accepts valid JSON under payload limit', async () => {
      const payload = { test: 'safe', count: 42 }
      const body = JSON.stringify(payload)
      const req = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': String(Buffer.byteLength(body)),
        },
        body,
      })

      const res = await parseJsonWithLimit<{ test: string; count: number }>(req, 1024)
      expect(res.success).toBe(true)
      if (res.success) {
        expect(res.data.test).toBe('safe')
        expect(res.data.count).toBe(42)
      }
    })

    it('rejects upfront when Content-Length header exceeds limit (HTTP 413)', async () => {
      const req = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': '2048', // 2 KB declared
        },
        body: JSON.stringify({ a: 1 }),
      })

      const res = await parseJsonWithLimit(req, 1024) // 1 KB max
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.errorResponse.status).toBe(413)
        const json = await res.errorResponse.json()
        expect(json.error).toBe('Payload too large')
      }
    })

    it('strictly validates Content-Length header as non-negative integer and rejects malformed values (HTTP 400)', async () => {
      const malformedHeaders = ['1024abc', '-50', '10.5', '0x10', 'NaN', '1000 2000']
      for (const badLength of malformedHeaders) {
        const req = new NextRequest('http://localhost:3000/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': badLength,
          },
          body: JSON.stringify({ a: 1 }),
        })

        const res = await parseJsonWithLimit(req, 2048)
        expect(res.success).toBe(false)
        if (!res.success) {
          expect(res.errorResponse.status).toBe(400)
          const json = await res.errorResponse.json()
          expect(json.error).toBe('Invalid Content-Length header')
        }
      }
    })

    it('cancels stream early when incoming chunks exceed limit even if Content-Length is missing or understated (HTTP 413)', async () => {
      let cancelled = false
      // Create a ReadableStream that tracks whether reader.cancel was called
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          // Push first chunk of 600 bytes
          controller.enqueue(new Uint8Array(600))
          // Push second chunk of 600 bytes (total 1200 bytes, exceeding 1000 byte limit)
          controller.enqueue(new Uint8Array(600))
          // Push third chunk that should never be read due to early cancellation
          controller.enqueue(new Uint8Array(600))
          controller.close()
        },
        cancel() {
          cancelled = true
        },
      })

      const req = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Deliberately understated or absent header
          'Content-Length': '500',
        },
        body: stream,
        duplex: 'half',
      } as unknown as ConstructorParameters<typeof NextRequest>[1])

      const res = await parseJsonWithLimit(req, 1000)
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.errorResponse.status).toBe(413)
      }
      expect(cancelled).toBe(true)
    })

    it('rejects malformed non-JSON payloads with HTTP 400', async () => {
      const req = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'this is { definitely not json',
      })

      const res = await parseJsonWithLimit(req, 1024)
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.errorResponse.status).toBe(400)
        const json = await res.errorResponse.json()
        expect(json.error).toBe('Invalid JSON payload')
      }
    })

    it('rejects empty request body with HTTP 400', async () => {
      const req = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '   ',
      })

      const res = await parseJsonWithLimit(req, 1024)
      expect(res.success).toBe(false)
      if (!res.success) {
        expect(res.errorResponse.status).toBe(400)
      }
    })
  })

  describe('/api/checkout/verify-payment streaming limits & bounds', () => {
    it('rejects oversized verification request with HTTP 413', async () => {
      const paddedPayload = {
        orderNumber: 'ORD-123',
        razorpayOrderId: 'order_123',
        razorpayPaymentId: 'pay_123',
        razorpaySignature: 'sig_123',
        productId: 'prod_assess_single',
        junk: 'x'.repeat(600 * 1024), // 600 KB exceeds DEFAULT_MAX_PAYLOAD_BYTES (512 KB)
      }

      const req = new NextRequest('http://localhost:3000/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paddedPayload),
      })

      const res = await verifyPaymentPOST(req)
      expect(res.status).toBe(413)
    })

    it('rejects missing or invalid fields in verify-payment with HTTP 400', async () => {
      const invalidPayload = {
        orderNumber: 'ORD-123',
        // Missing razorpayOrderId, razorpayPaymentId, razorpaySignature
        productId: 'prod_assess_single',
      }

      const req = new NextRequest('http://localhost:3000/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidPayload),
      })

      const res = await verifyPaymentPOST(req)
      expect(res.status).toBe(400)
    })
  })

  describe('/api/skills/backpack/evaluate array bounds & body limit', () => {
    it('accepts packedItemIds within limit (<= 50)', async () => {
      const payload = {
        packedItemIds: ['item_1', 'item_2', 'item_3'],
        itemPlacements: { item_1: 'front', item_2: 'middle', item_3: 'back' },
        answers: { placementOptionId: 'p1', routineOptionId: 'r1' },
      }

      const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await backpackEvaluatePOST(req)
      // Even if incomplete attempt rubric returns 422, it successfully passes Zod validation (not 400)
      expect(res.status).not.toBe(400)
      expect(res.status).not.toBe(413)
    })

    it('rejects packedItemIds exceeding bound of 50 items with HTTP 400', async () => {
      const oversizedArray = Array.from({ length: 51 }, (_, i) => `item_${i}`)
      const payload = {
        packedItemIds: oversizedArray,
        itemPlacements: {},
        answers: {},
      }

      const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await backpackEvaluatePOST(req)
      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.error).toBe('VALIDATION_ERROR')
    })

    it('rejects individual string exceeding 64 chars with HTTP 400', async () => {
      const payload = {
        packedItemIds: ['valid_item', 'a'.repeat(65)],
        itemPlacements: {},
        answers: {},
      }

      const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await backpackEvaluatePOST(req)
      expect(res.status).toBe(400)
    })

    it('rejects oversized payload exceeding SKILLS_MAX_PAYLOAD_BYTES (256KB) with HTTP 413', async () => {
      const paddedPayload = {
        packedItemIds: ['item_1'],
        itemPlacements: {},
        answers: {},
        junk: '0'.repeat(300 * 1024), // 300 KB
      }

      const req = new NextRequest('http://localhost:3000/api/skills/backpack/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paddedPayload),
      })

      const res = await backpackEvaluatePOST(req)
      expect(res.status).toBe(413)
    })
  })

  describe('/api/academic/assessment-attempt collection bounds & body limit', () => {
    it('accepts legitimate evaluations array (up to 100 items)', async () => {
      const evaluations = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q_${i}`,
        isCorrect: true,
        userAnswer: ['A'],
        correctAnswer: ['A'],
      }))

      const payload = {
        assessmentType: 'chapter_diagnostic',
        referenceId: 'ref_diag_1',
        subjectCode: 'math',
        totalQuestions: 10,
        correctAnswers: 10,
        scorePercentage: 100,
        evaluations,
        weakTopics: [],
      }

      const req = new NextRequest('http://localhost:3000/api/academic/assessment-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await assessmentAttemptPOST(req)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.success).toBe(true)
    })

    it('rejects evaluations array exceeding bound of 100 with HTTP 400', async () => {
      const evaluations = Array.from({ length: 101 }, (_, i) => ({
        questionId: `q_${i}`,
        isCorrect: true,
        userAnswer: ['A'],
        correctAnswer: ['A'],
      }))

      const payload = {
        assessmentType: 'chapter_diagnostic',
        totalQuestions: 100,
        correctAnswers: 100,
        scorePercentage: 100,
        evaluations,
      }

      const req = new NextRequest('http://localhost:3000/api/academic/assessment-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await assessmentAttemptPOST(req)
      expect(res.status).toBe(400)
      const data = await res.json()
      expect(data.error).toBe('Invalid assessment attempt payload')
    })

    it('rejects weakTopics array exceeding bound of 50 with HTTP 400', async () => {
      const weakTopics = Array.from({ length: 51 }, (_, i) => ({
        topicId: `t_${i}`,
        topicName: `Topic ${i}`,
        accuracy: 40,
      }))

      const payload = {
        assessmentType: 'chapter_diagnostic',
        totalQuestions: 10,
        correctAnswers: 5,
        scorePercentage: 50,
        weakTopics,
      }

      const req = new NextRequest('http://localhost:3000/api/academic/assessment-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await assessmentAttemptPOST(req)
      expect(res.status).toBe(400)
    })

    it('rejects userAnswer exceeding bound of 20 elements with HTTP 400', async () => {
      const payload = {
        assessmentType: 'chapter_diagnostic',
        totalQuestions: 1,
        correctAnswers: 1,
        scorePercentage: 100,
        evaluations: [
          {
            questionId: 'q_1',
            isCorrect: true,
            userAnswer: Array.from({ length: 21 }, (_, i) => `ans_${i}`),
            correctAnswer: ['A'],
          },
        ],
      }

      const req = new NextRequest('http://localhost:3000/api/academic/assessment-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await assessmentAttemptPOST(req)
      expect(res.status).toBe(400)
    })

    it('rejects oversized payload exceeding ASSESSMENT_MAX_PAYLOAD_BYTES (512KB) with HTTP 413', async () => {
      const paddedPayload = {
        assessmentType: 'chapter_diagnostic',
        totalQuestions: 1,
        correctAnswers: 1,
        scorePercentage: 100,
        junk: 'x'.repeat(600 * 1024), // 600 KB
      }

      const req = new NextRequest('http://localhost:3000/api/academic/assessment-attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paddedPayload),
      })

      const res = await assessmentAttemptPOST(req)
      expect(res.status).toBe(413)
    })
  })

  describe('/api/analytics/funnel record bounds & body limit', () => {
    it('accepts legitimate analytics event', async () => {
      const payload = {
        eventName: 'plan_viewed',
        sessionId: 'sess_123',
        domain: 'assessment',
      }

      const req = new NextRequest('http://localhost:3000/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await funnelPOST(req)
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.success).toBe(true)
    })

    it('rejects metadata object exceeding 20 keys with HTTP 400', async () => {
      const oversizedMetadata: Record<string, string> = {}
      for (let i = 0; i < 21; i++) {
        oversizedMetadata[`key_${i}`] = `val_${i}`
      }

      const payload = {
        eventName: 'plan_viewed',
        sessionId: 'sess_123',
        metadata: oversizedMetadata,
      }

      const req = new NextRequest('http://localhost:3000/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await funnelPOST(req)
      expect(res.status).toBe(400)
    })

    it('rejects oversized payload exceeding ANALYTICS_MAX_PAYLOAD_BYTES (64KB) with HTTP 413', async () => {
      const payload = {
        eventName: 'landing_view',
        sessionId: 'sess_123',
        junk: 'z'.repeat(70 * 1024), // 70 KB
      }

      const req = new NextRequest('http://localhost:3000/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const res = await funnelPOST(req)
      expect(res.status).toBe(413)
    })
  })
})
