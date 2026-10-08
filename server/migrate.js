// Creates / updates the database schema. Safe to run repeatedly.
//   npm run db:migrate
const { getPool, assertConfigured } = require('./db');

const SQL = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL,
  name          text NOT NULL,
  role          text NOT NULL CHECK (role IN ('ADMIN','COUNSELOR')),
  password_hash text NOT NULL,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email));

CREATE TABLE IF NOT EXISTS sessions (
  token_hash text PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions (user_id);
CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions (expires_at);

ALTER TABLE sessions ADD COLUMN IF NOT EXISTS last_used_at timestamptz;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS revoked_at timestamptz;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user_agent text;
CREATE INDEX IF NOT EXISTS sessions_revoked_idx ON sessions(revoked_at) WHERE revoked_at IS NULL;

CREATE SEQUENCE IF NOT EXISTS enquiry_lead_seq START 1;

CREATE TABLE IF NOT EXISTS student_enquiries (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_number              text NOT NULL UNIQUE
                           DEFAULT ('ENQ-' || lpad(nextval('enquiry_lead_seq')::text, 6, '0')),
  full_name                text NOT NULL,
  phone                    text NOT NULL,
  email                    text,
  preferred_country        text NOT NULL,
  preferred_intake         text NOT NULL,
  education_level          text NOT NULL,
  academic_result_type     text NOT NULL,
  academic_result          text,
  english_test             text NOT NULL,
  english_score            text,
  study_level              text NOT NULL,
  preferred_course         text,
  budget_range             text NOT NULL,
  preferred_contact_method text NOT NULL,
  preferred_contact_time   text NOT NULL,
  message                  text,
  source_page              text,
  referrer                 text,
  utm_source               text,
  utm_medium               text,
  utm_campaign             text,
  utm_content              text,
  utm_term                 text,
  status                   text NOT NULL DEFAULT 'NEW',
  priority                 text NOT NULL DEFAULT 'NORMAL'
                           CHECK (priority IN ('LOW','NORMAL','HIGH','URGENT')),
  assigned_to              uuid REFERENCES users(id) ON DELETE SET NULL,
  next_follow_up_at        timestamptz,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enq_created_idx   ON student_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enq_status_idx    ON student_enquiries (status);
CREATE INDEX IF NOT EXISTS enq_assigned_idx  ON student_enquiries (assigned_to);
CREATE INDEX IF NOT EXISTS enq_followup_idx  ON student_enquiries (next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS enq_phone_idx     ON student_enquiries (phone, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_enquiries_priority ON student_enquiries(priority);
CREATE INDEX IF NOT EXISTS idx_enquiries_country ON student_enquiries(preferred_country);

-- Enforce the 13 canonical status values from STATUSES in constants.js.
-- Use a DO block so ALTER TABLE ... ADD CONSTRAINT IF NOT EXISTS is not available in all Postgres versions.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'student_enquiries_status_check') THEN
    ALTER TABLE student_enquiries
      ADD CONSTRAINT student_enquiries_status_check
      CHECK (status IN ('NEW','CONTACTED','COUNSELING_SCHEDULED','COUNSELING_COMPLETED','DOCUMENTS_PENDING','APPLICATION_STARTED','OFFER_RECEIVED','VISA_PROCESSING','VISA_GRANTED','ENROLLED','LOST','NOT_INTERESTED','INVALID','DUPLICATE'));
  END IF;
END $$;

-- Legacy 'stage' column was an earlier duplicate of 'status' — backfill then drop to avoid two-source-of-truth.
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'student_enquiries' AND column_name = 'stage') THEN
    UPDATE student_enquiries SET status = stage
      WHERE status = 'NEW' AND stage IS NOT NULL AND stage <> 'NEW'
        AND EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'student_enquiries_status_check');
  END IF;
END $$;
ALTER TABLE IF EXISTS student_enquiries DROP COLUMN IF EXISTS stage;

ALTER TABLE student_enquiries ADD COLUMN IF NOT EXISTS fingerprint text;
CREATE UNIQUE INDEX IF NOT EXISTS enquiries_fingerprint_idx ON student_enquiries(fingerprint) WHERE fingerprint IS NOT NULL;

-- updated_at trigger so updates actually update themselves on every row UPDATE.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_student_enquiries_updated_at ON student_enquiries;
CREATE TRIGGER trg_student_enquiries_updated_at
  BEFORE UPDATE ON student_enquiries
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS enquiry_notes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id  uuid NOT NULL REFERENCES student_enquiries(id) ON DELETE CASCADE,
  author_id   uuid REFERENCES users(id) ON DELETE SET NULL,
  author_name text NOT NULL,
  body        text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notes_enquiry_idx ON enquiry_notes (enquiry_id, created_at DESC);

CREATE TABLE IF NOT EXISTS enquiry_events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid NOT NULL REFERENCES student_enquiries(id) ON DELETE CASCADE,
  type       text NOT NULL,
  actor_id   uuid REFERENCES users(id) ON DELETE SET NULL,
  actor_name text,
  detail     jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS events_enquiry_idx ON enquiry_events (enquiry_id, created_at DESC);
`;

(async () => {
  try {
    assertConfigured();
    const pool = getPool();
    await pool.query(SQL);
    const { rows } = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1"
    );
    console.log('✔ Migration complete. Tables:', rows.map((r) => r.table_name).join(', '));
    console.log('Next: npm run admin:create -- --email you@example.com --name "Your Name" --role ADMIN');
    await pool.end();
  } catch (err) {
    console.error('✖ Migration failed:', err.message);
    process.exit(1);
  }
})();
