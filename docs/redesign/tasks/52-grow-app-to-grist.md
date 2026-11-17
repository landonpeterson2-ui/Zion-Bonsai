# 52 — Grow app → Grist: claimed trees, return invitations, app sign-ups

One-way feed from the companion app (grow.zionbonsai.com, Supabase) into Grist, pulled by n8n on the NUC. Grist stays private; nothing on the NUC is exposed. After 50 (same n8n; don't run in parallel with it).

## Context
- App repo: `~/Zion-Bonsai-Companion` (its own CLAUDE.md, `docs/decisions.md` D20 tags, D34 return invitation, D37 newsletter; migrations in `supabase/migrations/`). Workshop-claimed trees have `trees.workshop_date` and `trees.workshop_label`; return invitations are `notification_log` rows with `kind = 'return_invite'` and `ref_id` = tree id; users are `profiles` (email, display_name, newsletter_opt_in).
- This repo: read `docs/grist-sync.md`, and task files 46, 49, 50 for n8n/Grist patterns, backups and safety rules. Grist key: `GRIST_API_KEY` in this repo's `.env.local`.
- **Least privilege:** n8n must not hold the Supabase service-role key. Expose only this feed.

## Do
1. **Supabase (app repo).** New migration `supabase/migrations/<timestamp>_grist_feed.sql`:
   - `public.grist_feed(p_secret text, p_since timestamptz)` — `security definer`, `set search_path = ''`, stable. Raises unless `p_secret` equals the Vault secret named `grist_feed_secret`. Returns one JSON object: `trees` (id, owner email, owner display name, name, workshop_date, workshop_label, created_at; only trees with `workshop_date` not null and not archived, created or claimed since `p_since`), `return_invites` (tree id, sent_at, since `p_since`), `users` (email, display_name, created_at since `p_since`). Nothing else (no photos, notes, stories, locations).
   - `revoke all ... from public, authenticated`; `grant execute ... to anon` (the secret is the gate). Follow the app's existing definer-function conventions (see `20261028000200_grants_definers_email_sync.sql`).
   - Create the Vault secret with a random 32-byte value (generate it locally, never print it; pass it via the Supabase CLI/SQL without echoing). Store the same value in the n8n credential in step 3. Note in the migration header how to rotate it (like `supabase/cron/jobs.sql`).
   - `npx supabase db push --dry-run` first, then push (additive only). Follow the app repo's CLAUDE.md for how migrations are applied; tick nothing in its STATUS but add a line under "Found while working" or equivalent noting the feed. Commit in the app repo per its rules (one small commit, its co-author trailer convention).
2. **Grist schema** (live doc, same care as tasks 45/48: backup to `~/zion-bonsai-backups/`, rehearse on a copy named `ZB-52-throwaway`, untie colId before labelling, add formula columns to the calculated-column access rule if any):
   - `Trees.App_Tree_Id` (Text, label "App tree id", description "Set by the Grow app sync. Leave it alone.").
   - `Contacts.In_App` (Bool, label "In the Grow app", description "Ticked by the sync when this person has an app account.").
3. **n8n workflow "Zion Bonsai: Grow app to Grist"** — every 15 minutes. Anon key + `grist_feed_secret` in an n8n credential (not in node parameters). Keep `p_since` in static data (start from 2026-10-01 on first run so existing claims come in once).
   - **Users:** match Contacts by email (case-insensitive). Tick In_App on matches. Unknown emails: add a Contact (First_Name from display_name's first word if any, Email, Contact_Type `Attendee` only if they have a workshop tree, Lead_Source `Other`, In_App ticked). Never touch Email_OK (the app manages its own newsletter in Brevo).
   - **Trees:** skip if a Trees row has that App_Tree_Id. Otherwise add: Owner = contact by email (create as above if missing), Workshop = the Grist workshop on that date (if exactly one; else blank and mention it in the Notes), Species = the app tree's name, App_Tree_Id. Date_Potted fills from the workshop by itself.
   - **Return invites:** set the matching tree's Return_Status to `Invited` if it is `Not yet due` or blank. Never move it backwards.
   - Error output → "Zion Bonsai: error alert". No emails otherwise.
   - Test against the Grist copy with the real feed (read-only), then point at the real doc and activate. Delete the copy.
4. **Docs.** A "Grow app → Grist" section in `docs/grist-sync.md` (what flows, how often, where the secret lives, how to rotate it, how to pause). A line in `docs/grist-workspace.md` telling Cass that trees claimed in the app appear by themselves. Don't commit in this repo.

## Don't
- No service-role key in n8n or this repo. No writes to Supabase except the migration and the Vault secret. Never print keys, secrets, emails or names. Don't send any emails.

## Done when
- Migration applied; calling `grist_feed` with a wrong secret fails; with the right one returns the expected shape (report counts only).
- On the copy: trees, invites and users landed correctly; a second run added nothing.
- Workflow active on the real doc; backups and copy cleanup reported; app-repo commit hash reported.
