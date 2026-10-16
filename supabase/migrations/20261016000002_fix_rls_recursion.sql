-- Migration: 20261016000002_fix_rls_recursion
-- Description: Fix mutual recursion between programmes and course_instructors RLS policies

-- Helper function with SECURITY DEFINER to bypass RLS when checking instructor assignment
CREATE OR REPLACE FUNCTION is_course_instructor(p_programme_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM course_instructors
    WHERE programme_id = p_programme_id AND instructor_id = p_user_id
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop and recreate instructor read policy on programmes using the SECURITY DEFINER function
DROP POLICY IF EXISTS "programmes: instructor read" ON programmes;
CREATE POLICY "programmes: instructor read" ON programmes FOR SELECT USING (
  is_course_instructor(id, auth.uid())
);

-- Drop and recreate public read policy on course_instructors (public directory data)
DROP POLICY IF EXISTS "instructors: public" ON course_instructors;
CREATE POLICY "instructors: public" ON course_instructors FOR SELECT USING (true);
