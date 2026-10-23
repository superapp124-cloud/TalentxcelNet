-- Migration: 0002_three_domains.sql
-- Description: Normalized data architecture for TalentXcel Three-Domain Architecture
-- Domains: Assessment & Intelligence · Skill Development · Academic Learning

-- 1. Academic Lessons Table (Connects topics to structured lessons & assessment blueprints)
CREATE TABLE IF NOT EXISTS public.academic_lessons (
    id TEXT PRIMARY KEY,
    chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE SET NULL,
    lesson_number INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    reading_time_minutes INTEGER NOT NULL DEFAULT 10,
    concept_breakdown JSONB NOT NULL DEFAULT '[]'::jsonb,
    worked_examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    revision_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_formulas_or_rules JSONB DEFAULT '[]'::jsonb,
    linked_blueprint_id TEXT REFERENCES public.assessment_blueprints(id) ON DELETE SET NULL,
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
    module_id TEXT REFERENCES public.skill_modules(id) ON DELETE SET NULL,
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

-- 6. Competitive Exam Batches Pipeline
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
    gap_topic_id TEXT REFERENCES public.topics(id) ON DELETE SET NULL,
    gap_description TEXT NOT NULL,
    recommended_lesson_id TEXT REFERENCES public.academic_lessons(id) ON DELETE SET NULL,
    recommended_project_id TEXT REFERENCES public.skill_projects(id) ON DELETE SET NULL,
    reassessment_blueprint_id TEXT REFERENCES public.assessment_blueprints(id) ON DELETE SET NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
