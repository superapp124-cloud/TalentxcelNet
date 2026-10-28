import { describe, it, expect } from 'vitest'
import {
  generateParentChallenge,
  verifyChallengeAndCreateToken,
  verifyParentConsentToken,
} from '../../lib/auth/parent-consent-service'

describe('Parent Consent Service (DPDPA 2023 Adult Gate)', () => {
  it('generates an arithmetic adult challenge with valid question text and ID', () => {
    const challenge = generateParentChallenge()
    expect(challenge.challengeId).toMatch(/^chal_\d+_[a-f0-9]{12}$/)
    expect(challenge.questionText).toMatch(/Adult Verification: What is \d+ × \d+\?/)
  })

  it('successfully verifies correct answer, requires affirmative consent, and issues signed consent token', () => {
    const challenge = generateParentChallenge()

    // Extract expected answer from questionText (e.g. "What is 15 × 4?")
    const match = challenge.questionText.match(/(\d+) × (\d+)/)
    expect(match).not.toBeNull()
    const num1 = parseInt(match![1], 10)
    const num2 = parseInt(match![2], 10)
    const correctAnswer = num1 * num2

    const result = verifyChallengeAndCreateToken({
      challengeId: challenge.challengeId,
      answer: correctAnswer,
      affirmativeConsent: true,
      parentEmail: 'parent.guardian@example.com',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.consentToken).toBeDefined()
      expect(result.consentToken).toContain('.') // JWT/HMAC token format

      // Verify the signed token
      const verified = verifyParentConsentToken(result.consentToken)
      expect(verified.valid).toBe(true)
      expect(verified.parentEmailHash).toBeDefined()
    }
  })

  it('rejects incorrect arithmetic answers', () => {
    const challenge = generateParentChallenge()

    const result = verifyChallengeAndCreateToken({
      challengeId: challenge.challengeId,
      answer: 999999, // definitely wrong
      affirmativeConsent: true,
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('INCORRECT_ANSWER')
    }
  })

  it('rejects correct answer when affirmative consent checkbox is not checked', () => {
    const challenge = generateParentChallenge()
    const match = challenge.questionText.match(/(\d+) × (\d+)/)
    const correctAnswer = parseInt(match![1], 10) * parseInt(match![2], 10)

    const result = verifyChallengeAndCreateToken({
      challengeId: challenge.challengeId,
      answer: correctAnswer,
      affirmativeConsent: false, // Unchecked!
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('AFFIRMATIVE_CONSENT_REQUIRED')
    }
  })

  it('detects tampered consent token signature', () => {
    const challenge = generateParentChallenge()
    const match = challenge.questionText.match(/(\d+) × (\d+)/)
    const correctAnswer = parseInt(match![1], 10) * parseInt(match![2], 10)

    const result = verifyChallengeAndCreateToken({
      challengeId: challenge.challengeId,
      answer: correctAnswer,
      affirmativeConsent: true,
    })

    if (result.success) {
      const parts = result.consentToken.split('.')
      const tamperedToken = `${parts[0]}.invalid_tampered_signature`
      const verified = verifyParentConsentToken(tamperedToken)
      expect(verified.valid).toBe(false)
      expect(verified.error).toBe('INVALID_SIGNATURE')
    }
  })
})
