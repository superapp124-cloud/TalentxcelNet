import { describe, it, expect } from 'vitest'
import {
  PROGRAMME_UNIVERSE,
  getProgrammeBySlug,
  getProgrammesByCategory,
  ProgrammeCategory,
  ProgrammeLifecycleStatus,
} from '@/lib/lms/programme-universe'
import { resolveAmbitionQuery } from '@/lib/ai/ambition-navigator'

describe('Programme Universe (Project Titan 20-Family Catalogue)', () => {
  it('contains exactly 20 fully specified programme families', () => {
    expect(PROGRAMME_UNIVERSE).toHaveLength(20)
  })

  it('guarantees unique slugs and unique family numbers across all 20 programmes', () => {
    const slugs = PROGRAMME_UNIVERSE.map((p) => p.slug)
    const numbers = PROGRAMME_UNIVERSE.map((p) => p.familyNumber)

    expect(new Set(slugs).size).toBe(20)
    expect(new Set(numbers).size).toBe(20)
  })

  it('correctly partitions families across the 3 master universes', () => {
    const schoolComp = getProgrammesByCategory('school_competitive')
    const tech = getProgrammesByCategory('technology')
    const healthBusiness = getProgrammesByCategory('healthcare_business')

    expect(schoolComp).toHaveLength(7)
    expect(tech).toHaveLength(5)
    expect(healthBusiness).toHaveLength(8)
    expect(schoolComp.length + tech.length + healthBusiness.length).toBe(20)
  })

  it('ensures every programme has required core fields, modules, outcomes, and disclaimers', () => {
    for (const prog of PROGRAMME_UNIVERSE) {
      expect(prog.title.length).toBeGreaterThan(0)
      expect(prog.shortTitle.length).toBeGreaterThan(0)
      expect(prog.tagline.length).toBeGreaterThan(0)
      expect(prog.eligibility.length).toBeGreaterThan(0)
      expect(prog.durationMonths).toBeGreaterThan(0)
      expect(prog.coreModules.length, `Slug: ${prog.slug}`).toBeGreaterThanOrEqual(1)
      expect(prog.learningOutcomes.length).toBeGreaterThanOrEqual(3)
      expect(prog.handsOnProjects.length).toBeGreaterThanOrEqual(1)
      expect(prog.pricing.tuitionInr).toBeGreaterThan(0)
      expect(prog.regulatoryDisclaimer).toBeDefined()
      expect(prog.regulatoryDisclaimer!.length).toBeGreaterThan(10)
    }
  })

  it('finds programmes by valid slug and returns undefined for unknown slugs', () => {
    const aiProg = getProgrammeBySlug('ai-development')
    expect(aiProg).toBeDefined()
    expect(aiProg?.familyNumber).toBe(8)
    expect(aiProg?.category).toBe('technology')

    const unknown = getProgrammeBySlug('non-existent-programme-slug')
    expect(unknown).toBeUndefined()
  })

  it('enforces explicit valid lifecycle statuses on all 20 programmes', () => {
    const validStatuses: ProgrammeLifecycleStatus[] = [
      'open_for_enrolment',
      'pilot',
      'curriculum_development',
      'concept',
      'paused',
      'retired',
    ]

    for (const prog of PROGRAMME_UNIVERSE) {
      expect(validStatuses).toContain(prog.lifecycleStatus)
    }
  })
})

describe('Super AI Ambition Navigator', () => {
  it('correctly maps AI developer ambitions to Family 8 (AI Development)', () => {
    const result = resolveAmbitionQuery('I want to build generative AI systems with Python and agents')
    expect(result.matchedProgramme.slug).toBe('ai-development')
    expect(result.confidenceScore).toBeGreaterThanOrEqual(0.7)
    expect(result.personalizedRoadmap).toHaveLength(5)
    expect(result.firstGuidedProject.title).toContain('Knowledge Retrieval Engine')
    expect(result.relevantEcosystemTools.length).toBeGreaterThanOrEqual(1)
  })

  it('correctly maps NEET preparation ambitions to Family 3 (Class 11 NEET/JEE)', () => {
    const result = resolveAmbitionQuery('I want to crack NEET medical exam for MBBS')
    expect(result.matchedProgramme.slug).toBe('class-11-neet-jee')
    expect(result.confidenceScore).toBeGreaterThanOrEqual(0.8)
    expect(result.firstGuidedProject.title).toContain('Diagnostic Benchmark')
  })

  it('correctly maps civil services ambitions to Family 5 (Civil Services IAS)', () => {
    const result = resolveAmbitionQuery('I am preparing for UPSC civil services and state PSC')
    expect(result.matchedProgramme.slug).toBe('civil-services-ias')
    expect(result.confidenceScore).toBeGreaterThanOrEqual(0.8)
  })

  it('correctly maps digital commerce and handicraft store ambitions to Family 14', () => {
    const result = resolveAmbitionQuery('I want to start an ecommerce business selling Kashmiri shawls and crafts')
    expect(result.matchedProgramme.slug).toBe('entrepreneurship-digital-business')
    const ecosystemBrands = result.relevantEcosystemTools.map((t) => t.brand)
    expect(ecosystemBrands).toContain('nuty-tales')
  })

  it('provides sensible fallback for novel or unstructured queries', () => {
    const result = resolveAmbitionQuery('I am looking to explore new opportunities in my life')
    expect(result.matchedProgramme).toBeDefined()
    expect(result.confidenceScore).toBeLessThanOrEqual(0.7)
    expect(result.personalizedRoadmap).toHaveLength(5)
    expect(result.immediateNextAction.href).toBeDefined()
  })
})
