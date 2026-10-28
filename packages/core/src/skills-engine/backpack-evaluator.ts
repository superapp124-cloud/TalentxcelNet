/**
 * TALENTXCEL SMART BACKPACK LAB - PURE EVALUATION & SCORING ENGINE
 * Module: mod_c4_m01_s1 (Class 4 Personal Independence)
 * 
 * Strict deterministic rubric implementation:
 * - Timetable Precision: 40 points
 * - Weight Awareness & Ergonomics: 35 points (Weight Band: 20 pts, Placement: 15 pts)
 * - Socratic Reasoning & Reflection: 25 points
 * Total: 100 points
 */

import { createHmac } from 'crypto'

export const BACKPACK_TARE_WEIGHT_KG = 0.50

export const ESSENTIAL_BACKPACK_ITEMS = [
  'math_set',
  'evs_set',
  'eng_reader',
  'art_pad',
  'pencil_box',
  'water_bottle',
  'lunch_box',
] as const

export const UNNEEDED_BACKPACK_ITEMS = [
  'comic_book',
  'encyclopedia',
  'toy_robot',
] as const

export const ITEM_WEIGHTS: Record<string, number> = {
  math_set: 0.70,      // Math textbook & notebook
  evs_set: 0.60,       // EVS textbook & notebook
  eng_reader: 0.40,    // English reader
  art_pad: 0.35,       // Art sketch pad & colours
  pencil_box: 0.25,    // Sharpened pencil box & scale
  water_bottle: 0.55,  // Clean filled water bottle (500ml)
  lunch_box: 0.45,     // Packed healthy lunch box
  comic_book: 0.35,    // Thick comic book (unneeded)
  encyclopedia: 1.40,  // Heavy encyclopaedia (excess weight)
  toy_robot: 0.50,     // Plastic toy figure (distraction)
}

export type EssentialItemId = typeof ESSENTIAL_BACKPACK_ITEMS[number]
export type UnneededItemId = typeof UNNEEDED_BACKPACK_ITEMS[number]
export type CompartmentLocation = 'back' | 'middle' | 'front'

export interface BackpackEvaluationInput {
  packedItemIds: string[]
  itemPlacements: Record<string, CompartmentLocation>
  answers: {
    placementOptionId?: string
    routineOptionId?: string
    placementAttempts: number
    routineAttempts: number
  }
  learnerDisplayName?: string
  parentConsentToken?: string
}

export interface RubricResult {
  timetableAccuracy: number    // 0-40
  weightBand: number           // 0-20
  placement: number            // 0-15
  reasoning: number            // 0-25
  totalScore: number           // 0-100
  measuredWeightKg: number
  isOverloaded: boolean
  isExemplary: boolean
  status: 'completed' | 'in_progress'
  breakdownNotes: string[]
}

export interface CanonicalCertificatePayload {
  certificateId: string
  learnerDisplayName: string
  assessmentVersion: '1.0.0'
  issuedAt: string
  credentialStatus: 'digital_simulation_completed' | 'parent_reported_practice'
  totalScore: number
  rubricBreakdown: {
    timetableAccuracy: number
    weightBand: number
    placement: number
    reasoning: number
  }
  measuredWeightKg: number
}

export class IncompleteAttemptError extends Error {
  code: string
  details?: Record<string, unknown>

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'IncompleteAttemptError'
    this.code = code
    this.details = details
  }
}

/**
 * Completion Gate: Enforces the 4 non-negotiable invariants before
 * an attempt can be certified or awarded a final evaluated score.
 */
export function validateAndGateAttempt(submission: BackpackEvaluationInput): { valid: true } {
  // Invariant 1: Non-empty packing
  if (!submission.packedItemIds || submission.packedItemIds.length === 0) {
    throw new IncompleteAttemptError(
      'EMPTY_ATTEMPT',
      'Cannot certify an empty attempt. At least one item must be packed.'
    )
  }

  // Invariant 2: Mandatory reflection questions completed
  if (!submission.answers || !submission.answers.placementOptionId || !submission.answers.routineOptionId) {
    throw new IncompleteAttemptError(
      'INCOMPLETE_REFLECTION',
      'Both Socratic reflection questions must be answered to complete the lab.'
    )
  }

  // Invariant 3: Question attempt bounds (must be between 1 and 2 attempts)
  if (
    submission.answers.placementAttempts < 1 ||
    submission.answers.placementAttempts > 2 ||
    submission.answers.routineAttempts < 1 ||
    submission.answers.routineAttempts > 2
  ) {
    throw new IncompleteAttemptError(
      'INVALID_ATTEMPT_BOUNDS',
      'Question attempt counts must be between 1 and 2.'
    )
  }

  // Invariant 4: If parentConsentToken is provided, verify basic token shape
  if (submission.parentConsentToken !== undefined) {
    if (typeof submission.parentConsentToken !== 'string' || submission.parentConsentToken.length < 10) {
      throw new IncompleteAttemptError(
        'INVALID_CONSENT_TOKEN',
        'Parental consent token is malformed.'
      )
    }
  }

  return { valid: true }
}

/**
 * Pure Deterministic Scoring Engine for Class 4 Smart Backpack Lab
 * Accurately scores:
 * 1. Timetable Precision (40 pts)
 * 2. Weight Awareness & Placement (35 pts: 20 pts weight band + 15 pts placement)
 * 3. Socratic Reasoning & Reflection (25 pts)
 */
export function evaluateBackpackAttempt(attempt: BackpackEvaluationInput): RubricResult {
  const breakdownNotes: string[] = []

  // Clean and deduplicate packed item IDs
  const packedSet = new Set(attempt.packedItemIds || [])
  const packedItems = Array.from(packedSet)

  // --------------------------------------------------------------------------
  // DIMENSION 1: TIMETABLE PRECISION (40 Points)
  // --------------------------------------------------------------------------
  let timetableScore = 40
  const unneededPacked = packedItems.filter((id) => (UNNEEDED_BACKPACK_ITEMS as readonly string[]).includes(id))

  // Indiscriminate Packing Guard: packing >= 3 unneeded items or all 10 items yields 0
  if (unneededPacked.length >= 3 || packedItems.length >= 10) {
    timetableScore = 0
    breakdownNotes.push('Indiscriminate packing guard triggered: 0 timetable points awarded.')
  } else {
    for (const item of ESSENTIAL_BACKPACK_ITEMS) {
      if (!packedSet.has(item)) {
        if (item === 'math_set' || item === 'evs_set' || item === 'eng_reader' || item === 'art_pad') {
          timetableScore -= 8
          breakdownNotes.push(`Missing essential academic subject: ${item} (-8 pts).`)
        } else if (item === 'pencil_box') {
          timetableScore -= 4
          breakdownNotes.push(`Missing pencil box & geometry scale (-4 pts).`)
        } else if (item === 'water_bottle' || item === 'lunch_box') {
          timetableScore -= 2
          breakdownNotes.push(`Missing daily wellbeing item: ${item} (-2 pts).`)
        }
      }
    }

    for (const unneeded of unneededPacked) {
      timetableScore -= 8
      breakdownNotes.push(`Packed non-timetable item: ${unneeded} (-8 pts).`)
    }

    timetableScore = Math.max(0, timetableScore)
  }

  // --------------------------------------------------------------------------
  // DIMENSION 2: WEIGHT AWARENESS & ERGONOMICS (35 Points)
  // --------------------------------------------------------------------------
  const itemWeightSum = packedItems.reduce((acc, id) => acc + (ITEM_WEIGHTS[id] || 0), 0)
  const totalWeight = Number((BACKPACK_TARE_WEIGHT_KG + itemWeightSum).toFixed(2))

  // Sub-dimension 2A: Weight Band (20 Points)
  let weightBandScore = 0
  const isOverloaded = totalWeight > 4.30

  if (totalWeight <= 3.80) {
    weightBandScore = 20
    breakdownNotes.push(`Ideal Weight Zone (${totalWeight} kg <= 3.80 kg): Full 20 pts.`)
  } else if (totalWeight <= 4.30) {
    weightBandScore = 10
    breakdownNotes.push(`Caution Weight Zone (${totalWeight} kg <= 4.30 kg): 10 pts.`)
  } else {
    weightBandScore = 0
    breakdownNotes.push(`Overloaded Weight Zone (${totalWeight} kg > 4.30 kg): 0 pts.`)
  }

  // Sub-dimension 2B: Ergonomic Placement (15 Points)
  // Physical Presence Rule: You can only place items that were ACTUALLY packed!
  let placementScore = 0
  if (!isOverloaded) {
    const mathInBack = packedSet.has('math_set') && attempt.itemPlacements?.['math_set'] === 'back'
    const evsInBack = packedSet.has('evs_set') && attempt.itemPlacements?.['evs_set'] === 'back'

    if (mathInBack) {
      placementScore += 8
      breakdownNotes.push('Math set placed against back panel (+8 pts).')
    }
    if (evsInBack) {
      placementScore += 7
      breakdownNotes.push('EVS set placed against back panel (+7 pts).')
    }
  } else {
    breakdownNotes.push('Overloaded bag (> 4.30 kg) invalidates ergonomic placement bonus (0 pts).')
  }

  // --------------------------------------------------------------------------
  // DIMENSION 3: SOCRATIC REASONING & REFLECTION (25 Points)
  // --------------------------------------------------------------------------
  let reasoningScore = 0

  // Question 1: Backpack Placement Question (Option 'opt_back' is correct)
  if (attempt.answers?.placementOptionId === 'opt_back') {
    if (attempt.answers.placementAttempts === 1) {
      reasoningScore += 15
      breakdownNotes.push('Placement question answered correctly on 1st attempt (+15 pts).')
    } else if (attempt.answers.placementAttempts === 2) {
      reasoningScore += 8
      breakdownNotes.push('Placement question answered correctly on 2nd attempt (+8 pts).')
    }
  }

  // Question 2: Evening Routine Question (Option 'opt_evening' is correct)
  if (attempt.answers?.routineOptionId === 'opt_evening') {
    if (attempt.answers.routineAttempts === 1) {
      reasoningScore += 10
      breakdownNotes.push('Packing routine question answered correctly on 1st attempt (+10 pts).')
    } else if (attempt.answers.routineAttempts === 2) {
      reasoningScore += 5
      breakdownNotes.push('Packing routine question answered correctly on 2nd attempt (+5 pts).')
    }
  }

  const totalScore = timetableScore + weightBandScore + placementScore + reasoningScore
  const isExemplary = totalScore >= 95

  return {
    timetableAccuracy: timetableScore,
    weightBand: weightBandScore,
    placement: placementScore,
    reasoning: reasoningScore,
    totalScore,
    measuredWeightKg: totalWeight,
    isOverloaded,
    isExemplary,
    status: 'completed',
    breakdownNotes,
  }
}

/**
 * Canonical Payload Signing for Tamper-Evident Credentials
 */
export function signCertificatePayload(payload: CanonicalCertificatePayload, secret: string): string {
  const canonicalString = JSON.stringify({
    certificateId: payload.certificateId,
    learnerDisplayName: payload.learnerDisplayName,
    assessmentVersion: payload.assessmentVersion,
    issuedAt: payload.issuedAt,
    credentialStatus: payload.credentialStatus,
    totalScore: payload.totalScore,
    rubricBreakdown: {
      timetableAccuracy: payload.rubricBreakdown.timetableAccuracy,
      weightBand: payload.rubricBreakdown.weightBand,
      placement: payload.rubricBreakdown.placement,
      reasoning: payload.rubricBreakdown.reasoning,
    },
    measuredWeightKg: payload.measuredWeightKg,
  })

  return createHmac('sha256', secret).update(canonicalString).digest('hex')
}

/**
 * Verify HMAC Signature Against Canonical Payload
 */
export function verifyCertificateSignature(
  payload: CanonicalCertificatePayload,
  signature: string,
  secret: string
): boolean {
  const expected = signCertificatePayload(payload, secret)
  return expected === signature
}
