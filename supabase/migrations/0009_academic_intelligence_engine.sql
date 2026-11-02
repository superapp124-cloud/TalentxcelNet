-- ============================================================================
-- TALENTXCEL ACADEMY — ACADEMIC INTELLIGENCE ENGINE & MASTERY GRAPH
-- Migration: 0009_academic_intelligence_engine.sql
-- Fully self-contained DDL: No dangling foreign keys, full RLS & performance indexes
-- ============================================================================

-- Ensure pgcrypto / uuid extensions are enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ACADEMIC CHAPTERS (Self-Contained Master Taxonomy)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_chapters (
  id TEXT PRIMARY KEY, -- e.g. 'math_c10_ch01', 'sci_c10_ch10'
  board_code TEXT NOT NULL DEFAULT 'CBSE',
  class_number INTEGER NOT NULL,
  subject_code TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  discipline_name TEXT,
  target_question_count INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(board_code, class_number, subject_code, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_academic_chapters_lookup 
  ON public.academic_chapters(board_code, class_number, subject_code);

-- ============================================================================
-- 2. FINE-GRAINED ATOMIC CONCEPTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_concepts (
  id TEXT PRIMARY KEY, -- e.g. 'c10_math_quad_01'
  chapter_id TEXT NOT NULL,
  board_code TEXT NOT NULL DEFAULT 'CBSE',
  class_number INTEGER NOT NULL,
  subject_code TEXT NOT NULL,
  chapter_title TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  learning_objective TEXT NOT NULL,
  bloom_level TEXT NOT NULL CHECK (bloom_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  neet_jee_relevance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academic_concepts_chapter 
  ON public.academic_concepts(chapter_id);
CREATE INDEX IF NOT EXISTS idx_academic_concepts_lookup 
  ON public.academic_concepts(board_code, class_number, subject_code);

-- ============================================================================
-- 3. PREREQUISITE KNOWLEDGE GRAPH
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  prerequisite_concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  dependency_type TEXT NOT NULL CHECK (dependency_type IN ('strict_prerequisite', 'co_requisite', 'recommended_prior')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(concept_id, prerequisite_concept_id)
);

CREATE INDEX IF NOT EXISTS idx_academic_prereq_concept 
  ON public.academic_prerequisites(concept_id);
CREATE INDEX IF NOT EXISTS idx_academic_prereq_target 
  ON public.academic_prerequisites(prerequisite_concept_id);

-- ============================================================================
-- 4. PERSISTENT STUDENT MASTERY PROFILE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  mastery_score NUMERIC(5,2) DEFAULT 0.00 CHECK (mastery_score >= 0 AND mastery_score <= 100),
  mastery_status TEXT NOT NULL DEFAULT 'not_started' CHECK (mastery_status IN ('not_started', 'introduced', 'learning', 'practicing', 'demonstrated', 'mastered')),
  evidence_count INTEGER DEFAULT 0,
  last_demonstrated_at TIMESTAMPTZ,
  retention_decay_factor NUMERIC(3,2) DEFAULT 1.00,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, concept_id)
);

CREATE INDEX IF NOT EXISTS idx_student_mastery_student 
  ON public.student_mastery(student_id);
CREATE INDEX IF NOT EXISTS idx_student_mastery_status 
  ON public.student_mastery(student_id, mastery_status);

-- ============================================================================
-- 5. PERSISTENT COGNITIVE ERROR DNA MISCONCEPTION CLASSIFICATION
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_error_dna (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id TEXT REFERENCES public.academic_concepts(id) ON DELETE SET NULL,
  error_type TEXT NOT NULL CHECK (error_type IN (
    'conceptual_misunderstanding',
    'formula_selection_error',
    'calculation_slip',
    'sign_convention_trap',
    'unit_omission',
    'reading_trap',
    'diagram_misinterpretation',
    'time_management_rush'
  )),
  question_stem_excerpt TEXT,
  student_raw_input TEXT,
  diagnosis_detail TEXT NOT NULL,
  remedial_prescription TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_error_dna_student 
  ON public.student_error_dna(student_id, resolved);

-- ============================================================================
-- 6. SNAP & SOLVE AI DOUBT SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_doubt_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_storage_path TEXT,
  ocr_extracted_text TEXT,
  subject_code TEXT NOT NULL,
  detected_concept_id TEXT REFERENCES public.academic_concepts(id) ON DELETE SET NULL,
  initial_student_hypothesis TEXT,
  current_hint_step INTEGER DEFAULT 1,
  max_hints INTEGER DEFAULT 4,
  socratic_dialogue JSONB DEFAULT '[]'::jsonb,
  verification_question JSONB,
  is_verified_independently BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_doubt_sessions_student 
  ON public.academic_doubt_sessions(student_id);

-- ============================================================================
-- 7. EXAM RADAR & SCHOOL CALENDARS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_exam_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_title TEXT NOT NULL,
  exam_type TEXT NOT NULL CHECK (exam_type IN (
    'school_unit_test',
    'school_term_exam',
    'pre_board',
    'board_final',
    'jee_main',
    'neet_ug',
    'olympiad',
    'cuet'
  )),
  target_date DATE NOT NULL,
  subject_code TEXT NOT NULL,
  covered_chapter_ids TEXT[] NOT NULL DEFAULT '{}',
  target_score_percentage INTEGER DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_calendar_student 
  ON public.academic_exam_calendar(student_id, target_date);

-- ============================================================================
-- 8. EVIDENCE-BASED PARENT INTELLIGENCE REPORTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_parent_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guardian_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  active_study_days INTEGER NOT NULL DEFAULT 0,
  completed_sessions INTEGER NOT NULL DEFAULT 0,
  verified_concepts_count INTEGER NOT NULL DEFAULT 0,
  top_active_gaps JSONB DEFAULT '[]'::jsonb,
  exam_readiness_score INTEGER DEFAULT 0,
  parent_action_items TEXT[] DEFAULT '{}',
  report_access_token UUID DEFAULT gen_random_uuid(),
  is_viewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_parent_reports_student 
  ON public.academic_parent_reports(student_id, week_start_date);
CREATE INDEX IF NOT EXISTS idx_parent_reports_token 
  ON public.academic_parent_reports(report_access_token);

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.academic_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_error_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_doubt_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_exam_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_parent_reports ENABLE ROW LEVEL SECURITY;

-- Public can read curriculum taxonomies
DROP POLICY IF EXISTS "Public can read academic_chapters" ON public.academic_chapters;
CREATE POLICY "Public can read academic_chapters" ON public.academic_chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_concepts" ON public.academic_concepts;
CREATE POLICY "Public can read academic_concepts" ON public.academic_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_prerequisites" ON public.academic_prerequisites;
CREATE POLICY "Public can read academic_prerequisites" ON public.academic_prerequisites FOR SELECT USING (true);

-- Student Mastery: Isolated to student
DROP POLICY IF EXISTS "Learner can view own mastery" ON public.student_mastery;
CREATE POLICY "Learner can view own mastery" ON public.student_mastery 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert/update own mastery" ON public.student_mastery;
CREATE POLICY "Learner can insert/update own mastery" ON public.student_mastery 
  FOR ALL USING (auth.uid() = student_id);

-- Error DNA: Isolated to student
DROP POLICY IF EXISTS "Learner can view own error dna" ON public.student_error_dna;
CREATE POLICY "Learner can view own error dna" ON public.student_error_dna 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can manage own error dna" ON public.student_error_dna;
CREATE POLICY "Learner can manage own error dna" ON public.student_error_dna 
  FOR ALL USING (auth.uid() = student_id);

-- Doubt Sessions: Isolated to student
DROP POLICY IF EXISTS "Learner can view own doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Learner can view own doubt sessions" ON public.academic_doubt_sessions 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can manage own doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Learner can manage own doubt sessions" ON public.academic_doubt_sessions 
  FOR ALL USING (auth.uid() = student_id);

-- Exam Calendar: Isolated to student
DROP POLICY IF EXISTS "Learner can view own exam calendar" ON public.academic_exam_calendar;
CREATE POLICY "Learner can view own exam calendar" ON public.academic_exam_calendar 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can manage own exam calendar" ON public.academic_exam_calendar;
CREATE POLICY "Learner can manage own exam calendar" ON public.academic_exam_calendar 
  FOR ALL USING (auth.uid() = student_id);

-- Parent Reports: Accessible by student or authorized guardian
DROP POLICY IF EXISTS "Student and guardian can view parent report" ON public.academic_parent_reports;
CREATE POLICY "Student and guardian can view parent report" ON public.academic_parent_reports 
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = guardian_id);
