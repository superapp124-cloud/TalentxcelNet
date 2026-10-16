import { describe, it, expect } from 'vitest'
import {
  ECOSYSTEM_DOMAINS,
  ECOSYSTEM_BRANDS,
  getDomainRecord,
  getBrandDomains,
} from '@/lib/ecosystem/registry'
import {
  generateSecureReferralUrl,
  verifyReferralSignature,
} from '@/lib/ecosystem/referral-engine'
import {
  ECOSYSTEM_KNOWLEDGE_INDEX,
  searchKnowledgeBase,
  getKnowledgeItemById,
  getKnowledgeByIntent,
} from '@/lib/ecosystem/knowledge-base'
import { routeEcosystemIntent } from '@/lib/ai/ecosystem-router'

describe('Ecosystem Domain Registry', () => {
  it('registers all 30 monitored domains across the 4 core brands', () => {
    expect(ECOSYSTEM_DOMAINS.length).toBe(30)
  })

  it('contains valid definitions for the 4 primary brands', () => {
    const brandKeys = Object.keys(ECOSYSTEM_BRANDS)
    expect(brandKeys).toContain('talentxcel')
    expect(brandKeys).toContain('talentxcel-academy')
    expect(brandKeys).toContain('chatr')
    expect(brandKeys).toContain('nuty-tales')
  })

  it('correctly resolves domain records by hostname and canonical hostname', () => {
    const resume = getDomainRecord('resume.talentxcel.in')
    expect(resume).toBeDefined()
    expect(resume?.brandSlug).toBe('talentxcel')
    expect(resume?.canonicalHostname).toBe('resume.talentxcel.in')

    const academy = getDomainRecord('academy.talentxcel.net')
    expect(academy).toBeDefined()
    expect(academy?.brandSlug).toBe('talentxcel-academy')

    const ai = getDomainRecord('ai.talentxcel.net')
    expect(ai).toBeDefined()
    expect(ai?.brandSlug).toBe('talentxcel-academy')
    expect(ai?.canonicalHostname).toBe('ai.talentxcel.net')
    expect(ai?.integrationStatus).toBe('active')

    const unknown = getDomainRecord('random-unregistered-site.com')
    expect(unknown).toBeUndefined()
  })

  it('filters domains accurately by brand slug', () => {
    const txDomains = getBrandDomains('talentxcel')
    expect(txDomains.length).toBe(13)

    const nutyDomains = getBrandDomains('nuty-tales')
    expect(nutyDomains.length).toBe(9)

    const chatrDomains = getBrandDomains('chatr')
    expect(chatrDomains.length).toBe(4)

    const academyDomains = getBrandDomains('talentxcel-academy')
    expect(academyDomains.length).toBe(4)
  })
})

describe('HMAC Referral Engine & Cryptographic Integrity', () => {
  it('generates a secure referral URL with HMAC signature and standard UTM tags', () => {
    const urlString = generateSecureReferralUrl({
      sourceBrand: 'talentxcel-academy',
      destinationHost: 'resume.talentxcel.in',
      destinationPath: '/builder',
      userIntent: 'resume_analysis',
      campaign: 'unit_test',
    })

    const url = new URL(urlString)
    expect(url.hostname).toBe('resume.talentxcel.in')
    expect(url.pathname).toBe('/builder')
    expect(url.searchParams.get('utm_source')).toBe('talentxcel-academy')
    expect(url.searchParams.get('utm_medium')).toBe('ecosystem_referral')
    expect(url.searchParams.get('utm_campaign')).toBe('unit_test')
    expect(url.searchParams.get('ref_intent')).toBe('resume_analysis')
    expect(url.searchParams.get('ref_ts')).toBeDefined()
    expect(url.searchParams.get('ref_sig')).toHaveLength(64)
  })

  it('successfully verifies a legitimate HMAC referral signature', () => {
    const urlString = generateSecureReferralUrl({
      sourceBrand: 'talentxcel-academy',
      destinationHost: 'salary.talentxcel.in',
      userIntent: 'career_pathway',
      campaign: 'test_verify',
    })

    const url = new URL(urlString)
    const sourceBrand = url.searchParams.get('utm_source')!
    const destHost = url.hostname
    const intent = url.searchParams.get('ref_intent')!
    const ts = url.searchParams.get('ref_ts')!
    const sig = url.searchParams.get('ref_sig')!
    const campaign = url.searchParams.get('utm_campaign') || 'ecosystem_growth'

    const isValid = verifyReferralSignature(sourceBrand, destHost, intent, ts, sig, url.pathname || '/', campaign)
    expect(isValid).toBe(true)
  })

  it('rejects tampered intent payloads or altered signatures', () => {
    const urlString = generateSecureReferralUrl({
      sourceBrand: 'talentxcel-academy',
      destinationHost: 'chatr.chat',
      userIntent: 'chatr_community',
    })

    const url = new URL(urlString)
    const sourceBrand = url.searchParams.get('utm_source')!
    const destHost = url.hostname
    const ts = url.searchParams.get('ref_ts')!
    const sig = url.searchParams.get('ref_sig')!

    // Tamper with intent
    const tamperedIntent = 'career_pathway'
    const isTamperedValid = verifyReferralSignature(sourceBrand, destHost, tamperedIntent, ts, sig)
    expect(isTamperedValid).toBe(false)

    // Tamper with signature
    const isBadSigValid = verifyReferralSignature(sourceBrand, destHost, 'chatr_community', ts, 'invalid_sig_1234')
    expect(isBadSigValid).toBe(false)
  })

  it('rejects expired referral signatures (> 7 days)', () => {
    const expiredTs = (Math.floor(Date.now() / 1000) - (8 * 86400)).toString()
    const isValid = verifyReferralSignature(
      'talentxcel-academy',
      'chatr.chat',
      'chatr_community',
      expiredTs,
      'any_signature_here'
    )
    expect(isValid).toBe(false)
  })
})

describe('Cross-Brand Knowledge Base', () => {
  it('indexes articles across all 4 brands', () => {
    expect(ECOSYSTEM_KNOWLEDGE_INDEX.length).toBeGreaterThanOrEqual(10)

    const brandsFound = new Set(ECOSYSTEM_KNOWLEDGE_INDEX.map((i) => i.brandSlug))
    expect(brandsFound.has('talentxcel')).toBe(true)
    expect(brandsFound.has('talentxcel-academy')).toBe(true)
    expect(brandsFound.has('chatr')).toBe(true)
    expect(brandsFound.has('nuty-tales')).toBe(true)
  })

  it('performs keyword search across titles and tags', () => {
    const resultsResume = searchKnowledgeBase('resume')
    expect(resultsResume.length).toBeGreaterThan(0)
    expect(resultsResume.some((r) => r.brandSlug === 'talentxcel')).toBe(true)

    const resultsWalnut = searchKnowledgeBase('walnut')
    expect(resultsWalnut.length).toBeGreaterThan(0)
    expect(resultsWalnut[0].brandSlug).toBe('nuty-tales')
  })

  it('retrieves knowledge items by ID and by intent', () => {
    const item = getKnowledgeItemById('kb-txa-01')
    expect(item).toBeDefined()
    expect(item?.title).toContain('Cloud Native AI Engineer')

    const pathwayItems = getKnowledgeByIntent('career_pathway')
    expect(pathwayItems.length).toBeGreaterThan(0)
  })
})

describe('Cross-Brand AI Ecosystem Router', () => {
  it('routes career and salary queries to TalentXcel', () => {
    const route = routeEcosystemIntent('What is the salary benchmark for cloud engineers?')
    expect(route.primaryBrand).toBe('talentxcel')
    expect(route.intent).toBe('career_pathway')
    expect(route.recommendedDestinations.length).toBeGreaterThan(0)
    expect(route.recommendedDestinations[0].secureUrl).toContain('ref_sig=')
  })

  it('routes resume ATS optimization queries to TalentXcel Resume', () => {
    const route = routeEcosystemIntent('How do I build an ATS-compliant resume with verified skills?')
    expect(route.primaryBrand).toBe('talentxcel')
    expect(route.intent).toBe('resume_analysis')
    expect(route.recommendedDestinations.some((d) => d.hostname === 'resume.talentxcel.in')).toBe(true)
  })

  it('routes peer discussion and collaboration queries to CHATR', () => {
    const route = routeEcosystemIntent('I want to join a peer study group and chat with fellow students')
    expect(route.primaryBrand).toBe('chatr')
    expect(route.intent).toBe('chatr_community')
    expect(route.recommendedDestinations.some((d) => d.hostname === 'chatr.chat' || d.hostname === 'chatrchat.in')).toBe(true)
  })

  it('routes corporate gifting and dry fruit queries to Nuty Tales', () => {
    const route = routeEcosystemIntent('Where can I buy organic Kashmiri walnut boxes for festive gifting?')
    expect(route.primaryBrand).toBe('nuty-tales')
    expect(route.intent).toBe('nuty_commerce_sandbox')
    expect(route.recommendedDestinations.some((d) => d.hostname.includes('nutytales'))).toBe(true)
  })

  it('defaults to TalentXcel Academy for course and curriculum queries', () => {
    const route = routeEcosystemIntent('What modules are covered in the Cloud Native AI curriculum?')
    expect(route.primaryBrand).toBe('talentxcel-academy')
    expect(route.intent).toBe('academy_enrolment')
  })
})
