import { getCloudflareContext } from '@opennextjs/cloudflare'
import { sendConfirmationEmail } from '@/lib/confirmation-email'
import {
  SIGNUP_COLUMNS,
  findSignupWorkshop,
  json,
  sha256Hex,
  signupInputSchema,
  workshopForEmail,
  type Signup,
} from '@/lib/signups'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

async function turnstileOk(secret: string | undefined, token: string, ip: string): Promise<boolean> {
  if (!secret || !token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

const b = (v: boolean) => (v ? 1 : 0)

export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json({ ok: false, errors: { form: 'Something went wrong with that form. Please try again.' } }, 400)
  }

  // Honeypot: pretend success, save nothing.
  if (raw && typeof raw === 'object' && typeof (raw as { company?: unknown }).company === 'string' && (raw as { company: string }).company.trim() !== '') {
    return json({ ok: true, id: crypto.randomUUID(), waitlist: false, already: false })
  }

  const parsed = signupInputSchema.safeParse(raw)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      if (!errors[key]) errors[key] = issue.message
    }
    return json({ ok: false, errors }, 400)
  }
  const input = parsed.data

  const { env, ctx } = await getCloudflareContext({ async: true })
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const ipHash = await sha256Hex(ip + (env.SIGNUPS_TOKEN ?? ''))

  // Rate limit: 5 saved sign-ups per IP per 10 minutes.
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
  const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM signups WHERE ip_hash = ? AND created_at > ?')
    .bind(ipHash, since)
    .first<{ n: number }>()
  if ((recent?.n ?? 0) >= RATE_LIMIT) {
    return json({ ok: false, errors: { form: 'That is a lot of sign-ups in a short while. Please wait a few minutes and try again.' } }, 429)
  }

  if (!(await turnstileOk(env.TURNSTILE_SECRET, input.turnstileToken, ip))) {
    return json({ ok: false, errors: { form: "We couldn't confirm you're a person. Please refresh the page and try again." } }, 400)
  }

  const found = findSignupWorkshop(input.workshopId)
  if (!found) {
    return json({ ok: false, errors: { workshopId: 'That date is not open for sign-ups. Please pick another.' } }, 400)
  }

  // Same email + workshop: hand back the existing sign-up.
  const existing = await env.DB.prepare('SELECT id, waitlist FROM signups WHERE email = ? AND workshop_id = ? LIMIT 1')
    .bind(input.email, input.workshopId)
    .first<{ id: string; waitlist: number }>()
  if (existing) {
    return json({ ok: true, id: existing.id, waitlist: existing.waitlist === 1, already: true })
  }

  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  const phone = input.phone ?? null
  await env.DB.prepare(
    `INSERT INTO signups (id, created_at, workshop_id, workshop_date, seats, waitlist, name, email, phone, guest, notes, heard,
       gift_card, email_opt_in, text_opt_in, photo_ok, ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  )
    .bind(
      id,
      createdAt,
      found.workshop.id,
      found.workshop.date,
      input.seats,
      b(found.waitlist),
      input.name,
      input.email,
      phone,
      input.seats === 2 ? (input.guest ?? null) : null,
      input.notes ?? null,
      input.heard ?? null,
      b(input.giftCard),
      b(input.emailOptIn),
      b(phone !== null && input.textOptIn),
      b(input.photoOk),
      ipHash,
    )
    .run()

  // Confirmation email: best effort, after the response if the runtime allows.
  const row = await env.DB.prepare(`SELECT ${SIGNUP_COLUMNS} FROM signups WHERE id = ?`).bind(id).first<Signup>()
  if (row) {
    const send = sendConfirmationEmail(env.BREVO_API_KEY, row, workshopForEmail(found.workshop))
    try {
      ctx.waitUntil(send)
    } catch {
      await send
    }
  }

  return json({ ok: true, id, waitlist: found.waitlist, already: false })
}
