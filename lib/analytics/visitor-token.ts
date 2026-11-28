import type { NextRequest, NextResponse } from 'next/server'

export const VISITOR_SIG_COOKIE = 'tx_vid_sig'
const COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60
const TOKEN_TTL_SECONDS = 365 * 24 * 60 * 60

function getSigningSecret(): string | null {
  const configured =
    process.env.ANALYTICS_SIGNING_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    null

  if (configured && configured.length >= 16) {
    return configured
  }

  if (process.env.NODE_ENV === 'test') {
    return 'test-only-analytics-signing-secret-do-not-use-in-prod'
  }

  return null
}

async function computeHmacHex(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

export async function signVisitorId(anonymousVisitorId: string): Promise<string | null> {
  const secret = getSigningSecret()
  if (!secret) return null
  const issuedAtSec = Math.floor(Date.now() / 1000)
  const payload = `${anonymousVisitorId}.${issuedAtSec}`
  const sig = await computeHmacHex(payload, secret)
  return `${payload}.${sig}`
}

export async function verifyVisitorToken(
  token: string | undefined | null,
  expectedVisitorId: string
): Promise<boolean> {
  if (!token || !expectedVisitorId) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [vid, issuedAtRaw, providedSig] = parts
  if (vid !== expectedVisitorId) return false

  const issuedAtSec = Number(issuedAtRaw)
  if (!Number.isFinite(issuedAtSec)) return false
  const nowSec = Math.floor(Date.now() / 1000)
  if (issuedAtSec > nowSec + 300 || nowSec - issuedAtSec > TOKEN_TTL_SECONDS) {
    return false
  }

  const secret = getSigningSecret()
  if (!secret) return false

  const expectedSig = await computeHmacHex(`${vid}.${issuedAtRaw}`, secret)
  return timingSafeEqualStr(providedSig, expectedSig)
}

export function readVisitorTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(VISITOR_SIG_COOKIE)?.value ?? null
}

export function attachVisitorSignatureCookie(
  res: NextResponse,
  signedToken: string
): void {
  res.cookies.set({
    name: VISITOR_SIG_COOKIE,
    value: signedToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  })
}
