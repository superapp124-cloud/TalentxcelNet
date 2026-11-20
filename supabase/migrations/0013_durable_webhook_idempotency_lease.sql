-- Migration 0013: Durable Webhook Idempotency Leasing & State Machine
-- Guarantees atomic, exclusive event claims, concurrent worker safety, replay protection,
-- and atomic payment-captured transactional writes.

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'processed', 'failed')),
  lease_owner TEXT NOT NULL,
  lease_expires_at TIMESTAMPTZ NOT NULL,
  processed_at TIMESTAMPTZ,
  error TEXT,
  retry_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_payment_webhook_events_provider_event UNIQUE (provider, event_id)
);

CREATE INDEX IF NOT EXISTS idx_payment_webhook_events_lookup
  ON payment_webhook_events(provider, event_id, status);

CREATE INDEX IF NOT EXISTS idx_payment_webhook_events_lease
  ON payment_webhook_events(status, lease_expires_at);

-- RLS: Enabled for strict security, restricted exclusively to service_role (no public access)
ALTER TABLE payment_webhook_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "webhooks_service_access" ON payment_webhook_events;
DROP POLICY IF EXISTS "webhooks_service_role" ON payment_webhook_events;
CREATE POLICY "webhooks_service_role" ON payment_webhook_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- RPC 1: Atomically acquire an exclusive processing lease
CREATE OR REPLACE FUNCTION acquire_webhook_processing_lease(
  p_provider TEXT,
  p_event_id TEXT,
  p_event_type TEXT,
  p_payload JSONB,
  p_worker_id TEXT,
  p_lease_seconds INT DEFAULT 60
)
RETURNS TABLE (
  outcome TEXT,
  claim_id UUID,
  current_status TEXT,
  lease_owner TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  v_lease_expiry TIMESTAMPTZ := v_now + (p_lease_seconds || ' seconds')::INTERVAL;
  v_rec payment_webhook_events%ROWTYPE;
BEGIN
  -- 1. Attempt initial insert
  INSERT INTO payment_webhook_events (
    provider,
    event_id,
    event_type,
    payload,
    status,
    lease_owner,
    lease_expires_at,
    retry_count,
    created_at,
    updated_at
  )
  VALUES (
    p_provider,
    p_event_id,
    p_event_type,
    COALESCE(p_payload, '{}'::jsonb),
    'processing',
    p_worker_id,
    v_lease_expiry,
    0,
    v_now,
    v_now
  )
  ON CONFLICT (provider, event_id) DO NOTHING
  RETURNING * INTO v_rec;

  IF FOUND THEN
    RETURN QUERY SELECT 'acquired'::TEXT, v_rec.id, 'processing'::TEXT, p_worker_id;
    RETURN;
  END IF;

  -- 2. If row exists, lock row exclusively for state evaluation
  SELECT * INTO v_rec
  FROM payment_webhook_events
  WHERE provider = p_provider AND event_id = p_event_id
  FOR UPDATE;

  -- Case A: Already processed
  IF v_rec.status = 'processed' THEN
    RETURN QUERY SELECT 'already_processed'::TEXT, v_rec.id, 'processed'::TEXT, v_rec.lease_owner;
    RETURN;
  END IF;

  -- Case B: Processing by active worker whose lease has NOT expired
  IF v_rec.status = 'processing' AND v_rec.lease_expires_at > v_now THEN
    RETURN QUERY SELECT 'busy'::TEXT, v_rec.id, 'processing'::TEXT, v_rec.lease_owner;
    RETURN;
  END IF;

  -- Case C: Failed or lease expired (stale worker) -> acquire exclusive lease for retry
  UPDATE payment_webhook_events
  SET
    status = 'processing',
    lease_owner = p_worker_id,
    lease_expires_at = v_lease_expiry,
    retry_count = v_rec.retry_count + 1,
    updated_at = v_now
  WHERE id = v_rec.id
  RETURNING * INTO v_rec;

  RETURN QUERY SELECT 'acquired'::TEXT, v_rec.id, 'processing'::TEXT, p_worker_id;
  RETURN;
END;
$$;

-- RPC 2: Complete processing and mark processed
CREATE OR REPLACE FUNCTION complete_webhook_processing(
  p_provider TEXT,
  p_event_id TEXT,
  p_worker_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_updated INT;
BEGIN
  UPDATE payment_webhook_events
  SET
    status = 'processed',
    processed_at = NOW(),
    error = NULL,
    updated_at = NOW()
  WHERE provider = p_provider
    AND event_id = p_event_id
    AND lease_owner = p_worker_id
    AND status = 'processing';

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;

-- RPC 3: Record failure and release lease for retry
CREATE OR REPLACE FUNCTION fail_webhook_processing(
  p_provider TEXT,
  p_event_id TEXT,
  p_worker_id TEXT,
  p_error TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_updated INT;
BEGIN
  UPDATE payment_webhook_events
  SET
    status = 'failed',
    error = p_error,
    updated_at = NOW()
  WHERE provider = p_provider
    AND event_id = p_event_id
    AND lease_owner = p_worker_id;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;

-- RPC 4: Transactionally atomic payment captured execution
-- Combines order status update, idempotent payment transaction insert, and enrolment upsert
CREATE OR REPLACE FUNCTION apply_payment_captured_transaction(
  p_order_number TEXT,
  p_payment_id TEXT,
  p_user_id TEXT,
  p_programme_slug TEXT,
  p_amount_cents INT,
  p_event_name TEXT DEFAULT 'payment.captured'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_programme_id UUID;
  v_now TIMESTAMPTZ := NOW();
BEGIN
  -- 1. Update order status to paid (if order_number provided)
  IF p_order_number IS NOT NULL AND p_order_number <> '' THEN
    UPDATE orders
    SET status = 'paid', updated_at = v_now
    WHERE order_number = p_order_number;
  END IF;

  -- 2. Insert payment transaction with transaction_reference idempotency
  INSERT INTO payment_transactions (
    amount_cents,
    status,
    provider,
    transaction_reference,
    metadata,
    created_at
  )
  VALUES (
    p_amount_cents,
    'succeeded',
    'razorpay',
    p_payment_id,
    jsonb_build_object(
      'orderNumber', p_order_number,
      'userId', p_user_id,
      'programmeSlug', p_programme_slug,
      'event', p_event_name
    ),
    v_now
  )
  ON CONFLICT (transaction_reference) DO NOTHING;

  -- 3. Upsert learning enrolment (if user and programme provided)
  IF p_user_id IS NOT NULL AND p_user_id <> '' AND p_programme_slug IS NOT NULL AND p_programme_slug <> '' THEN
    SELECT id INTO v_programme_id
    FROM programmes
    WHERE slug = p_programme_slug
    LIMIT 1;

    IF v_programme_id IS NULL THEN
      v_programme_id := '00000000-0000-0000-0000-000000000001'::UUID;
    END IF;

    INSERT INTO learning_enrolments (
      learner_id,
      programme_id,
      status,
      progress_percentage,
      created_at,
      updated_at
    )
    VALUES (
      p_user_id,
      v_programme_id,
      'active',
      0,
      v_now,
      v_now
    )
    ON CONFLICT (learner_id, programme_id)
    DO UPDATE SET
      status = 'active',
      updated_at = v_now;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'order_number', p_order_number,
    'payment_id', p_payment_id
  );
END;
$$;

-- Security Hardening: Revoke public execution on all SECURITY DEFINER RPCs and grant to service_role
REVOKE ALL ON FUNCTION acquire_webhook_processing_lease(TEXT, TEXT, TEXT, JSONB, TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION acquire_webhook_processing_lease(TEXT, TEXT, TEXT, JSONB, TEXT, INT) TO service_role;

REVOKE ALL ON FUNCTION complete_webhook_processing(TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION complete_webhook_processing(TEXT, TEXT, TEXT) TO service_role;

REVOKE ALL ON FUNCTION fail_webhook_processing(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION fail_webhook_processing(TEXT, TEXT, TEXT, TEXT) TO service_role;

REVOKE ALL ON FUNCTION apply_payment_captured_transaction(TEXT, TEXT, TEXT, TEXT, INT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION apply_payment_captured_transaction(TEXT, TEXT, TEXT, TEXT, INT, TEXT) TO service_role;
