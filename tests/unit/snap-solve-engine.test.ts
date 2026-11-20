import { describe, it, expect } from 'vitest'
import {
  PRESET_DOUBTS,
  resolveDoubtFromQuery,
} from '@/lib/academic/snap-solve-engine'

describe('Snap & Solve Socratic Doubt Mentor Engine', () => {
  it('should contain all 4 high-yield pedagogical presets', () => {
    expect(PRESET_DOUBTS.length).toBeGreaterThanOrEqual(4)
    const subjects = PRESET_DOUBTS.map((p) => p.subjectCode)
    expect(subjects).toContain('physics')
    expect(subjects).toContain('math')
    expect(subjects).toContain('chemistry')
  })

  it('should enforce exactly 4 progressive Socratic hints per preset', () => {
    for (const preset of PRESET_DOUBTS) {
      expect(preset.hints.length).toBe(4)
      expect(preset.hints[0].step).toBe(1)
      expect(preset.hints[1].step).toBe(2)
      expect(preset.hints[2].step).toBe(3)
      expect(preset.hints[3].step).toBe(4)

      // Step 3 must have a trap alert for anti-cheating & pedagogical rigor
      expect(preset.hints[2].trapAlert).toBeDefined()
    }
  })

  it('should provide an isomorphic Twin Verification Challenge with 1 correct answer', () => {
    for (const preset of PRESET_DOUBTS) {
      const { twinChallenge } = preset
      expect(twinChallenge).toBeDefined()
      expect(twinChallenge.options.length).toBe(4)

      const correctOptions = twinChallenge.options.filter((o) => o.isCorrect)
      expect(correctOptions.length).toBe(1)

      const distractors = twinChallenge.options.filter((o) => !o.isCorrect)
      expect(distractors.length).toBe(3)

      // Distractors must map to diagnostic error types
      for (const distractor of distractors) {
        expect(distractor.errorType).toBeDefined()
      }
    }
  })

  it('should intelligently resolve optics doubts from keywords', () => {
    const doubt = resolveDoubtFromQuery('A convex mirror with focal length 20 cm forms an image...')
    expect(doubt.conceptId).toBe('conc_opt_mirror_formula')
    expect(doubt.subjectCode).toBe('physics')
  })

  it('should intelligently resolve quadratic doubts from keywords', () => {
    const doubt = resolveDoubtFromQuery('Find the discriminant and roots of 5x² - 8x + 3 = 0')
    expect(doubt.conceptId).toBe('conc_quad_formula')
    expect(doubt.subjectCode).toBe('math')
  })

  it('should intelligently resolve gravitation doubts from keywords', () => {
    const doubt = resolveDoubtFromQuery('Two masses orbit around each other with inverse square gravitational attraction...')
    expect(doubt.conceptId).toBe('conc_mech_grav_law')
    expect(doubt.subjectCode).toBe('physics')
  })

  it('should intelligently resolve chemistry mole concept doubts from keywords', () => {
    const doubt = resolveDoubtFromQuery('Calculate the molar mass and molecules in 44 grams of CO2 gas with Avogadro number')
    expect(doubt.conceptId).toBe('conc_chem_mole_concept')
    expect(doubt.subjectCode).toBe('chemistry')
  })
})
