import { describe, it, expect } from 'vitest'
import {
  evaluateBackpackAttempt,
  validateAndGateAttempt,
  signCertificatePayload,
  verifyCertificateSignature,
  IncompleteAttemptError,
  type BackpackEvaluationInput,
  type CanonicalCertificatePayload,
} from './backpack-evaluator'

describe('Smart Backpack Lab Evaluator & Completion Gate (mod_c4_m01_s1)', () => {
  // --------------------------------------------------------------------------
  // SECTION 1: THE 10 FORMAL RECONCILED TEST CASES
  // --------------------------------------------------------------------------
  describe('Reconciled Test Matrix (TC-01 through TC-10)', () => {
    it('TC-01: Perfect pack (All 7 essentials, 0 unneeded, heavy in back, both Qs 1st try) -> 100/100', () => {
      const input: BackpackEvaluationInput = {
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
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(40)
      expect(result.weightBand).toBe(20)
      expect(result.placement).toBe(15)
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(100)
      expect(result.measuredWeightKg).toBe(3.80)
      expect(result.isOverloaded).toBe(false)
      expect(result.isExemplary).toBe(true)
      expect(result.status).toBe('completed')
    })

    it('TC-02: Add encyclopaedia (Overloaded > 4.30 kg invalidates placement) -> 57/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box', 'encyclopedia'],
        itemPlacements: {
          math_set: 'back',
          evs_set: 'back',
          encyclopedia: 'back',
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(32) // 40 - 8 (unneeded encyclopedia)
      expect(result.weightBand).toBe(0)        // 5.20 kg > 4.30 kg -> 0 pts
      expect(result.placement).toBe(0)         // Overloaded invalidates placement -> 0 pts
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(57)
      expect(result.measuredWeightKg).toBe(5.20)
      expect(result.isOverloaded).toBe(true)
      expect(result.isExemplary).toBe(false)
    })

    it('TC-03: Add comic book (Caution zone 4.15 kg, placement preserved) -> 82/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box', 'comic_book'],
        itemPlacements: {
          math_set: 'back',
          evs_set: 'back',
          comic_book: 'front',
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(32) // 40 - 8 (unneeded comic)
      expect(result.weightBand).toBe(10)        // 4.15 kg is in Caution Zone (3.81 - 4.30 kg)
      expect(result.placement).toBe(15)         // Not overloaded (<= 4.30 kg) and heavy in back
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(82)
      expect(result.measuredWeightKg).toBe(4.15)
      expect(result.isOverloaded).toBe(false)
    })

    it('TC-04: Omit EVS set (Physical presence rule: missing item gets 0 placement) -> 85/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box'], // Missing evs_set
        itemPlacements: {
          math_set: 'back',
          // evs_set not placed because not packed
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(32) // 40 - 8 (missing EVS book)
      expect(result.weightBand).toBe(20)        // 3.80 - 0.60 = 3.20 kg <= 3.80 kg -> Ideal
      expect(result.placement).toBe(8)          // Math in back (+8), EVS missing (0) -> 8 pts
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(85)
      expect(result.measuredWeightKg).toBe(3.20)
    })

    it('TC-05: Omit water & lunch (-2 each for wellbeing items) -> 96/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box'], // Missing water & lunch
        itemPlacements: {
          math_set: 'back',
          evs_set: 'back',
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(36) // 40 - 2 - 2 = 36
      expect(result.weightBand).toBe(20)        // 3.80 - 1.00 = 2.80 kg <= 3.80 kg
      expect(result.placement).toBe(15)
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(96)
      expect(result.measuredWeightKg).toBe(2.80)
      expect(result.isExemplary).toBe(true)
    })

    it('TC-06: Heavy books placed in FRONT pocket (0 placement points) -> 85/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box'],
        itemPlacements: {
          math_set: 'front', // Misplaced in front pocket!
          evs_set: 'front',  // Misplaced in front pocket!
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(40)
      expect(result.weightBand).toBe(20)
      expect(result.placement).toBe(0)          // Failed ergonomic spine placement
      expect(result.reasoning).toBe(25)
      expect(result.totalScore).toBe(85)
      expect(result.measuredWeightKg).toBe(3.80)
    })

    it('TC-07: Both questions correct on second attempt (8 + 5 = 13 reasoning) -> 88/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box'],
        itemPlacements: {
          math_set: 'back',
          evs_set: 'back',
        },
        answers: {
          placementOptionId: 'opt_back',
          routineOptionId: 'opt_evening',
          placementAttempts: 2, // 2nd attempt -> 8 pts
          routineAttempts: 2,   // 2nd attempt -> 5 pts
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(40)
      expect(result.weightBand).toBe(20)
      expect(result.placement).toBe(15)
      expect(result.reasoning).toBe(13)         // 8 + 5 = 13 pts
      expect(result.totalScore).toBe(88)
      expect(result.measuredWeightKg).toBe(3.80)
    })

    it('TC-08: All 10 items packed, questions wrong (Indiscriminate packing guard) -> 0/100', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: [
          'math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box',
          'water_bottle', 'lunch_box', 'comic_book', 'encyclopedia', 'toy_robot',
        ],
        itemPlacements: {
          math_set: 'front',
          evs_set: 'middle',
        },
        answers: {
          placementOptionId: 'opt_front', // Wrong
          routineOptionId: 'opt_morning', // Wrong
          placementAttempts: 2,
          routineAttempts: 2,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(0) // Indiscriminate guard triggered
      expect(result.weightBand).toBe(0)        // 6.05 kg > 4.30 kg
      expect(result.placement).toBe(0)         // Overloaded invalidates placement
      expect(result.reasoning).toBe(0)         // Both wrong
      expect(result.totalScore).toBe(0)
      expect(result.measuredWeightKg).toBe(6.05)
      expect(result.isOverloaded).toBe(true)
    })

    it('TC-09: Empty attempt (Zero baseline)', () => {
      const input: BackpackEvaluationInput = {
        packedItemIds: [],
        itemPlacements: {},
        answers: {
          placementAttempts: 1,
          routineAttempts: 1,
        },
      }

      const result = evaluateBackpackAttempt(input)
      expect(result.timetableAccuracy).toBe(0)
      expect(result.weightBand).toBe(20) // Only tare weight (0.50 kg)
      expect(result.placement).toBe(0)
      expect(result.reasoning).toBe(0)
      expect(result.totalScore).toBe(20)
      expect(result.measuredWeightKg).toBe(0.50)

      // Verified: Completion gate strictly denies certification for empty attempts!
      expect(() => validateAndGateAttempt(input)).toThrow(IncompleteAttemptError)
    })

    it('TC-10: Incomplete attempt (Blocked by Server Completion Gate, cannot earn credential)', () => {
      const incompleteInput: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'pencil_box', 'water_bottle'],
        itemPlacements: { math_set: 'back' },
        answers: {
          placementOptionId: undefined, // Not answered yet!
          routineOptionId: undefined,   // Not answered yet!
          placementAttempts: 0,
          routineAttempts: 0,
        },
      }

      expect(() => validateAndGateAttempt(incompleteInput)).toThrowError(
        /Both Socratic reflection questions must be answered/
      )
    })
  })

  // --------------------------------------------------------------------------
  // SECTION 2: WEIGHT THRESHOLD BOUNDARY TESTS
  // --------------------------------------------------------------------------
  describe('Weight Band Cutoff Boundaries', () => {
    it('awards 20 pts for exactly 3.80 kg, but 10 pts for 3.81 kg', () => {
      // 3.80 kg pack
      const pack380: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box'],
        itemPlacements: { math_set: 'back', evs_set: 'back' },
        answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
      }
      const res380 = evaluateBackpackAttempt(pack380)
      expect(res380.measuredWeightKg).toBe(3.80)
      expect(res380.weightBand).toBe(20)

      // Over 3.80 kg (e.g. 4.15 kg with comic book)
      const packOver: BackpackEvaluationInput = {
        ...pack380,
        packedItemIds: [...pack380.packedItemIds, 'comic_book'],
      }
      const resOver = evaluateBackpackAttempt(packOver)
      expect(resOver.measuredWeightKg).toBe(4.15)
      expect(resOver.weightBand).toBe(10)
    })

    it('disqualifies placement when weight exceeds 4.30 kg', () => {
      // Pack that equals 5.20 kg (with encyclopedia)
      const heavyPack: BackpackEvaluationInput = {
        packedItemIds: ['math_set', 'evs_set', 'eng_reader', 'art_pad', 'pencil_box', 'water_bottle', 'lunch_box', 'encyclopedia'],
        itemPlacements: { math_set: 'back', evs_set: 'back' },
        answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
      }
      const res = evaluateBackpackAttempt(heavyPack)
      expect(res.measuredWeightKg).toBe(5.20)
      expect(res.isOverloaded).toBe(true)
      expect(res.placement).toBe(0) // Overload invalidation enforced
    })
  })

  // --------------------------------------------------------------------------
  // SECTION 3: SERVER COMPLETION GATE INVARIANT TESTS
  // --------------------------------------------------------------------------
  describe('Server-Side Completion Gate Invariants', () => {
    it('Invariant 1: Rejects empty packing array', () => {
      expect(() =>
        validateAndGateAttempt({
          packedItemIds: [],
          itemPlacements: {},
          answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
        })
      ).toThrowError(/At least one item must be packed/)
    })

    it('Invariant 2: Rejects missing placement question', () => {
      expect(() =>
        validateAndGateAttempt({
          packedItemIds: ['math_set'],
          itemPlacements: { math_set: 'back' },
          answers: { routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
        })
      ).toThrowError(/Both Socratic reflection questions must be answered/)
    })

    it('Invariant 3: Rejects invalid attempt bounds (< 1 or > 2)', () => {
      expect(() =>
        validateAndGateAttempt({
          packedItemIds: ['math_set'],
          itemPlacements: { math_set: 'back' },
          answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 0, routineAttempts: 1 },
        })
      ).toThrowError(/Question attempt counts must be between 1 and 2/)

      expect(() =>
        validateAndGateAttempt({
          packedItemIds: ['math_set'],
          itemPlacements: { math_set: 'back' },
          answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 3, routineAttempts: 1 },
        })
      ).toThrowError(/Question attempt counts must be between 1 and 2/)
    })

    it('Invariant 4: Rejects malformed parental consent token', () => {
      expect(() =>
        validateAndGateAttempt({
          packedItemIds: ['math_set'],
          itemPlacements: { math_set: 'back' },
          answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
          parentConsentToken: 'short',
        })
      ).toThrowError(/Parental consent token is malformed/)
    })

    it('Passes validation when all completion invariants are satisfied', () => {
      const valid = validateAndGateAttempt({
        packedItemIds: ['math_set'],
        itemPlacements: { math_set: 'back' },
        answers: { placementOptionId: 'opt_back', routineOptionId: 'opt_evening', placementAttempts: 1, routineAttempts: 1 },
        parentConsentToken: 'parent_consent_valid_token_xyz_123',
      })
      expect(valid.valid).toBe(true)
    })
  })

  // --------------------------------------------------------------------------
  // SECTION 4: HMAC CRYPTOGRAPHIC SIGNING & VERIFICATION TESTS
  // --------------------------------------------------------------------------
  describe('Tamper-Evident HMAC Certificate Signing', () => {
    const SECRET = 'test_secret_key_talentxcel_2026'

    const samplePayload: CanonicalCertificatePayload = {
      certificateId: 'TX-LS-2026-C4-7K9P4X2M',
      learnerDisplayName: 'Aarav W.',
      assessmentVersion: '1.0.0',
      issuedAt: '2026-10-28T14:00:00Z',
      credentialStatus: 'digital_simulation_completed',
      totalScore: 85,
      rubricBreakdown: {
        timetableAccuracy: 32,
        weightBand: 20,
        placement: 8,
        reasoning: 25,
      },
      measuredWeightKg: 3.20,
    }

    it('successfully signs and verifies a valid canonical certificate payload', () => {
      const signature = signCertificatePayload(samplePayload, SECRET)
      expect(signature).toHaveLength(64) // SHA-256 hex length

      const isValid = verifyCertificateSignature(samplePayload, signature, SECRET)
      expect(isValid).toBe(true)
    })

    it('fails verification if secret is incorrect', () => {
      const signature = signCertificatePayload(samplePayload, SECRET)
      const isValid = verifyCertificateSignature(samplePayload, signature, 'wrong_secret')
      expect(isValid).toBe(false)
    })

    it('fails verification if total score has been tampered with', () => {
      const signature = signCertificatePayload(samplePayload, SECRET)
      const tamperedPayload = { ...samplePayload, totalScore: 100 }
      const isValid = verifyCertificateSignature(tamperedPayload, signature, SECRET)
      expect(isValid).toBe(false)
    })

    it('fails verification if learner name has been tampered with', () => {
      const signature = signCertificatePayload(samplePayload, SECRET)
      const tamperedPayload = { ...samplePayload, learnerDisplayName: 'Imposter Student' }
      const isValid = verifyCertificateSignature(tamperedPayload, signature, SECRET)
      expect(isValid).toBe(false)
    })

    it('fails verification if rubric breakdown is altered', () => {
      const signature = signCertificatePayload(samplePayload, SECRET)
      const tamperedPayload = {
        ...samplePayload,
        rubricBreakdown: { ...samplePayload.rubricBreakdown, timetableAccuracy: 40 },
      }
      const isValid = verifyCertificateSignature(tamperedPayload, signature, SECRET)
      expect(isValid).toBe(false)
    })
  })
})
