// `npm run sync:grist` — pulls public workshops, partners and quotes from the
// Zion Bonsai Grist doc into content/*.json. Run it on a machine on the tailnet,
// check the diff, then commit. Cloudflare never talks to Grist.
// `npm run sync:grist -- --check` does everything except write the files.
//
// Grist decides what goes on the site: Show_On_Site / Site_Status are formulas there,
// and each table's Ready_For_Site column says in plain words what a row still needs.
// Rows that aren't ready are skipped and listed as "Waiting:" lines; the rest publish.
// A workshop that is on the site now is never dropped by accident: it stays until its
// Grist row is moved off sale (Done, Cancelled, Planning).
//
// Only rows marked for the site are read, and only the columns the site shows.
// Contacts give a quote its first name and town; nothing else about them is copied.
// Needs GRIST_API_KEY in .env.local. Node 22.18+ (TypeScript type stripping).
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseContent, partnersSchema, testimonialsSchema, workshopsSchema } from '../lib/content-schemas.ts'

const CHECK_ONLY = process.argv.includes('--check')
const DOC = process.env.GRIST_DOC_API ?? 'http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b'
const KEY = process.env.GRIST_API_KEY
if (!KEY) {
  console.error('GRIST_API_KEY is not set. Add it to .env.local.')
  process.exit(1)
}

// Grist Format -> site workshop type. Grist's Site_Status formula already leaves other formats off.
const TYPES = { Public: 'intro', Evening: 'intro', 'Shaping / return session': 'shaping', 'Pop-up': 'popup' }
// Quotes synced from Grist get this id prefix; other quotes in testimonials.json are left alone.
const QUOTE_PREFIX = 'grist-'

const contentPath = (file) => fileURLToPath(new URL(`../content/${file}`, import.meta.url))
const readContent = (file) => JSON.parse(readFileSync(contentPath(file), 'utf8'))

async function records(table) {
  const res = await fetch(`${DOC}/tables/${table}/records`, { headers: { Authorization: `Bearer ${KEY}` } })
  if (!res.ok) throw new Error(`Grist ${table}: ${res.status} ${await res.text()}`)
  const { records } = await res.json()
  return records.map((r) => ({ id: r.id, ...r.fields }))
}

// Grist ChoiceList cells come back as ['L', ...values].
const choices = (cell) => (Array.isArray(cell) ? cell.slice(1) : [])
// Grist Date cells are seconds since epoch at UTC midnight.
const isoDate = (seconds) => new Date(seconds * 1000).toISOString().slice(0, 10)
const orNull = (value) => (value ? value : null)
// Grist time pick lists read "1:00 PM"; the site wants "13:00".
function to24h(label) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(label ?? '')
  if (!m) return label ?? ''
  const hour = (Number(m[1]) % 12) + (m[3].toUpperCase() === 'PM' ? 12 : 0)
  return `${String(hour).padStart(2, '0')}:${m[2]}`
}
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Denver' })

const waiting = []
const [workshopRows, orgRows, feedbackRows, contactRows] = await Promise.all(
  ['Workshops', 'Organizations', 'Feedback', 'Contacts'].map(records),
)
const orgs = new Map(orgRows.map((o) => [o.id, o]))
const contacts = new Map(contactRows.map((c) => [c.id, c]))

// Workshops
const workshops = []
for (const w of workshopRows.filter((w) => w.Show_On_Site)) {
  if (w.Ready_For_Site) {
    waiting.push(`${w.Title || `Workshops row ${w.id}`}: ${w.Ready_For_Site}`)
    continue
  }
  workshops.push({
    id: w.Slug,
    type: TYPES[w.Format],
    title: w.Title,
    date: isoDate(w.Date),
    start: to24h(w.Start),
    end: to24h(w.End),
    venue: orgs.get(w.Venue)?.Slug,
    price: w.Price_Label,
    registrationUrl: orNull(w.Registration_Form),
    status: w.Site_Status,
  })
}
// Keep upcoming workshops the site shows now unless Grist has taken them off sale.
const sameEvent = (a, b) => a.date === b.date && a.venue === b.venue
for (const current of readContent('workshops.json').workshops) {
  if (current.date < today || workshops.some((w) => sameEvent(w, current))) continue
  const row = workshopRows.find((r) => r.Date && sameEvent({ date: isoDate(r.Date), venue: orgs.get(r.Venue)?.Slug }, current))
  if (row && !row.Show_On_Site) continue // taken off sale in Grist on purpose
  workshops.push(current)
  if (!row) waiting.push(`${current.title} on ${current.date}: on the site but not in Grist, so it was left as is`)
}
workshops.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))

// Partners. Logos live in public/partners/, so keep each one from the current file.
const currentPartners = readContent('partners.json')
const logos = new Map(currentPartners.map((p) => [p.id, p.logo]))
const partners = []
for (const o of orgRows.filter((o) => o.Show_On_Site)) {
  if (o.Ready_For_Site) {
    waiting.push(`${o.Name}: ${o.Ready_For_Site}`)
    const current = currentPartners.find((p) => p.id === o.Slug)
    if (current) partners.push(current)
    continue
  }
  partners.push({
    id: o.Slug,
    name: o.Name,
    role: o.Role,
    blurb: o.Blurb,
    url: orNull(o.Website),
    instagram: orNull(o.Instagram),
    location: orNull(o.Town),
    logo: logos.get(o.Slug) ?? null,
  })
}
// Keep the current page order; new partners go at the end.
const order = currentPartners.map((p) => p.id)
const rank = (id) => (order.includes(id) ? order.indexOf(id) : order.length)
partners.sort((a, b) => rank(a.id) - rank(b.id))

// Testimonials
const currentTestimonials = readContent('testimonials.json')
const quotes = []
for (const f of feedbackRows.filter((f) => f.OK_To_Quote && f.Quote)) {
  const contact = contacts.get(f.Contact)
  if (f.Ready_For_Site) {
    waiting.push(`Quote from ${contact?.First_Name || `Feedback row ${f.id}`}: ${f.Ready_For_Site}`)
    continue
  }
  quotes.push({
    id: `${QUOTE_PREFIX}${f.id}`,
    name: contact.First_Name,
    town: contact.Town,
    quote: f.Quote.trim(),
    pages: choices(f.Show_On),
  })
}
const testimonials = {
  ...currentTestimonials,
  testimonials: [
    ...currentTestimonials.testimonials.filter((t) => !t.id.startsWith(QUOTE_PREFIX)),
    ...quotes,
  ],
}

// Validate everything before writing anything.
const out = [
  ['workshops.json', workshopsSchema, { registrationNote: readContent('workshops.json').registrationNote, workshops }],
  ['partners.json', partnersSchema, partners],
  ['testimonials.json', testimonialsSchema, testimonials],
]
const errors = []
for (const [file, schema, data] of out) {
  try {
    parseContent(file, schema, data)
  } catch (err) {
    errors.push(err instanceof Error ? err.message : String(err))
  }
}
for (const line of waiting) console.log(`Waiting: ${line}`)
if (errors.length > 0) {
  console.error(errors.join('\n'))
  console.error('\nNothing was written. Fix the rows above in Grist, then run `npm run sync:grist` again.')
  process.exit(1)
}
for (const [file, , data] of out) {
  // Leave hand-formatted files alone when nothing changed.
  if (JSON.stringify(data) === JSON.stringify(readContent(file))) {
    console.log(`content/${file} is already up to date`)
    continue
  }
  if (CHECK_ONLY) {
    console.log(`content/${file} would change`)
    continue
  }
  writeFileSync(contentPath(file), JSON.stringify(data, null, 2) + '\n')
  console.log(`Wrote content/${file}`)
}
console.log(`${workshops.length} workshops, ${partners.length} partners, ${quotes.length} quotes from Grist.${CHECK_ONLY ? ' (check only, nothing written)' : ' Check `git diff content/` before committing.'}`)
