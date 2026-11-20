-- ============================================================================
-- Migration: 0011_commerce_rls_policies.sql
-- Description: Enable server-side insert & update for commercial orders & learner entitlements
-- Safe & Idempotent: Drops old policies before recreating.
-- ============================================================================

-- 1. Policies for commercial_orders
DROP POLICY IF EXISTS "Enable insert for commercial orders" ON public.commercial_orders;
CREATE POLICY "Enable insert for commercial orders" ON public.commercial_orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for commercial orders" ON public.commercial_orders;
CREATE POLICY "Enable update for commercial orders" ON public.commercial_orders
  FOR UPDATE USING (true) WITH CHECK (true);

-- 2. Policies for learner_entitlements
DROP POLICY IF EXISTS "Enable insert for learner entitlements" ON public.learner_entitlements;
CREATE POLICY "Enable insert for learner entitlements" ON public.learner_entitlements
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for learner entitlements" ON public.learner_entitlements;
CREATE POLICY "Enable update for learner entitlements" ON public.learner_entitlements
  FOR UPDATE USING (true) WITH CHECK (true);
