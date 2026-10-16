import crypto from 'crypto'
import { ECOSYSTEM_DOMAINS, getDomainRecord } from './registry'

const SECRET_SALT = process.env.ECOSYSTEM_REFERRAL_SECRET || 'talentxcel_eco_growth_secret_salt_2026'

export interface CrossBrandReferralParams {
  sourceBrand: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'
  destinationHost: string
  destinationPath?: string
  userIntent: 'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox'
  campaign?: string
  timestamp?: number
  extraParams?: Record<string, string>
}

export function generateSecureReferralUrl(params: CrossBrandReferralParams): string {
  const domain = getDomainRecord(params.destinationHost)
  const baseHost = domain ? domain.canonicalHostname : params.destinationHost
  const path = params.destinationPath ? (params.destinationPath.startsWith('/') ? params.destinationPath : `/${params.destinationPath}`) : ''

  const queryParams = new URLSearchParams()
  queryParams.set('utm_source', params.sourceBrand)
  queryParams.set('utm_medium', 'ecosystem_referral')
  queryParams.set('utm_campaign', params.campaign || 'ecosystem_growth')
  queryParams.set('ref_intent', params.userIntent)
  const ts = params.timestamp ? params.timestamp : Math.floor(Date.now() / 1000)
  queryParams.set('ref_ts', ts.toString())

  if (params.extraParams) {
    for (const [k, v] of Object.entries(params.extraParams)) {
      queryParams.set(k, v)
    }
  }

  // Compute HMAC signature over query string to ensure tamper-proof referral validation
  const signaturePayload = `${params.sourceBrand}:${baseHost}:${params.userIntent}:${queryParams.get('ref_ts')}`
  const signature = crypto.createHmac('sha256', SECRET_SALT).update(signaturePayload).digest('hex').slice(0, 16)
  queryParams.set('ref_sig', signature)

  return `https://${baseHost}${path}?${queryParams.toString()}`
}

export function verifyReferralSignature(
  sourceBrand: string,
  destinationHost: string,
  userIntent: string,
  timestampStr: string,
  providedSignature: string
): boolean {
  if (!sourceBrand || !destinationHost || !userIntent || !timestampStr || !providedSignature) {
    return false
  }

  // Reject referrals older than 7 days
  const ts = parseInt(timestampStr, 10)
  if (isNaN(ts) || Math.floor(Date.now() / 1000) - ts > 604800) {
    return false
  }

  const signaturePayload = `${sourceBrand}:${destinationHost}:${userIntent}:${timestampStr}`
  const expectedSig = crypto.createHmac('sha256', SECRET_SALT).update(signaturePayload).digest('hex').slice(0, 16)

  return crypto.timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSig))
}
