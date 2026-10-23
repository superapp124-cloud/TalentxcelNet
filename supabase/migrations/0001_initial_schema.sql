-- TALENTXCEL GREENFIELD PLATFORM INITIAL SCHEMA
-- Migration: 0001_initial_schema.sql
-- 100% Idempotent for Supabase SQL Editor execution
-- Enforces strict question-solution separation, immutable credit ledger, and server-authoritative scoring.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ENUMS (IDEMPOTENT CREATION)
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('learner', 'guardian', 'teacher', 'admin');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE question_type_enum AS ENUM ('single_choice', 'multi_select', 'numeric', 'true_false');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE difficulty_level_enum AS ENUM ('easy', 'medium', 'hard');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE exam_type_enum AS ENUM ('periodic_test', 'unit_test', 'mock_exam', 'topic_practice');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE product_type_enum AS ENUM ('single_assessment', 'monthly_pass', 'annual_pass');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status_enum AS ENUM ('created', 'attempted', 'paid', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================================
-- 2. IDENTITY & MULTI-PROFILE ACCESS
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'guardian',
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learner_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guardian_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 1 AND 12),
    school_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guardian_learner_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guardian_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    learner_id UUID NOT NULL REFERENCES learner_profiles(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL DEFAULT 'parent',
    is_primary_contact BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(guardian_id, learner_id)
);

-- ============================================================================
-- 3. CURRICULUM HIERARCHY
-- ============================================================================

CREATE TABLE IF NOT EXISTS curriculum_boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE, -- 'CBSE', 'CISCE', 'STATE', 'COMPETITIVE'
    name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'IN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID NOT NULL REFERENCES curriculum_boards(id) ON DELETE CASCADE,
    academic_year TEXT NOT NULL, -- '2026-2027'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(board_id, academic_year)
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID NOT NULL REFERENCES curriculum_boards(id) ON DELETE CASCADE,
    grade_number INTEGER NOT NULL CHECK (grade_number BETWEEN 1 AND 12),
    code TEXT NOT NULL, -- 'class-3', 'class-4'
    name TEXT NOT NULL, -- 'Grade III', 'Grade IV'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(board_id, grade_number)
);

CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    code TEXT NOT NULL, -- 'math', 'science', 'english', 'hindi', 'social_science'
    name TEXT NOT NULL,
    color_theme TEXT NOT NULL DEFAULT 'blue',
    icon_name TEXT NOT NULL DEFAULT 'BookOpen',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(class_id, code)
);

CREATE TABLE IF NOT EXISTS chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(subject_id, chapter_number)
);

CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    syllabus_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS syllabus_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    curriculum_version_id UUID NOT NULL REFERENCES curriculum_versions(id) ON DELETE CASCADE,
    learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. ASSESSMENT & STRICT QUESTION-KEY SEPARATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS exam_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE, -- 'school', 'jee', 'neet', 'upsc', 'skills'
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES exam_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    version_label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
    exam_type exam_type_enum NOT NULL DEFAULT 'periodic_test',
    duration_minutes INTEGER NOT NULL DEFAULT 15,
    total_questions INTEGER NOT NULL DEFAULT 10,
    total_marks NUMERIC(6, 2) NOT NULL DEFAULT 20.00,
    negative_marking_ratio NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    passing_percentage NUMERIC(5, 2) NOT NULL DEFAULT 60.00,
    reward_credit_amount NUMERIC(6, 2) NOT NULL DEFAULT 20.00, -- ₹20 pass credit reward
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * CLIENT-AUTHORIZED QUESTIONS TABLE
 * Accessible to authenticated learners during an active test.
 * STRICT SECURITY: DOES NOT CONTAIN ANSWER KEYS OR EXPLANATIONS!
 */
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    question_type question_type_enum NOT NULL DEFAULT 'single_choice',
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of { id: string, label: string, text: string }
    media_path TEXT,
    marks NUMERIC(4, 2) NOT NULL DEFAULT 2.00,
    negative_marking_ratio NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    difficulty difficulty_level_enum NOT NULL DEFAULT 'easy',
    language TEXT NOT NULL DEFAULT 'en',
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/**
 * CONFIDENTIAL QUESTION SOLUTIONS TABLE
 * STRICT SECURITY: Never accessible directly via Client API or RLS!
 * Accessible ONLY within the server-side SECURITY DEFINER scoring function.
 */
CREATE TABLE IF NOT EXISTS question_solutions (
    question_id UUID PRIMARY KEY REFERENCES questions(id) ON DELETE CASCADE,
    correct_option_ids JSONB NOT NULL, -- e.g. ["opt_7b"]
    numeric_answer_rules JSONB, -- { min: number, max: number }
    solution_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    explanation TEXT NOT NULL,
    key_point TEXT,
    review_status TEXT NOT NULL DEFAULT 'verified',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blueprint_questions (
    blueprint_id UUID NOT NULL REFERENCES assessment_blueprints(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(blueprint_id, question_id)
);

CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blueprint_id UUID NOT NULL REFERENCES assessment_blueprints(id) ON DELETE CASCADE,
    learner_id UUID NOT NULL REFERENCES learner_profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    score_obtained NUMERIC(6, 2) DEFAULT 0.00,
    max_marks NUMERIC(6, 2) NOT NULL,
    percentage NUMERIC(5, 2) DEFAULT 0.00,
    passed BOOLEAN DEFAULT FALSE,
    accuracy_percentage NUMERIC(5, 2) DEFAULT 0.00,
    total_time_spent_seconds INTEGER DEFAULT 0,
    earned_credits NUMERIC(6, 2) DEFAULT 0.00,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_ids JSONB,
    numeric_value NUMERIC(10, 4),
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    marks_awarded NUMERIC(4, 2) NOT NULL DEFAULT 0.00,
    marks_deducted NUMERIC(4, 2) NOT NULL DEFAULT 0.00,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(attempt_id, question_id)
);

-- ============================================================================
-- 5. COMMERCE, ENTITLEMENTS & APPEND-ONLY CREDIT LEDGER
-- ============================================================================

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    price_inr NUMERIC(10, 2) NOT NULL, -- e.g. 20.00, 99.00, 499.00
    product_type product_type_enum NOT NULL,
    blueprint_id UUID REFERENCES assessment_blueprints(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    learner_id UUID REFERENCES learner_profiles(id) ON DELETE SET NULL,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    amount_inr NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status order_status_enum NOT NULL DEFAULT 'created',
    provider_order_id TEXT UNIQUE, -- e.g. Razorpay order_id
    provider_payment_id TEXT UNIQUE, -- e.g. Razorpay payment_id
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL, -- 'payment.captured', 'payment.failed'
    provider TEXT NOT NULL DEFAULT 'razorpay',
    payload JSONB NOT NULL,
    idempotency_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entitlements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    learner_id UUID REFERENCES learner_profiles(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    blueprint_id UUID REFERENCES assessment_blueprints(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, blueprint_id)
);

/**
 * APPEND-ONLY CREDIT LEDGER
 * Mathematical guarantee: Balance is derived by summing immutable ledger rows.
 */
CREATE TABLE IF NOT EXISTS credit_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    learner_id UUID REFERENCES learner_profiles(id) ON DELETE SET NULL,
    amount NUMERIC(8, 2) NOT NULL, -- Positive for earned, negative for spent
    entry_type TEXT NOT NULL CHECK (entry_type IN ('CREDIT_EARNED_PASS', 'CREDIT_SPENT_TEST', 'CREDIT_REFUND', 'CREDIT_EXPIRED')),
    reference_id TEXT NOT NULL, -- e.g. attempt_id or order_id
    idempotency_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    amount_inr NUMERIC(10, 2) NOT NULL,
    reason TEXT NOT NULL,
    provider_refund_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'processed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES (IDEMPOTENT)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_learner_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_ledger ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any before re-creating
DROP POLICY IF EXISTS "Public can read curriculum boards" ON curriculum_boards;
CREATE POLICY "Public can read curriculum boards" ON curriculum_boards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read classes" ON classes;
CREATE POLICY "Public can read classes" ON classes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read subjects" ON subjects;
CREATE POLICY "Public can read subjects" ON subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read chapters" ON chapters;
CREATE POLICY "Public can read chapters" ON chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read topics" ON topics;
CREATE POLICY "Public can read topics" ON topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read active blueprints" ON assessment_blueprints;
CREATE POLICY "Public can read active blueprints" ON assessment_blueprints FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read active products" ON products;
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);

-- Questions: Accessible during active tests, but questions NEVER have answers
DROP POLICY IF EXISTS "Authenticated users can read questions" ON questions;
CREATE POLICY "Authenticated users can read questions" ON questions FOR SELECT TO authenticated USING (status = 'published');

-- QUESTION SOLUTIONS: LOCKED DOWN! No authenticated or anonymous role may directly select!
-- Accessible solely through security definer RPC
DROP POLICY IF EXISTS "No direct client access to solutions" ON question_solutions;
CREATE POLICY "No direct client access to solutions" ON question_solutions FOR ALL USING (false);

-- Profiles & Learners
DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Guardians read own learners" ON learner_profiles;
CREATE POLICY "Guardians read own learners" ON learner_profiles FOR SELECT USING (
    guardian_id = auth.uid() OR id IN (
        SELECT learner_id FROM guardian_learner_relationships WHERE guardian_id = auth.uid()
    )
);

-- Attempts & Answers
DROP POLICY IF EXISTS "Users read own attempts" ON attempts;
CREATE POLICY "Users read own attempts" ON attempts FOR SELECT USING (
    learner_id IN (
        SELECT id FROM learner_profiles WHERE guardian_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Users read own attempt answers" ON attempt_answers;
CREATE POLICY "Users read own attempt answers" ON attempt_answers FOR SELECT USING (
    attempt_id IN (
        SELECT id FROM attempts WHERE learner_id IN (
            SELECT id FROM learner_profiles WHERE guardian_id = auth.uid()
        )
    )
);

-- Entitlements & Credit Ledger
DROP POLICY IF EXISTS "Users read own entitlements" ON entitlements;
CREATE POLICY "Users read own entitlements" ON entitlements FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users read own credit ledger" ON credit_ledger;
CREATE POLICY "Users read own credit ledger" ON credit_ledger FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users read own orders" ON orders;
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (user_id = auth.uid());

-- ============================================================================
-- 7. SERVER-AUTHORITATIVE ASSESSMENT SUBMISSION FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION submit_assessment_attempt(
    p_attempt_id UUID,
    p_answers JSONB -- Array of { question_id: UUID, selected_option_ids: string[], time_spent_seconds: integer }
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_attempt RECORD;
    v_blueprint RECORD;
    v_ans RECORD;
    v_solution RECORD;
    v_question RECORD;
    v_is_correct BOOLEAN;
    v_marks_awarded NUMERIC(4, 2);
    v_marks_deducted NUMERIC(4, 2);
    v_total_score NUMERIC(6, 2) := 0.00;
    v_correct_count INTEGER := 0;
    v_incorrect_count INTEGER := 0;
    v_unattempted_count INTEGER := 0;
    v_total_time INTEGER := 0;
    v_percentage NUMERIC(5, 2);
    v_passed BOOLEAN;
    v_earned_credits NUMERIC(6, 2) := 0.00;
    v_evaluations JSONB := '[]'::jsonb;
BEGIN
    -- 1. Validate caller ownership and concurrency lock
    SELECT a.* INTO v_attempt
    FROM attempts a
    JOIN learner_profiles lp ON lp.id = a.learner_id
    WHERE a.id = p_attempt_id AND lp.guardian_id = auth.uid()
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Attempt not found or caller unauthorized';
    END IF;

    -- 2. Prevent duplicate submission / concurrent double-scoring
    IF v_attempt.status = 'completed' THEN
        -- Idempotently return already computed result
        RETURN jsonb_build_object(
            'attempt_id', v_attempt.id,
            'status', v_attempt.status,
            'score_obtained', v_attempt.score_obtained,
            'max_marks', v_attempt.max_marks,
            'percentage', v_attempt.percentage,
            'passed', v_attempt.passed,
            'message', 'Attempt previously finalized'
        );
    END IF;

    -- 3. Load assessment blueprint
    SELECT * INTO v_blueprint FROM assessment_blueprints WHERE id = v_attempt.blueprint_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Blueprint not found';
    END IF;

    -- 4. Process each submitted answer against confidential question_solutions
    FOR v_ans IN SELECT * FROM jsonb_to_recordset(p_answers) AS x(
        question_id UUID,
        selected_option_ids JSONB,
        time_spent_seconds INTEGER
    )
    LOOP
        SELECT * INTO v_question FROM questions WHERE id = v_ans.question_id;
        SELECT * INTO v_solution FROM question_solutions WHERE question_id = v_ans.question_id;

        IF v_solution IS NOT NULL AND v_question IS NOT NULL THEN
            v_total_time := v_total_time + COALESCE(v_ans.time_spent_seconds, 0);

            -- Evaluate correctness
            v_is_correct := (v_solution.correct_option_ids = v_ans.selected_option_ids);

            IF v_is_correct THEN
                v_marks_awarded := v_question.marks;
                v_marks_deducted := 0.00;
                v_total_score := v_total_score + v_marks_awarded;
                v_correct_count := v_correct_count + 1;
            ELSE
                v_marks_awarded := 0.00;
                v_marks_deducted := v_question.marks * v_question.negative_marking_ratio;
                v_total_score := v_total_score - v_marks_deducted;
                v_incorrect_count := v_incorrect_count + 1;
            END IF;

            -- Record attempt answer
            INSERT INTO attempt_answers (
                attempt_id,
                question_id,
                selected_option_ids,
                is_correct,
                marks_awarded,
                marks_deducted,
                time_spent_seconds
            ) VALUES (
                p_attempt_id,
                v_ans.question_id,
                v_ans.selected_option_ids,
                v_is_correct,
                v_marks_awarded,
                v_marks_deducted,
                COALESCE(v_ans.time_spent_seconds, 0)
            ) ON CONFLICT (attempt_id, question_id) DO UPDATE SET
                selected_option_ids = EXCLUDED.selected_option_ids,
                is_correct = EXCLUDED.is_correct,
                marks_awarded = EXCLUDED.marks_awarded,
                marks_deducted = EXCLUDED.marks_deducted;

            -- Append to evaluations with verified explanation
            v_evaluations := v_evaluations || jsonb_build_object(
                'question_id', v_question.id,
                'is_correct', v_is_correct,
                'marks_awarded', v_marks_awarded,
                'marks_deducted', v_marks_deducted,
                'user_answer', v_ans.selected_option_ids,
                'correct_answer', v_solution.correct_option_ids,
                'explanation', v_solution.explanation,
                'key_point', v_solution.key_point,
                'solution_steps', v_solution.solution_steps
            );
        END IF;
    END LOOP;

    -- Ensure non-negative score
    v_total_score := GREATEST(0.00, v_total_score);
    v_percentage := ROUND((v_total_score / v_attempt.max_marks) * 100.0, 2);
    v_passed := (v_percentage >= v_blueprint.passing_percentage);

    -- Pass credit reward (e.g. ₹20 pass credit)
    IF v_passed AND v_blueprint.reward_credit_amount > 0 THEN
        v_earned_credits := v_blueprint.reward_credit_amount;

        -- Record in immutable credit ledger
        INSERT INTO credit_ledger (
            user_id,
            learner_id,
            amount,
            entry_type,
            reference_id,
            idempotency_key
        ) VALUES (
            auth.uid(),
            v_attempt.learner_id,
            v_earned_credits,
            'CREDIT_EARNED_PASS',
            p_attempt_id::text,
            'reward_' || p_attempt_id::text
        ) ON CONFLICT (idempotency_key) DO NOTHING;
    END IF;

    -- Finalize attempt
    UPDATE attempts SET
        status = 'completed',
        score_obtained = v_total_score,
        percentage = v_percentage,
        passed = v_passed,
        accuracy_percentage = CASE WHEN (v_correct_count + v_incorrect_count) > 0 
            THEN ROUND((v_correct_count::numeric / (v_correct_count + v_incorrect_count)) * 100.0, 2)
            ELSE 0.00 END,
        total_time_spent_seconds = v_total_time,
        earned_credits = v_earned_credits,
        submitted_at = NOW()
    WHERE id = p_attempt_id;

    RETURN jsonb_build_object(
        'attempt_id', p_attempt_id,
        'status', 'completed',
        'score_obtained', v_total_score,
        'max_marks', v_attempt.max_marks,
        'percentage', v_percentage,
        'passed', v_passed,
        'correct_count', v_correct_count,
        'incorrect_count', v_incorrect_count,
        'earned_credits', v_earned_credits,
        'evaluations', v_evaluations
    );
END;
$$;
