-- Migration: 20261016000001_initial_schema
-- Description: Initial TalentXcel.net database schema with RLS
-- Requires: Supabase project with pgvector extension available

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================================
-- 2. ENUMS
-- ============================================================================
CREATE TYPE user_role AS ENUM (
  'public',
  'prospect',
  'learner',
  'parent_guardian',
  'instructor',
  'mentor',
  'admissions_counsellor',
  'support_agent',
  'content_editor',
  'finance_ops',
  'academy_admin',
  'super_admin'
);

CREATE TYPE programme_status AS ENUM (
  'draft',
  'waitlist',
  'published',
  'archived'
);

CREATE TYPE lead_status AS ENUM (
  'new_enquiry',
  'contact_attempted',
  'qualified',
  'counselling_scheduled',
  'counselling_completed',
  'application_started',
  'application_submitted',
  'offer_pending',
  'admitted',
  'payment_pending',
  'enrolled',
  'not_proceeding',
  'waitlisted'
);

CREATE TYPE enrolment_status AS ENUM (
  'pending',
  'active',
  'suspended',
  'completed',
  'withdrawn',
  'expired'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'succeeded',
  'failed',
  'refunded',
  'partially_refunded',
  'cancelled'
);

CREATE TYPE order_status AS ENUM (
  'draft',
  'confirmed',
  'payment_pending',
  'paid',
  'cancelled',
  'refunded'
);

CREATE TYPE lesson_type AS ENUM (
  'video',
  'text',
  'code',
  'pdf',
  'quiz',
  'assignment',
  'live_session',
  'project'
);

CREATE TYPE assessment_type AS ENUM (
  'quiz',
  'assignment',
  'project',
  'peer_review',
  'practical'
);

CREATE TYPE ticket_status AS ENUM (
  'open',
  'in_progress',
  'waiting_learner',
  'resolved',
  'closed'
);

CREATE TYPE ticket_priority AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

CREATE TYPE certificate_status AS ENUM (
  'issued',
  'revoked'
);

-- ============================================================================
-- 3. TABLES (IN DEPENDENCY ORDER)
-- ============================================================================

-- IDENTITY & ORGS
-- profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  display_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  avatar_url TEXT,
  bio TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'IN',
  timezone TEXT DEFAULT 'Asia/Kolkata',
  preferred_language TEXT DEFAULT 'en',
  is_minor BOOLEAN DEFAULT FALSE,
  guardian_profile_id UUID REFERENCES profiles(id),
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active','suspended','deleted','pending_verification')),
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'prospect',
  granted_by UUID REFERENCES profiles(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL,
  consented BOOLEAN NOT NULL,
  ip_address INET,
  user_agent TEXT,
  consented_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRAMMES & CONTENT
CREATE TABLE programmes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  short_description TEXT,
  status programme_status DEFAULT 'draft',
  category TEXT,
  duration_months INTEGER,
  workload_hours_per_week NUMERIC(4,1),
  level TEXT CHECK (level IN ('beginner','intermediate','advanced','foundation')),
  language TEXT DEFAULT 'en',
  thumbnail_url TEXT,
  preview_video_url TEXT,
  is_downloadable_content_available BOOLEAN DEFAULT FALSE,
  has_hardware_included BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  created_by UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  position INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type lesson_type NOT NULL DEFAULT 'text',
  content_url TEXT,
  content_body TEXT,
  duration_minutes INTEGER,
  position INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  is_preview BOOLEAN DEFAULT FALSE,
  is_downloadable BOOLEAN DEFAULT FALSE,
  transcript TEXT,
  captions_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE learning_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id UUID REFERENCES programmes(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  instructor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'instructor',
  is_lead BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(programme_id, instructor_id)
);

-- COMMERCE - PRICES (Created before orders and enrolments)
CREATE TABLE programme_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  currency TEXT DEFAULT 'INR',
  base_price NUMERIC(12,2) NOT NULL,
  upfront_amount NUMERIC(12,2),
  monthly_amount NUMERIC(12,2),
  instalment_months INTEGER,
  tax_rate_percentage NUMERIC(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE RESTRICT,
  price_id UUID REFERENCES programme_prices(id),
  status order_status DEFAULT 'draft',
  subtotal NUMERIC(12,2) NOT NULL,
  discount_amount NUMERIC(12,2) DEFAULT 0,
  tax_amount NUMERIC(12,2) DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  coupon_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENROLMENTS & PROGRESS
CREATE TABLE learning_enrolments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE RESTRICT,
  status enrolment_status NOT NULL DEFAULT 'pending',
  enrolled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  progress_percentage NUMERIC(5,2) DEFAULT 0,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(learner_id, programme_id)
);

CREATE TABLE learner_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrolment_id UUID NOT NULL REFERENCES learning_enrolments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  last_position_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrolment_id, lesson_id)
);

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  note TEXT,
  position_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(learner_id, lesson_id)
);

CREATE TABLE learner_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ASSESSMENTS
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id UUID REFERENCES programmes(id),
  module_id UUID REFERENCES modules(id),
  lesson_id UUID REFERENCES lessons(id),
  title TEXT NOT NULL,
  description TEXT,
  assessment_type assessment_type NOT NULL,
  max_attempts INTEGER DEFAULT 3,
  time_limit_minutes INTEGER,
  pass_score_percentage NUMERIC(5,2) DEFAULT 60,
  is_published BOOLEAN DEFAULT FALSE,
  due_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice','short_answer','code','file_upload','true_false')),
  options JSONB,
  correct_answer JSONB,
  points NUMERIC(6,2) DEFAULT 1,
  explanation TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE RESTRICT,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  enrolment_id UUID REFERENCES learning_enrolments(id),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress','submitted','graded','appealed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  graded_at TIMESTAMPTZ,
  score NUMERIC(6,2),
  max_score NUMERIC(6,2),
  percentage NUMERIC(5,2),
  is_passed BOOLEAN,
  graded_by UUID REFERENCES profiles(id),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES assessment_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  response_value JSONB,
  file_url TEXT,
  score NUMERIC(6,2),
  is_correct BOOLEAN,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number TEXT NOT NULL UNIQUE,
  learner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  enrolment_id UUID NOT NULL REFERENCES learning_enrolments(id) ON DELETE RESTRICT,
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE RESTRICT,
  status certificate_status DEFAULT 'issued',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  revocation_reason TEXT,
  issued_by UUID REFERENCES profiles(id),
  verification_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMISSIONS CRM
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  profile_id UUID REFERENCES profiles(id),
  programme_interest UUID REFERENCES programmes(id),
  status lead_status DEFAULT 'new_enquiry',
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  assigned_to UUID REFERENCES profiles(id),
  notes TEXT,
  is_duplicate BOOLEAN DEFAULT FALSE,
  duplicate_of UUID REFERENCES leads(id),
  city TEXT,
  state TEXT,
  education_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admissions_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  applicant_id UUID NOT NULL REFERENCES profiles(id),
  programme_id UUID NOT NULL REFERENCES programmes(id),
  status TEXT DEFAULT 'draft',
  form_data JSONB DEFAULT '{}',
  eligibility_checklist JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ,
  decision TEXT,
  decision_at TIMESTAMPTZ,
  decision_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE interaction_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  interaction_type TEXT NOT NULL,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMERCE - PAYMENTS & REFUNDS
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  provider TEXT NOT NULL,
  provider_order_id TEXT,
  provider_payment_id TEXT,
  provider_signature TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status payment_status DEFAULT 'pending',
  failure_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, event_id)
);

CREATE TABLE refund_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  requested_by UUID NOT NULL REFERENCES profiles(id),
  amount NUMERIC(12,2) NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','processed')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  provider_refund_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUPPORT
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT NOT NULL UNIQUE,
  submitter_id UUID NOT NULL REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  subject TEXT NOT NULL,
  category TEXT,
  status ticket_status DEFAULT 'open',
  priority ticket_priority DEFAULT 'medium',
  programme_id UUID REFERENCES programmes(id),
  enrolment_id UUID REFERENCES learning_enrolments(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  message TEXT NOT NULL,
  attachments JSONB,
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  audience TEXT DEFAULT 'all',
  programme_id UUID REFERENCES programmes(id),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  context_type TEXT,
  context_id UUID,
  title TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  metadata JSONB,
  tokens_used INTEGER,
  model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  agent_type TEXT NOT NULL,
  model TEXT NOT NULL,
  provider TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  latency_ms INTEGER,
  success BOOLEAN DEFAULT TRUE,
  error_type TEXT,
  cost_usd NUMERIC(10,6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_id UUID,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_indexed BOOLEAN DEFAULT FALSE,
  access_level TEXT DEFAULT 'programme',
  programme_id UUID REFERENCES programmes(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  chunk_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_learning_enrolments_learner ON learning_enrolments(learner_id);
CREATE INDEX idx_learning_enrolments_programme ON learning_enrolments(programme_id);
CREATE INDEX idx_learner_progress_enrolment ON learner_progress(enrolment_id);
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_modules_programme ON modules(programme_id);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_orders_learner ON orders(learner_id);
CREATE INDEX idx_payment_transactions_order ON payment_transactions(order_id);
CREATE INDEX idx_support_tickets_submitter ON support_tickets(submitter_id);
CREATE INDEX idx_audit_events_user ON audit_events(user_id);
CREATE INDEX idx_audit_events_created ON audit_events(created_at DESC);
CREATE INDEX idx_ai_conversations_user ON ai_conversations(user_id);
CREATE INDEX idx_ai_usage_created ON ai_usage_events(created_at DESC);
CREATE INDEX idx_knowledge_chunks_document ON knowledge_chunks(document_id);
CREATE INDEX idx_knowledge_chunks_embedding ON knowledge_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_programmes_slug ON programmes(slug);
CREATE INDEX idx_programmes_status ON programmes(status);

-- ============================================================================
-- 5. UPDATED_AT TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'profiles','programmes','modules','lessons',
      'learning_enrolments','learner_progress','assessments',
      'admissions_applications','leads','orders',
      'payment_transactions','support_tickets','ai_conversations',
      'knowledge_documents','programme_prices','refund_requests'
    ])
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS set_updated_at ON %I;
      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON %I
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    ', t, t);
  END LOOP;
END;
$$;

-- ============================================================================
-- 6. HELPER FUNCTIONS & AUTH TRIGGER
-- ============================================================================

-- FUNCTION: get_user_role (used in RLS policies)
CREATE OR REPLACE FUNCTION get_user_role(uid UUID)
RETURNS user_role AS $$
  SELECT role FROM user_roles
  WHERE user_id = uid AND is_active = TRUE
  ORDER BY CASE role
    WHEN 'super_admin' THEN 1
    WHEN 'academy_admin' THEN 2
    WHEN 'finance_ops' THEN 3
    WHEN 'admissions_counsellor' THEN 4
    WHEN 'instructor' THEN 5
    WHEN 'mentor' THEN 6
    WHEN 'support_agent' THEN 7
    WHEN 'content_editor' THEN 8
    WHEN 'learner' THEN 9
    WHEN 'parent_guardian' THEN 10
    WHEN 'prospect' THEN 11
    ELSE 99
  END
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- FUNCTION: is_admin_or_above
CREATE OR REPLACE FUNCTION is_admin_or_above(uid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = uid
    AND role IN ('academy_admin', 'super_admin')
    AND is_active = TRUE
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- FUNCTION: create profile and prospect role on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  -- Assign default prospect role
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'prospect');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) ACTIVATION
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_enrolments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE refund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- profiles: users see/edit their own, admins see all
CREATE POLICY "profiles: own" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "profiles: admin read" ON profiles FOR SELECT USING (is_admin_or_above(auth.uid()));

-- user_roles: users see their own, admins see/manage all
CREATE POLICY "user_roles: own" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_roles: admin" ON user_roles FOR ALL USING (is_admin_or_above(auth.uid()));

-- consent_records: users manage own, admins read all
CREATE POLICY "consent: own" ON consent_records FOR ALL USING (user_id = auth.uid());
CREATE POLICY "consent: admin" ON consent_records FOR ALL USING (is_admin_or_above(auth.uid()));

-- audit_events: admin only
CREATE POLICY "audit: admin" ON audit_events FOR SELECT USING (is_admin_or_above(auth.uid()));

-- programmes: published visible to all, drafts to admins/instructors
CREATE POLICY "programmes: published public" ON programmes FOR SELECT USING (status = 'published');
CREATE POLICY "programmes: admin full" ON programmes FOR ALL USING (is_admin_or_above(auth.uid()));
CREATE POLICY "programmes: instructor read" ON programmes FOR SELECT USING (
  EXISTS (SELECT 1 FROM course_instructors WHERE programme_id = programmes.id AND instructor_id = auth.uid())
);

-- modules: published visible to enrolled learners or admins
CREATE POLICY "modules: enrolled" ON modules FOR SELECT USING (
  is_published = TRUE OR is_admin_or_above(auth.uid())
);
CREATE POLICY "modules: admin" ON modules FOR ALL USING (is_admin_or_above(auth.uid()));

-- lessons: preview visible to all, published visible to enrolled learners or admins
CREATE POLICY "lessons: preview" ON lessons FOR SELECT USING (is_preview = TRUE AND is_published = TRUE);
CREATE POLICY "lessons: enrolled" ON lessons FOR SELECT USING (
  is_published = TRUE AND EXISTS (
    SELECT 1 FROM learning_enrolments le
    JOIN modules m ON m.id = lessons.module_id
    WHERE le.learner_id = auth.uid()
    AND le.programme_id = m.programme_id
    AND le.status = 'active'
  )
);
CREATE POLICY "lessons: admin" ON lessons FOR ALL USING (is_admin_or_above(auth.uid()));

-- learning_outcomes: public read when published, admins full
CREATE POLICY "outcomes: public" ON learning_outcomes FOR SELECT USING (
  EXISTS (SELECT 1 FROM programmes p WHERE p.id = learning_outcomes.programme_id AND p.status = 'published')
  OR is_admin_or_above(auth.uid())
);
CREATE POLICY "outcomes: admin" ON learning_outcomes FOR ALL USING (is_admin_or_above(auth.uid()));

-- course_instructors: public read when published, admins full
CREATE POLICY "instructors: public" ON course_instructors FOR SELECT USING (
  EXISTS (SELECT 1 FROM programmes p WHERE p.id = course_instructors.programme_id AND p.status = 'published')
  OR is_admin_or_above(auth.uid())
);
CREATE POLICY "instructors: admin" ON course_instructors FOR ALL USING (is_admin_or_above(auth.uid()));

-- learning_enrolments: own only
CREATE POLICY "enrolments: own" ON learning_enrolments FOR SELECT USING (learner_id = auth.uid());
CREATE POLICY "enrolments: admin" ON learning_enrolments FOR ALL USING (is_admin_or_above(auth.uid()));

-- learner_progress: own only
CREATE POLICY "progress: own" ON learner_progress FOR ALL USING (
  EXISTS (SELECT 1 FROM learning_enrolments WHERE id = learner_progress.enrolment_id AND learner_id = auth.uid())
);
CREATE POLICY "progress: admin" ON learner_progress FOR SELECT USING (is_admin_or_above(auth.uid()));

-- bookmarks / notes: own only
CREATE POLICY "bookmarks: own" ON bookmarks FOR ALL USING (learner_id = auth.uid());
CREATE POLICY "notes: own" ON learner_notes FOR ALL USING (learner_id = auth.uid());

-- assessments: admin full, enrolled learners read published
CREATE POLICY "assessments: admin" ON assessments FOR ALL USING (is_admin_or_above(auth.uid()));
CREATE POLICY "assessments: enrolled" ON assessments FOR SELECT USING (
  is_published = TRUE AND (
    programme_id IS NULL OR EXISTS (
      SELECT 1 FROM learning_enrolments
      WHERE learner_id = auth.uid()
      AND programme_id = assessments.programme_id
      AND status = 'active'
    )
  )
);

-- questions: enrolled learners read published, admins full
CREATE POLICY "questions: enrolled" ON questions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM assessments a
    WHERE a.id = questions.assessment_id
    AND a.is_published = TRUE
    AND (
      a.programme_id IS NULL OR EXISTS (
        SELECT 1 FROM learning_enrolments le
        WHERE le.programme_id = a.programme_id
        AND le.learner_id = auth.uid()
        AND le.status = 'active'
      )
    )
  )
  OR is_admin_or_above(auth.uid())
);
CREATE POLICY "questions: admin" ON questions FOR ALL USING (is_admin_or_above(auth.uid()));

-- assessment_attempts: own only for learners, admins full
CREATE POLICY "attempts: own" ON assessment_attempts FOR ALL USING (learner_id = auth.uid());
CREATE POLICY "attempts: admin" ON assessment_attempts FOR ALL USING (is_admin_or_above(auth.uid()));

-- assessment_responses: own attempt responses for learners, admins full
CREATE POLICY "responses: own" ON assessment_responses FOR ALL USING (
  EXISTS (SELECT 1 FROM assessment_attempts aa WHERE aa.id = assessment_responses.attempt_id AND aa.learner_id = auth.uid())
);
CREATE POLICY "responses: admin" ON assessment_responses FOR ALL USING (is_admin_or_above(auth.uid()));

-- certificates: own + public verification (handled by function/view)
CREATE POLICY "certificates: own" ON certificates FOR SELECT USING (learner_id = auth.uid());
CREATE POLICY "certificates: admin" ON certificates FOR ALL USING (is_admin_or_above(auth.uid()));

-- leads: admissions counsellors and above, or prospect own lead
CREATE POLICY "leads: admissions" ON leads FOR ALL USING (
  get_user_role(auth.uid()) IN ('admissions_counsellor', 'academy_admin', 'super_admin')
);
CREATE POLICY "leads: own" ON leads FOR SELECT USING (
  profile_id = auth.uid()
);

-- admissions_applications: own applicant or admissions counsellor and above
CREATE POLICY "applications: own" ON admissions_applications FOR ALL USING (applicant_id = auth.uid());
CREATE POLICY "applications: admissions" ON admissions_applications FOR ALL USING (
  get_user_role(auth.uid()) IN ('admissions_counsellor', 'academy_admin', 'super_admin')
);

-- interaction_history: admissions counsellors and above
CREATE POLICY "interaction: admissions" ON interaction_history FOR ALL USING (
  get_user_role(auth.uid()) IN ('admissions_counsellor', 'academy_admin', 'super_admin')
);

-- programme_prices: public read for active, admins full
CREATE POLICY "prices: public" ON programme_prices FOR SELECT USING (is_active = TRUE);
CREATE POLICY "prices: admin" ON programme_prices FOR ALL USING (is_admin_or_above(auth.uid()));

-- orders: own learner or admin/finance
CREATE POLICY "orders: own" ON orders FOR SELECT USING (learner_id = auth.uid());
CREATE POLICY "orders: finance" ON orders FOR SELECT USING (
  get_user_role(auth.uid()) IN ('finance_ops', 'academy_admin', 'super_admin')
);
CREATE POLICY "orders: admin" ON orders FOR ALL USING (is_admin_or_above(auth.uid()));

-- payment_transactions: own or finance/admin
CREATE POLICY "payments: own" ON payment_transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = payment_transactions.order_id AND learner_id = auth.uid())
);
CREATE POLICY "payments: finance" ON payment_transactions FOR SELECT USING (
  get_user_role(auth.uid()) IN ('finance_ops', 'academy_admin', 'super_admin')
);

-- payment_webhook_events: admin only (server-side only)
CREATE POLICY "webhooks: admin" ON payment_webhook_events FOR ALL USING (is_admin_or_above(auth.uid()));

-- refund_requests: own requester or finance/admin
CREATE POLICY "refunds: own" ON refund_requests FOR ALL USING (requested_by = auth.uid());
CREATE POLICY "refunds: finance" ON refund_requests FOR ALL USING (
  get_user_role(auth.uid()) IN ('finance_ops', 'academy_admin', 'super_admin')
);

-- support_tickets: own submitter or assigned agent or admin
CREATE POLICY "tickets: own" ON support_tickets FOR ALL USING (
  submitter_id = auth.uid() OR
  assigned_to = auth.uid() OR
  get_user_role(auth.uid()) IN ('support_agent', 'academy_admin', 'super_admin')
);

-- support_messages: participants in ticket or support agent/admin
CREATE POLICY "messages: ticket participants" ON support_messages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM support_tickets st
    WHERE st.id = support_messages.ticket_id
    AND (
      st.submitter_id = auth.uid() OR
      st.assigned_to = auth.uid() OR
      get_user_role(auth.uid()) IN ('support_agent', 'academy_admin', 'super_admin')
    )
  )
);

-- announcements: published announcements to enrolled learners/public, admins full
CREATE POLICY "announcements: read" ON announcements FOR SELECT USING (
  is_published = TRUE AND (
    programme_id IS NULL OR EXISTS (
      SELECT 1 FROM learning_enrolments le
      WHERE le.programme_id = announcements.programme_id
      AND le.learner_id = auth.uid()
      AND le.status = 'active'
    )
  ) OR is_admin_or_above(auth.uid())
);
CREATE POLICY "announcements: admin" ON announcements FOR ALL USING (is_admin_or_above(auth.uid()));

-- ai_conversations: own only
CREATE POLICY "ai_conv: own" ON ai_conversations FOR ALL USING (user_id = auth.uid());

-- ai_messages: own conversation only
CREATE POLICY "ai_messages: own" ON ai_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM ai_conversations WHERE id = ai_messages.conversation_id AND user_id = auth.uid())
);

-- ai_usage_events: own read, admin full
CREATE POLICY "ai_usage: own" ON ai_usage_events FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "ai_usage: admin" ON ai_usage_events FOR ALL USING (is_admin_or_above(auth.uid()));

-- knowledge_documents & knowledge_chunks: admin full
CREATE POLICY "knowledge: admin" ON knowledge_documents FOR ALL USING (is_admin_or_above(auth.uid()));
CREATE POLICY "knowledge_chunks: admin" ON knowledge_chunks FOR ALL USING (is_admin_or_above(auth.uid()));
