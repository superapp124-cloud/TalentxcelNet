import { generateCertificateNumber } from '@/lib/utils'

export interface CertificateRecord {
  certificateNumber: string
  learnerName: string
  programmeTitle: string
  issuedAt: string
  verificationUrl: string
  isRevoked: boolean
  totalScore?: number
  rubricBreakdown?: {
    timetableAccuracy: number
    weightBand: number
    placement: number
    reasoning: number
  }
  measuredWeightKg?: number
  credentialStatus?: 'digital_simulation_completed' | 'parent_reported_practice'
  signature?: string
}

// In-memory/deterministic certificate registry for verification
export const DEMO_CERTIFICATES: Record<string, CertificateRecord> = {
  'TXCERT-2026-DEMO01': {
    certificateNumber: 'TXCERT-2026-DEMO01',
    learnerName: 'Sample Graduate',
    programmeTitle: 'AI Development & Automation',
    issuedAt: '2026-10-15',
    verificationUrl: 'https://talentxcel.net/verify/TXCERT-2026-DEMO01',
    isRevoked: false,
  },
}

export function issueCertificate(learnerName: string, programmeTitle: string): CertificateRecord {
  const certificateNumber = generateCertificateNumber()
  const cert: CertificateRecord = {
    certificateNumber,
    learnerName,
    programmeTitle,
    issuedAt: new Date().toISOString().split('T')[0],
    verificationUrl: `https://talentxcel.net/verify/${certificateNumber}`,
    isRevoked: false,
  }
  DEMO_CERTIFICATES[certificateNumber] = cert
  return cert
}

export function verifyCertificate(certificateNumber: string): CertificateRecord | null {
  return DEMO_CERTIFICATES[certificateNumber] ?? null
}

export function registerLifeSkillCertificate(cert: CertificateRecord): void {
  DEMO_CERTIFICATES[cert.certificateNumber] = cert
}
