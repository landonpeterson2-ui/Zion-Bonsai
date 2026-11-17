# 46 — n8n: instant alerts and a Monday digest

Email Landon and Cass when something needs them, and once a week with what's coming up. Built in the n8n on the NUC. Parallel with 45 and 47.

## Context
- `ssh nuc` works. n8n runs in the `n8n` container (`GENERIC_TIMEZONE=America/Denver`). Existing workflows: "Zion Bonsai: Grist sync", "Zion Bonsai: registration form to Grist", "Zion Bonsai: error alert", "Zion Bonsai: weekly backup". Read `docs/grist-sync.md` first.
- Use the n8n CLI inside the container: `n8n export:workflow --all --output=...`, `n8n import:workflow --input=...`, `n8n update:workflow --id=... --active=true`. Imports and activation changes take effect after `docker restart n8n` (a few seconds of downtime is fine; the registration workflow is every 15 min and catches up).
- Reuse what's there: the email-sending node + credential in "error alert" (copy its node type, credential id and From), and however "registration form to Grist" reaches Grist (credential/URL/header). Don't create new credentials unless unavoidable.
- **Recipients:** Landon and Cass. Landon's address is the one the error alert already sends to. If Cass's address isn't already present somewhere in n8n, use Landon's only and put `TODO: add Cass` in the node's notes, and say so in your report. Never write either address into the repo, your report, or logs.

## Before anything
Export all workflows to `~/n8n-backups/before-46-<date>/` on the NUC. Report the path.

## Do
1. **New registration → email.** In "registration form to Grist", after a Registration row is successfully added, send one email per new registration. Subject: `New registration: <first name> for <workshop title> (<Mon D>)`. Body (plain, short): first name, seats, Pending or Waitlist, guest name if any, notes if any, seats left after this one, and a link to the Grist doc. No email address or phone in the body.
2. **New workflow "Zion Bonsai: heads-up alerts"** — Schedule trigger every 15 minutes. Reads Grist and emails when, for the first time:
   - a workshop that is On sale / Sold out / Waitlist reaches `Seats_Left <= 0` → `Sold out: <title> (<date>)`. If its Status is still "On sale", say "Change its Status to Sold out or Waitlist in Grist."
   - a Feedback row has `Rating <= 3` → `Feedback needs a look: <rating>/5 from <workshop title>` with the comment.
   Remember what was already sent in the workflow's static data (`$getWorkflowStaticData('global')`, keyed by table + row id), so each thing alerts once. Seed it on the first run with everything already true today, so turning it on doesn't send a backlog. No Grist schema changes.
3. **New workflow "Zion Bonsai: Monday digest"** — Schedule trigger Monday 7:00 AM America/Denver (set the workflow's timezone explicitly). One email, subject `This week at Zion Bonsai (<Mon D>)`, sections in this order, each omitted when empty:
   - Workshops in the next 14 days: title, date, seats left.
   - Tasks: not Done with Due within 7 days or overdue, grouped by Owner (Both counts for both), overdue marked.
   - Trees to invite back: Shaping_Due within 14 days and Return_Status "Not yet due" or "Invited" (owner first name, species).
   - Reorder: Inventory with Needs_Reorder (item, on hand, lead time days).
   - Agreements: Heads_Up not empty, or 0 ≤ Days_Left ≤ 30.
   - Registrations to fix: Check not empty (workshop, first name, the Check text).
   - Last site sync: newest Site_Sync row's Result if it isn't "Published".
   If every section is empty, send one line: "Nothing needs you this week. Come grow with us." Simple HTML, readable on a phone, no images.
4. Wire both new workflows' error handling to "Zion Bonsai: error alert", like the existing ones.
5. **Test without bothering Cass:** run each with a manual/test execution where the To is Landon only (temporarily), check the emails arrive and read well, then set the real recipients and activate. Don't run the registration workflow against real form rows to test; test its new email step with pinned sample data.
6. **Docs.** Add a section "Alerts and the Monday digest" to the end of `docs/grist-sync.md`: what each sends, when, to whom (by name, not address), how the once-only memory works, and how to pause one (deactivate in n8n). Don't commit; say it's uncommitted.

## Don't
- Don't change the Grist sync, weekly backup or error alert workflows (except reading them).
- Don't change Grist data or schema, and don't add Grist webhooks.
- Don't send test emails to Cass.

## Done when
- Backup exists. Both new workflows are active; the registration workflow is still active and its last scheduled run after your change succeeded.
- One test digest and one test of each alert reached Landon (say which you saw succeed in n8n's execution list).
- The docs section is written.
