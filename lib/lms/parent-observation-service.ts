/**
 * TALENTXCEL PARENT OBSERVATION SERVICE
 * Manages "Parent-reported home practice" submissions and corrections,
 * maintaining strict separation between digital simulation and observed physical habit.
 */

import { verifyCertificate, registerLifeSkillCertificate, type CertificateRecord } from './certificate-service'
import { verifyParentConsentToken } from '@/lib/auth/parent-consent-service'

export interface ParentObservationRecord {
  certificateId: string
  daysReported: number // 1 to 7
  parentDeclarationDate: string
  parentEmailHash?: string
  lastModifiedAt: string
  revisionCount: number
  notes?: string
}

// In-memory ledger of parent observations
const PARENT_OBSERVATIONS = new Map<string, ParentObservationRecord>()

export interface SubmitObservationInput {
  certificateId: string
  daysReported: number
  consentToken: string
  notes?: string
}

export function submitParentObservation(input: SubmitObservationInput): {
  success: true
  updatedCertificate: CertificateRecord
  observation: ParentObservationRecord
} | {
  success: false
  error: string
} {
  // 1. Verify adult consent token
  const consent = verifyParentConsentToken(input.consentToken)
  if (!consent.valid) {
    return { success: false, error: consent.error || 'INVALID_CONSENT_TOKEN' }
  }

  // 2. Validate days reported
  if (!Number.isInteger(input.daysReported) || input.daysReported < 1 || input.daysReported > 7) {
    return { success: false, error: 'DAYS_OUT_OF_RANGE' }
  }

  // 3. Find certificate
  const certificate = verifyCertificate(input.certificateId)
  if (!certificate) {
    return { success: false, error: 'CERTIFICATE_NOT_FOUND' }
  }

  if (certificate.isRevoked) {
    return { success: false, error: 'CERTIFICATE_REVOKED' }
  }

  const existing = PARENT_OBSERVATIONS.get(input.certificateId)
  const nowStr = new Date().toISOString()
  const dateStr = nowStr.split('T')[0]

  const record: ParentObservationRecord = {
    certificateId: input.certificateId,
    daysReported: input.daysReported,
    parentDeclarationDate: dateStr,
    parentEmailHash: consent.parentEmailHash,
    lastModifiedAt: nowStr,
    revisionCount: existing ? existing.revisionCount + 1 : 1,
    notes: input.notes?.slice(0, 500),
  }

  PARENT_OBSERVATIONS.set(input.certificateId, record)

  // 4. Update certificate status to 'parent_reported_practice'
  const updatedCert: CertificateRecord = {
    ...certificate,
    credentialStatus: 'parent_reported_practice',
  }

  registerLifeSkillCertificate(updatedCert)

  return {
    success: true,
    updatedCertificate: updatedCert,
    observation: record,
  }
}

export function getParentObservation(certificateId: string): ParentObservationRecord | null {
  return PARENT_OBSERVATIONS.get(certificateId) ?? null
}

export function clearParentObservationsForTesting(): void {
  PARENT_OBSERVATIONS.clear()
}
