-- Migration: 0002_three_domains.sql
-- Description: Normalized data architecture for TalentXcel Three-Domain Architecture
-- Domains: Assessment & Intelligence · Skill Development · Academic Learning
-- 100% Standalone & Idempotent (no rigid foreign key coupling to unmigrated tables)

-- 1. Academic Lessons Table (Domain 3: Academic Learning)
CREATE TABLE IF NOT EXISTS public.academic_lessons (
    id TEXT PRIMARY KEY,
    chapter_id TEXT,
    topic_id TEXT,
    lesson_number INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    reading_time_minutes INTEGER NOT NULL DEFAULT 10,
    concept_breakdown JSONB NOT NULL DEFAULT '[]'::jsonb,
    worked_examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    revision_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_formulas_or_rules JSONB DEFAULT '[]'::jsonb,
    linked_blueprint_id TEXT,
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'provisional', 'not_available')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Skill Tracks Table (Domain 2: Skill Development with Japanese & Chinese design inspirations)
CREATE TABLE IF NOT EXISTS public.skill_tracks (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN (
        'ai_automation',
        'coding_computation',
        'math_problem_solving',
        'robotics_engineering',
        'design_production',
        'communication_collaboration',
        'entrepreneurship_finance',
        'digital_vocational'
    )),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    target_grades TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('foundation', 'intermediate', 'advanced')),
    philosophy TEXT NOT NULL CHECK (philosophy IN ('japanese_kaizen', 'chinese_progression', 'universal_mastery')),
    philosophy_note TEXT,
    modules_count INTEGER NOT NULL DEFAULT 0,
    projects_count INTEGER NOT NULL DEFAULT 0,
    icon_name TEXT NOT NULL DEFAULT 'Sparkles',
    color_theme TEXT NOT NULL DEFAULT 'indigo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Skill Modules Table
CREATE TABLE IF NOT EXISTS public.skill_modules (
    id TEXT PRIMARY KEY,
    track_id TEXT NOT NULL REFERENCES public.skill_tracks(id) ON DELETE CASCADE,
    module_number INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    key_techniques JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'provisional', 'not_available')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Skill Projects Table (Hands-on deliverables with rubric criteria)
CREATE TABLE IF NOT EXISTS public.skill_projects (
    id TEXT PRIMARY KEY,
    track_id TEXT NOT NULL REFERENCES public.skill_tracks(id) ON DELETE CASCADE,
    module_id TEXT,
    title TEXT NOT NULL,
    brief TEXT NOT NULL,
    real_world_context TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    rubric_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_hours NUMERIC(4,1) NOT NULL DEFAULT 4.0,
    difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard', 'olympiad')),
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'provisional', 'not_available')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Learner Skill Submissions & Portfolio Evidence
CREATE TABLE IF NOT EXISTS public.learner_skill_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id TEXT NOT NULL REFERENCES public.skill_projects(id) ON DELETE CASCADE,
    learner_id TEXT NOT NULL,
    submission_url TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),
    feedback TEXT,
    awarded_badges JSONB NOT NULL DEFAULT '[]'::jsonb,
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Competitive Exam Batches Pipeline (Domain 1: Assessment & Intelligence)
CREATE TABLE IF NOT EXISTS public.competitive_exam_batches (
    id TEXT PRIMARY KEY,
    exam_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('engineering_medical', 'civil_services', 'graduate_state', 'banking_ssc')),
    target_stage TEXT NOT NULL,
    verified_status TEXT NOT NULL DEFAULT 'provisional' CHECK (verified_status IN ('verified', 'provisional', 'not_available')),
    sample_tests_available INTEGER NOT NULL DEFAULT 0,
    expected_launch_batch TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Personalised Growth Recommendations (Tri-Domain linkage)
CREATE TABLE IF NOT EXISTS public.learner_growth_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id TEXT NOT NULL,
    gap_topic_id TEXT,
    gap_description TEXT NOT NULL,
    recommended_lesson_id TEXT REFERENCES public.academic_lessons(id) ON DELETE SET NULL,
    recommended_project_id TEXT REFERENCES public.skill_projects(id) ON DELETE SET NULL,
    reassessment_blueprint_id TEXT,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high-performance querying
CREATE INDEX IF NOT EXISTS idx_academic_lessons_chapter ON public.academic_lessons(chapter_id);
CREATE INDEX IF NOT EXISTS idx_academic_lessons_topic ON public.academic_lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_skill_modules_track ON public.skill_modules(track_id);
CREATE INDEX IF NOT EXISTS idx_skill_projects_track ON public.skill_projects(track_id);
CREATE INDEX IF NOT EXISTS idx_learner_skill_submissions_user ON public.learner_skill_submissions(learner_id);
CREATE INDEX IF NOT EXISTS idx_learner_growth_learner ON public.learner_growth_recommendations(learner_id);

-- Enable RLS
ALTER TABLE public.academic_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_skill_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitive_exam_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_growth_recommendations ENABLE ROW LEVEL SECURITY;

-- Read policies for public educational content
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public read academic lessons" ON public.academic_lessons;
    CREATE POLICY "Public read academic lessons" ON public.academic_lessons FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read skill tracks" ON public.skill_tracks;
    CREATE POLICY "Public read skill tracks" ON public.skill_tracks FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read skill modules" ON public.skill_modules;
    CREATE POLICY "Public read skill modules" ON public.skill_modules FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read skill projects" ON public.skill_projects;
    CREATE POLICY "Public read skill projects" ON public.skill_projects FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read competitive exams" ON public.competitive_exam_batches;
    CREATE POLICY "Public read competitive exams" ON public.competitive_exam_batches FOR SELECT USING (true);
END $$;

-- ============================================================================
-- SEED DATA: Three-Domain Architecture Catalogs (Idempotent Inserts)
-- ============================================================================

-- 1. Skill Tracks
INSERT INTO public.skill_tracks (id, category, title, description, target_grades, level, philosophy, philosophy_note, modules_count, projects_count, icon_name, color_theme)
VALUES
    ('track_ai_automation', 'ai_automation', 'AI Engineering & Prompt Problem Solving', 'Prompt engineering, LLM reasoning chains, synthetic dataset curation, and automated workflows.', 'Classes 6–12', 'foundation', 'japanese_kaizen', 'Design inspiration: Japanese Kaizen — iterative prompt refinement, clean structured outputs and systematic error analysis.', 6, 4, 'Bot', 'indigo'),
    ('track_coding_computation', 'coding_computation', 'Algorithmic Coding & Systems Thinking', 'Structured programming, data structures, recursion, and event-driven browser applications in TypeScript & Python.', 'Classes 4–12', 'foundation', 'chinese_progression', 'Design inspiration: Chinese structured progression — rigorous mathematical foundations, deliberate practice and applied algorithms.', 8, 5, 'Code', 'blue'),
    ('track_math_problem_solving', 'math_problem_solving', 'Applied Mathematics & Mental Models', 'Combinatorial reasoning, geometric visual proofs, modular arithmetic and Olympiad-level deduction.', 'Classes 4–12', 'intermediate', 'universal_mastery', 'Continuous mental drills and visual proof construction for real-world mathematical mastery.', 6, 4, 'Calculator', 'amber'),
    ('track_robotics_engineering', 'robotics_engineering', 'Robotics & Physical Computing', 'Circuits, sensors, actuators, closed-loop logic and microcontroller engineering with Arduino.', 'Classes 6–12', 'foundation', 'japanese_kaizen', 'Design inspiration: Japanese Monozukuri — precision physical craft, disciplined safety and iterative hardware builds.', 6, 3, 'Cpu', 'emerald'),
    ('track_design_production', 'design_production', 'UI/UX & Creative Digital Production', 'Design systems, visual hierarchy, ergonomic user interfaces, typography and accessible prototypes.', 'Classes 6–12', 'intermediate', 'japanese_kaizen', 'Design inspiration: Japanese aesthetic minimalism — purposeful negative space, high contrast and user empathy.', 6, 4, 'Palette', 'purple'),
    ('track_communication_collab', 'communication_collaboration', 'Technical Communication & Debate', 'Clear structured rhetoric, evidence-based argument construction, peer reviews and project presentations.', 'Classes 5–12', 'foundation', 'universal_mastery', 'Clarity of thought reflected through disciplined writing, active listening and structured peer critique.', 4, 3, 'MessageSquare', 'cyan'),
    ('track_entrepreneurship_fin', 'entrepreneurship_finance', 'Venture Creation & Financial Literacy', 'Unit economics, budgeting, customer validation interviews, pricing models and business prototypes.', 'Classes 7–12', 'intermediate', 'chinese_progression', 'Design inspiration: Pragmatic execution — early revenue focus, frugal prototyping and rapid customer feedback loops.', 5, 3, 'TrendingUp', 'rose'),
    ('track_digital_vocational', 'digital_vocational', 'Modern Digital Tools & Cloud Workflows', 'Spreadsheets, relational data tables, cloud storage, API integrations and cybersecurity hygiene.', 'Classes 6–12', 'foundation', 'universal_mastery', 'Practical vocational digital fluency required in modern academic and professional research environments.', 5, 3, 'Cloud', 'blue')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    target_grades = EXCLUDED.target_grades,
    level = EXCLUDED.level,
    philosophy = EXCLUDED.philosophy,
    philosophy_note = EXCLUDED.philosophy_note,
    modules_count = EXCLUDED.modules_count,
    projects_count = EXCLUDED.projects_count,
    icon_name = EXCLUDED.icon_name,
    color_theme = EXCLUDED.color_theme;

-- 2. Capstone Skill Projects
INSERT INTO public.skill_projects (id, track_id, title, brief, real_world_context, deliverables, rubric_criteria, estimated_hours, difficulty, status)
VALUES
    ('proj_ai_assistant', 'track_ai_automation', 'Build a Socratic Study Helper with Grounded Prompts', 'Design, test, and document a multi-turn AI prompt that guides a student to understand Grade 4 fractions without giving away direct answers.', 'AI systems in education must teach through Socratic questioning rather than writing student homework for them.', '["System prompt with explicit pedagogical guardrails", "Test transcript demonstrating 3 student misconceptions successfully resolved", "One-page edge-case analysis report"]'::jsonb, '[{"criterion": "Socratic Guardrails", "weightPercentage": 35, "masteryDescription": "Never reveals answers prematurely; prompts with guiding questions"}, {"criterion": "Clarity of Instruction", "weightPercentage": 35, "masteryDescription": "Clear, concise and age-appropriate vocabulary"}, {"criterion": "Edge-Case Handling", "weightPercentage": 30, "masteryDescription": "Detects off-topic queries or frustration and gently resets focus"}]'::jsonb, 4.0, 'easy', 'verified'),
    ('proj_coding_maze', 'track_coding_computation', 'Interactive 2D Grid Maze Game in JavaScript', 'Program a functional browser maze where a player character navigates using arrow keys, collects energy stars, and avoids algorithmic obstacle walls.', 'Grid coordinate arrays and event-driven game loops are the foundational building blocks of graphical applications.', '["Clean HTML5/JS canvas game loop script", "Deterministic 10x10 matrix maze layout", "Collision detection and win-condition handlers"]'::jsonb, '[{"criterion": "Algorithmic Cleanliness", "weightPercentage": 40, "masteryDescription": "Modular functions, zero global leaks, descriptive variable naming"}, {"criterion": "Smooth Collision Logic", "weightPercentage": 30, "masteryDescription": "Character never clips through boundary walls or diagonal gaps"}, {"criterion": "User Experience & Feedback", "weightPercentage": 30, "masteryDescription": "Clear score counter, restart button, and visual celebration"}]'::jsonb, 6.0, 'medium', 'verified'),
    ('proj_robotics_sensor', 'track_robotics_engineering', 'Soil Moisture Smart Irrigation Alert Circuit', 'Construct a breadboard circuit using a resistive moisture probe and an LED/buzzer to alert gardeners when plant soil falls below 20% moisture.', 'Precision agriculture in India relies on low-cost IoT soil moisture probes to prevent groundwater depletion.', '["Wiring schematic diagram showing resistor voltage divider", "Annotated Arduino/ESP32 sketch with threshold calibration", "1-minute demonstration video or photographic log"]'::jsonb, '[{"criterion": "Circuit Safety & Wiring", "weightPercentage": 30, "masteryDescription": "Correct resistor values, zero short-circuit risks"}, {"criterion": "Sensor Calibration Accuracy", "weightPercentage": 40, "masteryDescription": "Accurately distinguishes between dry, moist, and saturated soil"}, {"criterion": "Documentation Rigor", "weightPercentage": 30, "masteryDescription": "Clear pin-out diagram and bill of materials"}]'::jsonb, 5.0, 'medium', 'verified'),
    ('proj_design_flashcard', 'track_design_production', 'Accessible School Flashcard Interface Design', 'Design a 3-screen mobile flashcard application in Figma or wireframes adhering to WCAG AA color contrast standards.', 'Educational software must be legible under direct sunlight and accessible to learners with visual impairments.', '["Interactive Figma prototype link or SVG mockups", "Color contrast ratio audit table", "Design token style guide"]'::jsonb, '[{"criterion": "Accessibility & Legibility", "weightPercentage": 40, "masteryDescription": "Meets WCAG 4.5:1 text contrast ratio across all light/dark screens"}, {"criterion": "Information Architecture", "weightPercentage": 30, "masteryDescription": "Clear visual hierarchy with prominent question and answer toggle"}, {"criterion": "Design System Consistency", "weightPercentage": 30, "masteryDescription": "Reused component styles, consistent padding and typographic scale"}]'::jsonb, 4.0, 'easy', 'verified')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    brief = EXCLUDED.brief,
    real_world_context = EXCLUDED.real_world_context,
    deliverables = EXCLUDED.deliverables,
    rubric_criteria = EXCLUDED.rubric_criteria,
    estimated_hours = EXCLUDED.estimated_hours,
    difficulty = EXCLUDED.difficulty,
    status = EXCLUDED.status;

-- 3. Academic Lessons
INSERT INTO public.academic_lessons (id, chapter_id, topic_id, lesson_number, title, reading_time_minutes, concept_breakdown, worked_examples, revision_notes, key_formulas_or_rules, linked_blueprint_id, status)
VALUES
    ('less_g4_m6_l1', 'chap_g4_math_c6', 'top_g4_m6_1', 1, 'Understanding Multiples & Skip Counting on the Number Line', 8, '[{"heading": "What is a Multiple?", "body": "A multiple of a number is the product of that number and any counting number (1, 2, 3, 4...). When you count by 6s (6, 12, 18, 24...), you are generating the multiples of 6."}, {"heading": "Multiples on the Number Line", "body": "Imagine a frog jumping from 0 along a number line. If each hop is 6 units long, the frog will land on 6, 12, 18, 24, and so on. Every landing spot is a multiple of 6."}]'::jsonb, '[{"problemText": "What is the 4th multiple of 7?", "stepByStepSolution": ["Step 1: Identify the base number: 7.", "Step 2: Multiply by 4: 7 × 4 = 28."], "finalAnswer": "The 4th multiple of 7 is 28."}, {"problemText": "Is 45 a multiple of 6? Explain why or why not.", "stepByStepSolution": ["Step 1: Divide 45 by 6: 45 ÷ 6 = 7 with a remainder of 3.", "Step 2: If a number is a multiple of 6, the remainder must be 0.", "Step 3: Since there is a remainder of 3, 45 is not divisible by 6."], "finalAnswer": "No, 45 is not a multiple of 6 because 6 × 7 = 42 and 6 × 8 = 48."}]'::jsonb, '["To check if X is a multiple of Y, divide X by Y. If remainder is 0, then YES!", "Multiples never end (they are infinite). Factors, on the other hand, are finite.", "Even numbers are all multiples of 2."]'::jsonb, '["nth multiple of a number k = k × n"]'::jsonb, 'bp_free_g4_math', 'verified'),
    ('less_g4_m6_l2', 'chap_g4_math_c6', 'top_g4_m6_2', 2, 'Common Multiples & Lowest Common Multiple (LCM) Basics', 10, '[{"heading": "What are Common Multiples?", "body": "A number that is a multiple of two or more numbers is called their common multiple. For example, 12 is in the 3-times table AND in the 4-times table, so 12 is a common multiple of 3 and 4."}, {"heading": "Finding the Lowest Common Multiple (LCM)", "body": "The smallest non-zero common multiple of two numbers is called the Lowest Common Multiple (LCM). For 4 and 6: Multiples of 4 are 4, 8, 12, 16... Multiples of 6 are 6, 12, 18... The smallest shared number is 12!"}]'::jsonb, '[{"problemText": "Find the first two common multiples of 2 and 5.", "stepByStepSolution": ["Step 1: List multiples of 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20...", "Step 2: List multiples of 5: 5, 10, 15, 20, 25...", "Step 3: Find shared numbers in both lists: 10 and 20."], "finalAnswer": "The first two common multiples of 2 and 5 are 10 and 20."}]'::jsonb, '["Multiples of 10 are always common multiples of 2 and 5.", "The LCM is always greater than or equal to the larger number."]'::jsonb, '[]'::jsonb, 'bp_free_g4_math', 'verified'),
    ('less_g4_s5_l1', 'chap_g4_sci_u5', 'top_g4_s5_1', 1, 'Forces in Our World: Contact Forces vs Non-Contact Forces', 8, '[{"heading": "What is a Force?", "body": "A force is a push or pull upon an object resulting from its interaction with another object. Forces can make stationary things move, moving things stop, or change their direction."}, {"heading": "Contact Forces", "body": "Forces that act only when two interacting objects are physically touching each other. Examples: Muscular force (pushing a swing), Frictional force (brakes stopping a bicycle)."}, {"heading": "Non-Contact Forces", "body": "Forces that can act over a distance without physical contact. Examples: Gravitational force (apple falling from tree), Magnetic force (magnet pulling iron pins)."}]'::jsonb, '[{"problemText": "Why does a rolling ball on grass gradually slow down and stop?", "stepByStepSolution": ["Step 1: The surface of the ball rubs against the grass.", "Step 2: A contact force called friction acts in the opposite direction of the ball’s motion.", "Step 3: This continuous resistance removes kinetic energy until the ball stops."], "finalAnswer": "The ball stops because of frictional force acting against its movement."}]'::jsonb, '["Gravity always pulls downward toward the center of the Earth.", "Smooth surfaces have less friction than rough surfaces."]'::jsonb, '[]'::jsonb, 'bp_free_g4_sci', 'verified'),
    ('less_g4_e8_l1', 'chap_g4_eng_c8', 'top_g4_e8_1', 1, 'The Pied Piper of Hamelin: Story Structure, Themes & Adverbs', 9, '[{"heading": "Plot Overview", "body": "The town of Hamelin was overrun with rats. A mysterious piper dressed in pied (colorful) clothes offered to rid the town of rats using his magical flute music. When the Mayor broke his promise to pay him, the piper used his music again with profound consequences."}, {"heading": "Grammar Focus: Adverbs of Manner", "body": "Adverbs describe HOW an action is done. In the sentence \"The Piper walked merrily through Hamelin\", \"merrily\" is an adverb describing the verb \"walked\". Most adverbs of manner end in \"-ly\"."}]'::jsonb, '[{"problemText": "Find the adverb: \"The children followed the sweet music joyfully.\"", "stepByStepSolution": ["Step 1: Identify the action verb: \"followed\".", "Step 2: Ask: \"How did they follow?\"", "Step 3: The word \"joyfully\" tells us how they followed."], "finalAnswer": "The adverb is \"joyfully\"."}]'::jsonb, '["Adverb of manner: tells HOW (slowly, quickly, happily).", "Past tense of irregular verb \"blow\" is \"blew\"."]'::jsonb, '[]'::jsonb, 'bp_free_g4_eng', 'verified')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    reading_time_minutes = EXCLUDED.reading_time_minutes,
    concept_breakdown = EXCLUDED.concept_breakdown,
    worked_examples = EXCLUDED.worked_examples,
    revision_notes = EXCLUDED.revision_notes,
    key_formulas_or_rules = EXCLUDED.key_formulas_or_rules,
    linked_blueprint_id = EXCLUDED.linked_blueprint_id,
    status = EXCLUDED.status;

-- 4. Competitive Exam Batches
INSERT INTO public.competitive_exam_batches (id, exam_code, name, category, target_stage, verified_status, sample_tests_available, expected_launch_batch)
VALUES
    ('exam_jee', 'JEE', 'Joint Entrance Examination (Main & Advanced)', 'engineering_medical', 'Classes 11–12 & Aspirants', 'verified', 12, 'Batch 2026-27 Active'),
    ('exam_neet', 'NEET', 'National Eligibility cum Entrance Test (UG Medical)', 'engineering_medical', 'Classes 11–12 & Aspirants', 'verified', 10, 'Batch 2026-27 Active'),
    ('exam_cuet', 'CUET', 'Common University Entrance Test (UG)', 'graduate_state', 'Class 12 Passing Out', 'provisional', 6, 'March 2027 Pipeline'),
    ('exam_upsc', 'UPSC', 'UPSC Civil Services (Prelims GS & CSAT)', 'civil_services', 'Graduates & Final Year', 'provisional', 8, 'April 2027 Pipeline'),
    ('exam_state_psc', 'STATE_PSC', 'State Public Service Commissions (State PSCs & JKSSB)', 'graduate_state', 'State Civil & Administrative Roles', 'provisional', 8, 'May 2027 Pipeline'),
    ('exam_ssc', 'SSC', 'Staff Selection Commission (CGL & CHSL)', 'banking_ssc', 'Tier 1 & Tier 2 Quantitative & Reasoning', 'provisional', 6, 'June 2027 Pipeline'),
    ('exam_banking', 'BANKING', 'Banking PO & Clerk (IBPS & SBI)', 'banking_ssc', 'Graduates & Numerical Reasoning', 'provisional', 6, 'June 2027 Pipeline'),
    ('exam_gate_net', 'GATE', 'GATE & UGC-NET Entrance & Fellowships', 'graduate_state', 'Technical Research & Lecturer Eligibility', 'provisional', 4, 'Late 2027 Pipeline')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    target_stage = EXCLUDED.target_stage,
    verified_status = EXCLUDED.verified_status,
    sample_tests_available = EXCLUDED.sample_tests_available,
    expected_launch_batch = EXCLUDED.expected_launch_batch;

