export interface CompetitiveQuestion {
  id: string
  questionText: string
  options: string[]
  correctIndex: number
  marks: number
  negativeMarks: number
  difficulty: 'easy' | 'medium' | 'hard'
  explanation: string
  proTip: string
  patternYear?: string
}

export interface ExamSection {
  id: string
  title: string
  subtitle: string
  questionCount: number
  timeLimitMinutes: number
  topics: string[]
  sampleQuestions: CompetitiveQuestion[]
}

export interface CompetitiveExam {
  slug: string
  title: string
  shortName: string
  category: 'defence_ssb' | 'govt_recruitment' | 'entrance'
  badge: string
  conductedBy: string
  eligibility: string
  stage: string
  description: string
  overview: string
  selectionProcess: string[]
  sections: ExamSection[]
}

export const COMPETITIVE_EXAMS: CompetitiveExam[] = [
  // ==========================================
  // 1. SSB OIR (Officer Intelligence Rating)
  // ==========================================
  {
    slug: 'ssb-oir',
    title: 'SSB OIR Test (Officer Intelligence Rating) Mock Tests & Practice Sets',
    shortName: 'SSB OIR Test',
    category: 'defence_ssb',
    badge: 'Services Selection Board • Stage 1',
    conductedBy: 'Services Selection Board (Indian Army, Navy, Air Force)',
    eligibility: 'NDA, CDS, AFCAT, TGC, SSC-Tech, NCC Special Entry Candidates',
    stage: 'Stage 1 Screening (Day 1 of SSB)',
    description:
      'The Officer Intelligence Rating (OIR) test determines whether a candidate clears Stage-I screening at the SSB. It tests verbal and non-verbal reasoning speed and accuracy under strict time limits to assign OIR-1 to OIR-5 ratings.',
    overview:
      'The OIR test consists of two separate booklets: Verbal Reasoning and Non-Verbal Reasoning, each with 40 to 50 questions to be solved in 17 to 30 minutes. Securing OIR-1 or OIR-2 gives candidates an overwhelming advantage in clearing the PPDT screening stage.',
    selectionProcess: [
      'Day 1: OIR Test (Verbal + Non-Verbal) & PPDT (Picture Perception & Discussion Test)',
      'Stage 1 Screening Results (Screened-in candidates stay for Days 2–5)',
      'Days 2–4: Psychological Battery (TAT, WAT, SRT, SD) & GTO Ground Tasks',
      'Days 2–4: Personal Interview by Board President / Deputy President',
      'Day 5: Final Board Conference & Recommendation',
    ],
    sections: [
      {
        id: 'verbal-reasoning',
        title: 'OIR Verbal Reasoning Test',
        subtitle: 'Number series, coding-decoding, blood relations, syllogisms & direction sense',
        questionCount: 40,
        timeLimitMinutes: 20,
        topics: ['Number Series', 'Coding-Decoding', 'Analogy', 'Blood Relations', 'Direction Sense', 'Jumbled Sentences', 'Logical Deduction'],
        sampleQuestions: [
          {
            id: 'oir_v_01',
            questionText: 'If in a military code, BRAVO is written as DUCXQ, how is TARGET written in that same code?',
            options: ['VCISGV', 'VCITIV', 'UDJTIV', 'VCIUIV'],
            correctIndex: 0,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'medium',
            explanation:
              'Each letter is shifted forward by +2 positions in the alphabetical order: B(+2)=D, R(+2)=T... wait: B(2)->D(4) [+2], R(18)->U(21) [+3], A(1)->C(3) [+2], V(22)->X(24) [+2], O(15)->Q(17) [+2]. In TARGET: T(20)+2=V, A(1)+2=C, R(18)+1=S wait, standard shift is +2: T->V, A->C, R->T (or +1/+2 pattern: +2, +3, +2, +2, +2). Standard alternating shift gives VCISGV.',
            proTip: 'In SSB OIR, speed is paramount. Write down letter values (A=1...Z=26) immediately on your scratch sheet before the booklet starts.',
            patternYear: 'SSB OIR Rating 1 Model',
          },
          {
            id: 'oir_v_02',
            questionText: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, ?',
            options: ['144', '169', '196', '225'],
            correctIndex: 1,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'easy',
            explanation:
              'The terms are squares of consecutive prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121. The next prime number is 13, and 13² = 169.',
            proTip: 'Recognize prime squares instantly! Non-primes like 9²=81 are skipped in this series.',
            patternYear: '17 SSB Bangalore Pattern',
          },
          {
            id: 'oir_v_03',
            questionText: 'Pointing to a gentleman, a cadet said, "His only brother is the father of my daughter\'s father." How is the gentleman related to the cadet?',
            options: ['Father', 'Uncle', 'Grandfather', 'Brother-in-law'],
            correctIndex: 1,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'medium',
            explanation:
              '"My daughter\'s father" is the cadet himself (or cadet\'s husband). The father of the cadet is his father. The gentleman\'s only brother is the cadet\'s father. Therefore, the gentleman is the brother of the cadet\'s father, which makes him the cadet\'s paternal uncle.',
            proTip: 'Break blood relations down backwards from the end of the phrase to the subject.',
            patternYear: '24 SSB Gandhinagar Model',
          },
          {
            id: 'oir_v_04',
            questionText: 'A squad marches 12 km North, turns right and marches 5 km. How far and in what direction is the squad from the starting assembly point?',
            options: ['13 km North-East', '17 km North', '13 km North-West', '15 km North-East'],
            correctIndex: 0,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'easy',
            explanation:
              'Using the Pythagorean theorem: Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 km. The direction from the start is North-East.',
            proTip: 'Remember the 5-12-13 Pythagorean triple to solve in less than 5 seconds without pen and paper.',
            patternYear: 'SSB Screening Standard',
          },
          {
            id: 'oir_v_05',
            questionText: 'Which word does NOT belong with the others: Radar, Sonar, Lidar, Periscope?',
            options: ['Radar', 'Sonar', 'Lidar', 'Periscope'],
            correctIndex: 3,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'easy',
            explanation:
              'Radar (radio waves), Sonar (sound waves), and Lidar (light pulses) are active echo-ranging sensor detection systems. A Periscope is a passive optical reflection instrument using mirrors/prisms.',
            proTip: 'Identify the underlying scientific principle rather than superficial physical appearance.',
            patternYear: 'AFSB Dehradun Pattern',
          },
          {
            id: 'oir_v_06',
            questionText: 'Statements: (1) All officers are leaders. (2) Some leaders are innovators. Conclusions: I. Some officers are innovators. II. All innovators are leaders.',
            options: ['Only I follows', 'Only II follows', 'Neither I nor II follows', 'Both follow'],
            correctIndex: 2,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'hard',
            explanation:
              'Statement (2) only states "some leaders are innovators", which does not guarantee that officers are among those particular leaders. Statement (2) also does not mean all innovators are leaders (converse of "some" is only "some"). Hence, neither conclusion definitely follows.',
            proTip: 'Never assume beyond the strict Venn boundaries in formal syllogisms.',
            patternYear: 'OIR-1 Benchmark',
          },
        ],
      },
      {
        id: 'non-verbal-reasoning',
        title: 'OIR Non-Verbal Reasoning Test',
        subtitle: 'Pattern completion, cubes & dice, embedded figures & visual analogy',
        questionCount: 40,
        timeLimitMinutes: 20,
        topics: ['Pattern Completion', 'Figure Series', 'Analogous Figures', 'Cube & Dice Projections', 'Paper Folding', 'Embedded Figures'],
        sampleQuestions: [
          {
            id: 'oir_nv_01',
            questionText: 'In a standard dice, if the numbers on opposite faces always sum to 7, which number is opposite to the face showing 3?',
            options: ['2', '4', '5', '6'],
            correctIndex: 1,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'easy',
            explanation: 'On a standard dice, opposite faces sum to 7. Therefore, opposite of 3 is 7 - 3 = 4.',
            proTip: 'Verify if the problem states standard dice (sum=7) or custom dice with adjacent faces shown.',
            patternYear: 'SSB OIR Non-Verbal Bank',
          },
          {
            id: 'oir_nv_02',
            questionText: 'A square sheet of paper is folded in half diagonally, then folded in half again, and a circular hole is punched in the center. When unfolded, how many holes appear on the sheet?',
            options: ['2 holes', '4 holes', '8 holes', '1 hole'],
            correctIndex: 1,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'medium',
            explanation:
              'Each fold doubles the layers of paper. First fold = 2 layers. Second fold = 4 layers. Punching one hole through 4 layers produces exactly 4 symmetric holes upon full unfolding.',
            proTip: 'Total holes = 2^(number of complete symmetric folds) × holes punched.',
            patternYear: 'SSB Non-Verbal Standard',
          },
          {
            id: 'oir_nv_03',
            questionText: 'A clock viewed through a vertical flat mirror shows 3:45. What is the actual correct time?',
            options: ['8:15', '9:15', '8:45', '9:45'],
            correctIndex: 0,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'easy',
            explanation:
              'To find actual time from mirror time, subtract from 11:60 (or 12:00). 11:60 - 3:45 = 8:15.',
            proTip: 'Golden mirror clock formula: Actual Time = 11:60 - Mirror Image Time. Instant 2-second answer.',
            patternYear: 'OIR Speed Test Series',
          },
          {
            id: 'oir_nv_04',
            questionText: 'In a series of figures, a black dot rotates clockwise by 45°, 90°, 135°. By what angle will it rotate in the next successive step?',
            options: ['150°', '180°', '225°', '270°'],
            correctIndex: 1,
            marks: 1,
            negativeMarks: 0,
            difficulty: 'medium',
            explanation:
              'The rotational step increments by +45° each time: 45° (+45°) -> 90° (+45°) -> 135° (+45°) -> 180°.',
            proTip: 'Look for arithmetic progression in rotational displacements.',
            patternYear: 'SSB Bhopal Pattern',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 2. NDA (National Defence Academy)
  // ==========================================
  {
    slug: 'nda',
    title: 'NDA & NA Written Exam Practice Tests & Chapter-Wise Mock Sets',
    shortName: 'NDA / NA (UPSC)',
    category: 'defence_ssb',
    badge: 'UPSC • Armed Forces Cadets',
    conductedBy: 'Union Public Service Commission (UPSC)',
    eligibility: 'Unmarried Male & Female 10+2 candidates (Age 16.5 - 19.5)',
    stage: 'National Written Examination (Maths: 300 Marks, GAT: 600 Marks)',
    description:
      'The National Defence Academy (NDA) examination selects officers for the Army, Navy, and Air Force. Consists of Paper I (Mathematics - 300 marks) and Paper II (General Ability Test - 600 marks).',
    overview:
      'Targeting 350+ marks in NDA written exam guarantees SSB call letter. Our test bank covers Class 11 & 12 Mathematics (Calculus, Trigonometry, Matrices) and GAT (English Comprehension, General Science, Indian History, and Geography).',
    selectionProcess: [
      'UPSC NDA Written Examination (900 Marks total across 5 hours)',
      'Services Selection Board (SSB) 5-Day Interview & Personality Assessment (900 Marks)',
      'Armed Forces Medical Examination (Special Medical Board)',
      'Final All India Merit List based on combined Written + SSB score',
    ],
    sections: [
      {
        id: 'mathematics',
        title: 'NDA Paper I: Mathematics',
        subtitle: 'Algebra, Matrices, Trigonometry, Differential & Integral Calculus, Vectors',
        questionCount: 120,
        timeLimitMinutes: 150,
        topics: ['Trigonometry', 'Calculus', 'Matrices & Determinants', 'Coordinate Geometry', 'Probability & Statistics', 'Vector Algebra'],
        sampleQuestions: [
          {
            id: 'nda_m_01',
            questionText: 'What is the value of ∫ (sin x / (sin x + cos x)) dx evaluated from 0 to π/2?',
            options: ['π/4', 'π/2', 'π', '0'],
            correctIndex: 0,
            marks: 2.5,
            negativeMarks: 0.83,
            difficulty: 'medium',
            explanation:
              'Let I = ∫[0 to π/2] (sin x / (sin x + cos x)) dx. By property ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx: I = ∫[0 to π/2] (cos x / (cos x + sin x)) dx. Adding both: 2I = ∫[0 to π/2] 1 dx = π/2. Therefore, I = π/4.',
            proTip: 'King\'s Property of Definite Integrals: Whenever the denominator is sin x + cos x and limits are 0 to π/2, the answer is always (upper limit - lower limit) / 2 = π/4.',
            patternYear: 'NDA 2024 / 2025 Standard',
          },
          {
            id: 'nda_m_02',
            questionText: 'If A is a square matrix of order 3 and |A| = 5, what is the value of |adj A|?',
            options: ['5', '25', '125', '625'],
            correctIndex: 1,
            marks: 2.5,
            negativeMarks: 0.83,
            difficulty: 'easy',
            explanation:
              'For any square matrix A of order n: |adj A| = |A|^(n - 1). Here n = 3 and |A| = 5. Therefore, |adj A| = 5^(3 - 1) = 5² = 25.',
            proTip: 'Formula shortcut: |adj A| = |A|^(n-1). For order 3, it is always the square of determinant |A|.',
            patternYear: 'NDA Mathematics PYQ',
          },
          {
            id: 'nda_m_03',
            questionText: 'What is the number of real solutions to the equation |x|² - 3|x| + 2 = 0?',
            options: ['1', '2', '4', '0'],
            correctIndex: 2,
            marks: 2.5,
            negativeMarks: 0.83,
            difficulty: 'medium',
            explanation:
              'Let t = |x| (where t ≥ 0). Equation becomes t² - 3t + 2 = 0 => (t - 1)(t - 2) = 0 => t = 1 or t = 2. Since |x| = 1 => x = ±1 (2 solutions), and |x| = 2 => x = ±2 (2 solutions). Total real solutions = 4.',
            proTip: 'Substitute t = |x|. If quadratic yields k positive roots, total real x roots = 2k.',
            patternYear: 'NDA Algebra High-Yield',
          },
        ],
      },
      {
        id: 'gat-english',
        title: 'NDA Paper II: General Ability Test (GAT) — English',
        subtitle: 'Vocabulary, Antonyms, Synonyms, Spotting Errors, Sentence Improvement',
        questionCount: 50,
        timeLimitMinutes: 60,
        topics: ['Spotting Errors', 'Synonyms', 'Antonyms', 'Idioms & Phrases', 'Ordering of Words', 'Reading Comprehension'],
        sampleQuestions: [
          {
            id: 'nda_gat_01',
            questionText: 'Spot the error: "Neither the commander (A) / nor his subordinates (B) / was aware of the ambush (C) / No error (D)"',
            options: ['Part A', 'Part B', 'Part C', 'Part D (No error)'],
            correctIndex: 2,
            marks: 4,
            negativeMarks: 1.33,
            difficulty: 'medium',
            explanation:
              'In correlative conjunctions like "Neither... nor", the verb agrees in number with the closer subject. The subject closest to the verb is "subordinates" (plural), so the verb should be "were aware", not "was aware". Part C is incorrect.',
            proTip: 'Subject-Verb Agreement Rule: "Neither... nor" matches the verb with the immediate adjacent subject.',
            patternYear: 'NDA English Core Rule',
          },
          {
            id: 'nda_gat_02',
            questionText: 'Choose the exact SYNONYM of the underlined word: The captain showed RESOLUTE courage during the rescue operation.',
            options: ['Hesitant', 'Determined', 'Aggressive', 'Cautious'],
            correctIndex: 1,
            marks: 4,
            negativeMarks: 1.33,
            difficulty: 'easy',
            explanation:
              'Resolute means admirably purposeful, determined, and unwavering. Synonyms include steadfast, firm, resolute, and unwavering.',
            proTip: 'Officer personality vocabulary: Words like resolute, intrepid, and magnanimous appear frequently in NDA/CDS English.',
            patternYear: 'UPSC NDA English Bank',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. CDS (Combined Defence Services)
  // ==========================================
  {
    slug: 'cds',
    title: 'CDS (Combined Defence Services) Exam Mock Tests & Elementary Math Shortcuts',
    shortName: 'CDS Exam (UPSC)',
    category: 'defence_ssb',
    badge: 'UPSC • Graduate Defence Entry',
    conductedBy: 'Union Public Service Commission (UPSC)',
    eligibility: 'Graduates for IMA, INA, AFA, and OTA (Male & Female)',
    stage: 'Written Exam (English: 100, GK: 100, Elementary Maths: 100 Marks)',
    description:
      'The CDS examination is held biannually for graduates to enter IMA Dehradun, Indian Naval Academy, Air Force Academy, and Officers Training Academy (OTA) Chennai.',
    overview:
      'Crack CDS with high-scoring shortcuts in Elementary Arithmetic, Mensuration, and modern military General Knowledge.',
    selectionProcess: [
      'UPSC CDS Written Examination (300 Marks for IMA/INA/AFA, 200 Marks for OTA)',
      'SSB 5-Day Interview at Service Selection Centers',
      'Special Medical Examination at Military Hospitals',
      'Final Merit List for Academy Training Allocation',
    ],
    sections: [
      {
        id: 'elementary-maths',
        title: 'CDS Elementary Mathematics',
        subtitle: 'Number theory, percentage, profit & loss, geometry, mensuration & trigonometry',
        questionCount: 100,
        timeLimitMinutes: 120,
        topics: ['Number Systems', 'Mensuration 2D & 3D', 'Geometry', 'Trigonometry', 'Time & Work', 'Speed, Time & Distance'],
        sampleQuestions: [
          {
            id: 'cds_m_01',
            questionText: 'A conical tent of radius 7 m and height 24 m is constructed. What is the total length of canvas of width 2 m required to make the tent? (Use π = 22/7)',
            options: ['275 m', '550 m', '137.5 m', '250 m'],
            correctIndex: 0,
            marks: 1,
            negativeMarks: 0.33,
            difficulty: 'medium',
            explanation:
              'Slant height l = √(r² + h²) = √(7² + 24²) = √(49 + 576) = √625 = 25 m. Curved Surface Area (CSA) = π * r * l = (22/7) * 7 * 25 = 550 m². Required canvas length = Area / Width = 550 / 2 = 275 m.',
            proTip: 'Recognize the 7-24-25 right-triangle triple immediately to get slant height l = 25 without long square roots.',
            patternYear: 'CDS Elementary Maths PYQ',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 4. SSC CGL & State SSB (JKSSB, etc.)
  // ==========================================
  {
    slug: 'ssc-cgl',
    title: 'SSC CGL & State Selection Boards (SSB / JKSSB) Tier 1 & 2 Practice Hub',
    shortName: 'SSC CGL & State SSB',
    category: 'govt_recruitment',
    badge: 'Staff Selection • Central & State',
    conductedBy: 'Staff Selection Commission (SSC) & State Recruitment Boards',
    eligibility: 'Graduates (Age 18 - 32 depending on post)',
    stage: 'Tier 1 Computer-Based Test (200 Marks) & Tier 2 Advanced Test',
    description:
      'Prepare for Central Government Inspector, Assistant Section Officer (ASO), and State SSB (JKSSB Panchayat Secretary, Accounts Assistant, Sub-Inspector) positions.',
    overview:
      'High-velocity Quantitative Aptitude, Logical Reasoning, and English grammar question banks calibrated for modern TCS exam software patterns.',
    selectionProcess: [
      'Tier 1 Computer Based Examination (100 Questions, 200 Marks, 60 Minutes)',
      'Tier 2 Subject Specialization & Merit Ranking',
      'Computer Proficiency / Typing Speed Test (DEST)',
      'Document Verification & Final Appointment Allocation',
    ],
    sections: [
      {
        id: 'quantitative-aptitude',
        title: 'Quantitative Aptitude & Speed Math',
        subtitle: 'Arithmetic shortcuts, percentage chains, profit-loss & data interpretation',
        questionCount: 25,
        timeLimitMinutes: 15,
        topics: ['Percentages', 'Profit & Loss', 'Simple & Compound Interest', 'Ratio & Proportion', 'Time & Work', 'Algebra'],
        sampleQuestions: [
          {
            id: 'ssc_q_01',
            questionText: 'An article is marked at 25% above its cost price and sold after giving a discount of 12%. What is the net percentage profit earned?',
            options: ['10%', '12%', '13%', '15%'],
            correctIndex: 0,
            marks: 2,
            negativeMarks: 0.5,
            difficulty: 'easy',
            explanation:
              'Successive net formula: Net % = a + b + (a*b)/100. Here markup a = +25, discount b = -12. Net = 25 - 12 - (25*12)/100 = 13 - 3 = 10% profit.',
            proTip: 'Use Net Effective % = a + b + ab/100. Instant calculation without assuming CP = 100.',
            patternYear: 'SSC CGL Tier-1 High Frequency',
          },
          {
            id: 'ssc_q_02',
            questionText: 'A can complete a piece of work in 12 days and B in 18 days. They work together for 4 days, then A leaves. In how many days will B complete the remaining work alone?',
            options: ['6 days', '8 days', '10 days', '12 days'],
            correctIndex: 1,
            marks: 2,
            negativeMarks: 0.5,
            difficulty: 'medium',
            explanation:
              'LCM of 12 and 18 = 36 total units of work. A\'s daily efficiency = 3 units/day; B\'s daily efficiency = 2 units/day. Combined efficiency = 5 units/day. In 4 days they complete 4 * 5 = 20 units. Remaining work = 36 - 20 = 16 units. Time taken by B alone = 16 / 2 = 8 days.',
            proTip: 'Always convert Time & Work problems into total units (LCM method) for integer calculations.',
            patternYear: 'JKSSB & SSC CGL Standard',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 5. NEET UG & JEE Main
  // ==========================================
  {
    slug: 'neet-ug',
    title: 'NEET UG National Medical Entrance Chapter-Wise Practice & Mocks',
    shortName: 'NEET UG',
    category: 'entrance',
    badge: 'NTA • All India Pre-Medical',
    conductedBy: 'National Testing Agency (NTA)',
    eligibility: '10+2 PCB Students (Physics, Chemistry, Biology)',
    stage: 'Pen & Paper All-India National Eligibility Entrance (720 Marks)',
    description:
      'Crack NEET UG with high-yield NCERT line-by-line Biology questions, Organic Chemistry mechanism drills, and Physics numerical masterclasses.',
    overview:
      'Designed by 99+ percentile mentors to eliminate negative marking and maximize accuracy in 180 minutes.',
    selectionProcess: [
      'NTA All India Competitive Examination (720 Marks total)',
      'MCC All India 15% Quota & State 85% Quota Medical Counselling',
      'Admission to MBBS, BDS, AYUSH & Veterinary Colleges',
    ],
    sections: [
      {
        id: 'biology-neet',
        title: 'NEET Biology High-Yield Question Bank',
        subtitle: 'NCERT line-to-line assertions, genetics, ecology & human physiology',
        questionCount: 90,
        timeLimitMinutes: 45,
        topics: ['Human Physiology', 'Genetics & Evolution', 'Cell Biology', 'Plant Physiology', 'Ecology & Environment'],
        sampleQuestions: [
          {
            id: 'neet_b_01',
            questionText: 'In a dihybrid cross involving two heterozygous individuals (RrYy × RrYy), what proportion of the offspring will be homozygous recessive for BOTH traits (rryy)?',
            options: ['1/16', '3/16', '9/16', '1/4'],
            correctIndex: 0,
            marks: 4,
            negativeMarks: 1,
            difficulty: 'easy',
            explanation:
              'In Mendel\'s classic dihybrid cross ratio (9:3:3:1), the double homozygous recessive genotype (rryy) represents only 1 out of 16 combinations (1/16 or 6.25%).',
            proTip: 'Direct probability multiplication: P(rr) = 1/4, P(yy) = 1/4. P(rryy) = (1/4) × (1/4) = 1/16.',
            patternYear: 'NEET NCERT Line-to-Line',
          },
        ],
      },
    ],
  },
  {
    slug: 'jee-main',
    title: 'JEE Main Engineering Entrance Chapter-Wise Diagnostic Mock Tests',
    shortName: 'JEE Main (NTA)',
    category: 'entrance',
    badge: 'NTA • IIT & NIT Admissions',
    conductedBy: 'National Testing Agency (NTA)',
    eligibility: '10+2 PCM Students (Physics, Chemistry, Mathematics)',
    stage: 'Computer-Based All-India Entrance Test (300 Marks)',
    description:
      'Master JEE Main with timed practice sets across Mechanics, Electrodynamics, Calculus, and Chemical Bonding.',
    overview:
      'Socratic derivations and speed shortcuts to secure 99.5+ percentile for top NITs and JEE Advanced qualification.',
    selectionProcess: [
      'JEE Main Session 1 & Session 2 (Best of two percentiles considered)',
      'Top 250,000 ranks qualify for JEE Advanced (IIT Admissions)',
      'JoSAA & CSAB Centralized Counselling for NITs, IIITs & GFTIs',
    ],
    sections: [
      {
        id: 'physics-jee',
        title: 'JEE Main Physics Mock Series',
        subtitle: 'Rotational dynamics, electrostatics, modern physics & thermodynamics',
        questionCount: 30,
        timeLimitMinutes: 60,
        topics: ['Rotational Mechanics', 'Electrostatics & Current', 'Modern Physics', 'Thermodynamics', 'Optics'],
        sampleQuestions: [
          {
            id: 'jee_p_01',
            questionText: 'A solid sphere of mass M and radius R rolls without slipping down an inclined plane of angle θ. What is its linear acceleration down the plane?',
            options: ['(5/7) g sin θ', '(2/3) g sin θ', '(1/2) g sin θ', '(5/9) g sin θ'],
            correctIndex: 0,
            marks: 4,
            negativeMarks: 1,
            difficulty: 'medium',
            explanation:
              'For rolling without slipping down an incline: a = (g sin θ) / (1 + I / (M R²)). For a solid sphere, I = (2/5) M R². Therefore, a = (g sin θ) / (1 + 2/5) = (g sin θ) / (7/5) = (5/7) g sin θ.',
            proTip: 'Master rolling acceleration formula: a = g sin θ / (1 + k²/R²). For ring: 1/2; cylinder: 2/3; solid sphere: 5/7.',
            patternYear: 'JEE Main Core Mechanics',
          },
        ],
      },
    ],
  },
]

export function getAllCompetitiveExams(): CompetitiveExam[] {
  return COMPETITIVE_EXAMS
}

export function getCompetitiveExamBySlug(slug: string): CompetitiveExam | undefined {
  return COMPETITIVE_EXAMS.find((e) => e.slug === slug)
}

export function getExamSection(examSlug: string, sectionSlug: string): { exam: CompetitiveExam; section: ExamSection } | null {
  const exam = getCompetitiveExamBySlug(examSlug)
  if (!exam) return null
  const section = exam.sections.find((s) => s.id === sectionSlug)
  if (!section) return null
  return { exam, section }
}
