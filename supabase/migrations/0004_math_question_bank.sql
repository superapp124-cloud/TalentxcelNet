-- ============================================================================
-- Migration: 0004_math_question_bank.sql
-- Description: Mathematics Question Bank (30k-40k Volume) strictly behind Login
-- 100% Standalone & Idempotent
-- ============================================================================

-- 1. Mathematics Question Bank Table
CREATE TABLE IF NOT EXISTS public.math_question_bank (
    id TEXT PRIMARY KEY,
    class_number INTEGER NOT NULL CHECK (class_number BETWEEN 4 AND 12),
    subject_code TEXT NOT NULL DEFAULT 'math',
    board_code TEXT NOT NULL DEFAULT 'CBSE',
    chapter_id TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'olympiad')),
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_option_id TEXT NOT NULL,
    solution_steps JSONB NOT NULL,
    explanation TEXT NOT NULL,
    key_formula TEXT,
    marks INTEGER NOT NULL DEFAULT 1,
    negative_marking_ratio NUMERIC(4,2) NOT NULL DEFAULT 0.25,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Learner Math Practice Progress Table
CREATE TABLE IF NOT EXISTS public.math_learner_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    class_number INTEGER NOT NULL CHECK (class_number BETWEEN 4 AND 12),
    chapter_id TEXT NOT NULL,
    total_attempted INTEGER NOT NULL DEFAULT 0,
    total_correct INTEGER NOT NULL DEFAULT 0,
    accuracy_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    last_question_id TEXT,
    last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, chapter_id)
);

-- High-performance query indexes
CREATE INDEX IF NOT EXISTS idx_math_bank_class_chapter ON public.math_question_bank(class_number, chapter_id);
CREATE INDEX IF NOT EXISTS idx_math_bank_difficulty ON public.math_question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_math_progress_user ON public.math_learner_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_math_progress_class ON public.math_learner_progress(class_number);

-- Enable RLS
ALTER TABLE public.math_question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.math_learner_progress ENABLE ROW LEVEL SECURITY;

-- Drop prior policies if existing for clean idempotency
DROP POLICY IF EXISTS "Authenticated learners can read math questions" ON public.math_question_bank;
DROP POLICY IF EXISTS "Service role manages math questions" ON public.math_question_bank;
DROP POLICY IF EXISTS "Learners manage their own math progress" ON public.math_learner_progress;

-- RLS: ONLY Authenticated users can read questions (strictly behind login)
CREATE POLICY "Authenticated learners can read math questions"
    ON public.math_question_bank
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

-- RLS: Service role can manage questions
CREATE POLICY "Service role manages math questions"
    ON public.math_question_bank
    FOR ALL
    TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

-- RLS: Learners manage their own math progress
CREATE POLICY "Learners manage their own math progress"
    ON public.math_learner_progress
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
