// Confirmation email via Brevo transactional. Pure builder + best-effort sender.
// Imports are type-only so scripts/test-confirmation-email.mjs can run it under plain node.
import type { Signup } from './signups'

export type EmailWorkshop = {
  title: string
  date: string // YYYY-MM-DD
  start: string | null // HH:MM
  end: string | null
  venueName: string | null
  prices: { single: number; pair: number }
  payLinks: { single: string | null; pair: string | null }
}

export type BrevoPayload = {
  sender: { name: string; email: string }
  replyTo: { name: string; email: string }
  to: { email: string; name: string }[]
  subject: string
  htmlContent: string
  textContent: string
}

const FROM = { name: 'Zion Bonsai', email: 'plants@zionbonsai.com' }

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const firstName = (full: string) => full.trim().split(/\s+/)[0] || 'friend'

function longDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d, 12)),
  )
}

function clock(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function buildConfirmationEmail(signup: Signup, w: EmailWorkshop): BrevoPayload {
  const first = firstName(signup.name)
  const date = longDate(w.date)
  const time = w.start && w.end ? `${clock(w.start)} to ${clock(w.end)}` : w.start ? clock(w.start) : null
  const waitlist = signup.waitlist === 1
  const pair = signup.seats === 2
  const guestFirst = signup.guest ? firstName(signup.guest) : null
  const price = pair ? w.prices.pair : w.prices.single
  const payLink = pair ? w.payLinks.pair : w.payLinks.single

  const details: string[] = [w.title, date]
  if (time) details.push(time)
  if (w.venueName) details.push(w.venueName)
  const seatsLine = pair
    ? `Two seats${guestFirst ? `: you and ${guestFirst}` : ''}`
    : 'One seat'

  // Each paragraph is [plain text, html]. Links get a separate html form.
  const paras: { text: string; html: string }[] = []
  const add = (text: string, html?: string) => paras.push({ text, html: html ?? esc(text) })

  add(`Hi ${first},`)
  if (waitlist) {
    add(`You're on the waitlist for ${w.title}. We'll get in touch if a seat opens. There's nothing to pay unless that happens.`)
  } else {
    add(`Thanks for signing up for ${w.title}. Two hours, no notifications, just you, some soil and a tree that's going to be yours.`)
  }
  add(`${details.join(' · ')}\n${seatsLine}`, `${details.map(esc).join(' &middot; ')}<br>${esc(seatsLine)}`)

  if (!waitlist) {
    if (payLink) {
      add(
        `Pay $${price} to confirm: ${payLink}\nYour seat is held as Pending until you pay.`,
        `<a href="${esc(payLink)}" style="color:#A84A2B;font-weight:600">Pay $${price} to confirm</a><br>Your seat is held as Pending until you pay.`,
      )
    } else {
      add(`The total is $${price}. We'll send your payment link shortly. Your seat is held as Pending until you pay.`)
    }
    if (signup.gift_card === 1) add('You ticked gift card, so use your gift card at checkout.')
  }

  add('[WHAT TO BRING]')
  add('[PARKING]')
  add(`Questions? Just reply to this email.`)
  add('Come grow with us.\nLandon and Cass', 'Come grow with us.<br>Landon and Cass')

  const text = paras.map((p) => p.text).join('\n\n')
  const html =
    `<div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.65;color:#2F3B22;max-width:560px">` +
    paras.map((p) => `<p style="margin:0 0 16px">${p.html.replace(/\n/g, '<br>')}</p>`).join('') +
    '</div>'

  return {
    sender: FROM,
    replyTo: FROM,
    to: [{ email: signup.email, name: signup.name }],
    subject: waitlist ? `You're on the waitlist: ${w.title}, ${date}` : `You're signed up: ${w.title}, ${date}`,
    htmlContent: html,
    textContent: text,
  }
}

/** Best effort. Never throws; logs a status only (no personal data). Skipped when no key. */
export async function sendConfirmationEmail(
  apiKey: string | undefined,
  signup: Signup,
  w: EmailWorkshop,
): Promise<'skipped' | 'sent' | 'failed'> {
  if (!apiKey) return 'skipped'
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(buildConfirmationEmail(signup, w)),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error(`confirmation email: Brevo answered ${res.status}`)
      return 'failed'
    }
    return 'sent'
  } catch (err) {
    console.error(`confirmation email failed: ${err instanceof Error ? err.name : 'error'}`)
    return 'failed'
  }
}
