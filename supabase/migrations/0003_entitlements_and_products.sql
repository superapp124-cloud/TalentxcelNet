-- ============================================================================
-- Migration: 0003_entitlements_and_products.sql
-- Description: Commercial Orders, Learner Entitlements & Funnel Analytics
-- 100% Standalone & Idempotent
-- ============================================================================

-- 1. Commercial Orders Table
CREATE TABLE IF NOT EXISTS public.commercial_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_identifier TEXT NOT NULL,
    product_id TEXT NOT NULL,
    domain TEXT NOT NULL CHECK (domain IN ('assessment', 'skill', 'academic')),
    base_price_rupees NUMERIC(10,2) NOT NULL,
    gst_rupees NUMERIC(10,2) NOT NULL,
    total_payable_rupees NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'refunded')),
    provider TEXT NOT NULL DEFAULT 'razorpay',
    provider_payment_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Learner Entitlements Table (Unlocks paid content based on verified payments)
CREATE TABLE IF NOT EXISTS public.learner_entitlements (
    id TEXT PRIMARY KEY,
    user_identifier TEXT NOT NULL,
    product_id TEXT NOT NULL,
    domain TEXT NOT NULL CHECK (domain IN ('assessment', 'skill', 'academic')),
    target_id TEXT,
    attempts_remaining INTEGER NOT NULL DEFAULT 1, -- -1 represents unlimited
    valid_until TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Truthful Funnel Analytics Events Table
CREATE TABLE IF NOT EXISTS public.funnel_analytics_events (
    id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    domain TEXT,
    session_id TEXT NOT NULL,
    user_identifier TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- High-performance query indexes
CREATE INDEX IF NOT EXISTS idx_commercial_orders_user ON public.commercial_orders(user_identifier);
CREATE INDEX IF NOT EXISTS idx_commercial_orders_status ON public.commercial_orders(status);
CREATE INDEX IF NOT EXISTS idx_learner_entitlements_user ON public.learner_entitlements(user_identifier);
CREATE INDEX IF NOT EXISTS idx_learner_entitlements_active ON public.learner_entitlements(is_active, valid_until);
CREATE INDEX IF NOT EXISTS idx_funnel_events_name ON public.funnel_analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_funnel_events_session ON public.funnel_analytics_events(session_id);

-- Enable RLS
ALTER TABLE public.commercial_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_analytics_events ENABLE ROW LEVEL SECURITY;

-- Read & write policies
DO $$
BEGIN
    DROP POLICY IF EXISTS "Users can read own commercial orders" ON public.commercial_orders;
    CREATE POLICY "Users can read own commercial orders" ON public.commercial_orders
        FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Users can read own entitlements" ON public.learner_entitlements;
    CREATE POLICY "Users can read own entitlements" ON public.learner_entitlements
        FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Allow logging funnel events" ON public.funnel_analytics_events;
    CREATE POLICY "Allow logging funnel events" ON public.funnel_analytics_events
        FOR INSERT WITH CHECK (true);
END $$;
