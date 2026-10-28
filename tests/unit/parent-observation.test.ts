import {
  submitParentObservation,
  getParentObservation,
  clearParentObservationsForTesting,
} from '../../lib/lms/parent-observation-service'
import { registerLifeSkillCertificate, verifyCertificate } from '../../lib/lms/certificate-service'

describe('Parent Observation Service (Parent-reported Home Practice)', () => {
  const TEST_CERT_ID = 'TX-LS-2026-C4-TEST001'
  const VALID_CONSENT_TOKEN = 'parent_consent_token_valid_for_testing_123'

  beforeEach(() => {
    clearParentObservationsForTesting()
    // Seed a completed digital lab certificate
    registerLifeSkillCertificate({
      certificateNumber: TEST_CERT_ID,
      learnerName: 'Aarav W.',
      programmeTitle: 'Class 4 Personal Independence: Smart Backpack Lab',
      issuedAt: '2026-10-28',
      verificationUrl: `https://talentxcel.net/verify/${TEST_CERT_ID}`,
      isRevoked: false,
      totalScore: 92,
      credentialStatus: 'digital_simulation_completed',
    })
  })

  it('records parent-reported observation and transitions credential status to parent_reported_practice', () => {
    const result = submitParentObservation({
      certificateId: TEST_CERT_ID,
      daysReported: 5,
      consentToken: VALID_CONSENT_TOKEN,
      notes: 'Aarav packed his school bag independently after dinner.',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.observation.daysReported).toBe(5)
      expect(result.updatedCertificate.credentialStatus).toBe('parent_reported_practice')

      // Verify certificate updated in registry
      const updated = verifyCertificate(TEST_CERT_ID)
      expect(updated?.credentialStatus).toBe('parent_reported_practice')
    }
  })

  it('allows parents to revise/correct days reported with revision count tracking', () => {
    // 1st submission: 4 days
    submitParentObservation({
      certificateId: TEST_CERT_ID,
      daysReported: 4,
      consentToken: VALID_CONSENT_TOKEN,
    })

    // Revision submission: 7 days
    const revised = submitParentObservation({
      certificateId: TEST_CERT_ID,
      daysReported: 7,
      consentToken: VALID_CONSENT_TOKEN,
      notes: 'Completed full week over weekend.',
    })

    expect(revised.success).toBe(true)
    if (revised.success) {
      expect(revised.observation.daysReported).toBe(7)
      expect(revised.observation.revisionCount).toBe(2)
    }

    const saved = getParentObservation(TEST_CERT_ID)
    expect(saved?.daysReported).toBe(7)
    expect(saved?.revisionCount).toBe(2)
  })

  it('rejects invalid days reported outside 1-7 range', () => {
    const res = submitParentObservation({
      certificateId: TEST_CERT_ID,
      daysReported: 10, // Invalid! Max 7 days in a school week
      consentToken: VALID_CONSENT_TOKEN,
    })

    expect(res.success).toBe(false)
    if (!res.success) {
      expect(res.error).toBe('DAYS_OUT_OF_RANGE')
    }
  })

  it('rejects submission for non-existent certificate', () => {
    const res = submitParentObservation({
      certificateId: 'NON_EXISTENT_CERT_ID',
      daysReported: 5,
      consentToken: VALID_CONSENT_TOKEN,
    })

    expect(res.success).toBe(false)
    if (!res.success) {
      expect(res.error).toBe('CERTIFICATE_NOT_FOUND')
    }
  })
})
