-- Migration: Ecosystem Growth OS and Multi-Domain Intelligence
-- Tables: ecosystem_brands, ecosystem_domains, ecosystem_knowledge_index, ecosystem_referrals, ecosystem_campaigns

CREATE TABLE IF NOT EXISTS ecosystem_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  primary_domain TEXT NOT NULL,
  accent_color TEXT DEFAULT '#0080FF',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ecosystem_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES ecosystem_brands(id) ON DELETE CASCADE,
  hostname TEXT UNIQUE NOT NULL,
  canonical_hostname TEXT NOT NULL,
  purpose TEXT NOT NULL,
  audience_segments TEXT[] DEFAULT '{}',
  public_entry_url TEXT NOT NULL,
  health_status TEXT DEFAULT 'pending_verification',
  integration_status TEXT DEFAULT 'safe_deep_link',
  technical_owner TEXT NOT NULL,
  is_parked_or_redirect BOOLEAN DEFAULT FALSE,
  approved_cross_domain_links TEXT[] DEFAULT '{}',
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ecosystem_knowledge_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES ecosystem_brands(id) ON DELETE CASCADE,
  hostname TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  access_classification TEXT DEFAULT 'public',
  tags TEXT[] DEFAULT '{}',
  version_hash TEXT,
  is_indexed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ecosystem_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_brand TEXT NOT NULL,
  destination_brand TEXT NOT NULL,
  source_url TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  user_intent TEXT,
  campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  conversion_status TEXT DEFAULT 'click_recorded',
  converted_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ecosystem_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES ecosystem_brands(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  target_audience TEXT,
  channel TEXT NOT NULL,
  budget_cents BIGINT DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'draft',
  kpi_targets JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_eco_domains_host ON ecosystem_domains(hostname);
CREATE INDEX IF NOT EXISTS idx_eco_domains_brand ON ecosystem_domains(brand_id);
CREATE INDEX IF NOT EXISTS idx_eco_referrals_source ON ecosystem_referrals(source_brand);
CREATE INDEX IF NOT EXISTS idx_eco_referrals_dest ON ecosystem_referrals(destination_brand);
CREATE INDEX IF NOT EXISTS idx_eco_knowledge_brand ON ecosystem_knowledge_index(brand_id);

-- Row Level Security
ALTER TABLE ecosystem_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_knowledge_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_campaigns ENABLE ROW LEVEL SECURITY;

-- Public read policies for active domains and knowledge
CREATE POLICY "eco_brands: public read" ON ecosystem_brands FOR SELECT USING (true);
CREATE POLICY "eco_domains: public read" ON ecosystem_domains FOR SELECT USING (true);
CREATE POLICY "eco_knowledge: public read" ON ecosystem_knowledge_index FOR SELECT USING (access_classification = 'public');

-- Public insert policy for referral click tracking
CREATE POLICY "eco_referrals: public insert" ON ecosystem_referrals
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admin manage policies
CREATE POLICY "eco_brands: admin manage" ON ecosystem_brands FOR ALL
  USING (is_admin_or_above(auth.uid()));

CREATE POLICY "eco_domains: admin manage" ON ecosystem_domains FOR ALL
  USING (is_admin_or_above(auth.uid()));

CREATE POLICY "eco_knowledge: admin manage" ON ecosystem_knowledge_index FOR ALL
  USING (is_admin_or_above(auth.uid()));

CREATE POLICY "eco_referrals: admin read" ON ecosystem_referrals FOR SELECT
  USING (is_admin_or_above(auth.uid()));

CREATE POLICY "eco_campaigns: admin manage" ON ecosystem_campaigns FOR ALL
  USING (is_admin_or_above(auth.uid()));
