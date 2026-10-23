import type {
  CurriculumBoard,
  AcademicClass,
  Subject,
  Chapter,
  Topic,
  AuthorizedQuestion,
  ConfidentialQuestionSolution,
  AssessmentBlueprint,
} from '../types'

export const SEED_BOARDS: CurriculumBoard[] = [
  { id: 'board_cbse', code: 'CBSE', name: 'Central Board of Secondary Education', country: 'IN' },
  { id: 'board_icse', code: 'CISCE', name: 'Council for the Indian School Certificate Examinations', country: 'IN' },
]

export const SEED_CLASSES: AcademicClass[] = [
  { id: 'class_g3', boardId: 'board_cbse', gradeNumber: 3, code: 'class-3', name: 'Grade III' },
  { id: 'class_g4', boardId: 'board_cbse', gradeNumber: 4, code: 'class-4', name: 'Grade IV' },
]

export const SEED_GRADE4_SUBJECTS: Subject[] = [
  {
    id: 'subj_g4_math',
    classId: 'class_g4',
    code: 'math',
    name: 'Mathematics',
    colorTheme: 'amber',
    iconName: 'Calculator',
    totalTests: 10,
    completedTests: 3,
  },
  {
    id: 'subj_g4_sci',
    classId: 'class_g4',
    code: 'science',
    name: 'Science',
    colorTheme: 'emerald',
    iconName: 'FlaskConical',
    totalTests: 8,
    completedTests: 2,
  },
  {
    id: 'subj_g4_eng',
    classId: 'class_g4',
    code: 'english',
    name: 'English',
    colorTheme: 'blue',
    iconName: 'BookOpen',
    totalTests: 10,
    completedTests: 4,
  },
  {
    id: 'subj_g4_hin',
    classId: 'class_g4',
    code: 'hindi',
    name: 'Hindi',
    colorTheme: 'pink',
    iconName: 'Languages',
    totalTests: 8,
    completedTests: 1,
  },
  {
    id: 'subj_g4_sst',
    classId: 'class_g4',
    code: 'social_science',
    name: 'Social Science',
    colorTheme: 'purple',
    iconName: 'Compass',
    totalTests: 6,
    completedTests: 2,
  },
]

export const SEED_CHAPTERS: Chapter[] = [
  {
    id: 'chap_g4_math_c6',
    subjectId: 'subj_g4_math',
    chapterNumber: 6,
    title: 'Ch - 6 Multiples',
    description: 'Understanding multiples, properties of multiples, and common multiples.',
    totalTopics: 3,
  },
  {
    id: 'chap_g4_math_c7',
    subjectId: 'subj_g4_math',
    chapterNumber: 7,
    title: 'Ch - 7 Fractions',
    description: 'Proper, improper and unit fractions with visual representations.',
    totalTopics: 4,
  },
  {
    id: 'chap_g4_sci_u5',
    subjectId: 'subj_g4_sci',
    chapterNumber: 5,
    title: 'Unit 5 - Force and Magnetism',
    description: 'Gravity, normal force, applied force, friction, air resistance and upthrust.',
    totalTopics: 5,
  },
]

export const SEED_TOPICS: Topic[] = [
  { id: 'top_g4_m6_1', chapterId: 'chap_g4_math_c6', title: 'Concept and Definition of Multiples' },
  { id: 'top_g4_m6_2', chapterId: 'chap_g4_math_c6', title: 'Properties of Multiples and 6-times Table' },
  { id: 'top_g4_m6_3', chapterId: 'chap_g4_math_c6', title: 'Common Multiples' },
]

export const SEED_BLUEPRINT_MATH_C6: AssessmentBlueprint = {
  id: 'bp_g4_math_pt2_c6',
  title: 'Mathematics Ch - 6 Multiples Practice Test',
  subjectId: 'subj_g4_math',
  chapterId: 'chap_g4_math_c6',
  durationMinutes: 15,
  totalQuestions: 10,
  totalMarks: 20,
  negativeMarkingRatio: 0.0,
  passingPercentage: 60,
  rewardCreditAmount: 20, // ₹20 Pass Credit
  examType: 'periodic_test',
}

/**
 * AUTHORIZED QUESTIONS (Sent to client during active test)
 */
export const SEED_AUTHORIZED_QUESTIONS: AuthorizedQuestion[] = [
  {
    id: 'q_g4_m6_01',
    topicId: 'top_g4_m6_1',
    questionType: 'single_choice',
    questionText: 'What is the 4th multiple of 7?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_1a', label: 'A', text: '21' },
      { id: 'opt_1b', label: 'B', text: '28' },
      { id: 'opt_1c', label: 'C', text: '35' },
      { id: 'opt_1d', label: 'D', text: '14' },
    ],
  },
  {
    id: 'q_g4_m6_02',
    topicId: 'top_g4_m6_1',
    questionType: 'single_choice',
    questionText: 'Which of the following is the smallest non-zero multiple of 9?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_2a', label: 'A', text: '0' },
      { id: 'opt_2b', label: 'B', text: '1' },
      { id: 'opt_2c', label: 'C', text: '9' },
      { id: 'opt_2d', label: 'D', text: '18' },
    ],
  },
  {
    id: 'q_g4_m6_03',
    topicId: 'top_g4_m6_2',
    questionType: 'single_choice',
    questionText: 'Which of the following numbers is a common multiple of 3 and 4?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'medium',
    language: 'en',
    options: [
      { id: 'opt_3a', label: 'A', text: '8' },
      { id: 'opt_3b', label: 'B', text: '9' },
      { id: 'opt_3c', label: 'C', text: '12' },
      { id: 'opt_3d', label: 'D', text: '15' },
    ],
  },
  {
    id: 'q_g4_m6_04',
    topicId: 'top_g4_m6_2',
    questionType: 'true_false',
    questionText: 'Every number is a multiple of itself. True or False?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_4a', label: 'A', text: 'True' },
      { id: 'opt_4b', label: 'B', text: 'False' },
    ],
  },
  {
    id: 'q_g4_m6_05',
    topicId: 'top_g4_m6_1',
    questionType: 'single_choice',
    questionText: 'Which of these is NOT a multiple of 8?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_5a', label: 'A', text: '16' },
      { id: 'opt_5b', label: 'B', text: '24' },
      { id: 'opt_5c', label: 'C', text: '36' },
      { id: 'opt_5d', label: 'D', text: '48' },
    ],
  },
  {
    id: 'q_g4_m6_06',
    topicId: 'top_g4_m6_2',
    questionType: 'single_choice',
    questionText: 'Find the first two common multiples of 2 and 5.',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'medium',
    language: 'en',
    options: [
      { id: 'opt_6a', label: 'A', text: '5 and 10' },
      { id: 'opt_6b', label: 'B', text: '10 and 20' },
      { id: 'opt_6c', label: 'C', text: '10 and 15' },
      { id: 'opt_6d', label: 'D', text: '20 and 30' },
    ],
  },
  // QUESTION 7 MATCHING THE EXACT SCREENSHOT IN USER'S ATTACHED IMAGE!
  {
    id: 'q_g4_m6_07',
    topicId: 'top_g4_m6_2',
    questionType: 'single_choice',
    questionText: 'Which of the following numbers is a multiple of 6?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_7a', label: 'A', text: '14' },
      { id: 'opt_7b', label: 'B', text: '18' },
      { id: 'opt_7c', label: 'C', text: '20' },
      { id: 'opt_7d', label: 'D', text: '22' },
    ],
  },
  {
    id: 'q_g4_m6_08',
    topicId: 'top_g4_m6_1',
    questionType: 'single_choice',
    questionText: 'The 10th multiple of 5 is:',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'easy',
    language: 'en',
    options: [
      { id: 'opt_8a', label: 'A', text: '45' },
      { id: 'opt_8b', label: 'B', text: '50' },
      { id: 'opt_8c', label: 'C', text: '55' },
      { id: 'opt_8d', label: 'D', text: '60' },
    ],
  },
  {
    id: 'q_g4_m6_09',
    topicId: 'top_g4_m6_2',
    questionType: 'single_choice',
    questionText: 'Is 42 a multiple of 7? Explain why.',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'medium',
    language: 'en',
    options: [
      { id: 'opt_9a', label: 'A', text: 'Yes, because 7 × 6 = 42' },
      { id: 'opt_9b', label: 'B', text: 'No, because 42 is an even number' },
      { id: 'opt_9c', label: 'C', text: 'Yes, because 42 + 7 = 49' },
      { id: 'opt_9d', label: 'D', text: 'No, 7 does not divide 42' },
    ],
  },
  {
    id: 'q_g4_m6_10',
    topicId: 'top_g4_m6_3',
    questionType: 'single_choice',
    questionText: 'What is the least common multiple (LCM) of 4 and 6?',
    marks: 2,
    negativeMarkingRatio: 0,
    difficulty: 'medium',
    language: 'en',
    options: [
      { id: 'opt_10a', label: 'A', text: '24' },
      { id: 'opt_10b', label: 'B', text: '12' },
      { id: 'opt_10c', label: 'C', text: '16' },
      { id: 'opt_10d', label: 'D', text: '8' },
    ],
  },
]

/**
 * CONFIDENTIAL SOLUTIONS (Stored strictly on backend server)
 */
export const SEED_CONFIDENTIAL_SOLUTIONS = new Map<string, ConfidentialQuestionSolution>([
  [
    'q_g4_m6_01',
    {
      questionId: 'q_g4_m6_01',
      correctOptionIds: ['opt_1b'],
      solutionSteps: ['To find the 4th multiple of 7, multiply 7 by 4.', '7 × 4 = 28.'],
      explanation: 'The 4th multiple of 7 is 28.',
      keyPoint: 'The nth multiple of a number x is given by x × n.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_02',
    {
      questionId: 'q_g4_m6_02',
      correctOptionIds: ['opt_2c'],
      solutionSteps: ['Non-zero multiples start with multiplying by 1.', '9 × 1 = 9.'],
      explanation: '9 is the smallest non-zero multiple of 9.',
      keyPoint: 'The smallest non-zero multiple of any number is the number itself.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_03',
    {
      questionId: 'q_g4_m6_03',
      correctOptionIds: ['opt_3c'],
      solutionSteps: ['Multiples of 3: 3, 6, 9, 12, 15...', 'Multiples of 4: 4, 8, 12, 16...', '12 is in both lists.'],
      explanation: '12 is divisible by both 3 and 4, making it a common multiple.',
      keyPoint: 'A common multiple must appear in the multiplication table of both numbers.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_04',
    {
      questionId: 'q_g4_m6_04',
      correctOptionIds: ['opt_4a'],
      solutionSteps: ['Any number multiplied by 1 equals itself (n × 1 = n).', 'Therefore, n is always a multiple of n.'],
      explanation: 'True. For any number n, n × 1 = n, so it is always a multiple of itself.',
      keyPoint: 'Every number is both a factor and a multiple of itself.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_05',
    {
      questionId: 'q_g4_m6_05',
      correctOptionIds: ['opt_5c'],
      solutionSteps: ['8 × 2 = 16', '8 × 3 = 24', '8 × 4 = 32 (not 36)', '8 × 6 = 48'],
      explanation: '36 is not in the 8 times table (36 ÷ 8 = 4 remainder 4).',
      keyPoint: 'When divided by 8, a multiple of 8 leaves a remainder of 0.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_06',
    {
      questionId: 'q_g4_m6_06',
      correctOptionIds: ['opt_6b'],
      solutionSteps: ['Multiples of 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20...', 'Multiples of 5: 5, 10, 15, 20...', 'The first two common values are 10 and 20.'],
      explanation: 'The first two common multiples of 2 and 5 are 10 and 20.',
      keyPoint: 'Multiples of 10 are always common multiples of 2 and 5.',
      reviewStatus: 'verified',
    },
  ],
  // EXACT SOLUTION FOR QUESTION 7 MATCHING THE SCREENSHOT IN USER'S ATTACHED IMAGE!
  [
    'q_g4_m6_07',
    {
      questionId: 'q_g4_m6_07',
      correctOptionIds: ['opt_7b'],
      solutionSteps: [
        'Multiples of 6 are numbers obtained by multiplying 6 by whole numbers.',
        '6 × 1 = 6',
        '6 × 2 = 12',
        '6 × 3 = 18',
        '6 × 4 = 24',
        'So, 18 is a multiple of 6.',
      ],
      explanation: 'Step by step explanation: Multiples of 6 are numbers obtained by multiplying 6 by whole numbers. 6 × 1 = 6, 6 × 2 = 12, 6 × 3 = 18, 6 × 4 = 24. So, 18 is a multiple of 6.',
      keyPoint: 'Key Point: A number is a multiple of 6 if it appears in the 6-times table: 6, 12, 18, 24, 30...',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_08',
    {
      questionId: 'q_g4_m6_08',
      correctOptionIds: ['opt_8b'],
      solutionSteps: ['5 × 10 = 50.'],
      explanation: 'The 10th multiple of 5 is 50.',
      keyPoint: 'To find the 10th multiple, multiply the number by 10.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_09',
    {
      questionId: 'q_g4_m6_09',
      correctOptionIds: ['opt_9a'],
      solutionSteps: ['Since 7 × 6 = 42, 42 is exactly divisible by 7.'],
      explanation: 'Yes, because 7 × 6 = 42.',
      keyPoint: 'If a × b = c, then c is a multiple of both a and b.',
      reviewStatus: 'verified',
    },
  ],
  [
    'q_g4_m6_10',
    {
      questionId: 'q_g4_m6_10',
      correctOptionIds: ['opt_10b'],
      solutionSteps: ['Multiples of 4: 4, 8, 12, 16, 20, 24...', 'Multiples of 6: 6, 12, 18, 24...', 'Common multiples: 12, 24...', 'Least common multiple is 12.'],
      explanation: 'The smallest common multiple between 4 and 6 is 12.',
      keyPoint: 'The LCM is the smallest non-zero number that is a multiple of two or more numbers.',
      reviewStatus: 'verified',
    },
  ],
])
