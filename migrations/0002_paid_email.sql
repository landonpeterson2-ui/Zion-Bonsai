-- When the "you're confirmed" email went out (after the booking was marked Paid in Grist).
ALTER TABLE signups ADD COLUMN paid_email_at TEXT;
