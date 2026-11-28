-- ============================================================================
-- Migration: 0014_learning_intelligence_and_visitor_analytics.sql
-- Description: Privacy-conscious first-party visitor intelligence, daily
--              analytics aggregates, and persistent learner workspace tables.
-- Safe & Idempotent: Additive only (no destructive drops); strict RLS enforced.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. VISITOR ATTRIBUTION (First-Touch & Last-Touch per Anonymous Visitor)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.visitor_attribution (
  anonymous_visitor_id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_touch_source TEXT NOT NULL DEFAULT 'direct',
  first_touch_medium TEXT NOT NULL DEFAULT 'none',
  first_touch_campaign TEXT,
  first_touch_content TEXT,
  first_touch_term TEXT,
  first_touch_referrer TEXT,
  first_touch_landing_path TEXT NOT NULL DEFAULT '/',
  last_touch_source TEXT NOT NULL DEFAULT 'direct',
  last_touch_medium TEXT NOT NULL DEFAULT 'none',
  last_touch_campaign TEXT,
  last_touch_content TEXT,
  last_touch_term TEXT,
  last_touch_referrer TEXT,
  last_touch_landing_path TEXT NOT NULL DEFAULT '/',
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reconciled_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_visitor_attribution_user
  ON public.visitor_attribution(user_id)
  WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_visitor_attribution_source
  ON public.visitor_attribution(first_touch_source, first_seen_at DESC);

-- ============================================================================
-- 2. VISITOR SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.visitor_sessions (
  session_id TEXT PRIMARY KEY,
  anonymous_visitor_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  landing_path TEXT NOT NULL DEFAULT '/',
  exit_path TEXT NOT NULL DEFAULT '/',
  referrer_domain TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  device_category TEXT NOT NULL DEFAULT 'unknown' CHECK (device_category IN ('desktop', 'mobile', 'tablet', 'bot', 'unknown')),
  browser_category TEXT NOT NULL DEFAULT 'other' CHECK (browser_category IN ('chrome', 'safari', 'firefox', 'edge', 'other')),
  country_code TEXT,
  region TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_views_count INTEGER NOT NULL DEFAULT 0,
  events_count INTEGER NOT NULL DEFAULT 0,
  is_engaged BOOLEAN NOT NULL DEFAULT FALSE,
  engagement_score INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor
  ON public.visitor_sessions(anonymous_visitor_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_user
  ON public.visitor_sessions(user_id, started_at DESC)
  WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_started
  ON public.visitor_sessions(started_at DESC);

-- ============================================================================
-- 3. FIRST-PARTY ANALYTICS EVENTS (Versioned & Deduplicated)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_version INTEGER NOT NULL DEFAULT 1,
  dedupe_key TEXT UNIQUE,
  anonymous_visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_path TEXT NOT NULL DEFAULT '/',
  referrer_domain TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_category TEXT NOT NULL DEFAULT 'unknown',
  browser_category TEXT NOT NULL DEFAULT 'other',
  country_code TEXT,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_time
  ON public.analytics_events(event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name_time
  ON public.analytics_events(event_name, event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor_time
  ON public.analytics_events(anonymous_visitor_id, event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_time
  ON public.analytics_events(user_id, event_timestamp DESC)
  WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_session
  ON public.analytics_events(session_id);

-- ============================================================================
-- 4. DAILY ANALYTICS AGGREGATES (Fast Admin Time-Series Queries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.analytics_daily_aggregates (
  metric_date DATE NOT NULL,
  dimension_type TEXT NOT NULL,
  dimension_key TEXT NOT NULL,
  visitors_count INTEGER NOT NULL DEFAULT 0,
  sessions_count INTEGER NOT NULL DEFAULT 0,
  page_views_count INTEGER NOT NULL DEFAULT 0,
  registrations_count INTEGER NOT NULL DEFAULT 0,
  active_learners_count INTEGER NOT NULL DEFAULT 0,
  paid_conversions_count INTEGER NOT NULL DEFAULT 0,
  revenue_rupees NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (metric_date, dimension_type, dimension_key)
);

CREATE INDEX IF NOT EXISTS idx_analytics_daily_date
  ON public.analytics_daily_aggregates(metric_date DESC, dimension_type);

-- ============================================================================
-- 5. LEARNER WORKSPACE PERSISTENCE (Bookmarks, Revision Notes, Preferences)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.learner_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('question', 'lesson', 'formula', 'skill', 'project')),
  item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  href TEXT NOT NULL,
  subject_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_learner_bookmarks_user
  ON public.learner_bookmarks(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.learner_revision_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject_code TEXT,
  topic_id TEXT,
  next_review_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_learner_revision_notes_user
  ON public.learner_revision_notes(user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS public.learner_study_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  class_number INTEGER CHECK (class_number BETWEEN 4 AND 12),
  board_code TEXT DEFAULT 'CBSE',
  exam_target TEXT,
  subjects TEXT[] NOT NULL DEFAULT ARRAY['math', 'science']::TEXT[],
  weekly_goal_minutes INTEGER NOT NULL DEFAULT 180 CHECK (weekly_goal_minutes BETWEEN 15 AND 4200),
  daily_target_questions INTEGER NOT NULL DEFAULT 10 CHECK (daily_target_questions BETWEEN 1 AND 200),
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (Strict Privacy & Admin Isolation)
-- ============================================================================
ALTER TABLE public.visitor_attribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily_aggregates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_revision_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_study_preferences ENABLE ROW LEVEL SECURITY;

-- Sensitive visitor intelligence: Admin read only; writes via service_role API endpoints only
DROP POLICY IF EXISTS "visitor_attribution: admin read" ON public.visitor_attribution;
CREATE POLICY "visitor_attribution: admin read" ON public.visitor_attribution
  FOR SELECT USING (is_admin_or_above(auth.uid()));

DROP POLICY IF EXISTS "visitor_sessions: admin read" ON public.visitor_sessions;
CREATE POLICY "visitor_sessions: admin read" ON public.visitor_sessions
  FOR SELECT USING (is_admin_or_above(auth.uid()));

DROP POLICY IF EXISTS "analytics_events: admin read" ON public.analytics_events;
CREATE POLICY "analytics_events: admin read" ON public.analytics_events
  FOR SELECT USING (is_admin_or_above(auth.uid()));

DROP POLICY IF EXISTS "analytics_daily_aggregates: admin read" ON public.analytics_daily_aggregates;
CREATE POLICY "analytics_daily_aggregates: admin read" ON public.analytics_daily_aggregates
  FOR SELECT USING (is_admin_or_above(auth.uid()));

-- Learner personal workspace tables: strict owner-only access
DROP POLICY IF EXISTS "learner_bookmarks: owner all" ON public.learner_bookmarks;
CREATE POLICY "learner_bookmarks: owner all" ON public.learner_bookmarks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "learner_revision_notes: owner all" ON public.learner_revision_notes;
CREATE POLICY "learner_revision_notes: owner all" ON public.learner_revision_notes
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "learner_study_preferences: owner all" ON public.learner_study_preferences;
CREATE POLICY "learner_study_preferences: owner all" ON public.learner_study_preferences
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
