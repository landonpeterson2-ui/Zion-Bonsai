import { z } from 'zod'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getUpcomingWorkshops, getPartner, getSite, type Workshop } from '@/lib/content'

/** One row of the signups table as the API returns it (never includes ip_hash). */
export type Signup = {
  id: string
  created_at: string
  workshop_id: string
  workshop_date: string
  seats: number
  waitlist: number
  name: string
  email: string
  phone: string | null
  guest: string | null
  notes: string | null
  heard: string | null
  gift_card: number
  email_opt_in: number
  text_opt_in: number
  photo_ok: number
  picked_up_at: string | null
}

export const SIGNUP_COLUMNS =
  'id, created_at, workshop_id, workshop_date, seats, waitlist, name, email, phone, guest, notes, heard, gift_card, email_opt_in, text_opt_in, photo_ok, picked_up_at'

/** Empty or whitespace-only strings become undefined, so optional fields can be left blank. */
const optionalText = (max: number, tooLong: string) =>
  z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().trim().max(max, tooLong).optional(),
  )

/** The JSON body of POST /api/register. The front end reuses this. */
export const signupInputSchema = z
  .object({
    workshopId: z.string({ error: 'Pick a date.' }).min(1, 'Pick a date.'),
    seats: z.union([z.literal(1), z.literal(2)], { error: 'Choose one seat or two.' }),
    name: z
      .string({ error: 'Please tell us your name.' })
      .trim()
      .min(1, 'Please tell us your name.')
      .max(100, 'That name is a bit long. Could you shorten it?'),
    email: z
      .string({ error: 'We need an email to send your confirmation.' })
      .trim()
      .toLowerCase()
      .min(1, 'We need an email to send your confirmation.')
      .max(200, 'That email is a bit long.')
      .email('That email does not look quite right.'),
    phone: optionalText(40, 'That phone number is a bit long.'),
    guest: optionalText(100, 'That name is a bit long. Could you shorten it?'),
    giftCard: z.boolean().default(false),
    notes: optionalText(1000, 'Please keep notes under 1,000 characters.'),
    emailOptIn: z.boolean().default(false),
    textOptIn: z.boolean().default(false),
    photoOk: z.boolean().default(false),
    heard: optionalText(200, 'That is a bit long. A few words is plenty.'),
    turnstileToken: z.string().default(''),
    /** Hidden honeypot. Real people leave it empty. */
    company: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.seats === 2 && !v.guest) {
      ctx.addIssue({ code: 'custom', path: ['guest'], message: "Please add your guest's name." })
    }
  })

export type SignupInput = z.infer<typeof signupInputSchema>

/** A workshop that can take a sign-up: upcoming and not tentative. Returns its waitlist flag. */
export function findSignupWorkshop(workshopId: string): { workshop: Workshop; waitlist: boolean } | null {
  const workshop = getUpcomingWorkshops().find((w) => w.id === workshopId)
  if (!workshop || workshop.status === 'tentative') return null
  return { workshop, waitlist: workshop.status !== 'open' }
}

/** The "what to bring" line for a workshop: Level 2 (shaping) has its own. */
export function whatToBringFor(workshop: Pick<Workshop, 'type'> | undefined): string | null {
  const r = getSite().registration
  return (workshop?.type === 'shaping' ? r.whatToBringShaping : null) ?? r.whatToBring
}

/** What the confirmation email needs to know about a workshop, from content. */
export function workshopForEmail(workshop: Workshop) {
  const site = getSite()
  return {
    title: workshop.title,
    date: workshop.date,
    start: workshop.start ?? null,
    end: workshop.end ?? null,
    venueName: (workshop.venue && getPartner(workshop.venue)?.name) || null,
    whatToBring: whatToBringFor(workshop),
    venueMapUrl: (workshop.venue && getPartner(workshop.venue)?.mapUrl) || null,
    prices: site.registration.prices,
    payLinks: site.registration.payLinks,
  }
}

export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true })
  return env.DB
}

/** For the thank-you page. Null when the id is unknown or the database is unreachable. */
export async function getSignup(id: string): Promise<Signup | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null
  try {
    const db = await getDb()
    return await db.prepare(`SELECT ${SIGNUP_COLUMNS} FROM signups WHERE id = ?`).bind(id).first<Signup>()
  } catch {
    return null
  }
}

export async function sha256Hex(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** True when the request carries the right Bearer token. Constant-time compare. */
export function isAuthorized(request: Request, token: string | undefined): boolean {
  if (!token) return false
  const header = request.headers.get('authorization') ?? ''
  const given = header.startsWith('Bearer ') ? header.slice(7) : ''
  const a = new TextEncoder().encode(given)
  const b = new TextEncoder().encode(token)
  let diff = a.length === b.length ? 0 : 1
  for (let i = 0; i < b.length; i++) diff |= (a[i] ?? 0) ^ b[i]
  return diff === 0
}

export const NO_STORE = { 'Cache-Control': 'no-store' }

export function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: NO_STORE })
}
