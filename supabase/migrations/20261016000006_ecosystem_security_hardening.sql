-- Migration 20261016000006: Ecosystem Security Hardening
-- Hardens RLS policies, removes permissive anonymous referral inserts, restricts knowledge reads, and adds database payload constraints

-- 1. Revoke unrestricted public insert on ecosystem_referrals
DROP POLICY IF EXISTS "eco_referrals: public insert" ON ecosystem_referrals;

-- Allow only server-side service role and authorized admins to record referrals
CREATE POLICY "eco_referrals: service_role insert only" ON ecosystem_referrals
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "eco_referrals: admin insert" ON ecosystem_referrals
  FOR INSERT TO authenticated WITH CHECK (is_admin_or_above(auth.uid()));

-- 2. Restrict domain and knowledge public reads to active, non-archived items
DROP POLICY IF EXISTS "eco_domains: public read" ON ecosystem_domains;
CREATE POLICY "eco_domains: public read" ON ecosystem_domains
  FOR SELECT USING (health_status != 'archived' AND health_status != 'deprecated');

DROP POLICY IF EXISTS "eco_knowledge: public read" ON ecosystem_knowledge_index;
CREATE POLICY "eco_knowledge: public read" ON ecosystem_knowledge_index
  FOR SELECT USING (access_classification = 'public' AND is_indexed = true);

-- 3. Strict admin-only access on ecosystem_campaigns (prevent marketing leak)
DROP POLICY IF EXISTS "eco_campaigns: admin manage" ON ecosystem_campaigns;
CREATE POLICY "eco_campaigns: admin manage" ON ecosystem_campaigns
  FOR ALL USING (is_admin_or_above(auth.uid()));

-- 4. Add database level payload check constraints
ALTER TABLE ecosystem_referrals
  ADD CONSTRAINT chk_eco_referrals_source_len CHECK (length(source_brand) <= 64),
  ADD CONSTRAINT chk_eco_referrals_dest_len CHECK (length(destination_brand) <= 256),
  ADD CONSTRAINT chk_eco_referrals_intent CHECK (user_intent IN (
    'career_pathway',
    'resume_analysis',
    'academy_enrolment',
    'chatr_community',
    'nuty_commerce_sandbox'
  )),
  ADD CONSTRAINT chk_eco_referrals_status CHECK (conversion_status IN (
    'click_recorded',
    'converted',
    'bounced',
    'invalid_signature'
  ));
