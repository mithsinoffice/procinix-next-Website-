-- Homepage Hero Campaign Slider — persistent schema (Postgres / Neon).
-- Applied idempotently by scripts/db/migrate.mjs. Safe to re-run.

CREATE TABLE IF NOT EXISTS hero_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  internal_name TEXT NOT NULL,
  eyebrow TEXT NOT NULL DEFAULT '',
  headline TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  primary_cta_label TEXT,
  primary_cta_href TEXT,
  secondary_cta_label TEXT,
  secondary_cta_href TEXT,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  desktop_media_url TEXT,
  mobile_media_url TEXT,
  poster_media_url TEXT,
  alt_text TEXT NOT NULL DEFAULT '',
  accent TEXT NOT NULL DEFAULT 'teal' CHECK (accent IN ('teal', 'amber', 'purple')),
  overlay_intensity TEXT NOT NULL DEFAULT 'medium' CHECK (overlay_intensity IN ('none', 'light', 'medium', 'strong')),
  badge TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'paused', 'archived')),
  priority INTEGER NOT NULL DEFAULT 0,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  autoplay_eligible BOOLEAN NOT NULL DEFAULT TRUE,
  duration_ms INTEGER NOT NULL DEFAULT 8000,
  analytics_campaign_id TEXT NOT NULL,
  is_evergreen_fallback BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT,
  published_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_hero_campaigns_status ON hero_campaigns (status);
CREATE INDEX IF NOT EXISTS idx_hero_campaigns_priority ON hero_campaigns (priority);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'CONTENT_EDITOR' CHECK (role IN ('ADMIN', 'CONTENT_EDITOR')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  disabled_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS hero_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  pathname TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes INTEGER, -- Vercel Blob's PutBlobResult doesn't report size; left null for now.
  uploaded_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  campaign_id UUID,
  campaign_slug TEXT,
  change_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log (created_at DESC);

-- Login rate limiting. Backed by Postgres (not process memory) because
-- Vercel serverless instances are ephemeral and horizontally distributed —
-- an in-memory counter would not be shared across concurrent/geographically
-- distributed requests. See src/lib/auth/rateLimitDb.ts.
CREATE TABLE IF NOT EXISTS login_rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
