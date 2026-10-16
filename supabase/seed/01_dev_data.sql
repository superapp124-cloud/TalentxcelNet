-- ============================================================================
-- TalentXcel.net Development Seed Data
-- File: supabase/seed/01_dev_data.sql
-- ============================================================================
-- CAUTION: NON-PRODUCTION SEED DATA
-- This script is strictly intended for local development, staging environments,
-- and automated testing. NEVER run this script in production environments.
-- ============================================================================

DO $$
DECLARE
  v_admin_id UUID := '00000000-0000-0000-0000-000000000001';
  v_prog_ai UUID := '11111111-1111-1111-1111-111111111101';
  v_prog_comp UUID := '11111111-1111-1111-1111-111111111102';
  v_prog_found UUID := '11111111-1111-1111-1111-111111111103';
  v_prog_hs_found UUID := '11111111-1111-1111-1111-111111111104';
  v_prog_small UUID := '11111111-1111-1111-1111-111111111105';
  v_prog_home UUID := '11111111-1111-1111-1111-111111111106';
  v_prog_teachers UUID := '11111111-1111-1111-1111-111111111107';
  v_prog_lifestyle UUID := '11111111-1111-1111-1111-111111111108';
  v_prog_health UUID := '11111111-1111-1111-1111-111111111109';
  v_prog_ent UUID := '11111111-1111-1111-1111-111111111110';
BEGIN
  -- --------------------------------------------------------------------------
  -- 1. TEST ADMIN USER PLACEHOLDER
  -- --------------------------------------------------------------------------
  -- Insert into Supabase auth.users if running in a Supabase Postgres environment
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = v_admin_id) THEN
      INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at
      ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        v_admin_id,
        'authenticated',
        'authenticated',
        'admin@talentxcel.net',
        crypt('AdminSecurePass123!', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"TalentXcel Academy Admin"}',
        NOW(),
        NOW()
      );
    END IF;
  END IF;

  -- Ensure profile exists in public.profiles
  INSERT INTO profiles (
    id,
    email,
    full_name,
    display_name,
    phone,
    country,
    timezone,
    preferred_language,
    account_status
  ) VALUES (
    v_admin_id,
    'admin@talentxcel.net',
    'TalentXcel Academy Admin',
    'Head Administrator',
    '+919876543210',
    'IN',
    'Asia/Kolkata',
    'en',
    'active'
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      display_name = EXCLUDED.display_name,
      account_status = 'active',
      updated_at = NOW();

  -- Assign super_admin role in public.user_roles
  INSERT INTO user_roles (
    user_id,
    role,
    granted_by,
    is_active
  ) VALUES (
    v_admin_id,
    'super_admin',
    v_admin_id,
    TRUE
  )
  ON CONFLICT (user_id, role) DO UPDATE
  SET is_active = TRUE;

  -- --------------------------------------------------------------------------
  -- 2. INITIAL PROGRAMME ENTRIES (PROGRAMMES A THROUGH D IN DRAFT STATUS)
  -- --------------------------------------------------------------------------

  -- Programme A: Full-Stack TypeScript & Cloud Architecture
  INSERT INTO programmes (
    id,
    slug,
    title,
    subtitle,
    description,
    short_description,
    status,
    category,
    duration_months,
    workload_hours_per_week,
    level,
    language,
    is_downloadable_content_available,
    has_hardware_included,
    meta_title,
    meta_description,
    created_by
  ) VALUES (
    v_prog_a_id,
    'programme-a-fullstack-cloud',
    'Programme A: Full-Stack TypeScript & Cloud Systems Engineering',
    'Master modern TypeScript, Next.js 15, distributed backends, and cloud native architecture.',
    'A rigorous, industry-aligned career track focusing on production-grade TypeScript engineering. Learners architect high-throughput applications using Next.js 15 App Router, Tailwind CSS, PostgreSQL, event-driven microservices, and automated AWS deployments.',
    'End-to-end full-stack engineering with TypeScript, Next.js 15, Supabase, and AWS.',
    'draft',
    'Software Engineering',
    6,
    15.0,
    'intermediate',
    'en',
    TRUE,
    FALSE,
    'Programme A: Full-Stack TypeScript Engineering | TalentXcel.net',
    'Learn production-grade full-stack engineering with TypeScript, Next.js 15, and AWS.',
    v_admin_id
  )
  ON CONFLICT (slug) DO UPDATE
  SET title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      description = EXCLUDED.description,
      short_description = EXCLUDED.short_description,
      status = 'draft',
      updated_at = NOW();

  -- Programme B: Applied Generative AI & Autonomous Agent Systems
  INSERT INTO programmes (
    id,
    slug,
    title,
    subtitle,
    description,
    short_description,
    status,
    category,
    duration_months,
    workload_hours_per_week,
    level,
    language,
    is_downloadable_content_available,
    has_hardware_included,
    meta_title,
    meta_description,
    created_by
  ) VALUES (
    v_prog_b_id,
    'programme-b-ai-agentic-engineering',
    'Programme B: Applied Generative AI & Autonomous Agent Systems',
    'Build production-ready LLM pipelines, pgvector RAG architectures, and multi-agent systems.',
    'Deep engineering immersion into modern Artificial Intelligence. Covers agentic tool execution, LangChain/LlamaIndex paradigms, semantic vector embeddings, vector databases with pgvector, and automated multi-agent governance.',
    'Build cutting-edge agentic AI workflows and scalable vector search retrieval systems.',
    'draft',
    'Artificial Intelligence',
    4,
    14.0,
    'advanced',
    'en',
    TRUE,
    FALSE,
    'Programme B: Applied Generative AI & Agentic Systems | TalentXcel.net',
    'Master vector embeddings, agentic architectures, and production LLM orchestration.',
    v_admin_id
  )
  ON CONFLICT (slug) DO UPDATE
  SET title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      description = EXCLUDED.description,
      short_description = EXCLUDED.short_description,
      status = 'draft',
      updated_at = NOW();

  -- Programme C: Cloud Platform & DevOps Engineering
  INSERT INTO programmes (
    id,
    slug,
    title,
    subtitle,
    description,
    short_description,
    status,
    category,
    duration_months,
    workload_hours_per_week,
    level,
    language,
    is_downloadable_content_available,
    has_hardware_included,
    meta_title,
    meta_description,
    created_by
  ) VALUES (
    v_prog_c_id,
    'programme-c-cloud-devops-platform',
    'Programme C: Cloud Platform Engineering & DevOps',
    'Architect resilient cloud infrastructure with Docker, Kubernetes, Terraform, and GitOps.',
    'Learn infrastructure as code, continuous delivery pipelines, service meshes, telemetry, and site reliability engineering. Students build scalable infrastructure across multi-region cloud providers using Kubernetes and Terraform.',
    'Modern DevOps, Kubernetes container orchestration, and automated GitOps pipelines.',
    'draft',
    'Cloud & DevOps',
    5,
    12.0,
    'intermediate',
    'en',
    TRUE,
    FALSE,
    'Programme C: Cloud Platform Engineering & DevOps | TalentXcel.net',
    'Master container orchestration, Terraform IaC, and resilient SRE principles.',
    v_admin_id
  )
  ON CONFLICT (slug) DO UPDATE
  SET title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      description = EXCLUDED.description,
      short_description = EXCLUDED.short_description,
      status = 'draft',
      updated_at = NOW();

  -- Programme D: Modern Data & Analytics Engineering
  INSERT INTO programmes (
    id,
    slug,
    title,
    subtitle,
    description,
    short_description,
    status,
    category,
    duration_months,
    workload_hours_per_week,
    level,
    language,
    is_downloadable_content_available,
    has_hardware_included,
    meta_title,
    meta_description,
    created_by
  ) VALUES (
    v_prog_d_id,
    'programme-d-data-analytics-engineering',
    'Programme D: Modern Data & Analytics Engineering',
    'Transform complex raw datasets into executive insights using dbt, SQL, and lakehouses.',
    'Foundation in analytics engineering and modern data stacks. Covers analytical SQL modeling, data pipeline orchestration, dbt transformations, dimensional warehousing, and interactive data visualization.',
    'Analytics engineering, dbt modeling, and modern data warehouse architectures.',
    'draft',
    'Data Engineering',
    4,
    10.0,
    'foundation',
    'en',
    TRUE,
    FALSE,
    'Programme D: Modern Data & Analytics Engineering | TalentXcel.net',
    'Learn modern analytical SQL, dbt modeling, and business intelligence pipelines.',
    v_admin_id
  )
  ON CONFLICT (slug) DO UPDATE
  SET title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      description = EXCLUDED.description,
      short_description = EXCLUDED.short_description,
      status = 'draft',
      updated_at = NOW();

  -- --------------------------------------------------------------------------
  -- 3. DEV PRICING SAMPLES FOR INITIAL PROGRAMMES
  -- --------------------------------------------------------------------------
  INSERT INTO programme_prices (
    programme_id,
    currency,
    base_price,
    upfront_amount,
    monthly_amount,
    instalment_months,
    tax_rate_percentage,
    is_active,
    created_by
  ) VALUES
  (v_prog_a_id, 'INR', 75000.00, 70000.00, 13000.00, 6, 18.00, TRUE, v_admin_id),
  (v_prog_b_id, 'INR', 85000.00, 80000.00, 22000.00, 4, 18.00, TRUE, v_admin_id),
  (v_prog_c_id, 'INR', 65000.00, 60000.00, 13500.00, 5, 18.00, TRUE, v_admin_id),
  (v_prog_d_id, 'INR', 55000.00, 50000.00, 14000.00, 4, 18.00, TRUE, v_admin_id)
  ON CONFLICT DO NOTHING;

END;
$$;
