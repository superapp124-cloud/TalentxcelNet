-- ============================================================================
-- TALENTXCEL ACADEMY — UNIVERSAL ACADEMIC INTELLIGENCE ENGINE & KNOWLEDGE GRAPH
-- Migration: 0009_academic_intelligence_engine.sql
-- Covers: K-12 (Classes 1-12) · CBSE / ICSE / State Boards · IB / Cambridge ·
--         Competitive Entrance (JEE / NEET / BITSAT / CUET / Olympiads / SAT)
-- Features: Reusable Knowledge Graph · Event-Sourced Mastery · Error DNA ·
--           Snap & Solve Doubt Logs · Exam Radar · Verified Parent Relationships
-- ============================================================================

-- Ensure pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Reusable timestamp trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. ACADEMIC BOARDS & EDUCATION AUTHORITIES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_boards (
  id TEXT PRIMARY KEY, -- e.g. 'cbse', 'cisce', 'ib', 'cambridge', 'maharashtra_state', 'karnataka_state'
  name TEXT NOT NULL,
  short_code TEXT NOT NULL UNIQUE, -- 'CBSE', 'CISCE', 'IB', 'CAIE', etc.
  country TEXT NOT NULL DEFAULT 'IN',
  curriculum_type TEXT NOT NULL CHECK (curriculum_type IN ('national', 'state', 'international', 'competitive')),
  official_portal_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academic_boards_country ON public.academic_boards(country, curriculum_type);

-- ============================================================================
-- 2. ACADEMIC PROGRAMS & PATHWAYS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_programs (
  id TEXT PRIMARY KEY, -- e.g. 'prog_k12_primary', 'prog_k12_middle', 'prog_k12_secondary', 'prog_jee_foundation', 'prog_neet_ug'
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'k12_school',
    'engineering_entrance',
    'medical_entrance',
    'olympiad',
    'university_entrance',
    'civil_defence',
    'international_aptitude'
  )),
  target_grades TEXT[] NOT NULL DEFAULT '{}', -- e.g. ARRAY['9', '10']
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academic_programs_category ON public.academic_programs(category, is_active);

-- ============================================================================
-- 3. VERSIONED CURRICULUM SPECIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_curricula (
  id TEXT PRIMARY KEY, -- e.g. 'curr_cbse_sec_2026_27', 'curr_cambridge_igcse_2026'
  board_id TEXT NOT NULL REFERENCES public.academic_boards(id) ON DELETE RESTRICT,
  program_id TEXT NOT NULL REFERENCES public.academic_programs(id) ON DELETE RESTRICT,
  academic_year TEXT NOT NULL, -- e.g. '2026-2027'
  syllabus_version TEXT NOT NULL, -- e.g. 'v2026.1'
  effective_from DATE NOT NULL,
  effective_until DATE,
  is_current BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(board_id, program_id, academic_year, syllabus_version)
);

CREATE INDEX IF NOT EXISTS idx_academic_curricula_lookup ON public.academic_curricula(board_id, program_id, is_current);

-- ============================================================================
-- 4. COMPETITIVE & BOARD EXAMINATIONS CATALOGUE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_examinations (
  id TEXT PRIMARY KEY, -- e.g. 'exam_jee_main', 'exam_jee_advanced', 'exam_neet_ug', 'exam_bitsat', 'exam_cuet_ug', 'exam_sof_imo', 'exam_sat'
  name TEXT NOT NULL,
  authority_name TEXT NOT NULL, -- 'NTA', 'IIT JAB', 'CBSE', 'College Board'
  category TEXT NOT NULL CHECK (category IN (
    'board_examination',
    'engineering',
    'medical',
    'law_management',
    'defence_civil',
    'olympiad',
    'international'
  )),
  frequency_per_year INTEGER NOT NULL DEFAULT 1,
  scoring_pattern JSONB NOT NULL DEFAULT '{}'::jsonb,
  official_syllabus_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_academic_examinations_cat ON public.academic_examinations(category, is_active);

-- ============================================================================
-- 5. STANDARDIZED SUBJECT CATALOGUE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_subjects (
  id TEXT PRIMARY KEY, -- e.g. 'subj_math', 'subj_physics', 'subj_chemistry', 'subj_biology', 'subj_english'
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE, -- 'math', 'physics', 'chemistry', 'biology', 'english', 'hindi', 'social_science'
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  color_theme TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. CHAPTER TAXONOMY (Class-Wise Subject Chapters)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_chapters (
  id TEXT PRIMARY KEY, -- e.g. 'chap_c10_math_quad', 'chap_c10_sci_optics', 'chap_c9_sci_motion'
  subject_id TEXT NOT NULL REFERENCES public.academic_subjects(id) ON DELETE RESTRICT,
  class_number INTEGER NOT NULL, -- 1 through 12
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  target_question_count INTEGER NOT NULL DEFAULT 1000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subject_id, class_number, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_academic_chapters_lookup ON public.academic_chapters(subject_id, class_number);

-- ============================================================================
-- 7. TOPIC HIERARCHY
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_topics (
  id TEXT PRIMARY KEY, -- e.g. 'topic_c10_math_quad_nature', 'topic_c10_sci_optics_lens_formula'
  chapter_id TEXT NOT NULL REFERENCES public.academic_chapters(id) ON DELETE CASCADE,
  topic_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(chapter_id, topic_number)
);

CREATE INDEX IF NOT EXISTS idx_academic_topics_chapter ON public.academic_topics(chapter_id);

-- ============================================================================
-- 8. THE UNIVERSAL CANONICAL KNOWLEDGE GRAPH (Atomic Concepts)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_concepts (
  id TEXT PRIMARY KEY, -- e.g. 'conc_quadratic_nature_of_roots', 'conc_snell_law_refraction'
  topic_id TEXT REFERENCES public.academic_topics(id) ON DELETE SET NULL,
  canonical_code TEXT NOT NULL UNIQUE, -- 'MATH.QUAD.003', 'PHYS.OPT.012'
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  summary_definition TEXT NOT NULL,
  governing_formula TEXT,
  bloom_level TEXT NOT NULL CHECK (bloom_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  difficulty_baseline INTEGER NOT NULL DEFAULT 3 CHECK (difficulty_baseline BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_academic_concepts_updated_at
  BEFORE UPDATE ON public.academic_concepts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_academic_concepts_code ON public.academic_concepts(canonical_code);
CREATE INDEX IF NOT EXISTS idx_academic_concepts_topic ON public.academic_concepts(topic_id);

-- ============================================================================
-- 9. PREREQUISITE DEPENDENCY GRAPH (Concept DAG)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  prerequisite_concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  dependency_type TEXT NOT NULL CHECK (dependency_type IN ('strict_prerequisite', 'co_requisite', 'recommended_prior')),
  pedagogical_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(concept_id, prerequisite_concept_id),
  CHECK (concept_id <> prerequisite_concept_id)
);

CREATE INDEX IF NOT EXISTS idx_academic_prereq_concept ON public.academic_prerequisites(concept_id);
CREATE INDEX IF NOT EXISTS idx_academic_prereq_target ON public.academic_prerequisites(prerequisite_concept_id);

-- ============================================================================
-- 10. REUSABLE CURRICULUM-TO-CONCEPT JUNCTION
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_curriculum_concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curriculum_id TEXT NOT NULL REFERENCES public.academic_curricula(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  class_number INTEGER NOT NULL,
  curriculum_specific_learning_objective TEXT NOT NULL,
  textbook_citation TEXT, -- e.g. 'NCERT Class 10 Ch 4 Section 4.4'
  board_weightage_marks NUMERIC(4,1),
  is_mandatory_for_board BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(curriculum_id, concept_id)
);

CREATE INDEX IF NOT EXISTS idx_curr_concepts_curriculum ON public.academic_curriculum_concepts(curriculum_id, class_number);
CREATE INDEX IF NOT EXISTS idx_curr_concepts_concept ON public.academic_curriculum_concepts(concept_id);

-- ============================================================================
-- 11. EXAMINATION-TO-CONCEPT JUNCTION
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_exam_concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id TEXT NOT NULL REFERENCES public.academic_examinations(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  difficulty_band TEXT NOT NULL CHECK (difficulty_band IN ('foundational', 'moderate_board', 'advanced_jee_neet', 'olympiad_elite')),
  past_10_year_frequency INTEGER NOT NULL DEFAULT 0,
  typical_question_types TEXT[] NOT NULL DEFAULT '{}', -- e.g. ARRAY['mcq_single', 'numerical_integer']
  neet_jee_weightage_percentage NUMERIC(4,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(examination_id, concept_id)
);

CREATE INDEX IF NOT EXISTS idx_exam_concepts_exam ON public.academic_exam_concepts(examination_id, difficulty_band);
CREATE INDEX IF NOT EXISTS idx_exam_concepts_concept ON public.academic_exam_concepts(concept_id);

-- ============================================================================
-- 12. EXPLICIT STUDENT-GUARDIAN RELATIONSHIP & CONSENT
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_student_guardians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guardian_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('father', 'mother', 'legal_guardian', 'tutor_mentor')),
  status TEXT NOT NULL DEFAULT 'pending_consent' CHECK (status IN ('pending_consent', 'verified', 'revoked')),
  can_view_analytics BOOLEAN NOT NULL DEFAULT true,
  can_receive_whatsapp BOOLEAN NOT NULL DEFAULT true,
  guardian_whatsapp_phone TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, guardian_id)
);

CREATE TRIGGER trg_student_guardians_updated_at
  BEFORE UPDATE ON public.academic_student_guardians
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_student_guardians_student ON public.academic_student_guardians(student_id, status);
CREATE INDEX IF NOT EXISTS idx_student_guardians_guardian ON public.academic_student_guardians(guardian_id, status);

-- ============================================================================
-- 13. ACTUAL ASSESSMENT ATTEMPTS (Performance Evidence Storage)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN (
    'chapter_diagnostic',
    'topic_quiz',
    'board_mock',
    'entrance_sectional',
    'snap_solve_twin',
    'simulation_exam'
  )),
  reference_id TEXT, -- blueprint ID, examination ID, or simulator ID
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score_percentage NUMERIC(5,2) NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  attempt_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_student ON public.academic_assessment_attempts(student_id, completed_at DESC);

-- ============================================================================
-- 14. PERSISTENT STUDENT MASTERY PROFILE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.student_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  mastery_score NUMERIC(5,2) NOT NULL DEFAULT 0.00 CHECK (mastery_score >= 0 AND mastery_score <= 100),
  mastery_status TEXT NOT NULL DEFAULT 'not_started' CHECK (mastery_status IN (
    'not_started',
    'introduced',
    'learning',
    'practicing',
    'demonstrated',
    'mastered'
  )),
  evidence_count INTEGER NOT NULL DEFAULT 0,
  last_demonstrated_at TIMESTAMPTZ,
  retention_decay_factor NUMERIC(3,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, concept_id)
);

CREATE TRIGGER trg_student_mastery_updated_at
  BEFORE UPDATE ON public.student_mastery
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_student_mastery_student ON public.student_mastery(student_id, mastery_status);

-- ============================================================================
-- 15. IMMUTABLE MASTERY EVENTS LEDGER (Audit History of Every Mastery Change)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_mastery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES public.academic_concepts(id) ON DELETE CASCADE,
  previous_score NUMERIC(5,2) NOT NULL,
  new_score NUMERIC(5,2) NOT NULL,
  score_delta NUMERIC(5,2) NOT NULL,
  event_source TEXT NOT NULL CHECK (event_source IN (
    'assessment_attempt',
    'snap_solve_twin',
    'simulation_challenge',
    'spaced_retention_check',
    'manual_instructor_override'
  )),
  evidence_attempt_id UUID REFERENCES public.academic_assessment_attempts(id) ON DELETE SET NULL,
  rationale TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mastery_events_student ON public.academic_mastery_events(student_id, concept_id, created_at DESC);

-- ============================================================================
-- 16. PERSISTENT COGNITIVE ERROR DNA MISCONCEPTION CLASSIFICATION
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
    'time_management_rush',
    'memory_recall_failure',
    'guessing_strategy_error'
  )),
  question_stem_excerpt TEXT,
  student_raw_input TEXT,
  diagnosis_detail TEXT NOT NULL,
  remedial_prescription TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_error_dna_lookup ON public.student_error_dna(student_id, resolved, error_type);

-- ============================================================================
-- 17. SNAP & SOLVE AI DOUBT SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_doubt_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_storage_path TEXT,
  ocr_extracted_text TEXT,
  subject_code TEXT NOT NULL,
  detected_concept_id TEXT REFERENCES public.academic_concepts(id) ON DELETE SET NULL,
  initial_student_hypothesis TEXT,
  current_hint_step INTEGER NOT NULL DEFAULT 1,
  max_hints INTEGER NOT NULL DEFAULT 4,
  socratic_dialogue JSONB NOT NULL DEFAULT '[]'::jsonb,
  verification_question JSONB,
  is_verified_independently BOOLEAN NOT NULL DEFAULT FALSE,
  verification_attempt_id UUID REFERENCES public.academic_assessment_attempts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_doubt_sessions_updated_at
  BEFORE UPDATE ON public.academic_doubt_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_doubt_sessions_student ON public.academic_doubt_sessions(student_id, created_at DESC);

-- ============================================================================
-- 18. EXAM RADAR (Student-Specific Examination Calendar)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_exam_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  examination_id TEXT REFERENCES public.academic_examinations(id) ON DELETE SET NULL,
  exam_title TEXT NOT NULL,
  exam_type TEXT NOT NULL CHECK (exam_type IN (
    'school_unit_test',
    'school_term_exam',
    'school_pre_board',
    'board_final',
    'jee_main',
    'jee_advanced',
    'neet_ug',
    'bitsat',
    'olympiad',
    'cuet',
    'sat',
    'custom_test'
  )),
  target_date DATE NOT NULL,
  subject_code TEXT NOT NULL,
  covered_chapter_ids TEXT[] NOT NULL DEFAULT '{}',
  target_score_percentage INTEGER NOT NULL DEFAULT 90 CHECK (target_score_percentage BETWEEN 1 AND 100),
  priority TEXT NOT NULL DEFAULT 'high' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_exam_calendar_updated_at
  BEFORE UPDATE ON public.academic_exam_calendar
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_exam_calendar_student ON public.academic_exam_calendar(student_id, target_date);

-- ============================================================================
-- 19. PERSONALIZED DYNAMIC REVISION PLANS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.academic_revision_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_calendar_id UUID REFERENCES public.academic_exam_calendar(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sprint_start_date DATE NOT NULL,
  sprint_end_date DATE NOT NULL,
  daily_allocated_minutes INTEGER NOT NULL DEFAULT 45,
  priority_concept_ids TEXT[] NOT NULL DEFAULT '{}',
  daily_schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
  completion_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_revision_plans_updated_at
  BEFORE UPDATE ON public.academic_revision_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_revision_plans_student ON public.academic_revision_plans(student_id, sprint_end_date);

-- ============================================================================
-- 20. EVIDENCE-BASED SUNDAY PARENT INTELLIGENCE REPORTS
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
  top_active_gaps JSONB NOT NULL DEFAULT '[]'::jsonb,
  exam_readiness_score INTEGER NOT NULL DEFAULT 0 CHECK (exam_readiness_score BETWEEN 0 AND 100),
  parent_action_items TEXT[] NOT NULL DEFAULT '{}',
  report_access_token UUID NOT NULL DEFAULT gen_random_uuid(),
  is_viewed BOOLEAN NOT NULL DEFAULT FALSE,
  viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_parent_reports_student ON public.academic_parent_reports(student_id, week_start_date);
CREATE INDEX IF NOT EXISTS idx_parent_reports_token ON public.academic_parent_reports(report_access_token);

-- ============================================================================
-- 21. ROW LEVEL SECURITY (RLS) POLICIES WITH WITH CHECK CLAUSES
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.academic_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_curricula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_curriculum_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_exam_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_mastery_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_error_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_doubt_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_exam_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_revision_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_parent_reports ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Public Read for Catalog & Knowledge Graph
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can read academic_boards" ON public.academic_boards;
CREATE POLICY "Public can read academic_boards" ON public.academic_boards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_programs" ON public.academic_programs;
CREATE POLICY "Public can read academic_programs" ON public.academic_programs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_curricula" ON public.academic_curricula;
CREATE POLICY "Public can read academic_curricula" ON public.academic_curricula FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_examinations" ON public.academic_examinations;
CREATE POLICY "Public can read academic_examinations" ON public.academic_examinations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_subjects" ON public.academic_subjects;
CREATE POLICY "Public can read academic_subjects" ON public.academic_subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_chapters" ON public.academic_chapters;
CREATE POLICY "Public can read academic_chapters" ON public.academic_chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_topics" ON public.academic_topics;
CREATE POLICY "Public can read academic_topics" ON public.academic_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_concepts" ON public.academic_concepts;
CREATE POLICY "Public can read academic_concepts" ON public.academic_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_prerequisites" ON public.academic_prerequisites;
CREATE POLICY "Public can read academic_prerequisites" ON public.academic_prerequisites FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_curriculum_concepts" ON public.academic_curriculum_concepts;
CREATE POLICY "Public can read academic_curriculum_concepts" ON public.academic_curriculum_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read academic_exam_concepts" ON public.academic_exam_concepts;
CREATE POLICY "Public can read academic_exam_concepts" ON public.academic_exam_concepts FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- Student-Guardian Relationships
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Student or guardian can view relationship" ON public.academic_student_guardians;
CREATE POLICY "Student or guardian can view relationship" ON public.academic_student_guardians 
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = guardian_id);

DROP POLICY IF EXISTS "Student can initiate guardian relationship" ON public.academic_student_guardians;
CREATE POLICY "Student can initiate guardian relationship" ON public.academic_student_guardians 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Student or guardian can update status" ON public.academic_student_guardians;
CREATE POLICY "Student or guardian can update status" ON public.academic_student_guardians 
  FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = guardian_id);

-- ----------------------------------------------------------------------------
-- Assessment Attempts & Evidence
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Learner can view own assessment attempts" ON public.academic_assessment_attempts;
CREATE POLICY "Learner can view own assessment attempts" ON public.academic_assessment_attempts 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert own assessment attempts" ON public.academic_assessment_attempts;
CREATE POLICY "Learner can insert own assessment attempts" ON public.academic_assessment_attempts 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- ----------------------------------------------------------------------------
-- Student Mastery Profile & Events
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Learner can view own mastery" ON public.student_mastery;
CREATE POLICY "Learner can view own mastery" ON public.student_mastery 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert own mastery" ON public.student_mastery;
CREATE POLICY "Learner can insert own mastery" ON public.student_mastery 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can update own mastery" ON public.student_mastery;
CREATE POLICY "Learner can update own mastery" ON public.student_mastery 
  FOR UPDATE USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can view own mastery events" ON public.academic_mastery_events;
CREATE POLICY "Learner can view own mastery events" ON public.academic_mastery_events 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert own mastery events" ON public.academic_mastery_events;
CREATE POLICY "Learner can insert own mastery events" ON public.academic_mastery_events 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- ----------------------------------------------------------------------------
-- Error DNA
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Learner can view own error dna" ON public.student_error_dna;
CREATE POLICY "Learner can view own error dna" ON public.student_error_dna 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert own error dna" ON public.student_error_dna;
CREATE POLICY "Learner can insert own error dna" ON public.student_error_dna 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can update own error dna" ON public.student_error_dna;
CREATE POLICY "Learner can update own error dna" ON public.student_error_dna 
  FOR UPDATE USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

-- ----------------------------------------------------------------------------
-- Snap & Solve Doubt Sessions
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Learner can view own doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Learner can view own doubt sessions" ON public.academic_doubt_sessions 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can insert own doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Learner can insert own doubt sessions" ON public.academic_doubt_sessions 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can update own doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Learner can update own doubt sessions" ON public.academic_doubt_sessions 
  FOR UPDATE USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

-- ----------------------------------------------------------------------------
-- Exam Calendar & Revision Plans
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Learner can view own exam calendar" ON public.academic_exam_calendar;
CREATE POLICY "Learner can view own exam calendar" ON public.academic_exam_calendar 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can manage own exam calendar" ON public.academic_exam_calendar;
CREATE POLICY "Learner can manage own exam calendar" ON public.academic_exam_calendar 
  FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can view own revision plans" ON public.academic_revision_plans;
CREATE POLICY "Learner can view own revision plans" ON public.academic_revision_plans 
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Learner can manage own revision plans" ON public.academic_revision_plans;
CREATE POLICY "Learner can manage own revision plans" ON public.academic_revision_plans 
  FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

-- ----------------------------------------------------------------------------
-- Parent Reports (Verified Guardians & Students)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Student or verified guardian can view parent report" ON public.academic_parent_reports;
CREATE POLICY "Student or verified guardian can view parent report" ON public.academic_parent_reports 
  FOR SELECT USING (
    auth.uid() = student_id 
    OR EXISTS (
      SELECT 1 FROM public.academic_student_guardians g
      WHERE g.student_id = public.academic_parent_reports.student_id
        AND g.guardian_id = auth.uid()
        AND g.status = 'verified'
        AND g.can_view_analytics = true
    )
  );
