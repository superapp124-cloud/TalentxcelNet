import type { ClassSkillTrackMeta, ClassSkillProject, SkillStudioPlanProduct, SkillStage } from './types'

// ============================================================================
// SKILL STUDIO PLANS
// ============================================================================

export const SKILL_STUDIO_PLANS: SkillStudioPlanProduct[] = [
  {
    id: 'prod_skill_monthly_999',
    title: 'Monthly Skill Explorer',
    period: 'monthly',
    periodLabel: 'Per Month',
    basePriceRupees: 999,
    tagline: 'Access any single track per month with guided workshop feedback and peer reviews.',
    features: [
      'Enroll in any 1 of the 8 skill tracks at your grade level',
      'Full access to weekly module guides and interactive exercises',
      'Rubric-based evaluation for 2 capstone project submissions',
      'Verified digital completion certificate upon milestone mastery',
      'Cancel or switch tracks anytime with zero penalties',
    ],
  },
  {
    id: 'prod_skill_semester_2499',
    title: 'Semester Mastery Fellowship',
    period: 'semester',
    periodLabel: 'Per 6 Months',
    basePriceRupees: 2499,
    tagline: 'Multi-track skill acceleration with 1-on-1 mentor code & design reviews.',
    popular: true,
    features: [
      'Simultaneous access to any 3 skill tracks across your academic grade',
      'Comprehensive module roadmaps with starter templates & repositories',
      'Priority rubric evaluation within 24 hours with written mentor feedback',
      'Portfolio website builder to showcase verified capstone deliverables',
      'Includes Japanese Kaizen craft & Chinese rigorous progression modules',
    ],
  },
  {
    id: 'prod_skill_annual_4999',
    title: 'Annual Studio Fellowship',
    period: 'annual',
    periodLabel: 'Per Year',
    basePriceRupees: 4999,
    tagline: 'All-inclusive annual pass across all 8 tracks, robotics kits guidance, and venture showcase.',
    features: [
      'Unrestricted annual access to all 8 skill tracks for your grade',
      'Unlimited evaluated capstone project submissions with verified badges',
      'Hardware & kit integration guides (Arduino, Micro:bit, Raspberry Pi)',
      'Direct entry to the TalentXcel National Skill Showcase & Venture Pitch',
      'Dedicated mentor office hours and letter of technical recommendation',
    ],
  },
]

// ============================================================================
// HELPER TO COMPUTE STAGE FROM CLASS
// ============================================================================

export function getSkillStage(classNumber: number): { stage: SkillStage; stageLabel: string } {
  if (classNumber <= 5) return { stage: 'junior', stageLabel: 'Junior Pioneers (Classes 4–5)' }
  if (classNumber <= 8) return { stage: 'middle', stageLabel: 'Middle Innovators (Classes 6–8)' }
  if (classNumber <= 10) return { stage: 'secondary', stageLabel: 'Secondary Builders (Classes 9–10)' }
  return { stage: 'senior', stageLabel: 'Senior Engineers & Leaders (Classes 11–12)' }
}

// ============================================================================
// MASTER CLASS-WISE 8 TRACK BUILDER
// ============================================================================

export function getClassSkillTracks(classNumber: number): ClassSkillTrackMeta[] {
  const { stage, stageLabel } = getSkillStage(classNumber)

  // 1. AI & AUTOMATED INTELLIGENCE
  const aiTrack: ClassSkillTrackMeta = {
    id: 'track_ai_automation',
    category: 'ai_automation',
    title: 'AI & Automated Intelligence',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Sparkles',
    colorTheme: 'indigo',
    philosophy: 'japanese_kaizen',
    philosophyNote: 'Japanese Kaizen craft: continuous iterative refinement of system prompts and deterministic reasoning guardrails.',
    easternHeritage: {
      tradition: 'japanese',
      originalName: '改善 (Kaizen) & 反省 (Hansei)',
      englishConcept: 'Continuous 1% Optimization & Socratic Reflection',
      keyDiscipline: 'Disciplined iteration of prompt rules, boundary testing, and systematic mistake review (Hansei).',
      dailyDeliberateDrill: '10-min prompt error audit: spot 3 AI misconceptions and rewrite system instructions.',
      gradeTargetNote: 'Recommended for Classes 4–9 foundational AI & cognitive literacy.',
    },
    ...(stage === 'junior'
      ? {
          classSpecificTitle: 'Generative AI Discovery & Creative Prompting',
          level: 'foundation',
          description: 'Explore generative AI safely. Learn how AI thinks, master creative story & art prompting, and build ethical guardrails.',
          tools: ['Kid-Safe Chatbot Playground', 'Generative Canvas', 'Voice Synthesis'],
          learningOutcomes: [
            'Understand how neural models predict patterns without magic',
            'Craft multi-step prompts to generate creative illustrated stories',
            'Spot false facts (hallucinations) through fact-checking drills',
            'Learn ethical digital boundaries and safe human-in-the-loop habits',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'How Computers Learn Patterns', objective: 'Demystifying machine learning with visual examples', deliverable: 'Pattern sorting exercise' },
            { weekNumber: 2, title: 'The Art of Specific Prompting', objective: 'Moving from vague 2-word queries to detailed descriptive prompts', deliverable: 'Illustrated fable generator' },
            { weekNumber: 3, title: 'Spotting Fact vs AI Fiction', objective: 'Cross-verifying AI answers against school textbooks', deliverable: 'Fact-checker scorecard' },
            { weekNumber: 4, title: 'Building a Friendly Study Buddy', objective: 'Designing a respectful voice assistant persona', deliverable: 'Socratic helper prompt script' },
          ],
          capstoneProject: {
            id: `proj_ai_c${classNumber}`,
            trackId: 'track_ai_automation',
            classNumber,
            title: `Build a Class ${classNumber} Socratic Study Buddy`,
            brief: `Design a prompt that guides a classmate through Class ${classNumber} homework concepts without giving away answers directly.`,
            realWorldContext: 'Modern educational AI must act as a patient tutor, prompting critical thinking rather than completing work.',
            deliverables: ['Custom system prompt text', 'Transcript of 3 solved homework questions', 'Reflection on preventing cheating'],
            rubricCriteria: [
              { criterion: 'Socratic Questioning', weightPercentage: 40, masteryDescription: 'Never provides answers prematurely; guides with hints' },
              { criterion: 'Tone & Clarity', weightPercentage: 30, masteryDescription: 'Encouraging, patient, and age-appropriate vocabulary' },
              { criterion: 'Factual Accuracy', weightPercentage: 30, masteryDescription: 'Accurately explains fundamental concepts' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : stage === 'middle'
      ? {
          classSpecificTitle: 'System Prompt Engineering & Chatbot Logic',
          level: 'intermediate',
          description: 'Engineer structured role prompts, multi-turn task bots, and factual grounding with markdown knowledge bases.',
          tools: ['Markdown Knowledge Bases', 'Prompt Engineering Workbench', 'JSON Schema Studio'],
          learningOutcomes: [
            'Design production-ready system personas with strict boundary rules',
            'Implement few-shot learning examples for deterministic outputs',
            'Extract structured JSON data from messy paragraphs of text',
            'Analyze hallucination failure modes and engineer mitigation strategies',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Role, Context & Delimiter Architecture', objective: 'Structuring instructions with clear section headers', deliverable: 'Role-based researcher bot' },
            { weekNumber: 2, title: 'Few-Shot Grounding & Few-Shot Demos', objective: 'Providing input-output exemplar pairs to guarantee format', deliverable: 'Math word problem parser' },
            { weekNumber: 3, title: 'Handling Edge Cases & Jailbreak Defense', objective: 'Preventing off-topic diversion or prompt leaking', deliverable: 'Safety audit test suite' },
            { weekNumber: 4, title: 'Structured Data Extraction (JSON)', objective: 'Transforming interview transcripts into validated tables', deliverable: 'Automated study flashcard engine' },
          ],
          capstoneProject: {
            id: `proj_ai_c${classNumber}`,
            trackId: 'track_ai_automation',
            classNumber,
            title: `Interactive Lab Assistant with Grounded Reference Data`,
            brief: `Create an AI Science Lab Assistant for Class ${classNumber} that verifies laboratory safety, guides experiments, and references NCERT protocols.`,
            realWorldContext: 'Industrial automation uses strict system prompts to prevent dangerous procedures in laboratory and medical settings.',
            deliverables: ['System prompt with XML delimiters', 'Safety boundary test logs', 'JSON schema output specification'],
            rubricCriteria: [
              { criterion: 'Safety Enforcement', weightPercentage: 35, masteryDescription: 'Immediately flags dangerous chemical/circuit setups' },
              { criterion: 'Delimiter Structure', weightPercentage: 35, masteryDescription: 'Clean separation of instructions, context, and input' },
              { criterion: 'Schema Compliance', weightPercentage: 30, masteryDescription: '100% valid JSON output on test inputs' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : stage === 'secondary'
      ? {
          classSpecificTitle: 'Retrieval-Augmented Agents & Autonomous Pipelines',
          level: 'advanced',
          description: 'Build RAG pipelines, contextual search over PDF syllabi, and autonomous agent loops with tool-calling capabilities.',
          tools: ['Python 3.12', 'LangChain / LlamaIndex Concepts', 'Vector Embeddings', 'FastAPI'],
          learningOutcomes: [
            'Understand semantic search, embeddings, and vector similarity (cosine distance)',
            'Build grounded Question-Answering agents over local curriculum documents',
            'Implement tool-calling functions: web search, calculator, and formula solvers',
            'Evaluate agent accuracy using precision and recall metrics',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Vector Embeddings & Semantic Search', objective: 'Transforming text into vectors to find conceptual similarity', deliverable: 'Document search prototype' },
            { weekNumber: 2, title: 'RAG Pipeline Architecture', objective: 'Retrieving relevant syllabus chunks and synthesizing answers', deliverable: 'Exam preparation RAG bot' },
            { weekNumber: 3, title: 'Function Calling & Tool Execution', objective: 'Enabling models to execute code and search external tools', deliverable: 'Calculator-empowered agent' },
            { weekNumber: 4, title: 'Evaluation & Benchmarking', objective: 'Quantifying hallucination rates across 50 test questions', deliverable: 'Model performance benchmark' },
          ],
          capstoneProject: {
            id: `proj_ai_c${classNumber}`,
            trackId: 'track_ai_automation',
            classNumber,
            title: `Curriculum-Grounded RAG Revision Engine`,
            brief: `Build a Python RAG pipeline that indexes a Class ${classNumber} textbook chapter and answers complex reasoning questions with exact page citations.`,
            realWorldContext: 'Enterprise AI relies heavily on RAG to ensure zero hallucination when reading internal legal and financial contracts.',
            deliverables: ['Python RAG script with chunking logic', 'Vector index of 2 chapters', 'Evaluation report with citations'],
            rubricCriteria: [
              { criterion: 'Citation Accuracy', weightPercentage: 40, masteryDescription: 'Every claim links to verified textbook source' },
              { criterion: 'Chunking Strategy', weightPercentage: 30, masteryDescription: 'Optimized chunk size preserving semantic context' },
              { criterion: 'Latency & Code Quality', weightPercentage: 30, masteryDescription: 'Clean modular Python with error handling' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Production AI Architecture & Agent Workflows',
          level: 'advanced',
          description: 'Deploy multi-agent consensus networks, fine-tuning methodologies, model distillation, and production API integrations.',
          tools: ['Python / PyTorch', 'HuggingFace', 'FastAPI / Next.js', 'PostgreSQL pgvector'],
          learningOutcomes: [
            'Architect autonomous multi-agent pipelines with planner-executor-critic roles',
            'Fine-tune open-weights models for specialized academic reasoning tasks',
            'Deploy scalable inference APIs with token streaming and rate limiting',
            'Implement guardrails against adversarial prompts and prompt injection attacks',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Multi-Agent Consensus Architectures', objective: 'Orchestrating agent collaboration and automated peer review', deliverable: 'Multi-agent code reviewer' },
            { weekNumber: 2, title: 'Fine-Tuning & Parameter-Efficient LoRA', objective: 'Adapting small models to domain-specific syntax', deliverable: 'Fine-tuned grammar classifier' },
            { weekNumber: 3, title: 'Production API & Streaming Frontend', objective: 'Serving inference with streaming responses in Next.js', deliverable: 'Live web agent interface' },
            { weekNumber: 4, title: 'Security, Latency & Cost Optimization', objective: 'Defending against prompt injections and cutting token cost', deliverable: 'Production deployment package' },
          ],
          capstoneProject: {
            id: `proj_ai_c${classNumber}`,
            trackId: 'track_ai_automation',
            classNumber,
            title: `Full-Stack Autonomous Technical Research Assistant`,
            brief: `Architect and deploy an end-to-end multi-agent research platform that ingests scientific papers, cross-examines findings, and publishes summary briefs.`,
            realWorldContext: 'Modern tech labs use autonomous research agents to accelerate drug discovery, materials science, and patent analysis.',
            deliverables: ['Production repository with Next.js frontend & Python API', 'Multi-agent workflow orchestrator', 'Deployment URL or Dockerfile'],
            rubricCriteria: [
              { criterion: 'System Architecture', weightPercentage: 40, masteryDescription: 'Robust multi-agent coordination with feedback loops' },
              { criterion: 'Engineering Rigor', weightPercentage: 30, masteryDescription: 'Clean async code, streaming UX, and type safety' },
              { criterion: 'Real-World Viability', weightPercentage: 30, masteryDescription: 'Solves complex queries with reliable verifiable data' },
            ],
            estimatedHours: 12,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // 2. COMPUTATIONAL THINKING & SOFTWARE CRAFT
  const codingTrack: ClassSkillTrackMeta = {
    id: 'track_coding_computation',
    category: 'coding_computation',
    title: 'Computational Thinking & Software Craft',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Code',
    colorTheme: 'blue',
    philosophy: 'chinese_progression',
    philosophyNote: 'Chinese structured progression: rigorous algorithmic foundations, step-by-step logic drills, and deliberate coding practice.',
    easternHeritage: {
      tradition: 'chinese',
      originalName: '信息学奥赛 (CSP-J Junior Informatics) & 刻意练习 (Keyi Lianxi)',
      englishConcept: 'Algorithmic Rigor, Step Trace Tables & Zero-Guesswork Debugging',
      keyDiscipline: 'Step-by-step dry-run traces on paper before typing code; eliminating guesswork and mastering nested control logic.',
      dailyDeliberateDrill: '15-min hand-tracing drill: write input-output state table for 1 loop problem without running the compiler.',
      gradeTargetNote: 'Focus for Classes 4–9 to build world-class algorithmic reflexes similar to Chinese junior informatics olympiad training.',
    },
    ...(stage === 'junior'
      ? {
          classSpecificTitle: 'Visual Logic, Loops & Game Animation',
          level: 'foundation',
          description: 'Learn computational logic through visual blocks. Create interactive maze games, animate characters, and master loops.',
          tools: ['Scratch 3.0', 'Blockly Logic', 'Visual Coordinate Canvas'],
          learningOutcomes: [
            'Decompose problems into step-by-step visual algorithms',
            'Master sequencing, conditional branches (If-Then), and loops',
            'Handle user keyboard/mouse events and coordinate positioning',
            'Debug code systematically when sprites behave unexpectedly',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Algorithms & Sequencing', objective: 'Writing unambiguous sequential instructions', deliverable: 'Treasure hunt maze solver' },
            { weekNumber: 2, title: 'Conditionals & Decision Trees', objective: 'Making sprites choose actions based on game conditions', deliverable: 'Catch-the-fruit score game' },
            { weekNumber: 3, title: 'Loops & Pattern Iteration', objective: 'Drawing complex geometric mandalas with repeat blocks', deliverable: 'Geometric art generator' },
            { weekNumber: 4, title: 'Variables & Scorekeeping', objective: 'Tracking player score, lives, and timer countdowns', deliverable: 'Fully playable 2D arcade game' },
          ],
          capstoneProject: {
            id: `proj_code_c${classNumber}`,
            trackId: 'track_coding_computation',
            classNumber,
            title: `Build an Interactive 2D Educational Maze Game`,
            brief: `Develop a playable 2D maze game in Scratch where player character must solve Class ${classNumber} puzzles to open locked doors.`,
            realWorldContext: 'Video game development relies on fundamental algorithms: collision detection, state machines, and scoring logic.',
            deliverables: ['Scratch project link or exported file', 'Game design document (1 page)', 'Testing report with 2 user playthroughs'],
            rubricCriteria: [
              { criterion: 'Algorithmic Structure', weightPercentage: 40, masteryDescription: 'Clean modular code blocks with zero infinite loops' },
              { criterion: 'Interactive Mechanics', weightPercentage: 30, masteryDescription: 'Smooth arrow-key controls, collision, and victory screen' },
              { criterion: 'Educational Integration', weightPercentage: 30, masteryDescription: 'Puzzles reinforce core academic topics' },
            ],
            estimatedHours: 5,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : stage === 'middle'
      ? {
          classSpecificTitle: 'Python Fundamentals & Algorithmic Problem Solving',
          level: 'intermediate',
          description: 'Transition from visual blocks to textual Python syntax. Master lists, dictionaries, functions, and algorithmic puzzles.',
          tools: ['Python 3.12', 'VS Code / Replit', 'Terminal CLI'],
          learningOutcomes: [
            'Write clean, readable Python code adhering to PEP 8 standards',
            'Master data structures: lists, dictionaries, tuples, and sets',
            'Write reusable modular functions with parameters and return values',
            'Implement searching and sorting algorithms (Linear & Binary search)',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Python Syntax, Variables & Types', objective: 'Handling user input, type conversions, and formatted strings', deliverable: 'CLI Unit Converter' },
            { weekNumber: 2, title: 'Control Flow & Nested Loops', objective: 'Building mathematical pattern printers and prime testers', deliverable: 'Prime Number & Factor Analyzer' },
            { weekNumber: 3, title: 'Collections: Lists & Dictionaries', objective: 'Managing structured records and querying data', deliverable: 'Student Gradebook Manager' },
            { weekNumber: 4, title: 'Functions, Scope & Recursion', objective: 'Breaking problems into small, testable pure functions', deliverable: 'Text Adventure RPG Game' },
          ],
          capstoneProject: {
            id: `proj_code_c${classNumber}`,
            trackId: 'track_coding_computation',
            classNumber,
            title: `Terminal-Based Financial & Academic Tracker in Python`,
            brief: `Build a robust Python CLI application that reads student data, calculates performance trends, and generates summary statistics.`,
            realWorldContext: 'Command-line utilities form the backbone of modern cloud computing and DevOps infrastructure.',
            deliverables: ['Python script (.py) with modular functions', 'Sample input/output files', 'ReadMe documentation with usage instructions'],
            rubricCriteria: [
              { criterion: 'Code Quality & PEP 8', weightPercentage: 35, masteryDescription: 'Clean indentation, meaningful variable names, docstrings' },
              { criterion: 'Functionality & Edge Cases', weightPercentage: 35, masteryDescription: 'Handles invalid inputs without crashing (try-except)' },
              { criterion: 'Algorithm Efficiency', weightPercentage: 30, masteryDescription: 'Optimal list comprehension and dictionary lookups' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : stage === 'secondary'
      ? {
          classSpecificTitle: 'Object-Oriented Programming & Data Structures',
          level: 'advanced',
          description: 'Master classes, inheritance, polymorphism, stacks, queues, hash maps, and file I/O with Git version control.',
          tools: ['Python 3.12 / C++', 'Git & GitHub', 'Pytest', 'VS Code'],
          learningOutcomes: [
            'Architect scalable software systems using Object-Oriented Design',
            'Implement custom stacks, queues, and linked lists from scratch',
            'Write automated unit tests to verify algorithmic correctness',
            'Collaborate on code using Git branching, commits, and pull requests',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'OOP: Classes, Objects & Encapsulation', objective: 'Modeling real-world entities with private attributes and methods', deliverable: 'Banking System Simulation' },
            { weekNumber: 2, title: 'Inheritance, Polymorphism & Interfaces', objective: 'Building extensible class hierarchies', deliverable: 'Vehicle Fleet Management System' },
            { weekNumber: 3, title: 'Linear Data Structures & Time Complexity', objective: 'Implementing Stacks & Queues and analyzing O(N) notation', deliverable: 'Expression Parenthesis Validator' },
            { weekNumber: 4, title: 'Persistent Storage & Automated Testing', objective: 'Reading/writing JSON files and writing unit tests with Pytest', deliverable: 'Tested Inventory System' },
          ],
          capstoneProject: {
            id: `proj_code_c${classNumber}`,
            trackId: 'track_coding_computation',
            classNumber,
            title: `Object-Oriented School Management System with Git History`,
            brief: `Design a fully tested OOP software system in Python or C++ that manages students, course enrolments, and grades with persistent file storage.`,
            realWorldContext: 'Production enterprise software relies on robust OOP design patterns, unit testing, and strict version control hygiene.',
            deliverables: ['GitHub repository with at least 10 meaningful commits', 'Complete suite of unit tests passing 100%', 'UML Class Diagram'],
            rubricCriteria: [
              { criterion: 'OOP Architecture', weightPercentage: 40, masteryDescription: 'Proper encapsulation, inheritance, and separation of concerns' },
              { criterion: 'Unit Test Coverage', weightPercentage: 30, masteryDescription: 'Comprehensive test cases covering edge cases' },
              { criterion: 'Version Control Practice', weightPercentage: 30, masteryDescription: 'Clear commit messages following Conventional Commits' },
            ],
            estimatedHours: 10,
            difficulty: 'hard',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Full-Stack Software Architecture & Web Engineering',
          level: 'advanced',
          description: 'Build production web applications with Next.js/React, REST APIs, relational databases, and cloud deployment.',
          tools: ['TypeScript', 'Next.js / React', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
          learningOutcomes: [
            'Build responsive modern web frontends using React component architecture',
            'Develop RESTful server endpoints with request validation and authentication',
            'Design normalized relational database schemas with SQL queries',
            'Deploy full-stack applications with continuous integration (CI/CD)',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Modern React & Component State', objective: 'Building interactive UIs with hooks, state, and props', deliverable: 'Interactive Task Dashboard' },
            { weekNumber: 2, title: 'Server Routes & RESTful API Contracts', objective: 'Handling CRUD operations, query params, and HTTP status codes', deliverable: 'Content API with validation' },
            { weekNumber: 3, title: 'Database Modeling & ORM Integration', objective: 'Relational data queries, foreign keys, and migrations', deliverable: 'Database-backed web app' },
            { weekNumber: 4, title: 'Production Deployment & Monitoring', objective: 'Deploying to cloud with environment secrets and error logging', deliverable: 'Live web application URL' },
          ],
          capstoneProject: {
            id: `proj_code_c${classNumber}`,
            trackId: 'track_coding_computation',
            classNumber,
            title: `Full-Stack Collaborative Problem-Solving Platform`,
            brief: `Build and deploy a full-stack web application where students can share code snippets, run solutions, and post peer reviews.`,
            realWorldContext: 'Software engineering in industry requires building full-stack products that handle live database transactions and user authentication.',
            deliverables: ['Live deployed web application link', 'Open-source GitHub repository', 'System architecture documentation'],
            rubricCriteria: [
              { criterion: 'Full-Stack Integration', weightPercentage: 40, masteryDescription: 'Seamless flow between database, API, and frontend UI' },
              { criterion: 'User Experience & Styling', weightPercentage: 30, masteryDescription: 'Clean responsive design, accessible contrast, and error toasts' },
              { criterion: 'Code Structure & Security', weightPercentage: 30, masteryDescription: 'Type-safe TypeScript, sanitized inputs, zero exposed secrets' },
            ],
            estimatedHours: 14,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // 3. APPLIED MATHEMATICS & MENTAL MODELS
  const mathTrack: ClassSkillTrackMeta = {
    id: 'track_math_problem_solving',
    category: 'math_problem_solving',
    title: 'Applied Mathematics & Mental Models',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Calculator',
    colorTheme: 'amber',
    philosophy: 'universal_mastery',
    philosophyNote: 'Universal mastery: fast mental arithmetic, geometric visual proofs, combinatorial logic, and competitive Olympiad deduction.',
    easternHeritage: {
      tradition: 'japanese',
      originalName: 'そろばん & 暗算 (Soroban & Anzan) + 小学奥数 (Aoshu Olympiad Math)',
      englishConcept: 'Flash Mental Abacus Visualization & Non-Routine Heuristic Deduction',
      keyDiscipline: 'Internalized bead-movement mental calculation (Anzan) combined with Chinese Aoshu pigeonhole and parity invariants.',
      dailyDeliberateDrill: '15-min flash mental arithmetic & 1 Olympiad non-routine invariant puzzle (no scratch paper for first 5 mins).',
      gradeTargetNote: 'Foundational mastery for Classes 4–9 before rote algebra calcifies.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Mental Math Puzzles & Visual Geometry'
      : stage === 'middle'
      ? 'Combinatorics, Modular Arithmetic & Cryptarithms'
      : stage === 'secondary'
      ? 'Olympiad Problem Solving & Proof Strategies'
      : 'Calculus Intuitions, Linear Algebra & Optimization',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: stage === 'junior'
      ? 'Speed calculation tricks, visual fraction models, spatial symmetry, and playful pattern deduction.'
      : stage === 'middle'
      ? 'Pigeonhole principle, modular clocks, magic squares, prime number cryptography, and Olympiad logic.'
      : stage === 'secondary'
      ? 'Proof by contradiction, mathematical induction, invariant principles, and competitive geometry theorems.'
      : 'Vector transformations, gradient descent intuition, probability distributions, and continuous optimization.',
    tools: ['Mental Math Simulator', 'GeoGebra Visualizer', 'Proof Workbench'],
    learningOutcomes: [
      'Deconstruct complex non-standard mathematical puzzles into simpler lemmas',
      'Construct visual and algebraic proofs with rigorous mathematical notation',
      'Apply mathematical models to solve real-world optimization problems',
      'Gain high speed and precision without reliance on calculators',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'Invariance & Parity Arguments', objective: 'Using parity (even/odd) and invariants to prove impossibility', deliverable: 'Parity problem portfolio' },
      { weekNumber: 2, title: 'Combinatorial Counting & Pigeonhole Principle', objective: 'Systematic counting techniques and guaranteed existence proofs', deliverable: 'Olympiad puzzle solver' },
      { weekNumber: 3, title: 'Geometric Transformations & Auxiliary Lines', objective: 'Adding construction lines to unlock visual proofs', deliverable: 'Geometric proof diagram' },
      { weekNumber: 4, title: 'Optimization & Extremal Principles', objective: 'Finding minimum/maximum bounds in discrete configurations', deliverable: 'Complete mathematical paper' },
    ],
    capstoneProject: {
      id: `proj_math_c${classNumber}`,
      trackId: 'track_math_problem_solving',
      classNumber,
      title: `Solve & Document 5 Advanced Non-Routine Olympiad Challenges`,
      brief: `Solve 5 multi-step Olympiad-level mathematical problems for Class ${classNumber}, providing rigorous proofs, visual diagrams, and alternate solutions.`,
      realWorldContext: 'Top STEM researchers and quantitative analysts stand out through rigorous proof construction rather than rote calculation.',
      deliverables: ['Formatted mathematical solution manuscript (PDF/LaTeX or clean document)', 'GeoGebra / visual diagrams for each problem', 'Extremal case analysis'],
      rubricCriteria: [
        { criterion: 'Rigor of Proof', weightPercentage: 40, masteryDescription: 'Logically complete steps with zero unwarranted leaps' },
        { criterion: 'Visual Clarity', weightPercentage: 30, masteryDescription: 'Clear geometric illustrations and modular notation' },
        { criterion: 'Alternate Methodologies', weightPercentage: 30, masteryDescription: 'Demonstrates at least 2 distinct avenues of solution' },
      ],
      estimatedHours: 6,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  // 4. ROBOTICS & PHYSICAL COMPUTING
  const roboticsTrack: ClassSkillTrackMeta = {
    id: 'track_robotics_engineering',
    category: 'robotics_engineering',
    title: 'Robotics & Physical Computing',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Cpu',
    colorTheme: 'emerald',
    philosophy: 'japanese_kaizen',
    philosophyNote: 'Japanese Monozukuri: precision physical craft, disciplined safety, schematic cleanliness, and iterative hardware engineering.',
    easternHeritage: {
      tradition: 'japanese',
      originalName: 'ものづくり (Monozukuri Craftsmanship) & 整理・整頓 (Seiri-Seiton)',
      englishConcept: 'Precision Physical Engineering, Zero-Defect Assembly & Tactile Wiring',
      keyDiscipline: 'Deep respect for the physical component, clean right-angle breadboard wiring, and systematic polarity/voltage check before power-on.',
      dailyDeliberateDrill: '15-min circuit audit: inspect breadboard connections, calculate resistor drop, and test continuity with a multimeter.',
      gradeTargetNote: 'Hands-on spatial & tactile engineering for Classes 4–9.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Circuits, Switches & Simple Machines'
      : stage === 'middle'
      ? 'Microcontroller Logic & Sensor Interfacing'
      : stage === 'secondary'
      ? 'Autonomous Robotics & Actuator Control'
      : 'IoT Embedded Systems & Edge Computing',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: stage === 'junior'
      ? 'Snap circuits, series vs parallel batteries, LEDs, buzzers, and mechanical gear ratios.'
      : stage === 'middle'
      ? 'Arduino / Micro:bit programming, ultrasonic distance measurement, light-dependent resistors, and servo motors.'
      : stage === 'secondary'
      ? 'PID controller concepts, line-following robots, obstacle avoidance algorithms, and motor driver H-bridges.'
      : 'ESP32 Wi-Fi/Bluetooth telemetry, MQTT cloud dashboards, low-power sleep modes, and industrial sensor buses.',
    tools: ['TinkerCAD Circuits', 'Arduino IDE', 'Micro:bit Simulator', 'Wokwi IoT Studio'],
    learningOutcomes: [
      'Read and draw clean electronic circuit schematics with correct component polarities',
      'Write embedded code to sample sensor data and drive physical actuators',
      'Apply Ohm’s Law and power ratings to protect microcontrollers from burnout',
      'Troubleshoot hardware failures with multi-meter testing methodologies',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'Circuit Schematics & Power Distribution', objective: 'Understanding voltage, current, resistance, and ground loops', deliverable: 'TinkerCAD LED flasher schematic' },
      { weekNumber: 2, title: 'Sensor Input & Analog-to-Digital Conversion', objective: 'Reading analog voltages from light and temperature sensors', deliverable: 'Automated light sensing circuit' },
      { weekNumber: 3, title: 'Motor Drivers & Mechanical Actuators', objective: 'Controlling DC motors and servo angles with PWM signals', deliverable: 'Motor speed & direction controller' },
      { weekNumber: 4, title: 'Autonomous Closed-Loop Control', objective: 'Programming feedback loops where sensors dictate motor movements', deliverable: 'Autonomous robot simulator' },
    ],
    capstoneProject: {
      id: `proj_robotics_c${classNumber}`,
      trackId: 'track_robotics_engineering',
      classNumber,
      title: `Design & Simulate an Autonomous Smart Environmental System`,
      brief: `Create a physical computing system in TinkerCAD or physical hardware that monitors environmental conditions and triggers automated servo/fan responses.`,
      realWorldContext: 'Smart agricultural greenhouses and industrial factories rely on autonomous physical computing to maintain critical environmental thresholds.',
      deliverables: ['Interactive simulation link or hardware video', 'Circuit schematic diagram with component bill of materials', 'Embedded C++ / Block source code'],
      rubricCriteria: [
        { criterion: 'Circuit Correctness', weightPercentage: 40, masteryDescription: 'Correct resistor sizing, ground references, zero short-circuit hazards' },
        { criterion: 'Embedded Code Logic', weightPercentage: 35, masteryDescription: 'Non-blocking sensor sampling with smooth actuator response' },
        { criterion: 'Documentation Quality', weightPercentage: 25, masteryDescription: 'Detailed pinout table and wiring explanation' },
      ],
      estimatedHours: 6,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  // 5. UI/UX & CREATIVE DIGITAL PRODUCTION
  const designTrack: ClassSkillTrackMeta = {
    id: 'track_design_production',
    category: 'design_production',
    title: 'UI/UX & Creative Digital Production',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Palette',
    colorTheme: 'purple',
    philosophy: 'japanese_kaizen',
    philosophyNote: 'Japanese aesthetic minimalism: purposeful whitespace (Ma), high-contrast accessibility, and empathetic user-centered design.',
    easternHeritage: {
      tradition: 'japanese',
      originalName: '5S 原則 (Seiri, Seiton) & 間 (Ma - Purposeful Space)',
      englishConcept: 'Ergonomic Order, Clutter Elimination (Muda) & Purposeful Space',
      keyDiscipline: 'Eliminating decorative clutter (Muda), enforcing an unyielding 8pt spatial rhythm, and ensuring WCAG AA high contrast.',
      dailyDeliberateDrill: '15-min UI declutter drill: inspect 1 screen, remove 3 redundant visual elements, and align all margins to 8px intervals.',
      gradeTargetNote: 'Instills design cleanliness, visual empathy, and ergonomic discipline for Classes 4–9.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Visual Layout, Colors & Digital Posters'
      : stage === 'middle'
      ? 'App Wireframing, Personas & User Flows'
      : stage === 'secondary'
      ? 'Interactive Design Systems & Mobile UX'
      : 'Full Design System Architecture & Usability Testing',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: 'Master typographic hierarchy, 8pt spatial grid, color psychology, mobile touch targets, and Figma prototypes.',
    tools: ['Figma', 'Penpot', 'Contrast Checker (WCAG)', 'Whimsical User Flows'],
    learningOutcomes: [
      'Construct ergonomic user interfaces adhering to accessibility (WCAG AA) standards',
      'Create reusable design tokens: color palettes, typography scales, and component variants',
      'Map realistic user journeys from onboarding to goal completion',
      'Conduct usability testing interviews and iterate based on user friction points',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'Visual Hierarchy, Typography & 8pt Grid', objective: 'Organizing information with scale, weight, and consistent margins', deliverable: 'Redesigned school poster' },
      { weekNumber: 2, title: 'Color Theory & Accessibility Contrast', objective: 'Selecting harmonious palettes meeting 4.5:1 text contrast ratios', deliverable: 'Accessible color token palette' },
      { weekNumber: 3, title: 'Component Libraries & Variants in Figma', objective: 'Building reusable buttons, input fields, and navigation bars', deliverable: 'Mobile component library' },
      { weekNumber: 4, title: 'Interactive Clickable Prototype', objective: 'Connecting screens with micro-interactions and transitions', deliverable: 'Clickable 5-screen app prototype' },
    ],
    capstoneProject: {
      id: `proj_design_c${classNumber}`,
      trackId: 'track_design_production',
      classNumber,
      title: `Design an Ergonomic Mobile Learning Experience in Figma`,
      brief: `Design and prototype an intuitive 5-screen mobile application tailored for Class ${classNumber} students to manage homework and collaborate on projects.`,
      realWorldContext: 'Top digital products win through exceptional usability, intuitive visual cues, and accessible ergonomics.',
      deliverables: ['Figma clickable prototype link', 'Design system style guide (Typography, Colors, Spacing)', 'Usability testing notes from 2 student testers'],
      rubricCriteria: [
        { criterion: 'Ergonomics & Usability', weightPercentage: 40, masteryDescription: '48px minimum touch targets, intuitive navigation, readable text' },
        { criterion: 'Design System Consistency', weightPercentage: 35, masteryDescription: 'Strict reuse of color tokens, button variants, and 8pt grid' },
        { criterion: 'Visual Delight & Restraint', weightPercentage: 25, masteryDescription: 'Purposeful negative space without visual clutter' },
      ],
      estimatedHours: 6,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  // 6. TECHNICAL COMMUNICATION & DEBATE
  const commTrack: ClassSkillTrackMeta = {
    id: 'track_communication_collab',
    category: 'communication_collaboration',
    title: 'Technical Communication & Debate',
    classNumber,
    stage,
    stageLabel,
    iconName: 'MessageSquare',
    colorTheme: 'cyan',
    philosophy: 'universal_mastery',
    philosophyNote: 'Universal mastery: structured rhetoric, evidence-based argument construction, active listening, and calm persuasive discourse.',
    easternHeritage: {
      tradition: 'japanese',
      originalName: '起承転結 (Kishōtenketsu) & 和 (Wa - Harmonious Rhetoric)',
      englishConcept: '4-Part Structural Rhetoric (Introduction, Development, Twist, Synthesis)',
      keyDiscipline: 'Non-adversarial 4-stage storytelling and argument architecture enabling persuasive synthesis of viewpoints without hostility.',
      dailyDeliberateDrill: '10-min speech structure drill: outline an argument using 4 index cards: Introduction, Development, Twist, and Unified Conclusion.',
      gradeTargetNote: 'Develops disciplined, structured, and polite persuasive public speaking for Classes 4–9.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Expressive Storytelling & Confident Speaking'
      : stage === 'middle'
      ? 'Structured Debate & Logical Fallacies'
      : stage === 'secondary'
      ? 'Rhetorical Analysis & Persuasive Policy Arguments'
      : 'Technical Research Defense & Keynote Presentation',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: 'Learn evidence synthesis, Oxford-style parliamentary debate, detecting logical fallacies, and delivering memorable presentations.',
    tools: ['Speech Structure Canvas', 'Evidence Fact-Checking Index', 'Audio/Video Recorder'],
    learningOutcomes: [
      'Structure speeches using Assertion-Reasoning-Evidence-Impact (AREI) frameworks',
      'Identify and dismantle 10 common logical fallacies (ad hominem, straw man, false cause)',
      'Deliver persuasive talks with vocal modulation, confident eye contact, and poise',
      'Conduct rigorous cross-examination and rebuttal without personal hostility',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'The AREI Argumentation Framework', objective: 'Structuring points with clear claims and empirical proof', deliverable: '3-point written argument brief' },
      { weekNumber: 2, title: 'Detecting & Countering Fallacies', objective: 'Spotting flawed logic in public discourse and commercials', deliverable: 'Logical fallacy teardown report' },
      { weekNumber: 3, title: 'Rebuttals & POIs (Points of Information)', objective: 'Thinking on your feet to address sharp counter-arguments', deliverable: 'Rebuttal audio recording' },
      { weekNumber: 4, title: 'The 5-Minute Keynote Address', objective: 'Synthesizing research into a compelling call to action', deliverable: 'Video / live speech recording' },
    ],
    capstoneProject: {
      id: `proj_comm_c${classNumber}`,
      trackId: 'track_communication_collab',
      classNumber,
      title: `Deliver a 5-Minute Evidence-Based Policy Speech`,
      brief: `Research, write, and deliver a structured 5-minute speech addressing a critical issue in education, technology, or climate for Class ${classNumber}.`,
      realWorldContext: 'Leaders, engineers, and scientists must articulate complex viewpoints with precision to influence policy and inspire teams.',
      deliverables: ['Complete speech manuscript with cited sources', 'Audio or video recording (5 minutes)', 'Anticipated counter-arguments & rebuttal card'],
      rubricCriteria: [
        { criterion: 'Logical Structure (AREI)', weightPercentage: 40, masteryDescription: 'Every claim backed by credible facts; seamless transitions' },
        { criterion: 'Delivery & Modulation', weightPercentage: 35, masteryDescription: 'Clear articulation, measured pacing, confident rhetorical pauses' },
        { criterion: 'Rebuttal Preparedness', weightPercentage: 25, masteryDescription: 'Addresses strongest opposing perspectives fairly' },
      ],
      estimatedHours: 5,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  // 7. VENTURE CREATION & FINANCIAL LITERACY
  const ventureTrack: ClassSkillTrackMeta = {
    id: 'track_entrepreneurship_fin',
    category: 'entrepreneurship_finance',
    title: 'Venture Creation & Financial Literacy',
    classNumber,
    stage,
    stageLabel,
    iconName: 'TrendingUp',
    colorTheme: 'rose',
    philosophy: 'chinese_progression',
    philosophyNote: 'Chinese execution focus: early unit economics, frugal prototyping, direct customer feedback, and rapid capital reinvestment.',
    easternHeritage: {
      tradition: 'chinese',
      originalName: '实事求是 (Seek Truth From Facts) & 算盘账 (Abacus Unit Economics)',
      englishConcept: 'Frugal Unit Margins, Direct Customer Truth & Pragmatic Reinvestment',
      keyDiscipline: 'Grounding every commercial decision in empirical customer reality (Seek Truth From Facts), positive unit gross margin on item 1, and zero wasteful cash burn.',
      dailyDeliberateDrill: '15-min unit economics drill: calculate COGS, packaging, and break-even units for a lemonade or stationery stall.',
      gradeTargetNote: 'Financial literacy and practical enterprise habits for Classes 4–9.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Pocket Money Budgeting & Trade Games'
      : stage === 'middle'
      ? 'Micro-Venture Creation & Unit Economics'
      : stage === 'secondary'
      ? 'Lean Startup, Customer Discovery & MVPs'
      : 'Venture Capital Modeling, Cap Tables & Pitch Decks',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: 'Learn budgeting, pricing models, profit margins, customer problem discovery, lean canvas, and pitch deck construction.',
    tools: ['Google Sheets / Excel', 'Lean Canvas Template', 'Financial Projections Model'],
    learningOutcomes: [
      'Calculate unit economics: Cost of Goods Sold (COGS), gross margin, and net profit',
      'Distinguish assets vs liabilities and understand compound interest fundamentals',
      'Conduct unbiased customer discovery interviews to validate real market demand',
      'Build a cohesive 10-slide venture pitch deck communicating value proposition',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'Money, Trade & Compound Growth', objective: 'Understanding cash flow, savings buffers, and inflation', deliverable: 'Personal budgeting spreadsheet' },
      { weekNumber: 2, title: 'Customer Problem Discovery', objective: 'Interviewing potential customers without biasing their answers', deliverable: 'Customer interview summary' },
      { weekNumber: 3, title: 'Unit Economics & Pricing Strategy', objective: 'Calculating margin, fixed costs, and break-even sales volume', deliverable: 'Break-even financial model' },
      { weekNumber: 4, title: 'The Lean Canvas & 10-Slide Pitch', objective: 'Synthesizing problem, solution, metrics, and go-to-market plan', deliverable: 'Venture pitch deck' },
    ],
    capstoneProject: {
      id: `proj_venture_c${classNumber}`,
      trackId: 'track_entrepreneurship_fin',
      classNumber,
      title: `Build a Validated Lean Canvas & Financial Model for a Student Venture`,
      brief: `Identify an unmet need in your school or community, interview 5 potential users, and build a complete Lean Canvas with a 12-month budget model.`,
      realWorldContext: 'Entrepreneurs succeed by validating painful customer problems and maintaining disciplined financial unit economics from day one.',
      deliverables: ['1-page Lean Canvas model', '12-month financial projection spreadsheet', '5-minute recorded video pitch'],
      rubricCriteria: [
        { criterion: 'Customer Validation', weightPercentage: 40, masteryDescription: 'Evidence of real user feedback shaping the solution' },
        { criterion: 'Financial Accuracy', weightPercentage: 35, masteryDescription: 'Realistic cost estimates, realistic pricing, and positive unit margin' },
        { criterion: 'Clarity of Value Prop', weightPercentage: 25, masteryDescription: 'Unambiguous explanation of why customers will pay' },
      ],
      estimatedHours: 6,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  // 8. MODERN DIGITAL TOOLS & CLOUD WORKFLOWS
  const toolsTrack: ClassSkillTrackMeta = {
    id: 'track_digital_vocational',
    category: 'digital_vocational',
    title: 'Modern Digital Tools & Cloud Workflows',
    classNumber,
    stage,
    stageLabel,
    iconName: 'Cloud',
    colorTheme: 'sky',
    philosophy: 'universal_mastery',
    philosophyNote: 'Universal mastery: modern digital fluency, spreadsheet modeling, relational data organization, and cybersecurity hygiene.',
    easternHeritage: {
      tradition: 'pan_asian',
      originalName: '正道入力 (Correct Posture Blind Typing) & 结构化数据 (Structured Relational Hygiene)',
      englishConcept: 'Ergonomic Touch-Typing Precision & Strict Tabular Data Normalization',
      keyDiscipline: '10-finger touch typing without looking at the keyboard (target 50+ WPM), consistent column naming, zero merged cells, and daily cloud backup hygiene.',
      dailyDeliberateDrill: '10-min blind touch-typing drill + 5-min spreadsheet cleaning (remove duplicate rows & format headers).',
      gradeTargetNote: 'Digital keyboarding fluency and data hygiene for Classes 4–9.',
    },
    classSpecificTitle: stage === 'junior'
      ? 'Digital Literacy, Safe Browsing & Docs'
      : stage === 'middle'
      ? 'Spreadsheet Formulas, Tables & Cloud Hygiene'
      : stage === 'secondary'
      ? 'Relational Databases, SQL & Markdown Workflows'
      : 'Cloud Infrastructure, Automation & API Pipelines',
    level: stage === 'junior' ? 'foundation' : stage === 'middle' ? 'intermediate' : 'advanced',
    description: 'Master spreadsheet VLOOKUP/FILTER, SQL database queries, cloud folder hierarchies, markdown technical docs, and digital safety.',
    tools: ['Google Sheets / Excel', 'Notion / Markdown', 'SQLite Studio', 'Zapier / Cloud Workflows'],
    learningOutcomes: [
      'Master spreadsheet lookup formulas (VLOOKUP, XLOOKUP, INDEX-MATCH) and Pivot Tables',
      'Design relational schemas and write SELECT, JOIN, and GROUP BY SQL queries',
      'Implement multi-factor authentication (MFA) and zero-trust security habits',
      'Automate repetitive workflows by connecting cloud apps with webhooks',
    ],
    weeklyModules: [
      { weekNumber: 1, title: 'Advanced Formulas & Data Cleaning', objective: 'Transforming messy spreadsheets with text and lookup functions', deliverable: 'Automated attendance dashboard' },
      { weekNumber: 2, title: 'Pivot Tables & Visual Dashboards', objective: 'Aggregating large datasets into visual charts and KPIs', deliverable: 'Sales & performance summary' },
      { weekNumber: 3, title: 'Relational SQL Query Foundations', objective: 'Querying normalized tables with INNER and LEFT JOINs', deliverable: 'Library database query suite' },
      { weekNumber: 4, title: 'Cloud Automation & Workflow Triggers', objective: 'Automating notification emails and form syncs with webhooks', deliverable: 'Automated event workflow' },
    ],
    capstoneProject: {
      id: `proj_tools_c${classNumber}`,
      trackId: 'track_digital_vocational',
      classNumber,
      title: `Build an Automated Multi-Table Operations Dashboard`,
      brief: `Create a relational spreadsheet or SQL database that tracks Class ${classNumber} events, calculates performance KPIs, and triggers automated summaries.`,
      realWorldContext: 'Modern operations and business analysts rely on structured data tables and automated workflows to run day-to-day operations.',
      deliverables: ['Live Google Sheet / SQL database link with sample data', 'Pivot table executive dashboard', 'Technical markdown documentation'],
      rubricCriteria: [
        { criterion: 'Data Structure & Normalization', weightPercentage: 40, masteryDescription: 'Clean relational design with zero redundant columns' },
        { criterion: 'Formula Rigor', weightPercentage: 35, masteryDescription: 'Dynamic array formulas and clean error handling (IFERROR)' },
        { criterion: 'Documentation Quality', weightPercentage: 25, masteryDescription: 'Clear data dictionary and operational runbook' },
      ],
      estimatedHours: 5,
      difficulty: stage === 'junior' ? 'easy' : stage === 'middle' ? 'medium' : 'hard',
      status: 'verified',
    },
  }

  return [
    aiTrack,
    codingTrack,
    mathTrack,
    roboticsTrack,
    designTrack,
    commTrack,
    ventureTrack,
    toolsTrack,
  ]
}

// ============================================================================
// PROJECT RESOLVER
// ============================================================================

export function getSkillProjectById(projectId: string): ClassSkillProject | undefined {
  // Check across all classes (4 through 12)
  for (let c = 4; c <= 12; c++) {
    const tracks = getClassSkillTracks(c)
    for (const t of tracks) {
      if (t.capstoneProject.id === projectId) {
        return t.capstoneProject
      }
    }
  }
  return undefined
}

export function getAllClassProjects(classNumber?: number): ClassSkillProject[] {
  if (classNumber) {
    return getClassSkillTracks(classNumber).map((t) => t.capstoneProject)
  }
  // Return distinct representative projects across brackets
  const sampleClasses = [4, 7, 10, 12]
  const projects: ClassSkillProject[] = []
  for (const c of sampleClasses) {
    projects.push(...getClassSkillTracks(c).map((t) => t.capstoneProject))
  }
  return projects
}
