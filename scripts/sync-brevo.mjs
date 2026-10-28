// `npm run sync:brevo` — copies workshop guests and newsletter consent from Grist to Brevo.
// Runs on the NUC after the site sync (docs/grist-sync.md). `-- --check` reads everything and changes nothing.
//
// - A contact whose latest attended workshop (Registrations: Paid or Comped, Attended ticked) was in the last
//   WELCOME_DAYS days joins the "Workshop guests" list. Brevo's welcome series starts when someone joins it.
// - A contact with Email_OK ticked joins "Newsletter"; untick it and they leave it. Email_OK is the opt-in.
// - Everyone else is left alone. Only first name, email and the last workshop date are copied.
// - Someone who unsubscribed in Brevo stays unsubscribed: this never sets emailBlacklisted.
// Needs GRIST_API_KEY and BREVO_API_KEY in .env.local. Node 22.18+.
const CHECK_ONLY = process.argv.includes('--check')
const DOC = process.env.GRIST_DOC_API ?? 'http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b'
const GRIST_KEY = process.env.GRIST_API_KEY
const BREVO_KEY = process.env.BREVO_API_KEY
if (!GRIST_KEY || !BREVO_KEY) {
  console.error('GRIST_API_KEY and BREVO_API_KEY must be set in .env.local.')
  process.exit(1)
}

// Brevo list ids (Contacts → Lists in Brevo).
const WORKSHOP_GUESTS = 3
const NEWSLETTER = 4
const WELCOME_DAYS = 30
const SEAT_STATUSES = new Set(['Paid', 'Comped'])

async function records(table) {
  const res = await fetch(`${DOC}/tables/${table}/records`, { headers: { Authorization: `Bearer ${GRIST_KEY}` } })
  if (!res.ok) throw new Error(`Grist ${table}: ${res.status}`)
  const { records } = await res.json()
  return records.map((r) => ({ id: r.id, ...r.fields }))
}

// Grist Date columns are seconds since the epoch at UTC midnight.
const isoDate = (seconds) => new Date(seconds * 1000).toISOString().slice(0, 10)
const validEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())

const [contacts, registrations, workshops] = await Promise.all([records('Contacts'), records('Registrations'), records('Workshops')])
const workshopDate = new Map(workshops.filter((w) => w.Date).map((w) => [w.id, w.Date]))

// Latest attended workshop per contact.
const lastAttended = new Map()
for (const r of registrations) {
  if (!r.Attended || !SEAT_STATUSES.has(r.Status) || !r.Contact) continue
  const date = workshopDate.get(r.Workshop)
  if (date && date > (lastAttended.get(r.Contact) ?? 0)) lastAttended.set(r.Contact, date)
}

const welcomeCutoff = Date.now() / 1000 - WELCOME_DAYS * 86400
const counts = { guests: 0, newsletter: 0, newsletterOff: 0, skippedNoEmail: 0, failed: 0 }
for (const c of contacts) {
  const attended = lastAttended.get(c.id)
  if (!attended && !c.Email_OK) continue
  if (!validEmail(c.Email)) {
    counts.skippedNoEmail++
    continue
  }
  const listIds = []
  const unlinkListIds = []
  if (attended && attended >= welcomeCutoff) listIds.push(WORKSHOP_GUESTS)
  if (c.Email_OK) listIds.push(NEWSLETTER)
  else unlinkListIds.push(NEWSLETTER)

  const attributes = {}
  if (c.First_Name) attributes.FIRSTNAME = c.First_Name
  if (attended) attributes.LAST_WORKSHOP = isoDate(attended)

  if (listIds.includes(WORKSHOP_GUESTS)) counts.guests++
  if (c.Email_OK) counts.newsletter++
  if (CHECK_ONLY) continue

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': BREVO_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ email: c.Email.trim(), attributes, listIds, updateEnabled: true }),
  })
  if (!res.ok && res.status !== 204) {
    counts.failed++
    console.error(`Brevo rejected Grist contact ${c.id}: ${res.status}`)
    continue
  }
  // Brevo's upsert can add to lists but not take away, so a withdrawn opt-in is a separate call.
  // 400 here means they weren't on the list, which is fine.
  if (unlinkListIds.length) {
    const off = await fetch(`https://api.brevo.com/v3/contacts/lists/${NEWSLETTER}/contacts/remove`, {
      method: 'POST',
      headers: { 'api-key': BREVO_KEY, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ emails: [c.Email.trim()] }),
    })
    if (off.ok) counts.newsletterOff++
  }
}

console.log(
  `${CHECK_ONLY ? 'Check only. ' : ''}Workshop guests: ${counts.guests}. Newsletter: ${counts.newsletter}.` +
    (counts.skippedNoEmail ? ` Skipped without a usable email: ${counts.skippedNoEmail}.` : '') +
    (counts.failed ? ` Failed: ${counts.failed}.` : ''),
)
if (counts.failed) process.exit(1)
