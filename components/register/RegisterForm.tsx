'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const label = 'font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss'
const input =
  'mt-2 block min-h-[48px] w-full rounded-[3px] border border-forest/25 bg-linen px-4 py-3 text-forest placeholder:text-soil/60 focus:border-forest'
const hint = 'mt-1.5 text-sm leading-[1.6] text-soil'

type Errors = Partial<Record<'name' | 'email' | 'guest', string>>

export default function RegisterForm({
  workshopId,
  single,
  pair,
  soldOut,
}: {
  workshopId: string
  single: number
  pair: number
  soldOut: boolean
}) {
  const router = useRouter()
  const [seats, setSeats] = useState<1 | 2>(1)
  const [gift, setGift] = useState(false)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const email = String(f.get('email') || '').trim()
    const guest = String(f.get('guest') || '').trim()
    const next: Errors = {}
    if (!name) next.name = 'What should we call you?'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email doesn’t look quite right.'
    if (seats === 2 && !guest) next.guest = 'Just a first name is fine.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }
    // Mockup: only the first name, seats and gift card choice travel to the thank-you page. Nothing is stored.
    const q = new URLSearchParams({ date: workshopId, seats: String(seats), first: name.split(/\s+/)[0] })
    if (gift) q.set('gift', '1')
    if (soldOut) q.set('waitlist', '1')
    router.push(`/mockups/register/thanks?${q}`)
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-sm font-semibold text-clay">
        {errors[k]}
      </p>
    ) : null

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <fieldset>
        <legend className={label}>How many seats</legend>
        <div className="mt-3 border-t border-forest/15">
          {([1, 2] as const).map((n) => (
            <label
              key={n}
              className={`flex min-h-[64px] cursor-pointer items-center gap-4 border-b border-forest/15 py-4 transition-colors ${seats === n ? 'bg-linen' : ''}`}
            >
              <input
                type="radio"
                name="seats"
                value={n}
                checked={seats === n}
                onChange={() => setSeats(n)}
                className="ml-3 h-5 w-5 shrink-0 accent-clay"
              />
              <span className="flex-1">
                <span className="block font-display text-[1.5rem] leading-snug text-forest">{n === 1 ? 'Just me' : 'Two of us'}</span>
                <span className="block text-sm text-soil">{n === 1 ? 'One seat, one tree.' : 'Side by side. Bring someone you like.'}</span>
              </span>
              {soldOut ? null : <span className="mr-3 font-display text-[1.6rem] text-forest">${n === 1 ? single : pair}</span>}
            </label>
          ))}
        </div>
      </fieldset>

      {seats === 2 ? (
        <div>
          <label className={label} htmlFor="guest">Who&rsquo;s coming with you?</label>
          <input id="guest" name="guest" autoComplete="off" className={input} aria-invalid={!!errors.guest} aria-describedby={errors.guest ? 'guest-err' : 'guest-hint'} />
          {err('guest') ?? <p id="guest-hint" className={hint}>First name is plenty. It goes on their name card.</p>}
        </div>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
          {err('name')}
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : 'email-hint'} />
          {err('email') ?? <p id="email-hint" className={hint}>For your confirmation. Nothing else unless you tick a box below.</p>}
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone <span className="normal-case tracking-normal text-soil">(optional)</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} aria-describedby="phone-hint" />
          <p id="phone-hint" className={hint}>Only if plans change on the day.</p>
        </div>
      </div>

      {soldOut ? null : (
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3">
          <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span>
            <span className="block text-forest">I&rsquo;m paying with a gift card</span>
            {gift ? <span className="mt-1 block text-sm text-soil">Good. Use it at checkout on the next screen.</span> : null}
          </span>
        </label>
      )}

      <div>
        <label className={label} htmlFor="notes">Anything we should know? <span className="normal-case tracking-normal text-soil">(optional)</span></label>
        <textarea id="notes" name="notes" rows={3} className={input} aria-describedby="notes-hint" />
        <p id="notes-hint" className={hint}>Access needs, a tree for someone special, a question.</p>
      </div>

      <div className="space-y-4 border-t border-forest/15 pt-8">
        <p className={label}>Staying in touch <span className="normal-case tracking-normal text-soil">(both optional)</span></p>
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3">
          <input type="checkbox" name="emailOptIn" className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span className="text-forest">Email me when new dates go up.</span>
        </label>
        <label className={`flex min-h-[44px] items-start gap-3 ${phone.trim() ? 'cursor-pointer' : 'opacity-60'}`}>
          <input type="checkbox" name="textOptIn" disabled={!phone.trim()} aria-describedby="text-hint" className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span>
            <span className="block text-forest">Text me when new dates go up.</span>
            <span id="text-hint" className="mt-1 block text-sm text-soil">
              {phone.trim() ? 'Just dates, now and then. Reply STOP any time.' : 'Add a phone number above to turn this on.'}
            </span>
          </span>
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3">
          <input type="checkbox" name="photos" className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span className="text-forest">Fine to share photos I&rsquo;m in.</span>
        </label>
      </div>

      <div>
        <label className={label} htmlFor="heard">How did you hear about us? <span className="normal-case tracking-normal text-soil">(optional)</span></label>
        <select id="heard" name="heard" className={input} defaultValue="">
          <option value="">Choose one</option>
          <option>A friend</option>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Sweet Roots</option>
          <option>A gift card</option>
          <option>Somewhere else</option>
        </select>
      </div>

      <div className="border-t border-forest/15 pt-8">
        <button
          type="submit"
          className="inline-flex min-h-[48px] items-center rounded-[3px] bg-clay px-8 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark"
        >
          {soldOut ? 'Join the waitlist' : 'Save my seat'}
        </button>
        <p className="mt-4 max-w-[52ch] text-sm leading-[1.65] text-soil">
          {soldOut
            ? 'No payment now. If a seat opens, we’ll get in touch.'
            : 'Next you’ll pay to confirm. Tools are on the table to use during the workshop, and for sale if you fall for one.'}
        </p>
      </div>
    </form>
  )
}
