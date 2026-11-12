import { beforeEach, describe, expect, it } from 'vitest'
import { getCertificateSigningSecret, POST } from '@/app/api/skills/backpack/evaluate/route'

describe('certificate signing configuration', () => {
  const original = process.env.CERTIFICATE_SIGNING_SECRET

  beforeEach(() => {
    if (original === undefined) delete process.env.CERTIFICATE_SIGNING_SECRET
    else process.env.CERTIFICATE_SIGNING_SECRET = original
  })

  it('fails closed when the signing secret is missing', () => {
    delete process.env.CERTIFICATE_SIGNING_SECRET
    expect(getCertificateSigningSecret()).toBeNull()
  })

  it('does not issue a certificate when signing configuration is unavailable', async () => {
    delete process.env.CERTIFICATE_SIGNING_SECRET
    const response = await POST(new Request('http://localhost/api/skills/backpack/evaluate', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'content-type': 'application/json' },
    }) as never)
    expect(response.status).toBe(503)
    expect((await response.json()).error).toBe('CERTIFICATE_SIGNING_UNAVAILABLE')
  })

  it('rejects a weak signing secret', () => {
    process.env.CERTIFICATE_SIGNING_SECRET = 'short-development-secret'
    expect(getCertificateSigningSecret()).toBeNull()
  })

  it('accepts a sufficiently strong configured secret without exposing it', () => {
    const secret = 'staging-only-secret-that-is-at-least-32-chars'
    process.env.CERTIFICATE_SIGNING_SECRET = secret
    expect(getCertificateSigningSecret()).toBe(secret)
  })
})
