import crypto from 'crypto'
import { ECOSYSTEM_DOMAINS, getDomainRecord } from './registry'

const MIN_SECRET_LENGTH = 32
const DEFAULT_TTL_SECONDS = 604800 // 7 days
const MAX_FUTURE_SKEW_SECONDS = 300 // 5 minutes max clock skew

export interface CrossBrandReferralParams {
  sourceBrand: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'
  destinationHost: string
  destinationPath?: string
  userIntent: 'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox'
  campaign?: string
  timestamp?: number
  ttlSeconds?: number
  secretOverride?: string
  extraParams?: Record<string, string>
}

export type VerificationErrorCode =
  | 'MISSING_SECRET'
  | 'MISSING_PARAM'
  | 'UNKNOWN_HOST'
  | 'UNAPPROVED_HOST'
  | 'INVALID_PATH'
  | 'MALFORMED_SIG'
  | 'EXPIRED'
  | 'FUTURE_TIMESTAMP'
  | 'SIGNATURE_MISMATCH'

export interface VerificationResult {
  isValid: boolean
  errorCode?: VerificationErrorCode
  errorMessage?: string
  verifiedPayload?: {
    sourceBrand: string
    destinationHost: string
    destinationPath: string
    userIntent: string
    campaign: string
    timestamp: number
  }
}

/**
 * Fails closed if the secret is missing or insufficiently strong (< 32 chars).
 * Never uses a hardcoded fallback secret in production.
 */
export function getReferralSecret(failClosed: boolean = true, secretOverride?: string): string {
  const secret = secretOverride !== undefined ? secretOverride : process.env.ECOSYSTEM_REFERRAL_SECRET
  if (!secret || secret.trim().length < MIN_SECRET_LENGTH) {
    if (failClosed) {
      throw new Error(
        `Ecosystem Security Error: ECOSYSTEM_REFERRAL_SECRET is missing or too short (< ${MIN_SECRET_LENGTH} characters). Refusing to generate or verify signatures.`
      )
    }
    return ''
  }
  return secret.trim()
}

/**
 * Validates and normalizes destination path to prevent open redirects and path traversal.
 */
export function normalizeAndValidatePath(rawPath?: string): string {
  if (!rawPath || rawPath.trim() === '' || rawPath.trim() === '/') {
    return '/'
  }
  const trimmed = rawPath.trim()

  // Must begin with a single forward slash
  if (!trimmed.startsWith('/')) {
    throw new Error('Invalid destinationPath: must begin with a forward slash')
  }

  // Reject protocol-relative redirects (e.g. "//evil.com")
  if (trimmed.startsWith('//')) {
    throw new Error('Invalid destinationPath: protocol-relative paths are forbidden to prevent open redirects')
  }

  // Reject path traversal attempts
  if (trimmed.includes('..') || trimmed.includes('\\')) {
    throw new Error('Invalid destinationPath: path traversal is forbidden')
  }

  // Reject CRLF or carriage return injections
  if (/[\r\n\t]/.test(trimmed)) {
    throw new Error('Invalid destinationPath: control characters forbidden')
  }

  return trimmed
}

/**
 * Validates that destination host exists in the official ecosystem registry.
 */
export function validateDestinationHost(rawHost: string): string {
  if (!rawHost || typeof rawHost !== 'string') {
    throw new Error('Destination host is required')
  }

  const normalized = rawHost.trim().toLowerCase()
  const domain = getDomainRecord(normalized)

  if (!domain) {
    throw new Error(`Destination host '${normalized}' is not registered in the ecosystem domain registry`)
  }

  if (domain.healthStatus === 'warning') {
    throw new Error(`Destination host '${normalized}' has an unverified or unhealthy status`)
  }

  return domain.canonicalHostname || domain.hostname
}

/**
 * Constructs canonical string binding all security-relevant fields.
 */
export function buildCanonicalSigningString(
  sourceBrand: string,
  destinationHost: string,
  destinationPath: string,
  userIntent: string,
  campaign: string,
  timestampStr: string
): string {
  return `v2:${sourceBrand.trim().toLowerCase()}:${destinationHost.trim().toLowerCase()}:${destinationPath}:${userIntent.trim().toLowerCase()}:${campaign.trim().toLowerCase()}:${timestampStr}`
}

/**
 * Generates an HMAC-SHA256 signed referral URL.
 * Server-only: Fails closed if ECOSYSTEM_REFERRAL_SECRET is missing.
 */
export function generateSecureReferralUrl(params: CrossBrandReferralParams): string {
  const secret = getReferralSecret(true, params.secretOverride)

  const validatedHost = validateDestinationHost(params.destinationHost)
  const normalizedPath = normalizeAndValidatePath(params.destinationPath)
  const campaign = params.campaign ? params.campaign.trim() : 'ecosystem_growth'

  const ts = params.timestamp !== undefined ? params.timestamp : Math.floor(Date.now() / 1000)
  if (isNaN(ts) || ts <= 0) {
    throw new Error('Invalid timestamp parameter')
  }
  const timestampStr = ts.toString()

  const queryParams = new URLSearchParams()
  queryParams.set('utm_source', params.sourceBrand)
  queryParams.set('utm_medium', 'ecosystem_referral')
  queryParams.set('utm_campaign', campaign)
  queryParams.set('ref_intent', params.userIntent)
  queryParams.set('ref_ts', timestampStr)

  if (params.extraParams) {
    // Sort extra parameters for deterministic behavior
    const sortedKeys = Object.keys(params.extraParams).sort()
    for (const k of sortedKeys) {
      if (k.startsWith('ref_') || k.startsWith('utm_')) continue // Protect reserved params
      queryParams.set(k, params.extraParams[k])
    }
  }

  // Canonical signing payload binds source, destination host, path, intent, campaign, and timestamp
  const canonicalPayload = buildCanonicalSigningString(
    params.sourceBrand,
    validatedHost,
    normalizedPath,
    params.userIntent,
    campaign,
    timestampStr
  )

  // Full 64-character SHA-256 HMAC (256-bit security)
  const signature = crypto.createHmac('sha256', secret).update(canonicalPayload).digest('hex')
  queryParams.set('ref_sig', signature)

  const finalPath = normalizedPath === '/' ? '' : normalizedPath
  return `https://${validatedHost}${finalPath}?${queryParams.toString()}`
}

/**
 * Detailed verification function with strict checks on signature format,
 * future skew, expiration, and constant-time HMAC comparison.
 */
export function verifyReferralDetailed(
  sourceBrand: string,
  destinationHost: string,
  userIntent: string,
  timestampStr: string,
  providedSignature: string,
  destinationPath: string = '/',
  campaign: string = 'ecosystem_growth',
  ttlSeconds: number = DEFAULT_TTL_SECONDS,
  secretOverride?: string
): VerificationResult {
  const secret = getReferralSecret(false, secretOverride)
  if (!secret) {
    return {
      isValid: false,
      errorCode: 'MISSING_SECRET',
      errorMessage: 'Referral secret is not configured on the server; failing closed.',
    }
  }

  if (!sourceBrand || !destinationHost || !userIntent || !timestampStr || !providedSignature) {
    return {
      isValid: false,
      errorCode: 'MISSING_PARAM',
      errorMessage: 'Required referral verification parameters are missing.',
    }
  }

  // Strict 64-character hexadecimal format validation
  if (typeof providedSignature !== 'string' || !/^[0-9a-f]{64}$/i.test(providedSignature.trim())) {
    return {
      isValid: false,
      errorCode: 'MALFORMED_SIG',
      errorMessage: 'Provided signature does not match the required 64-character hexadecimal format.',
    }
  }

  // Validate destination host against approved registry
  let validatedHost: string
  try {
    validatedHost = validateDestinationHost(destinationHost)
  } catch (err: any) {
    return {
      isValid: false,
      errorCode: 'UNKNOWN_HOST',
      errorMessage: err.message,
    }
  }

  // Validate path
  let normalizedPath: string
  try {
    normalizedPath = normalizeAndValidatePath(destinationPath)
  } catch (err: any) {
    return {
      isValid: false,
      errorCode: 'INVALID_PATH',
      errorMessage: err.message,
    }
  }

  // Validate timestamp format
  if (!/^\d+$/.test(timestampStr)) {
    return {
      isValid: false,
      errorCode: 'EXPIRED',
      errorMessage: 'Timestamp must be an integer Unix epoch timestamp.',
    }
  }

  const ts = parseInt(timestampStr, 10)
  const now = Math.floor(Date.now() / 1000)

  // Future-skew check (reject timestamps > 5 minutes in the future)
  if (ts > now + MAX_FUTURE_SKEW_SECONDS) {
    return {
      isValid: false,
      errorCode: 'FUTURE_TIMESTAMP',
      errorMessage: 'Timestamp is in the future beyond acceptable clock skew.',
    }
  }

  // Expiration check
  if (now - ts > ttlSeconds) {
    return {
      isValid: false,
      errorCode: 'EXPIRED',
      errorMessage: `Referral token expired (older than ${ttlSeconds} seconds).`,
    }
  }

  // Reconstruct canonical signing string
  const canonicalPayload = buildCanonicalSigningString(
    sourceBrand,
    validatedHost,
    normalizedPath,
    userIntent,
    campaign,
    timestampStr
  )

  const expectedSig = crypto.createHmac('sha256', secret).update(canonicalPayload).digest('hex')

  const providedBuf = Buffer.from(providedSignature.toLowerCase().trim(), 'utf8')
  const expectedBuf = Buffer.from(expectedSig.toLowerCase(), 'utf8')

  if (providedBuf.length !== expectedBuf.length) {
    return {
      isValid: false,
      errorCode: 'SIGNATURE_MISMATCH',
      errorMessage: 'Signature length mismatch.',
    }
  }

  const isMatch = crypto.timingSafeEqual(providedBuf, expectedBuf)

  if (!isMatch) {
    return {
      isValid: false,
      errorCode: 'SIGNATURE_MISMATCH',
      errorMessage: 'Cryptographic signature mismatch.',
    }
  }

  return {
    isValid: true,
    verifiedPayload: {
      sourceBrand,
      destinationHost: validatedHost,
      destinationPath: normalizedPath,
      userIntent,
      campaign,
      timestamp: ts,
    },
  }
}

/**
 * Backward-compatible boolean verifier.
 */
export function verifyReferralSignature(
  sourceBrand: string,
  destinationHost: string,
  userIntent: string,
  timestampStr: string,
  providedSignature: string,
  destinationPath: string = '/',
  campaign: string = 'ecosystem_growth',
  ttlSeconds?: number,
  secretOverride?: string
): boolean {
  const result = verifyReferralDetailed(
    sourceBrand,
    destinationHost,
    userIntent,
    timestampStr,
    providedSignature,
    destinationPath,
    campaign,
    ttlSeconds,
    secretOverride
  )
  return result.isValid
}
