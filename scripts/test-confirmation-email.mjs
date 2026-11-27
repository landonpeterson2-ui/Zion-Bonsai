// Run: node scripts/test-confirmation-email.mjs
// Checks the Brevo payload builder and the no-key skip. Never calls Brevo. Made-up data only.
import assert from 'node:assert/strict'
import { buildConfirmationEmail, sendConfirmationEmail } from '../lib/confirmation-email.ts'

const w = {
  title: 'Test Workshop',
  date: '2027-02-12',
  start: '18:00',
  end: '20:00',
  venueName: 'Test Venue',
  venueMapUrl: 'https://maps.example.com/venue',
  prices: { single: 75, pair: 125 },
  payLinks: { single: 'https://example.com/single', pair: 'https://example.com/pair' },
}
const base = {
  id: '00000000-0000-4000-8000-000000000000', created_at: '', workshop_id: 'x', workshop_date: '2027-02-12',
  seats: 1, waitlist: 0, name: 'Test Person', email: 'test@example.com', phone: null, guest: null, notes: null,
  heard: null, gift_card: 0, email_opt_in: 0, text_opt_in: 0, photo_ok: 0, picked_up_at: null,
}

assert.equal(await sendConfirmationEmail(undefined, base, w), 'skipped')
assert.equal(await sendConfirmationEmail('', base, w), 'skipped')

const seat = buildConfirmationEmail(base, w)
assert.equal(seat.sender.email, 'plants@zionbonsai.com')
assert.equal(seat.replyTo.email, 'plants@zionbonsai.com')
assert.match(seat.textContent, /Hi Test,/)
assert.match(seat.textContent, /Pay \$75 to confirm: https:\/\/example.com\/single/)
assert.match(seat.textContent, /held as Pending/)
assert.match(seat.textContent, /6:00 PM to 8:00 PM/)
assert.match(seat.textContent, /Friday, February 12/)
assert.match(seat.textContent, /\[WHAT TO BRING\]/)
assert.match(seat.textContent, /Directions: https:\/\/maps\.example\.com\/venue/)
assert.match(seat.textContent, /Come grow with us\./)
assert.doesNotMatch(seat.textContent, /gift card/i)
assert.doesNotMatch(seat.textContent, /take home|included/i)

const pair = buildConfirmationEmail({ ...base, seats: 2, guest: 'Guest Person', gift_card: 1 }, w)
assert.match(pair.textContent, /Pay \$125 to confirm: https:\/\/example.com\/pair/)
assert.match(pair.textContent, /you and Guest/)
assert.match(pair.textContent, /gift card at checkout/)

const wait = buildConfirmationEmail({ ...base, waitlist: 1 }, w)
assert.match(wait.textContent, /waitlist/)
assert.match(wait.textContent, /if a seat opens/)
assert.doesNotMatch(wait.textContent, /Pay \$/)

const evil = buildConfirmationEmail({ ...base, name: '<b>x</b>' }, w)
assert.doesNotMatch(evil.htmlContent, /<b>x<\/b>/)

// Redacted shape, for the record.
const redact = (p) => ({
  sender: p.sender.email, replyTo: p.replyTo.email, to: p.to.map(() => '[email]'), subject: p.subject,
  htmlBytes: p.htmlContent.length, textBytes: p.textContent.length,
})
console.log('payload shape:', JSON.stringify(redact(seat)))
console.log('confirmation email: all checks passed')
