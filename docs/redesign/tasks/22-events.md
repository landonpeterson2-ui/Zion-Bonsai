# 22 — Private & Corporate Events page (new)

**Phase:** 4 Pages · **Depends on:** 20

Route `app/events/page.tsx`.

## Sections
1. **Intro** — bring the workshop to your people. Unplugging framed for groups: a team that puts their phones away together and makes something with their hands.
2. **Ways to book us** — each with 2–3 sentences, laid out as alternating text/photo rows or a list, not identical cards:
   - **Corporate wellness & retreats** — mention our first was an HR retreat for Snow College (true, from the handoff). No invented outcomes or quotes.
   - **Private parties** — birthdays, showers, friend groups, date nights.
   - **School programs.**
   - **Private tutoring** — one-on-one or small-group sessions for people who want to go deeper or work on a tree they already own.
   - **Pop-ups & markets** — e.g. Sanpete Harvest Market.
3. **How it works** — inquire → we plan the details together (group size, location — we can come to you or host at Sweet Roots) → workshop day. Don't list prices.
4. **Inquiry form** — fields: name, email, phone (optional), organization (optional), event type (select from the list above), approximate group size, preferred dates, message. **No backend exists**: submit via `mailto:` built from the form (progressive enhancement) OR link to a Google Form if `site.json` gets an `eventsInquiryUrl` — add that optional field to the schema in task 02's loader. Label every field, show errors inline, and confirm what happens next.
5. **Testimonial placeholder** — `[TESTIMONIAL — from an event organizer]`.

## Metadata
Title "Corporate Wellness & Private Bonsai Events | Central Utah"; description mentions team building, retreats, Sanpete County.

## Done when
- Form is fully keyboard operable and every input has a visible label.
- Build and lint pass. Summary in STATUS.md.
