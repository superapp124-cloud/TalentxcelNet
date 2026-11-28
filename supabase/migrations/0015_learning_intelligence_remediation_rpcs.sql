-- ============================================================================
-- Migration: 0015_learning_intelligence_remediation_rpcs.sql
-- Description: Atomic session/attribution ingestion RPC, signed visitor
--              reconciliation RPC, SQL-side admin intelligence aggregation,
--              search_path security hardening, and bounded retention helper.
-- Safe & Idempotent: Additive only (no destructive drops).
-- ============================================================================

-- 1. Harden existing admin helper function search_path (preserves exact role logic)
CREATE OR REPLACE FUNCTION public.is_admin_or_above(uid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = uid
      AND role IN ('academy_admin', 'super_admin')
      AND is_active = TRUE
  );
$$;

-- 2. Add CHECK constraints parity on analytics_events (NOT VALID + safe if already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_analytics_events_device'
  ) THEN
    ALTER TABLE public.analytics_events
      ADD CONSTRAINT chk_analytics_events_device
      CHECK (device_category IN ('desktop', 'mobile', 'tablet', 'bot', 'unknown')) NOT VALID;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_analytics_events_browser'
  ) THEN
    ALTER TABLE public.analytics_events
      ADD CONSTRAINT chk_analytics_events_browser
      CHECK (browser_category IN ('chrome', 'safari', 'firefox', 'edge', 'other')) NOT VALID;
  END IF;
END $$;

-- 3. Atomic Multi-Isolate Event, Session, Attribution & Daily Aggregate Ingestion RPC
CREATE OR REPLACE FUNCTION public.ingest_analytics_batch(p_events JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_item JSONB;
  v_inserted_id TEXT;
  v_accepted INTEGER := 0;
  v_deduplicated INTEGER := 0;
  v_event_name TEXT;
  v_dedupe_key TEXT;
  v_vid TEXT;
  v_sid TEXT;
  v_uid UUID;
  v_ts TIMESTAMPTZ;
  v_path TEXT;
  v_ref TEXT;
  v_utm_src TEXT;
  v_utm_med TEXT;
  v_utm_camp TEXT;
  v_utm_cont TEXT;
  v_utm_term TEXT;
  v_dev TEXT;
  v_brow TEXT;
  v_country TEXT;
  v_region TEXT;
  v_score INTEGER;
  v_pv INTEGER;
  v_channel TEXT;
  v_lt_src TEXT;
  v_lt_med TEXT;
BEGIN
  IF p_events IS NULL OR jsonb_typeof(p_events) <> 'array' THEN
    RETURN jsonb_build_object('accepted', 0, 'deduplicated', 0);
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_events)
  LOOP
    v_event_name := v_item->>'event_name';
    v_dedupe_key := NULLIF(v_item->>'dedupe_key', '');
    v_vid := v_item->>'anonymous_visitor_id';
    v_sid := v_item->>'session_id';
    v_uid := NULLIF(v_item->>'user_id', '')::UUID;
    v_ts := COALESCE((v_item->>'event_timestamp')::TIMESTAMPTZ, NOW());
    v_path := COALESCE(NULLIF(v_item->>'page_path', ''), '/');
    v_ref := NULLIF(v_item->>'referrer_domain', '');
    v_utm_src := NULLIF(v_item->>'utm_source', '');
    v_utm_med := NULLIF(v_item->>'utm_medium', '');
    v_utm_camp := NULLIF(v_item->>'utm_campaign', '');
    v_utm_cont := NULLIF(v_item->>'utm_content', '');
    v_utm_term := NULLIF(v_item->>'utm_term', '');
    v_dev := COALESCE(NULLIF(v_item->>'device_category', ''), 'unknown');
    v_brow := COALESCE(NULLIF(v_item->>'browser_category', ''), 'other');
    v_country := NULLIF(v_item->>'country_code', '');
    v_region := NULLIF(v_item->>'region', '');
    v_score := COALESCE((v_item->>'engagement_score')::INTEGER, 1);
    v_pv := CASE WHEN v_event_name = 'page_view' THEN 1 ELSE 0 END;
    v_channel := COALESCE(NULLIF(v_item->>'channel', ''), 'direct');
    v_lt_src := COALESCE(v_utm_src, v_channel);
    v_lt_med := COALESCE(v_utm_med, CASE WHEN v_ref IS NOT NULL THEN 'referral' ELSE 'none' END);

    v_inserted_id := NULL;
    INSERT INTO public.analytics_events (
      id, event_name, event_version, dedupe_key, anonymous_visitor_id,
      session_id, user_id, event_timestamp, page_path, referrer_domain,
      utm_source, utm_medium, utm_campaign, device_category, browser_category,
      country_code, properties
    )
    VALUES (
      v_item->>'id',
      v_event_name,
      COALESCE((v_item->>'event_version')::INTEGER, 1),
      v_dedupe_key,
      v_vid,
      v_sid,
      v_uid,
      v_ts,
      v_path,
      v_ref,
      v_utm_src,
      v_utm_med,
      v_utm_camp,
      v_dev,
      v_brow,
      v_country,
      COALESCE(v_item->'properties', '{}'::jsonb)
    )
    ON CONFLICT (dedupe_key) DO NOTHING
    RETURNING id INTO v_inserted_id;

    IF v_inserted_id IS NULL THEN
      v_deduplicated := v_deduplicated + 1;
      CONTINUE;
    END IF;

    v_accepted := v_accepted + 1;

    -- Atomic session upsert (never overwrites prior counts across Worker isolates)
    INSERT INTO public.visitor_sessions (
      session_id, anonymous_visitor_id, user_id, landing_path, exit_path,
      referrer_domain, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      device_category, browser_category, country_code, region,
      started_at, last_seen_at, page_views_count, events_count, is_engaged, engagement_score
    )
    VALUES (
      v_sid, v_vid, v_uid, v_path, v_path,
      v_ref, v_utm_src, v_utm_med, v_utm_camp, v_utm_cont, v_utm_term,
      v_dev, v_brow, v_country, v_region,
      v_ts, v_ts, v_pv, 1, (v_score >= 4), v_score
    )
    ON CONFLICT (session_id) DO UPDATE SET
      user_id = COALESCE(visitor_sessions.user_id, EXCLUDED.user_id),
      exit_path = EXCLUDED.exit_path,
      started_at = LEAST(visitor_sessions.started_at, EXCLUDED.started_at),
      last_seen_at = GREATEST(visitor_sessions.last_seen_at, EXCLUDED.last_seen_at),
      page_views_count = visitor_sessions.page_views_count + EXCLUDED.page_views_count,
      events_count = visitor_sessions.events_count + 1,
      engagement_score = visitor_sessions.engagement_score + EXCLUDED.engagement_score,
      is_engaged = visitor_sessions.is_engaged
        OR ((visitor_sessions.page_views_count + EXCLUDED.page_views_count) >= 2)
        OR ((visitor_sessions.engagement_score + EXCLUDED.engagement_score) >= 4);

    -- Atomic attribution upsert (first-touch is immutable once created)
    INSERT INTO public.visitor_attribution (
      anonymous_visitor_id, user_id,
      first_touch_source, first_touch_medium, first_touch_campaign, first_touch_content,
      first_touch_term, first_touch_referrer, first_touch_landing_path,
      last_touch_source, last_touch_medium, last_touch_campaign, last_touch_content,
      last_touch_term, last_touch_referrer, last_touch_landing_path,
      first_seen_at, last_seen_at, reconciled_at
    )
    VALUES (
      v_vid, v_uid,
      v_lt_src, v_lt_med, v_utm_camp, v_utm_cont,
      v_utm_term, v_ref, v_path,
      v_lt_src, v_lt_med, v_utm_camp, v_utm_cont,
      v_utm_term, v_ref, v_path,
      v_ts, v_ts, CASE WHEN v_uid IS NOT NULL THEN NOW() ELSE NULL END
    )
    ON CONFLICT (anonymous_visitor_id) DO UPDATE SET
      user_id = COALESCE(visitor_attribution.user_id, EXCLUDED.user_id),
      last_seen_at = GREATEST(visitor_attribution.last_seen_at, EXCLUDED.last_seen_at),
      reconciled_at = COALESCE(visitor_attribution.reconciled_at, EXCLUDED.reconciled_at),
      last_touch_source = CASE WHEN EXCLUDED.last_touch_source <> 'direct' OR EXCLUDED.last_touch_referrer IS NOT NULL THEN EXCLUDED.last_touch_source ELSE visitor_attribution.last_touch_source END,
      last_touch_medium = CASE WHEN EXCLUDED.last_touch_source <> 'direct' OR EXCLUDED.last_touch_referrer IS NOT NULL THEN EXCLUDED.last_touch_medium ELSE visitor_attribution.last_touch_medium END,
      last_touch_campaign = COALESCE(EXCLUDED.last_touch_campaign, visitor_attribution.last_touch_campaign),
      last_touch_content = COALESCE(EXCLUDED.last_touch_content, visitor_attribution.last_touch_content),
      last_touch_term = COALESCE(EXCLUDED.last_touch_term, visitor_attribution.last_touch_term),
      last_touch_referrer = COALESCE(EXCLUDED.last_touch_referrer, visitor_attribution.last_touch_referrer),
      last_touch_landing_path = CASE WHEN EXCLUDED.last_touch_source <> 'direct' OR EXCLUDED.last_touch_referrer IS NOT NULL THEN EXCLUDED.last_touch_landing_path ELSE visitor_attribution.last_touch_landing_path END;

    -- Incremental daily aggregate rollup (UTC date)
    INSERT INTO public.analytics_daily_aggregates (
      metric_date, dimension_type, dimension_key, page_views_count
    )
    VALUES (
      (v_ts AT TIME ZONE 'UTC')::DATE, 'site', 'all', v_pv
    )
    ON CONFLICT (metric_date, dimension_type, dimension_key) DO UPDATE SET
      page_views_count = analytics_daily_aggregates.page_views_count + EXCLUDED.page_views_count,
      updated_at = NOW();
  END LOOP;

  RETURN jsonb_build_object('accepted', v_accepted, 'deduplicated', v_deduplicated);
END;
$$;

REVOKE ALL ON FUNCTION public.ingest_analytics_batch(JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ingest_analytics_batch(JSONB) TO service_role;

-- 4. Atomic Visitor Reconciliation RPC returning actual database row counts
CREATE OR REPLACE FUNCTION public.reconcile_anonymous_visitor(
  p_anonymous_visitor_id TEXT,
  p_session_id TEXT,
  p_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_reconciled_events INTEGER := 0;
  v_reconciled_sessions INTEGER := 0;
BEGIN
  IF p_anonymous_visitor_id IS NULL OR p_user_id IS NULL THEN
    RETURN jsonb_build_object('reconciledEvents', 0, 'reconciledSessions', 0);
  END IF;

  UPDATE public.visitor_attribution
  SET user_id = p_user_id,
      reconciled_at = COALESCE(reconciled_at, NOW())
  WHERE anonymous_visitor_id = p_anonymous_visitor_id
    AND user_id IS NULL;

  UPDATE public.visitor_sessions
  SET user_id = p_user_id
  WHERE (anonymous_visitor_id = p_anonymous_visitor_id OR (p_session_id IS NOT NULL AND session_id = p_session_id))
    AND user_id IS NULL;
  GET DIAGNOSTICS v_reconciled_sessions = ROW_COUNT;

  UPDATE public.analytics_events
  SET user_id = p_user_id
  WHERE anonymous_visitor_id = p_anonymous_visitor_id
    AND user_id IS NULL;
  GET DIAGNOSTICS v_reconciled_events = ROW_COUNT;

  RETURN jsonb_build_object(
    'reconciledEvents', v_reconciled_events,
    'reconciledSessions', v_reconciled_sessions
  );
END;
$$;

REVOKE ALL ON FUNCTION public.reconcile_anonymous_visitor(TEXT, TEXT, UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_anonymous_visitor(TEXT, TEXT, UUID) TO service_role;

-- 5. Bounded Retention Cleanup Helper (service_role only, non-destructive unless invoked)
CREATE OR REPLACE FUNCTION public.purge_expired_analytics_events(p_retention_days INTEGER DEFAULT 365)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted INTEGER := 0;
BEGIN
  IF p_retention_days < 30 THEN
    RAISE EXCEPTION 'Retention window must be at least 30 days';
  END IF;

  DELETE FROM public.analytics_events
  WHERE event_timestamp < NOW() - make_interval(days => p_retention_days);
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_expired_analytics_events(INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_expired_analytics_events(INTEGER) TO service_role;

-- 6. SQL-Side Admin Intelligence Aggregation RPC (Zero Raw-Row Truncation)
CREATE OR REPLACE FUNCTION public.get_admin_intelligence_summary(
  p_from TIMESTAMPTZ,
  p_to TIMESTAMPTZ,
  p_prev_from TIMESTAMPTZ,
  p_prev_to TIMESTAMPTZ,
  p_user_page INTEGER DEFAULT 1,
  p_user_page_size INTEGER DEFAULT 15,
  p_search TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_page INTEGER := GREATEST(1, COALESCE(p_user_page, 1));
  v_page_size INTEGER := LEAST(50, GREATEST(1, COALESCE(p_user_page_size, 15)));
  v_offset INTEGER := (v_page - 1) * v_page_size;
  v_search TEXT := NULLIF(BTRIM(COALESCE(p_search, '')), '');

  v_unique_visitors INTEGER := 0;
  v_prev_unique_visitors INTEGER := 0;
  v_sessions INTEGER := 0;
  v_prev_sessions INTEGER := 0;
  v_new_visitors INTEGER := 0;
  v_returning_visitors INTEGER := 0;
  v_registrations INTEGER := 0;
  v_prev_registrations INTEGER := 0;
  v_dau INTEGER := 0;
  v_wau INTEGER := 0;
  v_mau INTEGER := 0;
  v_active_learners INTEGER := 0;
  v_paid_learners INTEGER := 0;
  v_prev_paid_learners INTEGER := 0;
  v_new_paid_conversions INTEGER := 0;
  v_revenue NUMERIC(12,2) := 0;
  v_prev_revenue NUMERIC(12,2) := 0;
  v_total_profiles INTEGER := 0;

  v_engaged_visitors INTEGER := 0;
  v_registered_funnel INTEGER := 0;
  v_onboarded_users INTEGER := 0;
  v_active_multi INTEGER := 0;
  v_paid_converted INTEGER := 0;

  v_channels JSONB := '[]'::jsonb;
  v_campaigns JSONB := '[]'::jsonb;
  v_landing_pages JSONB := '[]'::jsonb;
  v_exit_pages JSONB := '[]'::jsonb;
  v_devices JSONB := '[]'::jsonb;
  v_browsers JSONB := '[]'::jsonb;
  v_countries JSONB := '[]'::jsonb;
  v_top_pages JSONB := '[]'::jsonb;
  v_content JSONB := '{}'::jsonb;
  v_free_vs_paid JSONB := '{}'::jsonb;
  v_multi_day_learners INTEGER := 0;
  v_user_total INTEGER := 0;
  v_user_items JSONB := '[]'::jsonb;
BEGIN
  -- Unique visitors (current & previous)
  SELECT COUNT(DISTINCT anonymous_visitor_id)::INTEGER INTO v_unique_visitors
  FROM (
    SELECT anonymous_visitor_id FROM public.analytics_events WHERE event_timestamp BETWEEN p_from AND p_to
    UNION
    SELECT anonymous_visitor_id FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
  ) u;

  SELECT COUNT(DISTINCT anonymous_visitor_id)::INTEGER INTO v_prev_unique_visitors
  FROM (
    SELECT anonymous_visitor_id FROM public.analytics_events WHERE event_timestamp BETWEEN p_prev_from AND p_prev_to
    UNION
    SELECT anonymous_visitor_id FROM public.visitor_sessions WHERE started_at BETWEEN p_prev_from AND p_prev_to
  ) pu;

  -- Sessions
  SELECT COUNT(*)::INTEGER INTO v_sessions
  FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to;

  SELECT COUNT(*)::INTEGER INTO v_prev_sessions
  FROM public.visitor_sessions WHERE started_at BETWEEN p_prev_from AND p_prev_to;

  -- Full-history new vs returning visitors (checks full visitor_sessions history, not just lookback)
  SELECT
    COUNT(*) FILTER (WHERE has_prior)::INTEGER,
    COUNT(*) FILTER (WHERE NOT has_prior)::INTEGER
  INTO v_returning_visitors, v_new_visitors
  FROM (
    SELECT
      cur.anonymous_visitor_id,
      EXISTS (
        SELECT 1 FROM public.visitor_sessions s_prev
        WHERE s_prev.anonymous_visitor_id = cur.anonymous_visitor_id
          AND s_prev.started_at < p_from
      ) AS has_prior
    FROM (
      SELECT DISTINCT anonymous_visitor_id
      FROM public.visitor_sessions
      WHERE started_at BETWEEN p_from AND p_to
    ) cur
  ) vis;

  -- Registrations (profiles created in window, fallback to signup_complete events)
  SELECT COUNT(*)::INTEGER INTO v_registrations
  FROM public.profiles WHERE created_at BETWEEN p_from AND p_to;
  IF v_registrations = 0 THEN
    SELECT COUNT(DISTINCT COALESCE(user_id::TEXT, anonymous_visitor_id))::INTEGER INTO v_registrations
    FROM public.analytics_events
    WHERE event_name = 'signup_complete' AND event_timestamp BETWEEN p_from AND p_to;
  END IF;

  SELECT COUNT(*)::INTEGER INTO v_prev_registrations
  FROM public.profiles WHERE created_at BETWEEN p_prev_from AND p_prev_to;
  IF v_prev_registrations = 0 THEN
    SELECT COUNT(DISTINCT COALESCE(user_id::TEXT, anonymous_visitor_id))::INTEGER INTO v_prev_registrations
    FROM public.analytics_events
    WHERE event_name = 'signup_complete' AND event_timestamp BETWEEN p_prev_from AND p_prev_to;
  END IF;

  SELECT COUNT(*)::INTEGER INTO v_total_profiles FROM public.profiles;

  -- DAU / WAU / MAU anchored at p_to
  SELECT COUNT(DISTINCT user_id)::INTEGER INTO v_dau
  FROM public.analytics_events WHERE user_id IS NOT NULL AND event_timestamp BETWEEN (p_to - INTERVAL '1 day') AND p_to;
  SELECT COUNT(DISTINCT user_id)::INTEGER INTO v_wau
  FROM public.analytics_events WHERE user_id IS NOT NULL AND event_timestamp BETWEEN (p_to - INTERVAL '7 days') AND p_to;
  SELECT COUNT(DISTINCT user_id)::INTEGER INTO v_mau
  FROM public.analytics_events WHERE user_id IS NOT NULL AND event_timestamp BETWEEN (p_to - INTERVAL '30 days') AND p_to;

  -- Active learners (learning events OR assessment_attempts.learner_id OR academic_assessment_attempts.student_id)
  SELECT COUNT(DISTINCT uid)::INTEGER INTO v_active_learners
  FROM (
    SELECT user_id AS uid FROM public.analytics_events
    WHERE user_id IS NOT NULL
      AND event_timestamp BETWEEN p_from AND p_to
      AND event_name IN ('question_attempt','diagnostic_start','diagnostic_complete','lesson_start','lesson_complete','project_lab_start','project_lab_complete','ai_tutor_open')
    UNION
    SELECT learner_id AS uid FROM public.assessment_attempts
    WHERE COALESCE(submitted_at, started_at, created_at) BETWEEN p_from AND p_to
    UNION
    SELECT student_id AS uid FROM public.academic_assessment_attempts
    WHERE completed_at BETWEEN p_from AND p_to
  ) al;

  -- Consistent Paid Learners definition at period end (p_to vs p_prev_to)
  SELECT COUNT(DISTINCT user_identifier)::INTEGER INTO v_paid_learners
  FROM public.learner_entitlements
  WHERE is_active = TRUE
    AND created_at <= p_to
    AND (valid_until IS NULL OR valid_until > p_to);

  SELECT COUNT(DISTINCT user_identifier)::INTEGER INTO v_prev_paid_learners
  FROM public.learner_entitlements
  WHERE is_active = TRUE
    AND created_at <= p_prev_to
    AND (valid_until IS NULL OR valid_until > p_prev_to);

  -- Revenue & new paid conversions in window
  SELECT
    COUNT(*)::INTEGER,
    COALESCE(SUM(ROUND(total_payable_rupees::NUMERIC, 2)), 0)
  INTO v_new_paid_conversions, v_revenue
  FROM public.commercial_orders
  WHERE created_at BETWEEN p_from AND p_to
    AND LOWER(status) IN ('paid','captured','completed','active');

  SELECT COALESCE(SUM(ROUND(total_payable_rupees::NUMERIC, 2)), 0)
  INTO v_prev_revenue
  FROM public.commercial_orders
  WHERE created_at BETWEEN p_prev_from AND p_prev_to
    AND LOWER(status) IN ('paid','captured','completed','active');

  -- Funnel counts
  SELECT COUNT(DISTINCT anonymous_visitor_id)::INTEGER INTO v_engaged_visitors
  FROM public.visitor_sessions
  WHERE started_at BETWEEN p_from AND p_to
    AND (is_engaged = TRUE OR engagement_score >= 3 OR events_count >= 2);

  SELECT GREATEST(v_registrations, COUNT(DISTINCT user_id)::INTEGER) INTO v_registered_funnel
  FROM public.analytics_events
  WHERE user_id IS NOT NULL AND event_timestamp BETWEEN p_from AND p_to;

  SELECT COUNT(DISTINCT user_id)::INTEGER INTO v_onboarded_users
  FROM public.analytics_events
  WHERE user_id IS NOT NULL AND event_timestamp BETWEEN p_from AND p_to
    AND event_name IN ('learning_plan_start', 'diagnostic_start');

  SELECT COUNT(*)::INTEGER INTO v_active_multi
  FROM (
    SELECT user_id
    FROM public.analytics_events
    WHERE user_id IS NOT NULL
      AND event_timestamp BETWEEN p_from AND p_to
      AND event_name IN ('question_attempt','diagnostic_start','diagnostic_complete','lesson_start','lesson_complete','project_lab_start','project_lab_complete','ai_tutor_open')
    GROUP BY user_id
    HAVING COUNT(*) >= 2
  ) m;

  v_paid_converted := GREATEST(v_new_paid_conversions, 0);

  -- Traffic breakdowns
  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_channels
  FROM (
    SELECT
      CASE
        WHEN LOWER(COALESCE(utm_medium, '')) IN ('cpc','ppc','paid') OR LOWER(COALESCE(utm_source, '')) LIKE '%ads%' THEN 'campaign'
        WHEN LOWER(COALESCE(utm_medium, '')) = 'social'
          OR LOWER(COALESCE(utm_source, '')) ~ '(instagram|facebook|linkedin|twitter|x\.com|t\.co|youtube|whatsapp)'
          OR LOWER(COALESCE(referrer_domain, '')) ~ '(instagram\.com|facebook\.com|linkedin\.com|twitter\.com|x\.com|youtube\.com)' THEN 'social'
        WHEN LOWER(COALESCE(utm_medium, '')) = 'organic'
          OR LOWER(COALESCE(utm_source, '')) ~ '(google|bing|duckduckgo|yahoo|yandex)'
          OR LOWER(COALESCE(referrer_domain, '')) ~ '(google\.|bing\.com|duckduckgo\.com|search\.yahoo)' THEN 'search'
        WHEN NULLIF(referrer_domain, '') IS NOT NULL AND LOWER(referrer_domain) NOT LIKE '%talentxcel.net' THEN 'referral'
        ELSE 'direct'
      END AS channel,
      COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions
    WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1
    ORDER BY 2 DESC
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_campaigns
  FROM (
    SELECT
      COALESCE(utm_campaign, '(not set)') AS campaign,
      COALESCE(utm_source, '(direct)') AS source,
      COALESCE(utm_medium, '(none)') AS medium,
      COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions
    WHERE started_at BETWEEN p_from AND p_to
      AND (utm_campaign IS NOT NULL OR utm_source IS NOT NULL)
    GROUP BY 1, 2, 3
    ORDER BY 4 DESC
    LIMIT 10
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_landing_pages
  FROM (
    SELECT landing_path AS path, COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC LIMIT 10
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_exit_pages
  FROM (
    SELECT exit_path AS path, COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC LIMIT 10
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_devices
  FROM (
    SELECT device_category AS device, COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_browsers
  FROM (
    SELECT browser_category AS browser, COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_countries
  FROM (
    SELECT COALESCE(country_code, 'UNKNOWN') AS "countryCode", COUNT(*)::INTEGER AS sessions
    FROM public.visitor_sessions WHERE started_at BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC LIMIT 10
  ) t;

  SELECT COALESCE(jsonb_agg(row_to_json(t)), '[]'::jsonb) INTO v_top_pages
  FROM (
    SELECT page_path AS path, COUNT(*)::INTEGER AS views
    FROM public.analytics_events
    WHERE event_name = 'page_view' AND event_timestamp BETWEEN p_from AND p_to
    GROUP BY 1 ORDER BY 2 DESC LIMIT 10
  ) t;

  SELECT jsonb_build_object(
    'topPages', v_top_pages,
    'diagnosticsStarted', COUNT(*) FILTER (WHERE event_name = 'diagnostic_start')::INTEGER,
    'diagnosticsCompleted', COUNT(*) FILTER (WHERE event_name = 'diagnostic_complete')::INTEGER,
    'lessonsStarted', COUNT(*) FILTER (WHERE event_name = 'lesson_start')::INTEGER,
    'lessonsCompleted', COUNT(*) FILTER (WHERE event_name = 'lesson_complete')::INTEGER,
    'skillLabsStarted', COUNT(*) FILTER (WHERE event_name = 'project_lab_start')::INTEGER,
    'aiTutorOpens', COUNT(*) FILTER (WHERE event_name = 'ai_tutor_open')::INTEGER,
    'aiTutorUsageEvents', (
      COUNT(*) FILTER (WHERE event_name = 'ai_tutor_usage_metadata')::INTEGER +
      COALESCE((SELECT COUNT(*)::INTEGER FROM public.ai_usage_events WHERE created_at BETWEEN p_from AND p_to), 0)
    )
  ) INTO v_content
  FROM public.analytics_events
  WHERE event_timestamp BETWEEN p_from AND p_to;

  -- Multi-day learners
  SELECT COUNT(*)::INTEGER INTO v_multi_day_learners
  FROM (
    SELECT user_id
    FROM public.analytics_events
    WHERE user_id IS NOT NULL AND event_timestamp BETWEEN p_from AND p_to
    GROUP BY user_id
    HAVING COUNT(DISTINCT (event_timestamp AT TIME ZONE 'UTC')::DATE) >= 2
  ) md;

  -- Free vs Paid comparison
  WITH active_paid AS (
    SELECT DISTINCT user_identifier AS uid
    FROM public.learner_entitlements
    WHERE is_active = TRUE AND created_at <= p_to AND (valid_until IS NULL OR valid_until > p_to)
  ),
  ev_counts AS (
    SELECT
      COUNT(*) FILTER (WHERE e.user_id IS NOT NULL AND ap.uid IS NULL)::NUMERIC AS free_ev,
      COUNT(*) FILTER (WHERE e.user_id IS NOT NULL AND ap.uid IS NOT NULL)::NUMERIC AS paid_ev
    FROM public.analytics_events e
    LEFT JOIN active_paid ap ON ap.uid = e.user_id::TEXT
    WHERE e.event_timestamp BETWEEN p_from AND p_to
  ),
  test_counts AS (
    SELECT
      COUNT(*) FILTER (WHERE ap.uid IS NULL)::NUMERIC AS free_tests,
      COUNT(*) FILTER (WHERE ap.uid IS NOT NULL)::NUMERIC AS paid_tests
    FROM (
      SELECT learner_id AS uid, COALESCE(submitted_at, started_at, created_at) AS ts FROM public.assessment_attempts
      UNION ALL
      SELECT student_id AS uid, completed_at AS ts FROM public.academic_assessment_attempts
    ) t
    LEFT JOIN active_paid ap ON ap.uid = t.uid::TEXT
    WHERE t.ts BETWEEN p_from AND p_to
  )
  SELECT jsonb_build_object(
    'freeUsersCount', GREATEST(0, v_total_profiles - v_paid_learners),
    'paidUsersCount', v_paid_learners,
    'freeAvgEventsPerUser', CASE WHEN GREATEST(0, v_total_profiles - v_paid_learners) > 0 THEN ROUND(ev_counts.free_ev / GREATEST(1, v_total_profiles - v_paid_learners), 1) ELSE 0 END,
    'paidAvgEventsPerUser', CASE WHEN v_paid_learners > 0 THEN ROUND(ev_counts.paid_ev / v_paid_learners, 1) ELSE 0 END,
    'freeAvgTestsPerUser', CASE WHEN GREATEST(0, v_total_profiles - v_paid_learners) > 0 THEN ROUND(test_counts.free_tests / GREATEST(1, v_total_profiles - v_paid_learners), 1) ELSE 0 END,
    'paidAvgTestsPerUser', CASE WHEN v_paid_learners > 0 THEN ROUND(test_counts.paid_tests / v_paid_learners, 1) ELSE 0 END
  ) INTO v_free_vs_paid
  FROM ev_counts, test_counts;

  -- Deterministic SQL-paginated User Explorer
  WITH explorer_base AS (
    SELECT
      p.id AS user_id,
      COALESCE(NULLIF(p.display_name, ''), NULLIF(p.full_name, ''), 'Learner ' || LEFT(p.id::TEXT, 8)) AS display_label,
      CASE WHEN EXISTS (
        SELECT 1 FROM public.learner_entitlements le
        WHERE (le.user_identifier = p.id::TEXT OR le.user_identifier = p.email) AND le.is_active = TRUE AND (le.valid_until IS NULL OR le.valid_until > p_to)
      ) THEN 'paid' ELSE 'free' END AS tier,
      COALESCE((
        SELECT ARRAY_AGG(DISTINCT le.domain)
        FROM public.learner_entitlements le
        WHERE (le.user_identifier = p.id::TEXT OR le.user_identifier = p.email) AND le.is_active = TRUE AND (le.valid_until IS NULL OR le.valid_until > p_to)
      ), ARRAY[]::TEXT[]) AS active_domains,
      COALESCE((
        SELECT COUNT(*)::INTEGER FROM public.analytics_events ae WHERE ae.user_id = p.id
      ), 0) AS events_count,
      (
        COALESCE((SELECT COUNT(*)::INTEGER FROM public.assessment_attempts aa WHERE aa.learner_id = p.id), 0) +
        COALESCE((SELECT COUNT(*)::INTEGER FROM public.academic_assessment_attempts aaa WHERE aaa.student_id = p.id), 0)
      ) AS tests_completed,
      (
        SELECT MAX(ae.event_timestamp) FROM public.analytics_events ae WHERE ae.user_id = p.id
      ) AS last_active_at
    FROM public.profiles p
  ),
  filtered AS (
    SELECT * FROM explorer_base
    WHERE v_search IS NULL
       OR user_id::TEXT ILIKE '%' || v_search || '%'
       OR display_label ILIKE '%' || v_search || '%'
       OR tier ILIKE '%' || v_search || '%'
  )
  SELECT
    (SELECT COUNT(*)::INTEGER FROM filtered),
    COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'userId', user_id,
        'displayLabel', display_label,
        'tier', tier,
        'activeDomains', active_domains,
        'eventsCount', events_count,
        'testsCompleted', tests_completed,
        'lastActiveAt', last_active_at
      ))
      FROM (
        SELECT * FROM filtered
        ORDER BY events_count DESC, tests_completed DESC, user_id ASC
        LIMIT v_page_size OFFSET v_offset
      ) paged
    ), '[]'::jsonb)
  INTO v_user_total, v_user_items;

  RETURN jsonb_build_object(
    'kpis', jsonb_build_object(
      'totalVisitors', v_unique_visitors,
      'uniqueVisitors', v_unique_visitors,
      'sessions', v_sessions,
      'newVisitors', v_new_visitors,
      'returningVisitors', v_returning_visitors,
      'registrations', v_registrations,
      'dau', v_dau,
      'wau', v_wau,
      'mau', v_mau,
      'activeLearners', v_active_learners,
      'paidLearners', v_paid_learners,
      'newPaidConversions', v_new_paid_conversions,
      'totalProfiles', v_total_profiles,
      'verifiedRevenueRupees', v_revenue
    ),
    'previousKpis', jsonb_build_object(
      'uniqueVisitors', v_prev_unique_visitors,
      'sessions', v_prev_sessions,
      'registrations', v_prev_registrations,
      'paidLearners', v_prev_paid_learners,
      'verifiedRevenueRupees', v_prev_revenue
    ),
    'funnelCounts', jsonb_build_object(
      'anonymousVisitor', v_unique_visitors,
      'engagedVisitor', v_engaged_visitors,
      'registration', v_registered_funnel,
      'onboardingCompleted', v_onboarded_users,
      'firstLearningActivity', v_active_learners,
      'activeLearner', v_active_multi,
      'paidConversion', v_paid_converted
    ),
    'traffic', jsonb_build_object(
      'channels', v_channels,
      'utmCampaigns', v_campaigns,
      'landingPages', v_landing_pages,
      'exitPages', v_exit_pages,
      'devices', v_devices,
      'browsers', v_browsers,
      'countries', v_countries
    ),
    'content', v_content,
    'freeVsPaid', v_free_vs_paid,
    'multiDayLearnersCount', v_multi_day_learners,
    'userExplorer', jsonb_build_object(
      'page', v_page,
      'pageSize', v_page_size,
      'total', v_user_total,
      'items', v_user_items
    )
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_intelligence_summary(TIMESTAMPTZ, TIMESTAMPTZ, TIMESTAMPTZ, TIMESTAMPTZ, INTEGER, INTEGER, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_intelligence_summary(TIMESTAMPTZ, TIMESTAMPTZ, TIMESTAMPTZ, TIMESTAMPTZ, INTEGER, INTEGER, TEXT) TO service_role;
