import type {
  AuthorizedQuestion,
  ConfidentialQuestionSolution,
  AssessmentBlueprint,
} from '@/packages/core/src'

export interface DiagnosticAssessmentPackage {
  blueprint: AssessmentBlueprint
  questions: AuthorizedQuestion[]
  solutions: ConfidentialQuestionSolution[]
}

// ============================================================================
// 1. REASONING DIMENSION ASSESSMENTS (6 DISTINCT DIMENSIONS)
// ============================================================================

export const REASONING_DIMENSIONS_DATA: Record<string, { title: string; questions: AuthorizedQuestion[]; solutions: ConfidentialQuestionSolution[] }> = {
  'logical-deduction': {
    title: 'Logical Deduction & Syllogisms Diagnostic',
    questions: [
      {
        id: 'q_ld_01',
        topicId: 'Categorical Syllogisms',
        questionType: 'single_choice',
        questionText: 'Statements: (1) All mammals are warm-blooded. (2) All dolphins are mammals. Which conclusion is definitively true?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: 'opt_ld1_a', label: 'A', text: 'All dolphins are warm-blooded.' },
          { id: 'opt_ld1_b', label: 'B', text: 'All warm-blooded creatures are dolphins.' },
          { id: 'opt_ld1_c', label: 'C', text: 'Some dolphins are cold-blooded.' },
          { id: 'opt_ld1_d', label: 'D', text: 'No mammals are warm-blooded.' },
        ],
      },
      {
        id: 'q_ld_02',
        topicId: 'Conditional Implication',
        questionType: 'single_choice',
        questionText: 'Rule: "If it rains, the school sports day will be postponed." Sports day was held as scheduled. What can be logically concluded?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_ld2_a', label: 'A', text: 'It did not rain.' },
          { id: 'opt_ld2_b', label: 'B', text: 'It rained heavily.' },
          { id: 'opt_ld2_c', label: 'C', text: 'The sports day will happen tomorrow.' },
          { id: 'opt_ld2_d', label: 'D', text: 'No conclusion can be made.' },
        ],
      },
      {
        id: 'q_ld_03',
        topicId: 'Truth & Relational Deductions',
        questionType: 'single_choice',
        questionText: 'Four friends (A, B, C, D) are in a row. B is to the right of A. C is between A and B. D is to the left of A. Who is on the extreme left?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_ld3_a', label: 'A', text: 'D' },
          { id: 'opt_ld3_b', label: 'B', text: 'A' },
          { id: 'opt_ld3_c', label: 'C', text: 'B' },
          { id: 'opt_ld3_d', label: 'D', text: 'C' },
        ],
      },
      {
        id: 'q_ld_04',
        topicId: 'Quantifier Deductions',
        questionType: 'single_choice',
        questionText: 'Statements: (1) Some poets are novelists. (2) All novelists are avid readers. Conclusion: (I) Some poets are avid readers. (II) All avid readers are poets.',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'en',
        options: [
          { id: 'opt_ld4_a', label: 'A', text: 'Only Conclusion I follows' },
          { id: 'opt_ld4_b', label: 'B', text: 'Only Conclusion II follows' },
          { id: 'opt_ld4_c', label: 'C', text: 'Both I and II follow' },
          { id: 'opt_ld4_d', label: 'D', text: 'Neither follows' },
        ],
      },
      {
        id: 'q_ld_05',
        topicId: 'Contradiction & Negation',
        questionType: 'single_choice',
        questionText: 'What is the exact logical negation of the claim: "Every student in Class 10 passed the examination"?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_ld5_a', label: 'A', text: 'At least one student in Class 10 did not pass the examination.' },
          { id: 'opt_ld5_b', label: 'B', text: 'All students in Class 10 failed the examination.' },
          { id: 'opt_ld5_c', label: 'C', text: 'No student in Class 10 passed.' },
          { id: 'opt_ld5_d', label: 'D', text: 'Some students in Class 10 passed.' },
        ],
      },
    ],
    solutions: [
      {
        questionId: 'q_ld_01',
        correctOptionIds: ['opt_ld1_a'],
        solutionSteps: [
          '1. All dolphins are mammals (subset relation: Dolphins ⊆ Mammals).',
          '2. All mammals are warm-blooded (Mammals ⊆ Warm-blooded).',
          '3. By transitivity: Dolphins ⊆ Warm-blooded. Therefore, all dolphins are warm-blooded.',
        ],
        explanation: 'Transitive property of categorical inclusion guarantees the conclusion.',
        keyPoint: 'A ⊆ B and B ⊆ C implies A ⊆ C.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ld_02',
        correctOptionIds: ['opt_ld2_a'],
        solutionSteps: [
          '1. Proposition: If P (rains), then Q (postponed).',
          '2. Given fact: Not Q (sports day was NOT postponed).',
          '3. Modus Tollens rule: (P → Q) and ¬Q implies ¬P (it did not rain).',
        ],
        explanation: 'Modus Tollens (denying the consequent) proves that it did not rain.',
        keyPoint: 'If P implies Q, and Q is false, then P must be false.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ld_03',
        correctOptionIds: ['opt_ld3_a'],
        solutionSteps: [
          '1. D is to the left of A: D - A.',
          '2. C is between A and B: A - C - B.',
          '3. Combining left to right order gives: D - A - C - B.',
          '4. Hence, D is positioned at the extreme left.',
        ],
        explanation: 'Linear arrangement deduced from left-to-right constraints.',
        keyPoint: 'Order: D < A < C < B.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ld_04',
        correctOptionIds: ['opt_ld4_a'],
        solutionSteps: [
          '1. Some poets are novelists implies an overlap between Poets and Novelists.',
          '2. Since every novelist is an avid reader, the poets who are novelists must also be avid readers.',
          '3. Thus, "Some poets are avid readers" (Conclusion I) is valid.',
          '4. Conclusion II claims all avid readers are poets, which is unsupported.',
        ],
        explanation: 'Particular affirmative premise with universal affirmative predicate yields particular affirmative.',
        keyPoint: 'Overlap with subset preserves intersection.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ld_05',
        correctOptionIds: ['opt_ld5_a'],
        solutionSteps: [
          '1. Statement: ∀x P(x) ("For all students x, x passed").',
          '2. The formal negation of ∀x P(x) is ∃x ¬P(x) ("There exists at least one student who did not pass").',
        ],
        explanation: 'The negation of "all" is "at least one not", never "none".',
        keyPoint: '¬(∀x P(x)) ≡ ∃x ¬P(x).',
        reviewStatus: 'verified',
      },
    ],
  },

  'numerical-series': {
    title: 'Numerical Series & Mental Arithmetic Diagnostic',
    questions: [
      {
        id: 'q_ns_01',
        topicId: 'Quadratic & Square Patterns',
        questionType: 'single_choice',
        questionText: 'Find the next number in the pattern: 2, 5, 10, 17, 26, ___?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: 'opt_ns1_a', label: 'A', text: '37' },
          { id: 'opt_ns1_b', label: 'B', text: '35' },
          { id: 'opt_ns1_c', label: 'C', text: '38' },
          { id: 'opt_ns1_d', label: 'D', text: '40' },
        ],
      },
      {
        id: 'q_ns_02',
        topicId: 'Two-Tier Difference Series',
        questionType: 'single_choice',
        questionText: 'Identify the missing term: 3, 7, 15, 31, 63, ___?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_ns2_a', label: 'A', text: '127' },
          { id: 'opt_ns2_b', label: 'B', text: '125' },
          { id: 'opt_ns2_c', label: 'C', text: '129' },
          { id: 'opt_ns2_d', label: 'D', text: '115' },
        ],
      },
      {
        id: 'q_ns_03',
        topicId: 'Alternating Arithmetic Progression',
        questionType: 'single_choice',
        questionText: 'What comes next in the alternating sequence: 20, 18, 23, 21, 26, ___?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_ns3_a', label: 'A', text: '24' },
          { id: 'opt_ns3_b', label: 'B', text: '28' },
          { id: 'opt_ns3_c', label: 'C', text: '22' },
          { id: 'opt_ns3_d', label: 'D', text: '25' },
        ],
      },
      {
        id: 'q_ns_04',
        topicId: 'Fractional & Ratio Sequence',
        questionType: 'single_choice',
        questionText: 'Determine the next term: 1/2, 3/4, 5/8, 7/16, ___?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'en',
        options: [
          { id: 'opt_ns4_a', label: 'A', text: '9/32' },
          { id: 'opt_ns4_b', label: 'B', text: '9/24' },
          { id: 'opt_ns4_c', label: 'C', text: '11/32' },
          { id: 'opt_ns4_d', label: 'D', text: '8/32' },
        ],
      },
      {
        id: 'q_ns_05',
        topicId: 'Mental Estimation & Modulo',
        questionType: 'single_choice',
        questionText: 'What is the units digit of the product: 13 × 17 × 19 × 23 × 29?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'en',
        options: [
          { id: 'opt_ns5_a', label: 'A', text: '3' },
          { id: 'opt_ns5_b', label: 'B', text: '1' },
          { id: 'opt_ns5_c', label: 'C', text: '7' },
          { id: 'opt_ns5_d', label: 'D', text: '9' },
        ],
      },
    ],
    solutions: [
      {
        questionId: 'q_ns_01',
        correctOptionIds: ['opt_ns1_a'],
        solutionSteps: [
          '1. Notice the pattern: 1² + 1 = 2, 2² + 1 = 5, 3² + 1 = 10, 4² + 1 = 17, 5² + 1 = 26.',
          '2. The 6th term is 6² + 1 = 36 + 1 = 37.',
        ],
        explanation: 'Formula rule: T(n) = n² + 1.',
        keyPoint: 'n² + 1 yields 37 for n = 6.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ns_02',
        correctOptionIds: ['opt_ns2_a'],
        solutionSteps: [
          '1. Each term is: (previous term × 2) + 1.',
          '2. 3 × 2 + 1 = 7, 7 × 2 + 1 = 15, 15 × 2 + 1 = 31, 31 × 2 + 1 = 63.',
          '3. 63 × 2 + 1 = 126 + 1 = 127.',
        ],
        explanation: 'Doubling with addition of 1 at each step.',
        keyPoint: 'T(n) = 2^(n+1) - 1.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ns_03',
        correctOptionIds: ['opt_ns3_a'],
        solutionSteps: [
          '1. Pattern follows alternating operations: -2 then +5.',
          '2. 20 - 2 = 18; 18 + 5 = 23; 23 - 2 = 21; 21 + 5 = 26.',
          '3. Next step requires -2: 26 - 2 = 24.',
        ],
        explanation: 'Alternating sequence of subtracting 2 and adding 5.',
        keyPoint: '26 - 2 = 24.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ns_04',
        correctOptionIds: ['opt_ns4_a'],
        solutionSteps: [
          '1. Numerators are consecutive odd numbers: 1, 3, 5, 7 → next is 9.',
          '2. Denominators double each step (powers of 2): 2, 4, 8, 16 → next is 32.',
          '3. Combining gives 9/32.',
        ],
        explanation: 'Numerator increases by +2, denominator multiplies by 2.',
        keyPoint: 'Term = (2n - 1) / 2^n.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_ns_05',
        correctOptionIds: ['opt_ns5_a'],
        solutionSteps: [
          '1. Extract units digits: 3, 7, 9, 3, 9.',
          '2. 3 × 7 = 21 → ends in 1.',
          '3. 1 × 9 = 9.',
          '4. 9 × 3 = 27 → ends in 7.',
          '5. 7 × 9 = 63 → ends in 3.',
        ],
        explanation: 'Units digit modulo arithmetic: 3 × 7 × 9 × 3 × 9 = 5,103 → ends in 3.',
        keyPoint: 'Product modulo 10 gives 3.',
        reviewStatus: 'verified',
      },
    ],
  },

  'spatial-matrices': {
    title: 'Spatial Reasoning & Non-Verbal Matrices Diagnostic',
    questions: [
      {
        id: 'q_sp_01',
        topicId: '2D Rotation & Symmetry',
        questionType: 'single_choice',
        questionText: 'An arrow points North-East (45°). If it is rotated 135° clockwise, in which direction will it point?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: 'opt_sp1_a', label: 'A', text: 'South' },
          { id: 'opt_sp1_b', label: 'B', text: 'South-East' },
          { id: 'opt_sp1_c', label: 'C', text: 'West' },
          { id: 'opt_sp1_d', label: 'D', text: 'South-West' },
        ],
      },
      {
        id: 'q_sp_02',
        topicId: 'Mirror Reflections',
        questionType: 'single_choice',
        questionText: 'When reflected across a vertical mirror placed to its right, which capital English letter appears identical to its original form?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: 'opt_sp2_a', label: 'A', text: 'M' },
          { id: 'opt_sp2_b', label: 'B', text: 'E' },
          { id: 'opt_sp2_c', label: 'C', text: 'F' },
          { id: 'opt_sp2_d', label: 'D', text: 'R' },
        ],
      },
      {
        id: 'q_sp_03',
        topicId: 'Cube Nets & Opposite Faces',
        questionType: 'single_choice',
        questionText: 'In a standard unfolded T-shaped cube net with faces 1 to 6 in order (1 on top, 2-3-4-5 horizontal strip, 6 bottom), which face is directly opposite to face 3?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_sp3_a', label: 'A', text: 'Face 5' },
          { id: 'opt_sp3_b', label: 'B', text: 'Face 4' },
          { id: 'opt_sp3_c', label: 'C', text: 'Face 2' },
          { id: 'opt_sp3_d', label: 'D', text: 'Face 1' },
        ],
      },
      {
        id: 'q_sp_04',
        topicId: 'Matrix Pattern Completion',
        questionType: 'single_choice',
        questionText: 'A 3x3 pattern matrix contains circles: Row 1 has 1, 2, 3 circles. Row 2 has 2, 3, 4 circles. Row 3 has 3, 4, [?] circles. What is the missing number?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_sp4_a', label: 'A', text: '5 circles' },
          { id: 'opt_sp4_b', label: 'B', text: '6 circles' },
          { id: 'opt_sp4_c', label: 'C', text: '4 circles' },
          { id: 'opt_sp4_d', label: 'D', text: '7 circles' },
        ],
      },
      {
        id: 'q_sp_05',
        topicId: 'Paper Folding & Hole Punching',
        questionType: 'single_choice',
        questionText: 'A square paper is folded in half once horizontally, and in half again vertically. A circular hole is punched through all layers in the center. When fully unfolded, how many holes appear?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: 'opt_sp5_a', label: 'A', text: '4 holes' },
          { id: 'opt_sp5_b', label: 'B', text: '2 holes' },
          { id: 'opt_sp5_c', label: 'C', text: '8 holes' },
          { id: 'opt_sp5_d', label: 'D', text: '1 hole' },
        ],
      },
    ],
    solutions: [
      {
        questionId: 'q_sp_01',
        correctOptionIds: ['opt_sp1_a'],
        solutionSteps: [
          '1. North-East is at 45° from North.',
          '2. Rotating 135° clockwise: 45° + 135° = 180° from North.',
          '3. 180° from North is directly South.',
        ],
        explanation: 'Angular navigation: 45° + 135° = 180° = South.',
        keyPoint: 'Clockwise rotation adds angular bearing.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_sp_02',
        correctOptionIds: ['opt_sp2_a'],
        solutionSteps: [
          '1. Vertical mirror reflection tests bilateral vertical line symmetry.',
          '2. Letter M has a vertical line of symmetry down its center, so its reflection is identical to M.',
          '3. Letters E, F, and R are asymmetric across the vertical axis.',
        ],
        explanation: 'Letters with vertical reflectional symmetry remain invariant: A, H, I, M, O, T, U, V, W, X, Y.',
        keyPoint: 'M has vertical line symmetry.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_sp_03',
        correctOptionIds: ['opt_sp3_a'],
        solutionSteps: [
          '1. On a straight 4-square strip (2-3-4-5), alternating squares become opposite faces when folded.',
          '2. Square 2 opposes Square 4.',
          '3. Square 3 opposes Square 5.',
        ],
        explanation: 'In unfolded cube strips, opposite faces are separated by exactly one intervening square.',
        keyPoint: 'Face 3 opposes Face 5.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_sp_04',
        correctOptionIds: ['opt_sp4_a'],
        solutionSteps: [
          '1. In row 1: 1 + 1 = 2; 2 + 1 = 3.',
          '2. In row 2: 2 + 1 = 3; 3 + 1 = 4.',
          '3. In row 3: 3 + 1 = 4; 4 + 1 = 5.',
        ],
        explanation: 'Additive progression along each row follows +1 increments.',
        keyPoint: 'Pattern value is 5.',
        reviewStatus: 'verified',
      },
      {
        questionId: 'q_sp_05',
        correctOptionIds: ['opt_sp5_a'],
        solutionSteps: [
          '1. First fold halves the sheet into 2 layers.',
          '2. Second fold quarters the sheet into 4 layers.',
          '3. One punch piercing all 4 layers creates 4 symmetrical holes upon complete unfolding.',
        ],
        explanation: 'Each fold doubles the layer count; 2 folds = 2² = 4 layers = 4 holes.',
        keyPoint: 'Total holes = 4.',
        reviewStatus: 'verified',
      },
    ],
  },
}

// ============================================================================
// 2. REAL DEVNAGARI HINDI CURRICULUM QUESTIONS (CLASSES 3 THROUGH 12)
// ============================================================================

export function getHindiClassQuestions(classNumber: number): { questions: AuthorizedQuestion[]; solutions: ConfidentialQuestionSolution[] } {
  const cls = Math.max(3, Math.min(12, classNumber))
  const questions: AuthorizedQuestion[] = []
  const solutions: ConfidentialQuestionSolution[] = []

  if (cls <= 5) {
    questions.push(
      {
        id: `q_hin_p_${cls}_01`,
        topicId: 'संज्ञा एवं सर्वनाम (Noun & Pronoun)',
        questionType: 'single_choice',
        questionText: "वाक्य 'रोहन अपनी पुस्तक पढ़ रहा है' में व्यक्तिवाचक संज्ञा शब्द कौन-सा है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hp_1a', label: 'A', text: 'रोहन' },
          { id: 'opt_hp_1b', label: 'B', text: 'पुस्तक' },
          { id: 'opt_hp_1c', label: 'C', text: 'अपनी' },
          { id: 'opt_hp_1d', label: 'D', text: 'पढ़ रहा' },
        ],
      },
      {
        id: `q_hin_p_${cls}_02`,
        topicId: 'विलोम शब्द (Antonyms)',
        questionType: 'single_choice',
        questionText: "'प्रकाश' शब्द का सही विलोम शब्द निम्न में से कौन-सा है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hp_2a', label: 'A', text: 'अंधकार' },
          { id: 'opt_hp_2b', label: 'B', text: 'उजाला' },
          { id: 'opt_hp_2c', label: 'C', text: 'सवेरा' },
          { id: 'opt_hp_2d', label: 'D', text: 'दीपक' },
        ],
      },
      {
        id: `q_hin_p_${cls}_03`,
        topicId: 'पर्यायवाची शब्द (Synonyms)',
        questionType: 'single_choice',
        questionText: "निम्न में से कौन-सा शब्द 'सूर्य' का पर्यायवाची नहीं है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hp_3a', label: 'A', text: 'शशि (चंद्रमा)' },
          { id: 'opt_hp_3b', label: 'B', text: 'रवि' },
          { id: 'opt_hp_3c', label: 'C', text: 'दिनकर' },
          { id: 'opt_hp_3d', label: 'D', text: 'भास्कर' },
        ],
      },
      {
        id: `q_hin_p_${cls}_04`,
        topicId: 'मुहावरे (Idioms)',
        questionType: 'single_choice',
        questionText: "मुहावरे 'नौ दो ग्यारह होना' का सही अर्थ क्या है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hp_4a', label: 'A', text: 'भाग जाना' },
          { id: 'opt_hp_4b', label: 'B', text: 'गिनती सीखना' },
          { id: 'opt_hp_4c', label: 'C', text: 'मिलकर काम करना' },
          { id: 'opt_hp_4d', label: 'D', text: 'गुस्सा होना' },
        ],
      },
      {
        id: `q_hin_p_${cls}_05`,
        topicId: 'शुद्ध वर्तनी एवं वचन',
        questionType: 'single_choice',
        questionText: "निम्न में से किस शब्द की वर्तनी (Spelling) पूर्णतः शुद्ध है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hp_5a', label: 'A', text: 'उज्ज्वल' },
          { id: 'opt_hp_5b', label: 'B', text: 'उज्वल' },
          { id: 'opt_hp_5c', label: 'C', text: 'उज्जवल' },
          { id: 'opt_hp_5d', label: 'D', text: 'ऊज्जवल' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_hin_p_${cls}_01`,
        correctOptionIds: ['opt_hp_1a'],
        solutionSteps: ["1. व्यक्तिवाचक संज्ञा किसी विशेष व्यक्ति, स्थान या वस्तु के नाम को कहते हैं।", "2. यहाँ 'रोहन' एक विशेष बालक का नाम है, अतः यह व्यक्तिवाचक संज्ञा है।"],
        explanation: "रोहन व्यक्तिवाचक संज्ञा है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_p_${cls}_02`,
        correctOptionIds: ['opt_hp_2a'],
        solutionSteps: ["1. 'प्रकाश' का अर्थ उजाला होता है।", "2. इसका विपरीतार्थक (उल्टा अर्थ वाला) शब्द 'अंधकार' है।"],
        explanation: "प्रकाश का विलोम अंधकार होता है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_p_${cls}_03`,
        correctOptionIds: ['opt_hp_3a'],
        solutionSteps: ["1. रवि, दिनकर, भास्कर सूर्य के पर्यायवाची हैं।", "2. 'शशि' चंद्रमा का पर्यायवाची शब्द है।"],
        explanation: "शशि चंद्रमा का पर्यायवाची है, सूर्य का नहीं।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_p_${cls}_04`,
        correctOptionIds: ['opt_hp_4a'],
        solutionSteps: ["1. 'नौ दो ग्यारह होना' एक प्रसिद्ध लोक मुहावरा है जिसका अर्थ बिना बताए तेज़ी से भाग जाना होता है।"],
        explanation: "नौ दो ग्यारह होना अर्थात् भाग जाना।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_p_${cls}_05`,
        correctOptionIds: ['opt_hp_5a'],
        solutionSteps: ["1. संधि नियम: उत् + ज्वल = उज्ज्वल (दोनों 'ज' आधे होते हैं)।"],
        explanation: "उज्ज्वल की शुद्ध वर्तनी में दो आधे 'ज' होते हैं।",
        reviewStatus: 'verified',
      }
    )
  } else if (cls <= 8) {
    questions.push(
      {
        id: `q_hin_m_${cls}_01`,
        topicId: 'स्वर संधि (Sandhi)',
        questionType: 'single_choice',
        questionText: "'सूर्योदय' शब्द का सही संधि-विच्छेद एवं संधि का नाम क्या है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hm_1a', label: 'A', text: 'सूर्य + उदय (गुण स्वर संधि)' },
          { id: 'opt_hm_1b', label: 'B', text: 'सूर्यो + दय (दीर्घ संधि)' },
          { id: 'opt_hm_1c', label: 'C', text: 'सूर्य + दय (यण संधि)' },
          { id: 'opt_hm_1d', label: 'D', text: 'सूर्या + उदय (वृद्धि संधि)' },
        ],
      },
      {
        id: `q_hin_m_${cls}_02`,
        topicId: 'कारक एवं विभक्ति (Case & Inflection)',
        questionType: 'single_choice',
        questionText: "वाक्य 'पेड़ से पत्ता गिरा' में रेखांकित पद 'पेड़ से' में कौन-सा कारक है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hm_2a', label: 'A', text: 'अपादान कारक (अलग होने के अर्थ में)' },
          { id: 'opt_hm_2b', label: 'B', text: 'करण कारक (साधन के रूप में)' },
          { id: 'opt_hm_2c', label: 'C', text: 'कर्म कारक' },
          { id: 'opt_hm_2d', label: 'D', text: 'संबोधन कारक' },
        ],
      },
      {
        id: `q_hin_m_${cls}_03`,
        topicId: 'उपसर्ग एवं प्रत्यय (Prefix & Suffix)',
        questionType: 'single_choice',
        questionText: "'अपमान' शब्द में कौन-सा उपसर्ग जुड़ा हुआ है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hm_3a', label: 'A', text: 'अप' },
          { id: 'opt_hm_3b', label: 'B', text: 'अ' },
          { id: 'opt_hm_3c', label: 'C', text: 'मान' },
          { id: 'opt_hm_3d', label: 'D', text: 'अपम' },
        ],
      },
      {
        id: `q_hin_m_${cls}_04`,
        topicId: 'समास परिचय (Compound Words)',
        questionType: 'single_choice',
        questionText: "'चौराहा' (चार राहों का समूह) में कौन-सा समास है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hm_4a', label: 'A', text: 'द्विगु समास (पहला पद संख्यावाची)' },
          { id: 'opt_hm_4b', label: 'B', text: 'द्वंद्व समास' },
          { id: 'opt_hm_4c', label: 'C', text: 'तत्पुरुष समास' },
          { id: 'opt_hm_4d', label: 'D', text: 'अव्ययीभाव समास' },
        ],
      },
      {
        id: `q_hin_m_${cls}_05`,
        topicId: 'वाक्य भेद (Sentences)',
        questionType: 'single_choice',
        questionText: "'अरे! कितना सुंदर उपवन है!' यह अर्थ की दृष्टि से किस प्रकार का वाक्य है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'hi',
        options: [
          { id: 'opt_hm_5a', label: 'A', text: 'विस्मयादिबोधक वाक्य' },
          { id: 'opt_hm_5b', label: 'B', text: 'विधानवाचक वाक्य' },
          { id: 'opt_hm_5c', label: 'C', text: 'निषेधवाचक वाक्य' },
          { id: 'opt_hm_5d', label: 'D', text: 'आज्ञावाचक वाक्य' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_hin_m_${cls}_01`,
        correctOptionIds: ['opt_hm_1a'],
        solutionSteps: ["1. सूर्य + उदय: अ + उ मिलकर 'ओ' बन जाता है।", "2. यह गुण स्वर संधि का नियम है।"],
        explanation: "सूर्य + उदय = सूर्योदय (गुण स्वर संधि)।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_m_${cls}_02`,
        correctOptionIds: ['opt_hm_2a'],
        solutionSteps: ["1. जहाँ किसी वस्तु का किसी स्थान से अलग होना पाया जाए, वहाँ अपादान कारक (विभक्ति: से) होता है।"],
        explanation: "पेड़ से अलग होने के कारण अपादान कारक है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_m_${cls}_03`,
        correctOptionIds: ['opt_hm_3a'],
        solutionSteps: ["1. मूल शब्द 'मान' में पूर्व में 'अप' शब्दांश जुड़कर 'अपमान' बना है।"],
        explanation: "अप उपसर्ग है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_m_${cls}_04`,
        correctOptionIds: ['opt_hm_4a'],
        solutionSteps: ["1. जिस समास का पहला पद संख्यावाचक विशेषण हो और वह समूह का बोध कराए, वह द्विगु समास कहलाता है।"],
        explanation: "चौराहा में द्विगु समास है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_m_${cls}_05`,
        correctOptionIds: ['opt_hm_5a'],
        solutionSteps: ["1. जिस वाक्य में विस्मय, हर्ष, शोक या आश्चर्य का भाव प्रकट हो, वह विस्मयादिबोधक वाक्य होता है।"],
        explanation: "विस्मयादिबोधक वाक्य।",
        reviewStatus: 'verified',
      }
    )
  } else if (cls <= 10) {
    questions.push(
      {
        id: `q_hin_s_${cls}_01`,
        topicId: 'रचना के आधार पर वाक्य रूपांतरण (Sentence Syntax)',
        questionType: 'single_choice',
        questionText: "वाक्य 'जैसे ही सूर्योदय हुआ, वैसे ही पक्षी चहचहाने लगे' रचना की दृष्टि से किस प्रकार का वाक्य है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hs_1a', label: 'A', text: 'मिश्र वाक्य (Complex Sentence)' },
          { id: 'opt_hs_1b', label: 'B', text: 'सरल वाक्य' },
          { id: 'opt_hs_1c', label: 'C', text: 'संयुक्त वाक्य' },
          { id: 'opt_hs_1d', label: 'D', text: 'विधानवाचक वाक्य' },
        ],
      },
      {
        id: `q_hin_s_${cls}_02`,
        topicId: 'वाच्य (Voice: कर्तृ, कर्म, भाववाच्य)',
        questionType: 'single_choice',
        questionText: "'रोगी से चला नहीं जाता' इस वाक्य में कौन-सा वाच्य है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hs_2a', label: 'A', text: 'भाववाच्य (Impersonal Voice)' },
          { id: 'opt_hs_2b', label: 'B', text: 'कर्तृवाच्य' },
          { id: 'opt_hs_2c', label: 'C', text: 'कर्मवाच्य' },
          { id: 'opt_hs_2d', label: 'D', text: 'मिश्र वाच्य' },
        ],
      },
      {
        id: `q_hin_s_${cls}_03`,
        topicId: 'पद परिचय (Morphological Analysis)',
        questionType: 'single_choice',
        questionText: "वाक्य 'हम प्रतिदिन विद्यालय जाते हैं' में 'प्रतिदिन' पद का सही व्याकरणिक परिचय क्या है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'hi',
        options: [
          { id: 'opt_hs_3a', label: 'A', text: "कालवाचक क्रियाविशेषण, 'जाते हैं' क्रिया की विशेषता" },
          { id: 'opt_hs_3b', label: 'B', text: 'रीतिवाचक क्रियाविशेषण' },
          { id: 'opt_hs_3c', label: 'C', text: 'गुणवाचक विशेषण' },
          { id: 'opt_hs_3d', label: 'D', text: 'स्थानवाचक क्रियाविशेषण' },
        ],
      },
      {
        id: `q_hin_s_${cls}_04`,
        topicId: 'रस सिद्धांत (Rasa Theory)',
        questionType: 'single_choice',
        questionText: "शृंगार रस का स्थायी भाव (Sthayi Bhava) निम्न में से कौन-सा है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hs_4a', label: 'A', text: 'रति (प्रेम)' },
          { id: 'opt_hs_4b', label: 'B', text: 'उत्साह' },
          { id: 'opt_hs_4c', label: 'C', text: 'शोक' },
          { id: 'opt_hs_4d', label: 'D', text: 'क्रोध' },
        ],
      },
      {
        id: `q_hin_s_${cls}_05`,
        topicId: 'अलंकार (Figures of Speech)',
        questionType: 'single_choice',
        questionText: "पंक्ति 'कनक कनक ते सौ गुनी, मादकता अधिकाय' में कौन-सा अलंकार प्रयुक्त हुआ है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hs_5a', label: 'A', text: 'यमक अलंकार (एक ही शब्द के भिन्न अर्थ)' },
          { id: 'opt_hs_5b', label: 'B', text: 'अनुप्रास अलंकार' },
          { id: 'opt_hs_5c', label: 'C', text: 'श्लेष अलंकार' },
          { id: 'opt_hs_5d', label: 'D', text: 'उपमा अलंकार' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_hin_s_${cls}_01`,
        correctOptionIds: ['opt_hs_1a'],
        solutionSteps: ["1. 'जैसे ही... वैसे ही' योजक शब्दों से जुड़ा वाक्य जिसमें एक प्रधान उपवाक्य तथा एक आश्रित उपवाक्य हो, मिश्र वाक्य कहलाता है।"],
        explanation: "मिश्र वाक्य की संरचना।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_s_${cls}_02`,
        correctOptionIds: ['opt_hs_2a'],
        solutionSteps: ["1. जहाँ क्रिया का संबंध कर्ता या कर्म से न होकर केवल भाव से हो और असमर्थता का बोध हो, वहाँ भाववाच्य होता है।"],
        explanation: "भाववाच्य में अकर्मक क्रिया तथा असमर्थता प्रकट होती है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_s_${cls}_03`,
        correctOptionIds: ['opt_hs_3a'],
        solutionSteps: ["1. 'प्रतिदिन' शब्द क्रिया के होने के समय का बोध करा रहा है। अतः यह कालवाचक क्रियाविशेषण है।"],
        explanation: "कालवाचक क्रियाविशेषण पद परिचय।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_s_${cls}_04`,
        correctOptionIds: ['opt_hs_4a'],
        solutionSteps: ["1. शृंगार रस का स्थायी भाव 'रति' (प्रेम) होता है। उत्साह वीर रस का तथा क्रोध रौद्र रस का स्थायी भाव है।"],
        explanation: "शृंगार रस का स्थायी भाव रति है।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_s_${cls}_05`,
        correctOptionIds: ['opt_hs_5a'],
        solutionSteps: ["1. 'कनक' शब्द दो बार आया है - पहले का अर्थ 'सोना' तथा दूसरे का अर्थ 'धतूरा' है।", "2. जहाँ एक ही शब्द की आवृत्ति हो और अर्थ भिन्न हों, वहाँ यमक अलंकार होता है।"],
        explanation: "यमक अलंकार: कनक (सोना) व कनक (धतूरा)।",
        reviewStatus: 'verified',
      }
    )
  } else {
    // Classes 11, 12 (Senior Secondary Hindi Core / Elective)
    questions.push(
      {
        id: `q_hin_sr_${cls}_01`,
        topicId: 'शब्द शक्ति (Shabda Shakti)',
        questionType: 'single_choice',
        questionText: "काव्य शास्त्र के अनुसार 'सूर्यास्त हो गया' (जिससे ग्वाले, पुजारी, मजदूर अपने-अपने अर्थ समझें) में कौन-सी शब्द शक्ति सक्रिय है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'hi',
        options: [
          { id: 'opt_hsr_1a', label: 'A', text: 'व्यंजना शब्द शक्ति (Suggested Meaning)' },
          { id: 'opt_hsr_1b', label: 'B', text: 'अभिधा शब्द शक्ति' },
          { id: 'opt_hsr_1c', label: 'C', text: 'लक्षणा शब्द शक्ति' },
          { id: 'opt_hsr_1d', label: 'D', text: 'तात्पर्या शब्द शक्ति' },
        ],
      },
      {
        id: `q_hin_sr_${cls}_02`,
        topicId: 'जनसंचार एवं पत्रकारिता (Mass Media & Journalism)',
        questionType: 'single_choice',
        questionText: "समाचार लेखन की सबसे लोकप्रिय एवं मानक शैली 'उल्टा पिरामिड शैली' (Inverted Pyramid) में सबसे महत्वपूर्ण तथ्य कहाँ आते हैं?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hsr_2a', label: 'A', text: 'प्रारंभिक भाग (इंट्रो / मुखड़ा) में' },
          { id: 'opt_hsr_2b', label: 'B', text: 'मध्य भाग (बॉडी) में' },
          { id: 'opt_hsr_2c', label: 'C', text: 'अंतिम भाग (समापन) में' },
          { id: 'opt_hsr_2d', label: 'D', text: 'शीर्षक के अंत में' },
        ],
      },
      {
        id: `q_hin_sr_${cls}_03`,
        topicId: 'काव्य सौंदर्य एवं छंद (Prosody)',
        questionType: 'single_choice',
        questionText: "मात्रिक अर्धसम छंद 'दोहा' के प्रथम एवं तृतीय (विषम) चरणों में कितनी-कितनी मात्राएँ होती हैं?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hsr_3a', label: 'A', text: '13-13 मात्राएँ' },
          { id: 'opt_hsr_3b', label: 'B', text: '11-11 मात्राएँ' },
          { id: 'opt_hsr_3c', label: 'C', text: '16-16 मात्राएँ' },
          { id: 'opt_hsr_3d', label: 'D', text: '12-12 मात्राएँ' },
        ],
      },
      {
        id: `q_hin_sr_${cls}_04`,
        topicId: 'साहित्यिक प्रवृत्तियाँ (Literary Eras)',
        questionType: 'single_choice',
        questionText: "हिंदी साहित्य में 'छायावाद' के चार प्रमुख स्तंभों में निम्न में से कौन-से कवि सम्मिलित नहीं हैं?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hsr_4a', label: 'A', text: 'रामधारी सिंह दिनकर' },
          { id: 'opt_hsr_4b', label: 'B', text: 'जयशंकर प्रसाद' },
          { id: 'opt_hsr_4c', label: 'C', text: 'सूर्यकांत त्रिपाठी निराला' },
          { id: 'opt_hsr_4d', label: 'D', text: 'महादेवी वर्मा' },
        ],
      },
      {
        id: `q_hin_sr_${cls}_05`,
        topicId: 'अलंकार सिद्धांत (Advanced Rhetoric)',
        questionType: 'single_choice',
        questionText: "जहाँ उपमेय में उपमान की संभावना या कल्पना की जाए और 'मनु, मानहु, जनु, जानहु' वाचक शब्द आएं, वहाँ कौन-सा अलंकार होता है?",
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'hi',
        options: [
          { id: 'opt_hsr_5a', label: 'A', text: 'उत्प्रेक्षा अलंकार' },
          { id: 'opt_hsr_5b', label: 'B', text: 'रूपक अलंकार' },
          { id: 'opt_hsr_5c', label: 'C', text: 'उपमा अलंकार' },
          { id: 'opt_hsr_5d', label: 'D', text: 'संदेह अलंकार' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_hin_sr_${cls}_01`,
        correctOptionIds: ['opt_hsr_1a'],
        solutionSteps: ["1. जब किसी कथन का सामान्य वाच्यार्थ न होकर संदर्भ के अनुसार अनेक व्यंग्यार्थ निकलते हैं, वहाँ व्यंजना शब्द शक्ति होती है।"],
        explanation: "व्यंजना शब्द शक्ति।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_sr_${cls}_02`,
        correctOptionIds: ['opt_hsr_2a'],
        solutionSteps: ["1. उल्टा पिरामिड शैली में सबसे महत्वपूर्ण सूचना/तथ्य सबसे पहले (इंट्रो/लीड) में लिखे जाते हैं।"],
        explanation: "उल्टा पिरामिड शैली का नियम।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_sr_${cls}_03`,
        correctOptionIds: ['opt_hsr_3a'],
        solutionSteps: ["1. दोहा छंद के विषम (1, 3) चरणों में 13-13 मात्राएँ तथा सम (2, 4) चरणों में 11-11 मात्राएँ होती हैं।"],
        explanation: "दोहा छंद लक्षण: 13 + 11 = 24 मात्राएँ।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_sr_${cls}_04`,
        correctOptionIds: ['opt_hsr_4a'],
        solutionSteps: ["1. छायावाद के चार स्तंभ हैं: प्रसाद, पंत, निराला और महादेवी वर्मा। रामधारी सिंह दिनकर राष्ट्रीय सांस्कृतिक काव्यधारा / प्रगतिवादी युग के हैं।"],
        explanation: "दिनकर छायावाद के चार स्तंभों में नहीं आते।",
        reviewStatus: 'verified',
      },
      {
        questionId: `q_hin_sr_${cls}_05`,
        correctOptionIds: ['opt_hsr_5a'],
        solutionSteps: ["1. उपमेय में उपमान की संभावना तथा 'मानो, जानो, मनहु, जनु' वाचक शब्दों की उपस्थिति उत्प्रेक्षा अलंकार की पहचान है।"],
        explanation: "उत्प्रेक्षा अलंकार लक्षण।",
        reviewStatus: 'verified',
      }
    )
  }

  return { questions, solutions }
}

// ============================================================================
// 3. MASTER CLASS-SPECIFIC DIAGNOSTIC PACKAGE GENERATOR
// ============================================================================

export function getClassDiagnosticPackage(
  classNumber: number,
  subjectCode: string,
  boardCode: string = 'CBSE'
): DiagnosticAssessmentPackage {
  const cls = Math.max(3, Math.min(12, classNumber))
  const subj = subjectCode.toLowerCase()

  // 1. HINDI: Returns 100% authentic Devnagari Hindi questions for all classes
  if (subj.includes('hin')) {
    const hindiData = getHindiClassQuestions(cls)
    const blueprint: AssessmentBlueprint = {
      id: `bp_diag_c${cls}_hindi`,
      title: `Class ${cls} Hindi Diagnostic (हिंदी व्याकरण एवं साहित्य • ${boardCode})`,
      subjectId: `subj_c${cls}_hindi`,
      chapterId: 'diagnostic_hindi_core',
      durationMinutes: 10,
      totalQuestions: hindiData.questions.length,
      totalMarks: hindiData.questions.length * 2,
      negativeMarkingRatio: 0,
      passingPercentage: 60,
      rewardCreditAmount: 20,
      examType: 'periodic_test',
      category: 'academic',
      difficulty: 'medium',
    }
    return { blueprint, questions: hindiData.questions, solutions: hindiData.solutions }
  }

  // 2. MATHEMATICS: Differentiated questions for each class
  const questions: AuthorizedQuestion[] = []
  const solutions: ConfidentialQuestionSolution[] = []

  if (subj === 'math' || subj === 'mathematics') {
    if (cls === 3) {
      questions.push(
        {
          id: 'q_m3_01',
          topicId: '3-Digit Place Value',
          questionType: 'single_choice',
          questionText: 'In the number 648, what is the place value of the digit 4?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: 'opt_m3_1a', label: 'A', text: '40 (Four tens)' },
            { id: 'opt_m3_1b', label: 'B', text: '4 (Four ones)' },
            { id: 'opt_m3_1c', label: 'C', text: '400 (Four hundreds)' },
            { id: 'opt_m3_1d', label: 'D', text: '48' },
          ],
        },
        {
          id: 'q_m3_02',
          topicId: 'Addition with Regrouping',
          questionType: 'single_choice',
          questionText: 'What is 347 + 285?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: 'opt_m3_2a', label: 'A', text: '632' },
            { id: 'opt_m3_2b', label: 'B', text: '622' },
            { id: 'opt_m3_2c', label: 'C', text: '532' },
            { id: 'opt_m3_2d', label: 'D', text: '642' },
          ],
        },
        {
          id: 'q_m3_03',
          topicId: 'Simple Fractions',
          questionType: 'single_choice',
          questionText: 'A circular pizza is sliced into 8 equal parts. Ahaan eats 3 slices. What fraction of the pizza has he eaten?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: 'opt_m3_3a', label: 'A', text: '3/8' },
            { id: 'opt_m3_3b', label: 'B', text: '5/8' },
            { id: 'opt_m3_3c', label: 'C', text: '3/5' },
            { id: 'opt_m3_3d', label: 'D', text: '1/3' },
          ],
        },
        {
          id: 'q_m3_04',
          topicId: 'Time & Clocks',
          questionType: 'single_choice',
          questionText: 'If the hour hand points between 4 and 5 and the minute hand points directly at 6, what time is it?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: 'opt_m3_4a', label: 'A', text: '4:30' },
            { id: 'opt_m3_4b', label: 'B', text: '5:30' },
            { id: 'opt_m3_4c', label: 'C', text: '4:06' },
            { id: 'opt_m3_4d', label: 'D', text: '6:20' },
          ],
        },
        {
          id: 'q_m3_05',
          topicId: 'Geometric Shapes',
          questionType: 'single_choice',
          questionText: 'Which solid geometric shape has 6 flat rectangular faces, 12 edges, and 8 vertices?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: 'opt_m3_5a', label: 'A', text: 'Cuboid' },
            { id: 'opt_m3_5b', label: 'B', text: 'Cylinder' },
            { id: 'opt_m3_5c', label: 'C', text: 'Cone' },
            { id: 'opt_m3_5d', label: 'D', text: 'Sphere' },
          ],
        }
      )

      solutions.push(
        {
          questionId: 'q_m3_01',
          correctOptionIds: ['opt_m3_1a'],
          solutionSteps: ['1. In 648: 8 is in ones place, 4 is in tens place (4 × 10 = 40), 6 is in hundreds place (600).'],
          explanation: 'The place value of 4 in 648 is 40.',
          reviewStatus: 'verified',
        },
        {
          questionId: 'q_m3_02',
          correctOptionIds: ['opt_m3_2a'],
          solutionSteps: ['1. Ones: 7 + 5 = 12 (write 2, carry 1).', '2. Tens: 4 + 8 + 1 = 13 (write 3, carry 1).', '3. Hundreds: 3 + 2 + 1 = 6. Total = 632.'],
          explanation: 'Stepwise column addition with regrouping.',
          reviewStatus: 'verified',
        },
        {
          questionId: 'q_m3_03',
          correctOptionIds: ['opt_m3_3a'],
          solutionSteps: ['1. Total equal parts = 8 (denominator). Parts eaten = 3 (numerator). Fraction = 3/8.'],
          explanation: 'Fraction = Eaten parts / Total equal parts = 3/8.',
          reviewStatus: 'verified',
        },
        {
          questionId: 'q_m3_04',
          correctOptionIds: ['opt_m3_4a'],
          solutionSteps: ['1. Minute hand at 6 indicates 6 × 5 = 30 minutes.', '2. Hour hand past 4 indicates hour 4. Time = 4:30.'],
          explanation: 'Half past 4 is 4:30.',
          reviewStatus: 'verified',
        },
        {
          questionId: 'q_m3_05',
          correctOptionIds: ['opt_m3_5a'],
          solutionSteps: ['1. A cuboid has 6 rectangular faces, 12 edges, and 8 vertices.'],
          explanation: 'Geometric properties of a cuboid (rectangular prism).',
          reviewStatus: 'verified',
        }
      )
    } else if (cls <= 6) {
      questions.push(
        {
          id: `q_m${cls}_01`,
          topicId: 'Integers & Arithmetic',
          questionType: 'single_choice',
          questionText: 'What is the value of: (-15) + (-28) - (-12)?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_1a`, label: 'A', text: '-31' },
            { id: `opt_m${cls}_1b`, label: 'B', text: '-55' },
            { id: `opt_m${cls}_1c`, label: 'C', text: '-1' },
            { id: `opt_m${cls}_1d`, label: 'D', text: '31' },
          ],
        },
        {
          id: `q_m${cls}_02`,
          topicId: 'Fractions & Simplification',
          questionType: 'single_choice',
          questionText: 'Simplify the fraction addition: 3/4 + 2/5.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_2a`, label: 'A', text: '23/20' },
            { id: `opt_m${cls}_2b`, label: 'B', text: '5/9' },
            { id: `opt_m${cls}_2c`, label: 'C', text: '19/20' },
            { id: `opt_m${cls}_2d`, label: 'D', text: '7/20' },
          ],
        },
        {
          id: `q_m${cls}_03`,
          topicId: 'Ratios & Unitary Method',
          questionType: 'single_choice',
          questionText: 'If 8 identical geometry boxes cost ₹480, what will be the cost of 15 such boxes?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_3a`, label: 'A', text: '₹900' },
            { id: `opt_m${cls}_3b`, label: 'B', text: '₹840' },
            { id: `opt_m${cls}_3c`, label: 'C', text: '₹960' },
            { id: `opt_m${cls}_3d`, label: 'D', text: '₹750' },
          ],
        },
        {
          id: `q_m${cls}_04`,
          topicId: 'Perimeter & Area',
          questionType: 'single_choice',
          questionText: 'A rectangular garden has length 18 m and breadth 12 m. What is its perimeter?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_4a`, label: 'A', text: '60 m' },
            { id: `opt_m${cls}_4b`, label: 'B', text: '216 m²' },
            { id: `opt_m${cls}_4c`, label: 'C', text: '30 m' },
            { id: `opt_m${cls}_4d`, label: 'D', text: '72 m' },
          ],
        },
        {
          id: `q_m${cls}_05`,
          topicId: 'Basic Algebraic Equations',
          questionType: 'single_choice',
          questionText: 'Solve for x: 3x - 7 = 20.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_5a`, label: 'A', text: 'x = 9' },
            { id: `opt_m${cls}_5b`, label: 'B', text: 'x = 7' },
            { id: `opt_m${cls}_5c`, label: 'C', text: 'x = 8' },
            { id: `opt_m${cls}_5d`, label: 'D', text: 'x = 11' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_m${cls}_01`,
          correctOptionIds: [`opt_m${cls}_1a`],
          solutionSteps: ['1. (-15) + (-28) = -43.', '2. -43 - (-12) = -43 + 12 = -31.'],
          explanation: 'Minus of a minus becomes addition.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_02`,
          correctOptionIds: [`opt_m${cls}_2a`],
          solutionSteps: ['1. LCM of 4 and 5 = 20.', '2. (3×5 + 2×4) / 20 = (15 + 8) / 20 = 23/20.'],
          explanation: 'Convert to common denominator 20.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_03`,
          correctOptionIds: [`opt_m${cls}_3a`],
          solutionSteps: ['1. Cost of 1 box = 480 / 8 = ₹60.', '2. Cost of 15 boxes = 60 × 15 = ₹900.'],
          explanation: 'Unitary method calculation.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_04`,
          correctOptionIds: [`opt_m${cls}_4a`],
          solutionSteps: ['1. Perimeter = 2 × (Length + Breadth) = 2 × (18 + 12) = 2 × 30 = 60 m.'],
          explanation: 'Formula: P = 2(l + b).',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_05`,
          correctOptionIds: [`opt_m${cls}_5a`],
          solutionSteps: ['1. 3x = 20 + 7 = 27.', '2. x = 27 / 3 = 9.'],
          explanation: 'Linear equation solving.',
          reviewStatus: 'verified',
        }
      )
    } else if (cls <= 8) {
      questions.push(
        {
          id: `q_m${cls}_01`,
          topicId: 'Exponents & Powers',
          questionType: 'single_choice',
          questionText: 'Evaluate: (2⁴ × 3² × 5) / (6² × 10).',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_1a`, label: 'A', text: '2' },
            { id: `opt_m${cls}_1b`, label: 'B', text: '4' },
            { id: `opt_m${cls}_1c`, label: 'C', text: '6' },
            { id: `opt_m${cls}_1d`, label: 'D', text: '1' },
          ],
        },
        {
          id: `q_m${cls}_02`,
          topicId: 'Linear Equations in One Variable',
          questionType: 'single_choice',
          questionText: 'Solve: (2x - 3) / 5 = (x + 1) / 3.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_2a`, label: 'A', text: 'x = 14' },
            { id: `opt_m${cls}_2b`, label: 'B', text: 'x = 12' },
            { id: `opt_m${cls}_2c`, label: 'C', text: 'x = 10' },
            { id: `opt_m${cls}_2d`, label: 'D', text: 'x = 16' },
          ],
        },
        {
          id: `q_m${cls}_03`,
          topicId: 'Compound Interest & Percentage',
          questionType: 'single_choice',
          questionText: 'Find the simple interest on ₹12,000 at 8% per annum for 2.5 years.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_3a`, label: 'A', text: '₹2,400' },
            { id: `opt_m${cls}_3b`, label: 'B', text: '₹2,160' },
            { id: `opt_m${cls}_3c`, label: 'C', text: '₹2,880' },
            { id: `opt_m${cls}_3d`, label: 'D', text: '₹1,920' },
          ],
        },
        {
          id: `q_m${cls}_04`,
          topicId: 'Quadrilaterals & Geometry',
          questionType: 'single_choice',
          questionText: 'In a parallelogram ABCD, angle A = 70°. What is the measure of adjacent angle B?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_4a`, label: 'A', text: '110°' },
            { id: `opt_m${cls}_4b`, label: 'B', text: '70°' },
            { id: `opt_m${cls}_4c`, label: 'C', text: '90°' },
            { id: `opt_m${cls}_4d`, label: 'D', text: '120°' },
          ],
        },
        {
          id: `q_m${cls}_05`,
          topicId: 'Algebraic Identities',
          questionType: 'single_choice',
          questionText: 'If x + 1/x = 5, find the value of x² + 1/x².',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'hard',
          language: 'en',
          options: [
            { id: `opt_m${cls}_5a`, label: 'A', text: '23' },
            { id: `opt_m${cls}_5b`, label: 'B', text: '25' },
            { id: `opt_m${cls}_5c`, label: 'C', text: '27' },
            { id: `opt_m${cls}_5d`, label: 'D', text: '21' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_m${cls}_01`,
          correctOptionIds: [`opt_m${cls}_1a`],
          solutionSteps: ['1. Numerator: 16 × 9 × 5 = 720.', '2. Denominator: 36 × 10 = 360.', '3. 720 / 360 = 2.'],
          explanation: 'Applying laws of exponents and common factor cancellation.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_02`,
          correctOptionIds: [`opt_m${cls}_2a`],
          solutionSteps: ['1. Cross multiply: 3(2x - 3) = 5(x + 1).', '2. 6x - 9 = 5x + 5.', '3. 6x - 5x = 5 + 9 → x = 14.'],
          explanation: 'Cross multiplication gives x = 14.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_03`,
          correctOptionIds: [`opt_m${cls}_3a`],
          solutionSteps: ['1. SI = (P × R × T) / 100 = (12000 × 8 × 2.5) / 100 = 120 × 20 = ₹2,400.'],
          explanation: 'Simple interest formula.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_04`,
          correctOptionIds: [`opt_m${cls}_4a`],
          solutionSteps: ['1. Adjacent angles of a parallelogram are supplementary (sum = 180°).', '2. Angle B = 180° - 70° = 110°.'],
          explanation: 'Consecutive interior angles sum to 180°.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_05`,
          correctOptionIds: [`opt_m${cls}_5a`],
          solutionSteps: ['1. Square both sides: (x + 1/x)² = 5² = 25.', '2. x² + 2 + 1/x² = 25.', '3. x² + 1/x² = 25 - 2 = 23.'],
          explanation: 'Identity: (a + b)² = a² + 2ab + b².',
          reviewStatus: 'verified',
        }
      )
    } else if (cls <= 10) {
      questions.push(
        {
          id: `q_m${cls}_01`,
          topicId: 'Quadratic Equations & Roots',
          questionType: 'single_choice',
          questionText: 'Find the roots of the quadratic equation: 2x² - 7x + 3 = 0.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_1a`, label: 'A', text: 'x = 3, 1/2' },
            { id: `opt_m${cls}_1b`, label: 'B', text: 'x = -3, -1/2' },
            { id: `opt_m${cls}_1c`, label: 'C', text: 'x = 2, 3/2' },
            { id: `opt_m${cls}_1d`, label: 'D', text: 'x = 1, 3' },
          ],
        },
        {
          id: `q_m${cls}_02`,
          topicId: 'Arithmetic Progressions (AP)',
          questionType: 'single_choice',
          questionText: 'In an AP where the first term a = 4 and common difference d = 3, find the 15th term.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_2a`, label: 'A', text: '46' },
            { id: `opt_m${cls}_2b`, label: 'B', text: '49' },
            { id: `opt_m${cls}_2c`, label: 'C', text: '43' },
            { id: `opt_m${cls}_2d`, label: 'D', text: '52' },
          ],
        },
        {
          id: `q_m${cls}_03`,
          topicId: 'Trigonometry & Identities',
          questionType: 'single_choice',
          questionText: 'If sin θ = 3/5, what is the value of (1 + tan² θ)?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_3a`, label: 'A', text: '25/16' },
            { id: `opt_m${cls}_3b`, label: 'B', text: '16/25' },
            { id: `opt_m${cls}_3c`, label: 'C', text: '9/16' },
            { id: `opt_m${cls}_3d`, label: 'D', text: '25/9' },
          ],
        },
        {
          id: `q_m${cls}_04`,
          topicId: 'Coordinate Geometry',
          questionType: 'single_choice',
          questionText: 'Find the distance between points P(2, -3) and Q(10, 3).',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_4a`, label: 'A', text: '10 units' },
            { id: `opt_m${cls}_4b`, label: 'B', text: '8 units' },
            { id: `opt_m${cls}_4c`, label: 'C', text: '14 units' },
            { id: `opt_m${cls}_4d`, label: 'D', text: '12 units' },
          ],
        },
        {
          id: `q_m${cls}_05`,
          topicId: 'Surface Area & Volumes',
          questionType: 'single_choice',
          questionText: 'If the radius of a metallic sphere is 3 cm, calculate its total surface area in terms of π.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_5a`, label: 'A', text: '36π cm²' },
            { id: `opt_m${cls}_5b`, label: 'B', text: '18π cm²' },
            { id: `opt_m${cls}_5c`, label: 'C', text: '12π cm²' },
            { id: `opt_m${cls}_5d`, label: 'D', text: '27π cm²' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_m${cls}_01`,
          correctOptionIds: [`opt_m${cls}_1a`],
          solutionSteps: ['1. Factorise: 2x² - 6x - x + 3 = 0.', '2. 2x(x - 3) - 1(x - 3) = 0 → (2x - 1)(x - 3) = 0.', '3. x = 3, x = 1/2.'],
          explanation: 'Quadratic factorisation by splitting the middle term.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_02`,
          correctOptionIds: [`opt_m${cls}_2a`],
          solutionSteps: ['1. T_n = a + (n - 1)d.', '2. T_15 = 4 + (15 - 1)×3 = 4 + 42 = 46.'],
          explanation: 'AP nth term formula.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_03`,
          correctOptionIds: [`opt_m${cls}_3a`],
          solutionSteps: ['1. 1 + tan² θ = sec² θ = 1 / cos² θ.', '2. cos θ = √(1 - sin² θ) = √(1 - 9/25) = 4/5.', '3. sec² θ = 1 / (16/25) = 25/16.'],
          explanation: 'Fundamental trigonometric identity.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_04`,
          correctOptionIds: [`opt_m${cls}_4a`],
          solutionSteps: ['1. d = √[(10 - 2)² + (3 - (-3))²] = √[8² + 6²] = √[64 + 36] = √100 = 10 units.'],
          explanation: 'Euclidean distance formula.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_05`,
          correctOptionIds: [`opt_m${cls}_5a`],
          solutionSteps: ['1. Surface Area = 4πr² = 4π(3)² = 4π × 9 = 36π cm².'],
          explanation: 'Sphere surface area formula.',
          reviewStatus: 'verified',
        }
      )
    } else {
      questions.push(
        {
          id: `q_m${cls}_01`,
          topicId: 'Matrices & Determinants',
          questionType: 'single_choice',
          questionText: 'Find the determinant of the 2x2 matrix: [[4, 3], [2, 5]].',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_1a`, label: 'A', text: '14' },
            { id: `opt_m${cls}_1b`, label: 'B', text: '26' },
            { id: `opt_m${cls}_1c`, label: 'C', text: '10' },
            { id: `opt_m${cls}_1d`, label: 'D', text: '18' },
          ],
        },
        {
          id: `q_m${cls}_02`,
          topicId: 'Calculus & Derivatives',
          questionType: 'single_choice',
          questionText: 'Differentiate with respect to x: f(x) = x³ · e^(2x).',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_2a`, label: 'A', text: 'e^(2x) · (2x³ + 3x²)' },
            { id: `opt_m${cls}_2b`, label: 'B', text: '3x² · e^(2x)' },
            { id: `opt_m${cls}_2c`, label: 'C', text: '2x³ · e^(2x)' },
            { id: `opt_m${cls}_2d`, label: 'D', text: '6x² · e^(2x)' },
          ],
        },
        {
          id: `q_m${cls}_03`,
          topicId: 'Definite Integrals',
          questionType: 'single_choice',
          questionText: 'Evaluate the definite integral: ∫ from 0 to 2 of (3x² + 2x) dx.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_3a`, label: 'A', text: '12' },
            { id: `opt_m${cls}_3b`, label: 'B', text: '10' },
            { id: `opt_m${cls}_3c`, label: 'C', text: '16' },
            { id: `opt_m${cls}_3d`, label: 'D', text: '8' },
          ],
        },
        {
          id: `q_m${cls}_04`,
          topicId: 'Vector Algebra',
          questionType: 'single_choice',
          questionText: 'Calculate the dot product of vectors a = 2i + 3j - k and b = i - 2j + 4k.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_m${cls}_4a`, label: 'A', text: '-8' },
            { id: `opt_m${cls}_4b`, label: 'B', text: '8' },
            { id: `opt_m${cls}_4c`, label: 'C', text: '-4' },
            { id: `opt_m${cls}_4d`, label: 'D', text: '0' },
          ],
        },
        {
          id: `q_m${cls}_05`,
          topicId: 'Conditional Probability & Bayes',
          questionType: 'single_choice',
          questionText: 'If P(A) = 0.6, P(B) = 0.5, and P(A ∩ B) = 0.3, find the conditional probability P(A|B).',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_m${cls}_5a`, label: 'A', text: '0.6' },
            { id: `opt_m${cls}_5b`, label: 'B', text: '0.5' },
            { id: `opt_m${cls}_5c`, label: 'C', text: '0.3' },
            { id: `opt_m${cls}_5d`, label: 'D', text: '0.8' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_m${cls}_01`,
          correctOptionIds: [`opt_m${cls}_1a`],
          solutionSteps: ['1. det([[a, b], [c, d]]) = ad - bc.', '2. (4 × 5) - (3 × 2) = 20 - 6 = 14.'],
          explanation: '2x2 determinant formula.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_02`,
          correctOptionIds: [`opt_m${cls}_2a`],
          solutionSteps: ['1. Product rule: d/dx [u·v] = u·v\' + v·u\'.', '2. u = x³, u\' = 3x²; v = e^(2x), v\' = 2e^(2x).', '3. f\'(x) = x³·2e^(2x) + e^(2x)·3x² = e^(2x)(2x³ + 3x²).'],
          explanation: 'Product rule with chain rule.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_03`,
          correctOptionIds: [`opt_m${cls}_3a`],
          solutionSteps: ['1. Antiderivative: x³ + x².', '2. Evaluated from 0 to 2: (2³ + 2²) - 0 = 8 + 4 = 12.'],
          explanation: 'Fundamental theorem of calculus.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_04`,
          correctOptionIds: [`opt_m${cls}_4a`],
          solutionSteps: ['1. a · b = (2×1) + (3×-2) + (-1×4) = 2 - 6 - 4 = -8.'],
          explanation: 'Scalar product of orthogonal components.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_m${cls}_05`,
          correctOptionIds: [`opt_m${cls}_5a`],
          solutionSteps: ['1. P(A|B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 3/5 = 0.6.'],
          explanation: 'Definition of conditional probability.',
          reviewStatus: 'verified',
        }
      )
    }
  } else if (subj === 'science' || subj === 'sci' || subj === 'physics' || subj === 'chemistry' || subj === 'biology') {
    if (cls <= 5) {
      questions.push(
        {
          id: `q_s${cls}_01`,
          topicId: 'Plant Life & Photosynthesis',
          questionType: 'single_choice',
          questionText: 'Which green pigment in leaves absorbs solar sunlight to produce food for the plant?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_1a`, label: 'A', text: 'Chlorophyll' },
            { id: `opt_s${cls}_1b`, label: 'B', text: 'Carotene' },
            { id: `opt_s${cls}_1c`, label: 'C', text: 'Haemoglobin' },
            { id: `opt_s${cls}_1d`, label: 'D', text: 'Melanin' },
          ],
        },
        {
          id: `q_s${cls}_02`,
          topicId: 'Human Body & Digestion',
          questionType: 'single_choice',
          questionText: 'In which organ of the human digestive system is water primarily absorbed from undigested food?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_2a`, label: 'A', text: 'Large Intestine' },
            { id: `opt_s${cls}_2b`, label: 'B', text: 'Stomach' },
            { id: `opt_s${cls}_2c`, label: 'C', text: 'Small Intestine' },
            { id: `opt_s${cls}_2d`, label: 'D', text: 'Oesophagus' },
          ],
        },
        {
          id: `q_s${cls}_03`,
          topicId: 'States of Matter',
          questionType: 'single_choice',
          questionText: 'What is the process called when water vapour cools and turns into liquid water droplets?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_3a`, label: 'A', text: 'Condensation' },
            { id: `opt_s${cls}_3b`, label: 'B', text: 'Evaporation' },
            { id: `opt_s${cls}_3c`, label: 'C', text: 'Sublimation' },
            { id: `opt_s${cls}_3d`, label: 'D', text: 'Sedimentation' },
          ],
        },
        {
          id: `q_s${cls}_04`,
          topicId: 'Forces & Magnets',
          questionType: 'single_choice',
          questionText: 'What happens when the North pole of one bar magnet is brought near the North pole of another magnet?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_4a`, label: 'A', text: 'They repel each other.' },
            { id: `opt_s${cls}_4b`, label: 'B', text: 'They attract each other.' },
            { id: `opt_s${cls}_4c`, label: 'C', text: 'They lose their magnetism.' },
            { id: `opt_s${cls}_4d`, label: 'D', text: 'Nothing happens.' },
          ],
        },
        {
          id: `q_s${cls}_05`,
          topicId: 'Earth & Atmosphere',
          questionType: 'single_choice',
          questionText: 'Which layer of the atmosphere is closest to Earth and contains the air we breathe and weather clouds?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_s${cls}_5a`, label: 'A', text: 'Troposphere' },
            { id: `opt_s${cls}_5b`, label: 'B', text: 'Stratosphere' },
            { id: `opt_s${cls}_5c`, label: 'C', text: 'Mesosphere' },
            { id: `opt_s${cls}_5d`, label: 'D', text: 'Thermosphere' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_s${cls}_01`,
          correctOptionIds: [`opt_s${cls}_1a`],
          solutionSteps: ['1. Chlorophyll trapped inside chloroplasts absorbs red and blue light to convert CO₂ and water into glucose.'],
          explanation: 'Chlorophyll is the green photosynthetic pigment.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_02`,
          correctOptionIds: [`opt_s${cls}_2a`],
          solutionSteps: ['1. The large intestine absorbs water and essential salts from undigested food before elimination.'],
          explanation: 'Large intestine functions in water reabsorption.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_03`,
          correctOptionIds: [`opt_s${cls}_3a`],
          solutionSteps: ['1. Gas turning into liquid upon cooling is called condensation (e.g. dew, rain droplets).'],
          explanation: 'Phase change of gas to liquid is condensation.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_04`,
          correctOptionIds: [`opt_s${cls}_4a`],
          solutionSteps: ['1. Fundamental magnetic law: Like poles repel, unlike poles attract.'],
          explanation: 'North-North interaction produces repulsion.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_05`,
          correctOptionIds: [`opt_s${cls}_5a`],
          solutionSteps: ['1. Troposphere extends 0 to 12 km from ground level, containing 75% of atmospheric mass and weather phenomena.'],
          explanation: 'The lowest atmospheric layer is the troposphere.',
          reviewStatus: 'verified',
        }
      )
    } else {
      questions.push(
        {
          id: `q_s${cls}_01`,
          topicId: 'Acids, Bases & Indicators',
          questionType: 'single_choice',
          questionText: 'When blue litmus paper is dipped into dilute hydrochloric acid (HCl), what color change occurs?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_1a`, label: 'A', text: 'Turns Red' },
            { id: `opt_s${cls}_1b`, label: 'B', text: 'Turns Green' },
            { id: `opt_s${cls}_1c`, label: 'C', text: 'Turns Yellow' },
            { id: `opt_s${cls}_1d`, label: 'D', text: 'Remains Blue' },
          ],
        },
        {
          id: `q_s${cls}_02`,
          topicId: 'Electricity & Ohm’s Law',
          questionType: 'single_choice',
          questionText: 'An electrical resistor of 10 Ω is connected across a 24 V battery. Calculate the current flowing through it.',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_s${cls}_2a`, label: 'A', text: '2.4 A' },
            { id: `opt_s${cls}_2b`, label: 'B', text: '240 A' },
            { id: `opt_s${cls}_2c`, label: 'C', text: '0.41 A' },
            { id: `opt_s${cls}_2d`, label: 'D', text: '14 A' },
          ],
        },
        {
          id: `q_s${cls}_03`,
          topicId: 'Cell Biology & Genetics',
          questionType: 'single_choice',
          questionText: 'Which nitrogenous base is present in RNA but absent in DNA?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'medium',
          language: 'en',
          options: [
            { id: `opt_s${cls}_3a`, label: 'A', text: 'Uracil' },
            { id: `opt_s${cls}_3b`, label: 'B', text: 'Thymine' },
            { id: `opt_s${cls}_3c`, label: 'C', text: 'Guanine' },
            { id: `opt_s${cls}_3d`, label: 'D', text: 'Adenine' },
          ],
        },
        {
          id: `q_s${cls}_04`,
          topicId: 'Optics & Light',
          questionType: 'single_choice',
          questionText: 'What is the focal length of a spherical convex mirror whose radius of curvature is 40 cm?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_4a`, label: 'A', text: '+20 cm' },
            { id: `opt_s${cls}_4b`, label: 'B', text: '-20 cm' },
            { id: `opt_s${cls}_4c`, label: 'C', text: '+80 cm' },
            { id: `opt_s${cls}_4d`, label: 'D', text: '+40 cm' },
          ],
        },
        {
          id: `q_s${cls}_05`,
          topicId: 'Chemical Bonding & Reactions',
          questionType: 'single_choice',
          questionText: 'What type of chemical reaction is represented by: 2H₂ + O₂ → 2H₂O?',
          marks: 2,
          negativeMarkingRatio: 0,
          difficulty: 'easy',
          language: 'en',
          options: [
            { id: `opt_s${cls}_5a`, label: 'A', text: 'Combination (Synthesis) Reaction' },
            { id: `opt_s${cls}_5b`, label: 'B', text: 'Decomposition Reaction' },
            { id: `opt_s${cls}_5c`, label: 'C', text: 'Displacement Reaction' },
            { id: `opt_s${cls}_5d`, label: 'D', text: 'Double Displacement Reaction' },
          ],
        }
      )

      solutions.push(
        {
          questionId: `q_s${cls}_01`,
          correctOptionIds: [`opt_s${cls}_1a`],
          solutionSteps: ['1. Acids turn blue litmus red. Bases turn red litmus blue.'],
          explanation: 'HCl is a strong mineral acid.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_02`,
          correctOptionIds: [`opt_s${cls}_2a`],
          solutionSteps: ['1. I = V / R = 24 V / 10 Ω = 2.4 A.'],
          explanation: 'Ohm’s law: I = V/R.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_03`,
          correctOptionIds: [`opt_s${cls}_3a`],
          solutionSteps: ['1. DNA contains Adenine, Thymine, Guanine, Cytosine.', '2. RNA replaces Thymine with Uracil.'],
          explanation: 'Uracil pairs with Adenine in RNA.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_04`,
          correctOptionIds: [`opt_s${cls}_4a`],
          solutionSteps: ['1. f = R / 2 = 40 / 2 = +20 cm for a convex mirror.'],
          explanation: 'Focal length is half radius of curvature.',
          reviewStatus: 'verified',
        },
        {
          questionId: `q_s${cls}_05`,
          correctOptionIds: [`opt_s${cls}_5a`],
          solutionSteps: ['1. Two elements combine to form a single compound: combination reaction.'],
          explanation: 'Synthesis of water from hydrogen and oxygen.',
          reviewStatus: 'verified',
        }
      )
    }
  } else if (subj === 'english' || subj === 'eng') {
    questions.push(
      {
        id: `q_eng_${cls}_01`,
        topicId: 'Subject-Verb Concord',
        questionType: 'single_choice',
        questionText: 'Identify the sentence with the correct grammatical subject-verb agreement:',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eng_${cls}_1a`, label: 'A', text: 'Neither the principal nor the teachers were present at the seminar.' },
          { id: `opt_eng_${cls}_1b`, label: 'B', text: 'Neither the principal nor the teachers was present at the seminar.' },
          { id: `opt_eng_${cls}_1c`, label: 'C', text: 'Neither the principal nor the teachers has been present.' },
          { id: `opt_eng_${cls}_1d`, label: 'D', text: 'Neither the principal nor the teachers is being present.' },
        ],
      },
      {
        id: `q_eng_${cls}_02`,
        topicId: 'Tenses & Active-Passive Voice',
        questionType: 'single_choice',
        questionText: 'Convert into correct passive voice: "The scientific team will publish the research findings next month."',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eng_${cls}_2a`, label: 'A', text: 'The research findings will be published by the scientific team next month.' },
          { id: `opt_eng_${cls}_2b`, label: 'B', text: 'The research findings would be published by the team next month.' },
          { id: `opt_eng_${cls}_2c`, label: 'C', text: 'The research findings will have been published next month.' },
          { id: `opt_eng_${cls}_2d`, label: 'D', text: 'The research findings is being published by the scientific team.' },
        ],
      },
      {
        id: `q_eng_${cls}_03`,
        topicId: 'Reported Speech',
        questionType: 'single_choice',
        questionText: 'Convert into indirect speech: The teacher said, "Did everyone complete the science project?"',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eng_${cls}_3a`, label: 'A', text: 'The teacher enquired if everyone had completed the science project.' },
          { id: `opt_eng_${cls}_3b`, label: 'B', text: 'The teacher asked that did everyone complete the science project.' },
          { id: `opt_eng_${cls}_3c`, label: 'C', text: 'The teacher said whether everyone completed the project.' },
          { id: `opt_eng_${cls}_3d`, label: 'D', text: 'The teacher enquired that had everyone completed the project.' },
        ],
      },
      {
        id: `q_eng_${cls}_04`,
        topicId: 'Vocabulary & Idioms',
        questionType: 'single_choice',
        questionText: 'What is the precise contextual meaning of the idiom: "A blessing in disguise"?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_eng_${cls}_4a`, label: 'A', text: 'An apparent misfortune that eventually produces beneficial results.' },
          { id: `opt_eng_${cls}_4b`, label: 'B', text: 'A completely unexpected financial expense.' },
          { id: `opt_eng_${cls}_4c`, label: 'C', text: 'A secretive ceremony conducted in private.' },
          { id: `opt_eng_${cls}_4d`, label: 'D', text: 'A false praise given by a deceptive friend.' },
        ],
      },
      {
        id: `q_eng_${cls}_05`,
        topicId: 'Poetic Devices & Literature',
        questionType: 'single_choice',
        questionText: 'Identify the poetic device used in: "The whispering trees danced gracefully in the evening breeze."',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_eng_${cls}_5a`, label: 'A', text: 'Personification (attributing human qualities to non-human entities)' },
          { id: `opt_eng_${cls}_5b`, label: 'B', text: 'Simile' },
          { id: `opt_eng_${cls}_5c`, label: 'C', text: 'Hyperbole' },
          { id: `opt_eng_${cls}_5d`, label: 'D', text: 'Oxymoron' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_eng_${cls}_01`,
        correctOptionIds: [`opt_eng_${cls}_1a`],
        solutionSteps: ['1. With "neither...nor", the verb agrees with the closer subject ("teachers" is plural, so use "were").'],
        explanation: 'Rule of proximity for correlative conjunctions.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eng_${cls}_02`,
        correctOptionIds: [`opt_eng_${cls}_2a`],
        solutionSteps: ['1. Future simple passive: will + be + past participle (published).'],
        explanation: 'Active will + V1 converts to will + be + V3.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eng_${cls}_03`,
        correctOptionIds: [`opt_eng_${cls}_3a`],
        solutionSteps: ['1. Yes/no interrogative backshifts: simple past "Did complete" → past perfect "had completed" with conjunction "if".'],
        explanation: 'Indirect question syntax.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eng_${cls}_04`,
        correctOptionIds: [`opt_eng_${cls}_4a`],
        solutionSteps: ['1. "A blessing in disguise" means something that seems bad at first turns out to be good.'],
        explanation: 'Idiomatic definition.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eng_${cls}_05`,
        correctOptionIds: [`opt_eng_${cls}_5a`],
        solutionSteps: ['1. Trees "whispering" and "dancing" gives human actions to inanimate trees, which is personification.'],
        explanation: 'Personification gives human traits to nature.',
        reviewStatus: 'verified',
      }
    )
  } else if (subj.includes('bio')) {
    // Biology (Botany & Zoology)
    questions.push(
      {
        id: `q_bio_${cls}_01`,
        topicId: 'Molecular Genetics & DNA Replication',
        questionType: 'single_choice',
        questionText: 'Which enzyme is primarily responsible for unwinding and separating the double-stranded DNA helix at the replication fork?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_bio_${cls}_1a`, label: 'A', text: 'DNA Helicase' },
          { id: `opt_bio_${cls}_1b`, label: 'B', text: 'DNA Ligase' },
          { id: `opt_bio_${cls}_1c`, label: 'C', text: 'RNA Polymerase' },
          { id: `opt_bio_${cls}_1d`, label: 'D', text: 'Topoisomerase' },
        ],
      },
      {
        id: `q_bio_${cls}_02`,
        topicId: 'Mendelian Principles of Inheritance',
        questionType: 'single_choice',
        questionText: 'In a classical Mendelian dihybrid cross (RrYy × RrYy), what is the expected phenotypic ratio in the F2 generation?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_bio_${cls}_2a`, label: 'A', text: '9 : 3 : 3 : 1' },
          { id: `opt_bio_${cls}_2b`, label: 'B', text: '3 : 1' },
          { id: `opt_bio_${cls}_2c`, label: 'C', text: '1 : 2 : 1' },
          { id: `opt_bio_${cls}_2d`, label: 'D', text: '9 : 7' },
        ],
      },
      {
        id: `q_bio_${cls}_03`,
        topicId: 'Plant Physiology & Calvin Cycle',
        questionType: 'single_choice',
        questionText: 'In C3 plants, what is the primary CO₂ acceptor enzyme located in the chloroplast stroma?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_bio_${cls}_3a`, label: 'A', text: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase)' },
          { id: `opt_bio_${cls}_3b`, label: 'B', text: 'PEP Carboxylase' },
          { id: `opt_bio_${cls}_3c`, label: 'C', text: 'ATP Synthase' },
          { id: `opt_bio_${cls}_3d`, label: 'D', text: 'Pyruvate Dehydrogenase' },
        ],
      },
      {
        id: `q_bio_${cls}_04`,
        topicId: 'Human Renal Physiology',
        questionType: 'single_choice',
        questionText: 'Which hairpin-shaped segment of the human nephron creates a hyperosmotic medullary gradient via countercurrent multiplication?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'hard',
        language: 'en',
        options: [
          { id: `opt_bio_${cls}_4a`, label: 'A', text: 'Loop of Henle' },
          { id: `opt_bio_${cls}_4b`, label: 'B', text: 'Bowman’s Capsule' },
          { id: `opt_bio_${cls}_4c`, label: 'C', text: 'Proximal Convoluted Tubule (PCT)' },
          { id: `opt_bio_${cls}_4d`, label: 'D', text: 'Distal Convoluted Tubule (DCT)' },
        ],
      },
      {
        id: `q_bio_${cls}_05`,
        topicId: 'Ecosystem & Energy Dynamics',
        questionType: 'single_choice',
        questionText: 'According to Lindeman’s ecological efficiency rule, approximately what percentage of energy is transferred to the next consecutive trophic level?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_bio_${cls}_5a`, label: 'A', text: '10%' },
          { id: `opt_bio_${cls}_5b`, label: 'B', text: '50%' },
          { id: `opt_bio_${cls}_5c`, label: 'C', text: '100%' },
          { id: `opt_bio_${cls}_5d`, label: 'D', text: '1%' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_bio_${cls}_01`,
        correctOptionIds: [`opt_bio_${cls}_1a`],
        solutionSteps: ['1. Helicase breaks hydrogen bonds between nucleotide bases to separate strands.'],
        explanation: 'DNA Helicase unwinds the double helix at the replication fork.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_bio_${cls}_02`,
        correctOptionIds: [`opt_bio_${cls}_2a`],
        solutionSteps: ['1. Dihybrid independent assortment yields (3:1) × (3:1) = 9:3:3:1.'],
        explanation: 'Classical Mendelian dihybrid phenotypic ratio.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_bio_${cls}_03`,
        correctOptionIds: [`opt_bio_${cls}_3a`],
        solutionSteps: ['1. RuBisCO fixes CO₂ to 5-carbon RuBP, forming 3-PGA.'],
        explanation: 'RuBisCO is the most abundant enzyme on Earth.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_bio_${cls}_04`,
        correctOptionIds: [`opt_bio_${cls}_4a`],
        solutionSteps: ['1. Loop of Henle descends into renal medulla creating osmotic multiplier gradient.'],
        explanation: 'Loop of Henle operates countercurrent multiplier system.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_bio_${cls}_05`,
        correctOptionIds: [`opt_bio_${cls}_5a`],
        solutionSteps: ['1. Lindeman’s 10% law dictates only ~10% chemical energy is stored at successive trophic levels.'],
        explanation: 'Lindeman 10% trophic efficiency rule.',
        reviewStatus: 'verified',
      }
    )
  } else if (subj.includes('comp') || subj.includes('info') || subj === 'it' || subj === 'cs') {
    // Computer Science & Information Technology
    questions.push(
      {
        id: `q_cs_${cls}_01`,
        topicId: 'Python Core Data Types',
        questionType: 'single_choice',
        questionText: 'In Python 3, which of the following standard data types is immutable (cannot be altered in place after instantiation)?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_cs_${cls}_1a`, label: 'A', text: 'Tuple' },
          { id: `opt_cs_${cls}_1b`, label: 'B', text: 'List' },
          { id: `opt_cs_${cls}_1c`, label: 'C', text: 'Dictionary' },
          { id: `opt_cs_${cls}_1d`, label: 'D', text: 'Set' },
        ],
      },
      {
        id: `q_cs_${cls}_02`,
        topicId: 'List Comprehension & Loops',
        questionType: 'single_choice',
        questionText: 'What is the evaluated output of the Python expression: [x**2 for x in range(5) if x % 2 == 1]?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_cs_${cls}_2a`, label: 'A', text: '[1, 9]' },
          { id: `opt_cs_${cls}_2b`, label: 'B', text: '[0, 4, 16]' },
          { id: `opt_cs_${cls}_2c`, label: 'C', text: '[1, 3, 5]' },
          { id: `opt_cs_${cls}_2d`, label: 'D', text: '[1, 4, 9, 16]' },
        ],
      },
      {
        id: `q_cs_${cls}_03`,
        topicId: 'Relational Database Management (SQL)',
        questionType: 'single_choice',
        questionText: 'Which SQL keyword is specifically utilized to filter out duplicate rows and return unique values from a table query?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_cs_${cls}_3a`, label: 'A', text: 'SELECT DISTINCT' },
          { id: `opt_cs_${cls}_3b`, label: 'B', text: 'SELECT UNIQUE' },
          { id: `opt_cs_${cls}_3c`, label: 'C', text: 'SELECT ISOLATE' },
          { id: `opt_cs_${cls}_3d`, label: 'D', text: 'SELECT NO_REPEAT' },
        ],
      },
      {
        id: `q_cs_${cls}_04`,
        topicId: 'Abstract Data Types (Stack)',
        questionType: 'single_choice',
        questionText: 'Which data structure follows the strict Last-In, First-Out (LIFO) operational discipline with push() and pop()?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_cs_${cls}_4a`, label: 'A', text: 'Stack' },
          { id: `opt_cs_${cls}_4b`, label: 'B', text: 'Queue' },
          { id: `opt_cs_${cls}_4c`, label: 'C', text: 'Singly Linked List' },
          { id: `opt_cs_${cls}_4d`, label: 'D', text: 'Binary Search Tree' },
        ],
      },
      {
        id: `q_cs_${cls}_05`,
        topicId: 'Computer Networks & Protocols',
        questionType: 'single_choice',
        questionText: 'Which transport layer protocol provides connection-oriented, guaranteed, byte-stream transmission with a 3-way handshake?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_cs_${cls}_5a`, label: 'A', text: 'TCP (Transmission Control Protocol)' },
          { id: `opt_cs_${cls}_5b`, label: 'B', text: 'UDP (User Datagram Protocol)' },
          { id: `opt_cs_${cls}_5c`, label: 'C', text: 'IP (Internet Protocol)' },
          { id: `opt_cs_${cls}_5d`, label: 'D', text: 'ICMP (Internet Control Message Protocol)' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_cs_${cls}_01`,
        correctOptionIds: [`opt_cs_${cls}_1a`],
        solutionSteps: ['1. Tuples, strings, and integers are immutable in Python.'],
        explanation: 'Tuples cannot have their elements modified after creation.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_cs_${cls}_02`,
        correctOptionIds: [`opt_cs_${cls}_2a`],
        solutionSteps: ['1. range(5) = 0, 1, 2, 3, 4. Odd values are 1 and 3. Squares: 1² = 1, 3² = 9.'],
        explanation: 'Evaluating comprehension gives [1, 9].',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_cs_${cls}_03`,
        correctOptionIds: [`opt_cs_${cls}_3a`],
        solutionSteps: ['1. SELECT DISTINCT column_name eliminates duplicate tuples from query results.'],
        explanation: 'SQL standard syntax uses DISTINCT.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_cs_${cls}_04`,
        correctOptionIds: [`opt_cs_${cls}_4a`],
        solutionSteps: ['1. Stack operates on LIFO (Last In First Out). Queue operates on FIFO.'],
        explanation: 'A stack enforces LIFO order.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_cs_${cls}_05`,
        correctOptionIds: [`opt_cs_${cls}_5a`],
        solutionSteps: ['1. TCP performs SYN, SYN-ACK, ACK 3-way handshake for reliable delivery.'],
        explanation: 'TCP is connection-oriented and reliable.',
        reviewStatus: 'verified',
      }
    )
  } else if (subj.includes('eco')) {
    // Economics (Macroeconomics, Microeconomics & Indian Economy)
    questions.push(
      {
        id: `q_eco_${cls}_01`,
        topicId: 'National Income Accounting',
        questionType: 'single_choice',
        questionText: 'What is the correct mathematical relationship between GDP at Market Price (GDP_MP) and GDP at Factor Cost (GDP_FC)?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eco_${cls}_1a`, label: 'A', text: 'GDP_FC = GDP_MP - Net Indirect Taxes (NIT)' },
          { id: `opt_eco_${cls}_1b`, label: 'B', text: 'GDP_FC = GDP_MP + Net Indirect Taxes (NIT)' },
          { id: `opt_eco_${cls}_1c`, label: 'C', text: 'GDP_FC = GDP_MP - Depreciation' },
          { id: `opt_eco_${cls}_1d`, label: 'D', text: 'GDP_FC = GDP_MP + Net Factor Income from Abroad (NFIA)' },
        ],
      },
      {
        id: `q_eco_${cls}_02`,
        topicId: 'Monetary Policy & Central Banking',
        questionType: 'single_choice',
        questionText: 'When the Reserve Bank of India (RBI) aims to rein in high inflation, what monetary measure does it implement regarding the Repo Rate?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eco_${cls}_2a`, label: 'A', text: 'Increases the Repo Rate' },
          { id: `opt_eco_${cls}_2b`, label: 'B', text: 'Decreases the Repo Rate' },
          { id: `opt_eco_${cls}_2c`, label: 'C', text: 'Reduces the Cash Reserve Ratio (CRR)' },
          { id: `opt_eco_${cls}_2d`, label: 'D', text: 'Purchases securities via Open Market Operations' },
        ],
      },
      {
        id: `q_eco_${cls}_03`,
        topicId: 'Consumer Utility & Microeconomics',
        questionType: 'single_choice',
        questionText: 'Which economic law states that as consumption of a good expands, the additional satisfaction from each subsequent unit declines?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_eco_${cls}_3a`, label: 'A', text: 'Law of Diminishing Marginal Utility' },
          { id: `opt_eco_${cls}_3b`, label: 'B', text: 'Law of Variable Proportions' },
          { id: `opt_eco_${cls}_3c`, label: 'C', text: 'Law of Increasing Returns' },
          { id: `opt_eco_${cls}_3d`, label: 'D', text: 'Engel’s Expenditure Law' },
        ],
      },
      {
        id: `q_eco_${cls}_04`,
        topicId: 'Government Budget & Fiscal Deficit',
        questionType: 'single_choice',
        questionText: 'Fiscal Deficit in a union government budget represents:',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_eco_${cls}_4a`, label: 'A', text: 'Total Expenditure - Total Receipts (excluding borrowings)' },
          { id: `opt_eco_${cls}_4b`, label: 'B', text: 'Revenue Expenditure - Revenue Receipts' },
          { id: `opt_eco_${cls}_4c`, label: 'C', text: 'Fiscal Deficit - Interest Payments' },
          { id: `opt_eco_${cls}_4d`, label: 'D', text: 'Capital Expenditure - Capital Receipts' },
        ],
      },
      {
        id: `q_eco_${cls}_05`,
        topicId: 'Indian Economic Development (1991)',
        questionType: 'single_choice',
        questionText: 'The New Economic Policy (NEP) launched in India in July 1991 was anchored on which core triad of reforms?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_eco_${cls}_5a`, label: 'A', text: 'Liberalisation, Privatisation, and Globalisation (LPG)' },
          { id: `opt_eco_${cls}_5b`, label: 'B', text: 'License Raj, Import Substitution, and Nationalisation' },
          { id: `opt_eco_${cls}_5c`, label: 'C', text: 'Five-Year Plans, Monopoly Controls, and Price Ceilings' },
          { id: `opt_eco_${cls}_5d`, label: 'D', text: 'Agricultural Subsidies, Export Bans, and Public Monopolies' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_eco_${cls}_01`,
        correctOptionIds: [`opt_eco_${cls}_1a`],
        solutionSteps: ['1. Net Indirect Taxes = Indirect Taxes - Subsidies. Factor Cost = Market Price - NIT.'],
        explanation: 'GDP_FC = GDP_MP - NIT.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eco_${cls}_02`,
        correctOptionIds: [`opt_eco_${cls}_2a`],
        solutionSteps: ['1. Raising repo rate increases interest rates, curbing commercial credit creation and cooling inflation.'],
        explanation: 'Contractionary monetary policy hikes repo rate.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eco_${cls}_03`,
        correctOptionIds: [`opt_eco_${cls}_3a`],
        solutionSteps: ['1. Gossen’s First Law: Marginal utility diminishes with every successive unit consumed.'],
        explanation: 'Law of Diminishing Marginal Utility.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eco_${cls}_04`,
        correctOptionIds: [`opt_eco_${cls}_4a`],
        solutionSteps: ['1. Fiscal deficit indicates total net borrowing requirements of the government.'],
        explanation: 'Total expenditure minus non-debt receipts equals fiscal deficit.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_eco_${cls}_05`,
        correctOptionIds: [`opt_eco_${cls}_5a`],
        solutionSteps: ['1. Dr. Manmohan Singh and P.V. Narasimha Rao spearheaded 1991 LPG reforms.'],
        explanation: '1991 LPG reforms dismantled industrial licensing.',
        reviewStatus: 'verified',
      }
    )
  } else {
    // Social Science / History / Geography / Civics
    questions.push(
      {
        id: `q_sst_${cls}_01`,
        topicId: 'Indian Constitution & Fundamental Rights',
        questionType: 'single_choice',
        questionText: 'Which Article of the Constitution of India guarantees the Right to Equality before the law?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_sst_${cls}_1a`, label: 'A', text: 'Article 14' },
          { id: `opt_sst_${cls}_1b`, label: 'B', text: 'Article 19' },
          { id: `opt_sst_${cls}_1c`, label: 'C', text: 'Article 21' },
          { id: `opt_sst_${cls}_1d`, label: 'D', text: 'Article 32' },
        ],
      },
      {
        id: `q_sst_${cls}_02`,
        topicId: 'Sectors of Indian Economy',
        questionType: 'single_choice',
        questionText: 'In which economic sector do agriculture, forestry, fishing, and dairy farming fall?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_sst_${cls}_2a`, label: 'A', text: 'Primary Sector' },
          { id: `opt_sst_${cls}_2b`, label: 'B', text: 'Secondary Sector' },
          { id: `opt_sst_${cls}_2c`, label: 'C', text: 'Tertiary (Service) Sector' },
          { id: `opt_sst_${cls}_2d`, label: 'D', text: 'Quaternary Sector' },
        ],
      },
      {
        id: `q_sst_${cls}_03`,
        topicId: 'Physical Geography & Resources',
        questionType: 'single_choice',
        questionText: 'Which soil type, formed from volcanic basalt lava, is best suited for cotton cultivation in the Deccan Plateau?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_sst_${cls}_3a`, label: 'A', text: 'Black Soil (Regur Soil)' },
          { id: `opt_sst_${cls}_3b`, label: 'B', text: 'Alluvial Soil' },
          { id: `opt_sst_${cls}_3c`, label: 'C', text: 'Laterite Soil' },
          { id: `opt_sst_${cls}_3d`, label: 'D', text: 'Red and Yellow Soil' },
        ],
      },
      {
        id: `q_sst_${cls}_04`,
        topicId: 'Democratic Politics & Federalism',
        questionType: 'single_choice',
        questionText: 'What is the minimum voting age for a citizen of India in Lok Sabha and Vidhan Sabha elections?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'easy',
        language: 'en',
        options: [
          { id: `opt_sst_${cls}_4a`, label: 'A', text: '18 Years (Universal Adult Suffrage)' },
          { id: `opt_sst_${cls}_4b`, label: 'B', text: '21 Years' },
          { id: `opt_sst_${cls}_4c`, label: 'C', text: '25 Years' },
          { id: `opt_sst_${cls}_4d`, label: 'D', text: '16 Years' },
        ],
      },
      {
        id: `q_sst_${cls}_05`,
        topicId: 'Modern Indian History',
        questionType: 'single_choice',
        questionText: 'In which year and from where did Mahatma Gandhi launch the historic Dandi Salt March?',
        marks: 2,
        negativeMarkingRatio: 0,
        difficulty: 'medium',
        language: 'en',
        options: [
          { id: `opt_sst_${cls}_5a`, label: 'A', text: '1930 from Sabarmati Ashram' },
          { id: `opt_sst_${cls}_5b`, label: 'B', text: '1920 from Champaran' },
          { id: `opt_sst_${cls}_5c`, label: 'C', text: '1942 from Wardha' },
          { id: `opt_sst_${cls}_5d`, label: 'D', text: '1919 from Amritsar' },
        ],
      }
    )

    solutions.push(
      {
        questionId: `q_sst_${cls}_01`,
        correctOptionIds: [`opt_sst_${cls}_1a`],
        solutionSteps: ['1. Article 14 establishes equality before law and equal protection of laws.'],
        explanation: 'Article 14 guarantees Right to Equality.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_sst_${cls}_02`,
        correctOptionIds: [`opt_sst_${cls}_2a`],
        solutionSteps: ['1. Activities directly exploiting natural resources (soil, water, forests) form the Primary Sector.'],
        explanation: 'Agriculture is the backbone of the primary sector.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_sst_${cls}_03`,
        correctOptionIds: [`opt_sst_${cls}_3a`],
        solutionSteps: ['1. Black soil (also known as Regur soil) has high clay content and moisture retention, ideal for cotton.'],
        explanation: 'Black soil is also called black cotton soil.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_sst_${cls}_04`,
        correctOptionIds: [`opt_sst_${cls}_4a`],
        solutionSteps: ['1. 61st Constitutional Amendment Act lowered the voting age from 21 to 18 years.'],
        explanation: 'Article 326 guarantees voting at age 18.',
        reviewStatus: 'verified',
      },
      {
        questionId: `q_sst_${cls}_05`,
        correctOptionIds: [`opt_sst_${cls}_5a`],
        solutionSteps: ['1. Dandi March began on 12 March 1930 from Sabarmati Ashram, reaching Dandi on 6 April 1930.'],
        explanation: 'Salt Satyagraha began in 1930 from Sabarmati.',
        reviewStatus: 'verified',
      }
    )
  }

  const blueprint: AssessmentBlueprint = {
    id: `bp_diag_c${cls}_${subj}`,
    title: `Class ${cls} ${subj.toUpperCase()} Diagnostic Assessment (${boardCode})`,
    subjectId: `subj_c${cls}_${subj}`,
    chapterId: 'diagnostic_core',
    durationMinutes: 10,
    totalQuestions: questions.length,
    totalMarks: questions.length * 2,
    negativeMarkingRatio: 0,
    passingPercentage: 60,
    rewardCreditAmount: 20,
    examType: 'periodic_test',
    category: 'academic',
    difficulty: 'medium',
  }

  return { blueprint, questions, solutions }
}
