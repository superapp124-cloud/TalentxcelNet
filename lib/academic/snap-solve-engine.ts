/**
 * TALENTXCEL ACADEMIC ENGINE: SNAP & SOLVE SOCRATIC DOUBT MENTOR
 *
 * Core Principles:
 * 1. Anti-Dependency / Anti-Cheating: Never blurt out the raw answer.
 * 2. 4-Stage Progressive Socratic Scaffolding:
 *    - Step 1: Core Physical/Mathematical Principle Identification
 *    - Step 2: Formula & Parameter Mapping
 *    - Step 3: Sign Convention & Classic Trap Warning
 *    - Step 4: Step-by-Step Derivation & Verification
 * 3. Twin Problem Independent Verification:
 *    - Generates an isomorphic problem testing the exact same concept.
 *    - The student MUST independently solve the twin problem to unlock the verified concept badge.
 */

export interface SocraticHint {
  step: number
  title: string
  subtitle: string
  content: string
  focusPrompt: string
  trapAlert?: string
  formulaLatex?: string
}

export interface TwinOption {
  id: string
  text: string
  isCorrect: boolean
  errorType?: 'sign_convention_trap' | 'formula_selection_error' | 'calculation_slip' | 'conceptual_misunderstanding'
  explanation: string
}

export interface TwinChallenge {
  id: string
  conceptId: string
  conceptTitle: string
  questionStem: string
  options: TwinOption[]
  hintForLearner: string
}

export interface DoubtPreset {
  id: string
  title: string
  subjectCode: 'physics' | 'math' | 'chemistry' | 'biology'
  conceptId: string
  conceptTitle: string
  problemText: string
  ocrConfidence: number
  imageUrl?: string
  diagramType?: 'mirror_ray' | 'parabola_curve' | 'gravitational_orbit' | 'circuit_diagram' | 'chemical_reaction'
  hints: SocraticHint[]
  twinChallenge: TwinChallenge
}

export const PRESET_DOUBTS: DoubtPreset[] = [
  {
    id: 'preset_optics_convex_mirror',
    title: 'Class 10 Physics: Convex Mirror Image Distance',
    subjectCode: 'physics',
    conceptId: 'conc_opt_mirror_formula',
    conceptTitle: 'Mirror Formula & Cartesian Sign Conventions',
    problemText: 'An object 4.0 cm high is placed at a distance of 15.0 cm in front of a convex mirror with a radius of curvature of 30.0 cm. Find the position, nature, and height of the image formed.',
    ocrConfidence: 0.98,
    diagramType: 'mirror_ray',
    hints: [
      {
        step: 1,
        title: 'Step 1: Identify Governing Principle',
        subtitle: 'Which optical behavior describes convex mirrors?',
        content: 'Convex mirrors always diverge incident parallel light rays. Because the reflecting surface curves outward, the focal point (F) and center of curvature (C) lie behind the mirror.',
        focusPrompt: 'What does this tell you about the focal length sign under the New Cartesian Sign Convention?',
        trapAlert: 'Never assume focal length is negative for all curved mirrors! Concave is negative; convex is positive.'
      },
      {
        step: 2,
        title: 'Step 2: Parameter & Formula Selection',
        subtitle: 'Map knowns to target variables',
        content: 'Object distance (u) is always in front of mirror: u = -15.0 cm. Radius of curvature R = +30.0 cm, so focal length f = R / 2 = +15.0 cm. Object height h = +4.0 cm. Target is image distance (v).',
        formulaLatex: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}',
        focusPrompt: 'Rearrange the mirror formula to express 1/v in terms of f and u.',
      },
      {
        step: 3,
        title: 'Step 3: Sign Convention Trap Avoidance',
        subtitle: 'Watch the algebraic signs carefully',
        content: 'Substitute: 1/v = 1/f - 1/u = 1/(+15) - 1/(-15). Notice that subtracting a negative number yields addition: 1/15 + 1/15 = 2/15.',
        trapAlert: 'Common Mistake: Many students compute 1/15 - 1/15 = 0, confusing the minus in the rearranged formula with the negative object distance!',
        focusPrompt: 'Invert 2/15 to find v. What does a positive v sign imply about whether the image is real or virtual?'
      },
      {
        step: 4,
        title: 'Step 4: Step-by-Step Derivation & Size',
        subtitle: 'Complete solution and verification',
        content: 'Image distance v = 15 / 2 = +7.5 cm (behind the mirror, virtual and erect). Magnification m = -v / u = -(+7.5) / (-15.0) = +0.5. Image height h\' = m * h = 0.5 * 4.0 cm = +2.0 cm.',
        focusPrompt: 'Summary: Virtual, erect, diminished image of height 2.0 cm located 7.5 cm behind the convex mirror.',
      }
    ],
    twinChallenge: {
      id: 'twin_opt_convex_bus',
      conceptId: 'conc_opt_mirror_formula',
      conceptTitle: 'Convex Mirror Imaging',
      questionStem: 'A convex rear-view mirror fitted on an automobile has a radius of curvature of 4.0 m. If a delivery truck is located 6.0 m behind this mirror, find the position of the image formed.',
      hintForLearner: 'Remember: R = +4.0 m => f = +2.0 m, and u = -6.0 m.',
      options: [
        {
          id: 'opt_a',
          text: 'v = +1.50 m behind the mirror (Virtual & Erect)',
          isCorrect: true,
          explanation: 'Correct! 1/v = 1/f - 1/u = 1/2 - 1/(-6) = 1/2 + 1/6 = (3+1)/6 = 4/6 = 2/3 => v = +3/2 = +1.50 m.'
        },
        {
          id: 'opt_b',
          text: 'v = -3.00 m in front of the mirror (Real & Inverted)',
          isCorrect: false,
          errorType: 'sign_convention_trap',
          explanation: 'Sign error! Convex mirrors never form real images in front of the mirror for real objects.'
        },
        {
          id: 'opt_c',
          text: 'v = +3.00 m behind the mirror',
          isCorrect: false,
          errorType: 'calculation_slip',
          explanation: 'Calculation slip: 1/2 + 1/6 is 4/6 = 2/3. Inverting gives 3/2 = 1.5 m, not 3.0 m.'
        },
        {
          id: 'opt_d',
          text: 'v = +1.20 m behind the mirror',
          isCorrect: false,
          errorType: 'formula_selection_error',
          explanation: 'Formula error: Did you use the lens formula 1/f = 1/v - 1/u instead of the mirror formula?'
        }
      ]
    }
  },
  {
    id: 'preset_math_quadratic_roots',
    title: 'Class 10 Math: Quadratic Formula & Discriminant',
    subjectCode: 'math',
    conceptId: 'conc_quad_formula',
    conceptTitle: 'Quadratic Equation Roots & Discriminant Analysis',
    problemText: 'Solve for x using the quadratic formula: 2x² - 7x + 3 = 0. Determine whether the roots are real, equal, or distinct.',
    ocrConfidence: 0.99,
    diagramType: 'parabola_curve',
    hints: [
      {
        step: 1,
        title: 'Step 1: Identify Canonical Coefficients',
        subtitle: 'Compare with standard form ax² + bx + c = 0',
        content: 'Identify standard coefficients: a = 2, b = -7, c = 3. Note that b is negative (-7), which will flip signs in -b.',
        focusPrompt: 'What is the discriminant formula that determines root nature before calculating roots?'
      },
      {
        step: 2,
        title: 'Step 2: Compute Discriminant D = b² - 4ac',
        subtitle: 'Evaluate root nature',
        content: 'D = (-7)² - 4*(2)*(3) = 49 - 24 = 25. Since D > 0 and 25 is a perfect square (5²), the roots are real, rational, and distinct!',
        formulaLatex: 'D = b^2 - 4ac',
        focusPrompt: 'What happens when D is positive versus negative?'
      },
      {
        step: 3,
        title: 'Step 3: Quadratic Formula Substitution',
        subtitle: 'Watch out for -(-7)',
        content: 'Substitute into x = [-b ± sqrt(D)] / (2a) = [-(-7) ± sqrt(25)] / (2 * 2) = [7 ± 5] / 4.',
        trapAlert: 'Common Mistake: Forgetting that -b is -(-7) = +7, resulting in -7 ± 5.',
        focusPrompt: 'Calculate both branches: (7 + 5)/4 and (7 - 5)/4.'
      },
      {
        step: 4,
        title: 'Step 4: Distinct Solutions',
        subtitle: 'Final root values',
        content: 'Branch 1: x₁ = (7 + 5)/4 = 12/4 = 3. Branch 2: x₂ = (7 - 5)/4 = 2/4 = 1/2. Therefore, x = 3 or x = 1/2.',
        focusPrompt: 'Verification: 2(3)² - 7(3) + 3 = 18 - 21 + 3 = 0. Confirmed!'
      }
    ],
    twinChallenge: {
      id: 'twin_quad_distinct_roots',
      conceptId: 'conc_quad_formula',
      conceptTitle: 'Quadratic Formula Application',
      questionStem: 'Find the roots of 3x² - 5x + 2 = 0 using the quadratic formula, and classify the discriminant.',
      hintForLearner: 'Coefficients: a = 3, b = -5, c = 2. Compute D = (-5)² - 4(3)(2).',
      options: [
        {
          id: 'opt_a',
          text: 'x = 1 and x = 2/3 (D = 1, Real & Distinct)',
          isCorrect: true,
          explanation: 'Correct! D = 25 - 24 = 1. x = [5 ± 1] / 6. x₁ = 6/6 = 1, x₂ = 4/6 = 2/3.'
        },
        {
          id: 'opt_b',
          text: 'x = -1 and x = -2/3',
          isCorrect: false,
          errorType: 'sign_convention_trap',
          explanation: 'Sign error! -b is -(-5) = +5, not -5.'
        },
        {
          id: 'opt_c',
          text: 'x = 2 and x = 1/3',
          isCorrect: false,
          errorType: 'calculation_slip',
          explanation: 'Calculation slip in dividing 4/6. 4/6 simplifies to 2/3, not 1/3.'
        },
        {
          id: 'opt_d',
          text: 'Roots are imaginary (D < 0)',
          isCorrect: false,
          errorType: 'conceptual_misunderstanding',
          explanation: 'Incorrect: (-5)² is +25, not -25. So D = 25 - 24 = +1 > 0.'
        }
      ]
    }
  },
  {
    id: 'preset_physics_gravitation_orbit',
    title: 'Class 9 Physics: Universal Law of Gravitation',
    subjectCode: 'physics',
    conceptId: 'conc_mech_grav_law',
    conceptTitle: 'Newton\'s Gravitational Law & Inverse-Square Dependence',
    problemText: 'The gravitational force between two massive spheres separated by distance r is F. If the mass of one sphere is tripled and the distance between them is doubled, what will be the new gravitational force in terms of F?',
    ocrConfidence: 0.97,
    diagramType: 'gravitational_orbit',
    hints: [
      {
        step: 1,
        title: 'Step 1: State Newton\'s Law of Gravitation',
        subtitle: 'Fundamental physical dependence',
        content: 'The gravitational force between two point masses m₁ and m₂ separated by distance r is proportional to the product of their masses and inversely proportional to the square of distance.',
        formulaLatex: 'F = G \\frac{m_1 m_2}{r^2}',
        focusPrompt: 'What happens mathematically when distance r is replaced by 2r?'
      },
      {
        step: 2,
        title: 'Step 2: Proportionality Mapping',
        subtitle: 'Substitute scale factors',
        content: 'New masses: m₁\' = 3 * m₁, m₂\' = m₂. New distance: r\' = 2 * r.',
        trapAlert: 'Trap: The distance is squared! (2r)² = 4r², not 2r².',
        focusPrompt: 'Write F\' with the substituted scaling constants.'
      },
      {
        step: 3,
        title: 'Step 3: Ratio Calculation',
        subtitle: 'Separate constant factors',
        content: 'F\' = G * (3 * m₁) * m₂ / (2r)² = [3 / 4] * [G * m₁ * m₂ / r²] = (3/4) * F.',
        trapAlert: 'Trap: The distance factor is in the denominator and squared! (2r)² = 4r², dividing force by 4, not 2.',
        focusPrompt: 'Does the force increase or decrease overall? Why?'
      },
      {
        step: 4,
        title: 'Step 4: Final Verification',
        subtitle: 'Result analysis',
        content: 'Even though mass tripled (which boosts force 3x), doubling distance reduced force by 4x. Overall factor = 3/4 = 0.75 F (25% reduction).',
        focusPrompt: 'Verified: F\' = 0.75 F.'
      }
    ],
    twinChallenge: {
      id: 'twin_grav_double_half',
      conceptId: 'conc_mech_grav_law',
      conceptTitle: 'Inverse Square Gravitational Law',
      questionStem: 'Two satellites experience a mutual gravitational force of 100 N. If both satellite masses are doubled and the separation distance between them is halved, what is the new gravitational force?',
      hintForLearner: 'Both masses are 2x, and distance is (1/2)x. Remember (1/2)² in the denominator!',
      options: [
        {
          id: 'opt_a',
          text: '1600 N (16 times the original force)',
          isCorrect: true,
          explanation: 'Correct! Factor = (2 * 2) / (1/2)² = 4 / (1/4) = 16x. 16 * 100 N = 1600 N.'
        },
        {
          id: 'opt_b',
          text: '800 N (8 times the original force)',
          isCorrect: false,
          errorType: 'calculation_slip',
          explanation: 'Forgot to square the halved distance: dividing by 1/2 gives 2x, but dividing by (1/2)² gives 4x.'
        },
        {
          id: 'opt_c',
          text: '400 N (4 times the original force)',
          isCorrect: false,
          errorType: 'conceptual_misunderstanding',
          explanation: 'Ignored the effect of halving the distance, only accounting for mass doubling.'
        },
        {
          id: 'opt_d',
          text: '100 N (Unchanged)',
          isCorrect: false,
          errorType: 'formula_selection_error',
          explanation: 'Mass increase and distance reduction both increase the gravitational attraction; they do not cancel out.'
        }
      ]
    }
  },
  {
    id: 'preset_chem_mole_concept',
    title: 'Class 9 Chemistry: Mole Concept & Avogadro Number',
    subjectCode: 'chemistry',
    conceptId: 'conc_chem_mole_concept',
    conceptTitle: 'Mole Concept, Molar Mass & Stoichiometry',
    problemText: 'Calculate the number of moles and total molecules contained in 88.0 grams of Carbon Dioxide (CO₂ gas). Take C = 12 u, O = 16 u, and Avogadro constant N_A = 6.022 × 10²³.',
    ocrConfidence: 0.99,
    diagramType: 'chemical_reaction',
    hints: [
      {
        step: 1,
        title: 'Step 1: Calculate Molecular Mass of CO₂',
        subtitle: 'Sum constituent atomic weights',
        content: 'Molar mass of CO₂ = (1 * Mass of C) + (2 * Mass of O) = 12 + 2*(16) = 12 + 32 = 44 g/mol.',
        focusPrompt: 'How many grams correspond to exactly one mole of CO₂?'
      },
      {
        step: 2,
        title: 'Step 2: Number of Moles n = Given Mass / Molar Mass',
        subtitle: 'Apply ratio',
        content: 'Number of moles n = m / M = 88.0 g / 44.0 g/mol = 2.0 moles.',
        formulaLatex: 'n = \\frac{m}{M}',
        focusPrompt: 'How do you convert moles into actual molecule count?'
      },
      {
        step: 3,
        title: 'Step 3: Avogadro Multiplication',
        subtitle: 'Multiply by N_A',
        content: 'Total molecules N = n * N_A = 2.0 * 6.022 × 10²³ = 12.044 × 10²³ = 1.2044 × 10²⁴ molecules.',
        trapAlert: 'Watch standard scientific notation: 12.044 × 10²³ is properly written as 1.2044 × 10²⁴.',
        focusPrompt: 'Confirm the exponent shift.'
      },
      {
        step: 4,
        title: 'Step 4: Final Summary',
        subtitle: 'Verified chemical quantities',
        content: '88 grams of CO₂ equals exactly 2.0 moles, containing 1.2044 × 10²⁴ CO₂ molecules.',
        focusPrompt: 'Notice that each molecule has 3 atoms, so total atoms would be 3 * 1.2044 × 10²⁴ = 3.613 × 10²⁴ atoms.'
      }
    ],
    twinChallenge: {
      id: 'twin_chem_water_molecules',
      conceptId: 'conc_chem_mole_concept',
      conceptTitle: 'Mole Concept Verification',
      questionStem: 'Calculate the total number of water molecules present in a droplet containing 0.36 grams of pure water (H₂O). Take H = 1 u, O = 16 u, N_A = 6.022 × 10²³.',
      hintForLearner: 'Molar mass of H₂O = 2(1) + 16 = 18 g/mol. First find moles n = 0.36 / 18.',
      options: [
        {
          id: 'opt_a',
          text: '1.2044 × 10²² molecules (0.02 moles)',
          isCorrect: true,
          explanation: 'Correct! n = 0.36 / 18 = 0.02 moles = 2 × 10⁻² mol. N = 0.02 * 6.022 × 10²³ = 1.2044 × 10²² molecules.'
        },
        {
          id: 'opt_b',
          text: '1.2044 × 10²⁴ molecules',
          isCorrect: false,
          errorType: 'calculation_slip',
          explanation: 'Exponent error: 0.02 is 10⁻², so 10²³ * 10⁻² = 10²¹, not 10²⁴.'
        },
        {
          id: 'opt_c',
          text: '2.16 × 10²² molecules',
          isCorrect: false,
          errorType: 'formula_selection_error',
          explanation: 'Used incorrect molar mass or multiplied mass directly by Avogadro constant without dividing by molar mass.'
        },
        {
          id: 'opt_d',
          text: '6.022 × 10²² molecules',
          isCorrect: false,
          errorType: 'conceptual_misunderstanding',
          explanation: '0.36 / 18 is 0.02 moles, not 0.1 moles.'
        }
      ]
    }
  }
]

/**
 * Intelligent Doubt Resolver:
 * Accepts free-text or OCR extracted string, detects closest concept, and produces
 * customized Socratic scaffolding + twin challenge.
 */
export function resolveDoubtFromQuery(
  rawQuery: string,
  subjectCodeHint?: string
): DoubtPreset {
  const query = rawQuery.toLowerCase()

  // Match Optics
  if (query.includes('mirror') || query.includes('lens') || query.includes('focal') || query.includes('curvature') || query.includes('refract') || query.includes('ray')) {
    return PRESET_DOUBTS[0]
  }

  // Match Quadratic / Algebra
  if (query.includes('quadratic') || query.includes('x²') || query.includes('roots') || query.includes('discriminant') || query.includes('polynomial') || query.includes('equation')) {
    return PRESET_DOUBTS[1]
  }

  // Match Chemistry / Moles
  if (query.includes('mole') || query.includes('avogadro') || query.includes('co2') || query.includes('molar') || query.includes('stoichiom')) {
    return PRESET_DOUBTS[3]
  }

  // Match Gravitation / Motion
  if (query.includes('gravit') || query.includes('orbit') || query.includes('planet') || query.includes('satellite') || query.includes('inverse square')) {
    return PRESET_DOUBTS[2]
  }

  // Default fallback based on subject
  if (subjectCodeHint === 'math') {
    return PRESET_DOUBTS[1]
  }
  if (subjectCodeHint === 'chemistry') {
    return PRESET_DOUBTS[3]
  }
  return PRESET_DOUBTS[0]
}
