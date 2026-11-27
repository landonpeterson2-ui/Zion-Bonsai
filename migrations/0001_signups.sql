-- Website sign-ups (task 61). n8n pulls rows with picked_up_at null, then acks them.
CREATE TABLE signups (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  workshop_id TEXT NOT NULL,
  workshop_date TEXT NOT NULL,
  seats INTEGER NOT NULL CHECK (seats IN (1, 2)),
  waitlist INTEGER NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guest TEXT,
  notes TEXT,
  heard TEXT,
  gift_card INTEGER NOT NULL DEFAULT 0,
  email_opt_in INTEGER NOT NULL DEFAULT 0,
  text_opt_in INTEGER NOT NULL DEFAULT 0,
  photo_ok INTEGER NOT NULL DEFAULT 0,
  ip_hash TEXT NOT NULL,
  picked_up_at TEXT
);
CREATE INDEX signups_email_workshop ON signups (email, workshop_id);
CREATE INDEX signups_ip_created ON signups (ip_hash, created_at);
CREATE INDEX signups_picked_up ON signups (picked_up_at, created_at);
