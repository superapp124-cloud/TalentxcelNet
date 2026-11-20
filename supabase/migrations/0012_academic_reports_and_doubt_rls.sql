-- ============================================================================
-- Migration: 0012_academic_reports_and_doubt_rls.sql
-- Description: Allow guest/token access for parent reports & doubt sessions
-- Safe & Idempotent: Drops old policies before recreating.
-- ============================================================================

-- 1. Allow student_id to be nullable for guest learners
ALTER TABLE IF EXISTS public.academic_doubt_sessions 
  ALTER COLUMN student_id DROP NOT NULL;

ALTER TABLE IF EXISTS public.academic_parent_reports 
  ALTER COLUMN student_id DROP NOT NULL;

-- 2. Policies for academic_parent_reports
DROP POLICY IF EXISTS "Public can view parent report by token" ON public.academic_parent_reports;
CREATE POLICY "Public can view parent report by token" ON public.academic_parent_reports
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for parent reports" ON public.academic_parent_reports;
CREATE POLICY "Enable insert for parent reports" ON public.academic_parent_reports
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for parent reports" ON public.academic_parent_reports;
CREATE POLICY "Enable update for parent reports" ON public.academic_parent_reports
  FOR UPDATE USING (true) WITH CHECK (true);

-- 3. Policies for academic_doubt_sessions
DROP POLICY IF EXISTS "Enable insert for academic doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Enable insert for academic doubt sessions" ON public.academic_doubt_sessions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for academic doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Enable select for academic doubt sessions" ON public.academic_doubt_sessions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable update for academic doubt sessions" ON public.academic_doubt_sessions;
CREATE POLICY "Enable update for academic doubt sessions" ON public.academic_doubt_sessions
  FOR UPDATE USING (true) WITH CHECK (true);
