'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { SignupInput } from '@/lib/register-stub'

/**
 * DEV ONLY: the API route lives in another branch, so in `next dev` a 404 from /api/register
 * is treated as a successful sign-up with id "demo" (and Turnstile is not waited on).
 * Delete this const and the two places it is used once lib/signups.ts and app/api are merged.
 */
const DEV_STUB_MISSING_API = process.env.NODE_ENV === 'development'

type Fields = 'seats' | 'name' | 'email' | 'phone' | 'guest' | 'notes' | 'heard' | 'form'
type Errors = Partial<Record<Fields, string>>

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const label = 'font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-moss'
const input =
  'mt-2 block min-h-[48px] w-full rounded-[3px] border border-forest/25 bg-linen px-4 py-3 text-forest placeholder:text-soil/60 focus:border-forest'
const hint = 'mt-1.5 text-sm leading-[1.6] text-soil'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export default function RegisterForm({
  workshopId,
  single,
  pair,
  waitlist,
  turnstileSiteKey,
  contactEmail,
}: {
  workshopId: string
  single: number
  pair: number
  waitlist: boolean
  turnstileSiteKey: string
  contactEmail: string
}) {
  const router = useRouter()
  const [seats, setSeats] = useState<1 | 2>(1)
  const [gift, setGift] = useState(false)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)

  const widgetEl = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const token = useRef('')

  useEffect(() => {
    let cancelled = false
    function render() {
      if (cancelled || !window.turnstile || !widgetEl.current || widgetId.current) return
      widgetId.current = window.turnstile.render(widgetEl.current, {
        sitekey: turnstileSiteKey,
        appearance: 'interaction-only',
        callback: (t: string) => { token.current = t },
        'expired-callback': () => { token.current = '' },
        'error-callback': () => { token.current = '' },
      })
    }
    if (window.turnstile) render()
    else {
      let script = document.querySelector<HTMLScriptElement>('script[data-turnstile]')
      if (!script) {
        script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.dataset.turnstile = '1'
        document.head.appendChild(script)
      }
      script.addEventListener('load', render)
    }
    return () => {
      cancelled = true
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = undefined
    }
  }, [turnstileSiteKey])

  const waitForToken = useCallback(async () => {
    for (let i = 0; i < 40 && !token.current; i++) await new Promise((r) => setTimeout(r, 250))
    return token.current
  }, [])

  function focusField(form: HTMLFormElement, key: string) {
    const target = key === 'form' ? form.querySelector<HTMLElement>('#form-err') : form.querySelector<HTMLElement>(`[name="${key}"]`)
    target?.focus()
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    const form = e.currentTarget
    const f = new FormData(form)
    const text = (k: string) => String(f.get(k) || '').trim()
    const name = text('name')
    const email = text('email')
    const guest = text('guest')
    const next: Errors = {}
    if (!name) next.name = 'What should we call you?'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email doesn’t look quite right.'
    if (seats === 2 && !guest) next.guest = 'Just a first name is fine.'
    setErrors(next)
    if (Object.keys(next).length) {
      focusField(form, Object.keys(next)[0])
      return
    }

    setSending(true)
    try {
      const t = DEV_STUB_MISSING_API ? token.current : await waitForToken()
      if (!t && !DEV_STUB_MISSING_API) {
        setErrors({ form: 'We couldn’t check that you’re a person. Please reload the page and try again.' })
        setSending(false)
        requestAnimationFrame(() => focusField(form, 'form'))
        return
      }
      const payload: SignupInput = {
        workshopId,
        seats,
        name,
        email,
        phone: text('phone') || undefined,
        guest: seats === 2 ? guest : undefined,
        giftCard: !waitlist && gift,
        notes: text('notes') || undefined,
        emailOptIn: f.get('emailOptIn') === 'on',
        textOptIn: !!text('phone') && f.get('textOptIn') === 'on',
        photoOk: f.get('photoOk') === 'on',
        heard: text('heard') || undefined,
        turnstileToken: t,
        company: text('company'),
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      let data: { ok?: boolean; id?: string; errors?: Errors } | null = null
      if (DEV_STUB_MISSING_API && res.status === 404) data = { ok: true, id: 'demo' }
      else data = await res.json().catch(() => null)

      if (data?.ok && data.id) {
        router.push(`/register/thanks?id=${encodeURIComponent(data.id)}`)
        return
      }
      const server = data?.errors ?? { form: 'Something went wrong on our end. Please try again in a minute.' }
      setErrors(server)
      // Turnstile tokens are single use.
      token.current = ''
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
      setSending(false)
      const first = Object.keys(server)[0] ?? 'form'
      requestAnimationFrame(() => focusField(form, first))
    } catch {
      setErrors({ form: 'We couldn’t reach the server. Check your connection and try again.' })
      token.current = ''
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
      setSending(false)
      requestAnimationFrame(() => focusField(form, 'form'))
    }
  }

  const err = (k: Fields) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-sm font-semibold text-clay">
        {errors[k]}
      </p>
    ) : null

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      {errors.form ? (
        <p id="form-err" role="alert" tabIndex={-1} className="border-l-2 border-clay bg-linen px-4 py-3 text-sm font-semibold leading-[1.6] text-clay">
          {errors.form}
        </p>
      ) : null}

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
              {waitlist ? null : <span className="mr-3 font-display text-[1.6rem] text-forest">${n === 1 ? single : pair}</span>}
            </label>
          ))}
        </div>
        {err('seats')}
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
          <input id="name" name="name" autoComplete="name" maxLength={100} className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
          {err('name')}
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : 'email-hint'} />
          {err('email') ?? <p id="email-hint" className={hint}>For your confirmation. Nothing else unless you tick a box below.</p>}
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone <span className="normal-case tracking-normal text-soil">(optional)</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : 'phone-hint'} />
          {err('phone') ?? <p id="phone-hint" className={hint}>Only if plans change on the day.</p>}
        </div>
      </div>

      {waitlist ? null : (
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3">
          <input type="checkbox" name="giftCard" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span>
            <span className="block text-forest">I&rsquo;m paying with a gift card</span>
            {gift ? <span className="mt-1 block text-sm text-soil">Good. Use it at checkout on the next screen.</span> : null}
          </span>
        </label>
      )}

      <div>
        <label className={label} htmlFor="notes">Anything we should know? <span className="normal-case tracking-normal text-soil">(optional)</span></label>
        <textarea id="notes" name="notes" rows={3} maxLength={1000} className={input} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'notes-err' : 'notes-hint'} />
        {err('notes') ?? <p id="notes-hint" className={hint}>Access needs, a tree for someone special, a question.</p>}
      </div>

      <div className="space-y-4 border-t border-forest/15 pt-8">
        <p className={label}>Staying in touch <span className="normal-case tracking-normal text-soil">(all optional)</span></p>
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
          <input type="checkbox" name="photoOk" className="mt-1 h-5 w-5 shrink-0 accent-clay" />
          <span className="text-forest">Fine to share photos I&rsquo;m in.</span>
        </label>
      </div>

      <div>
        <label className={label} htmlFor="heard">How did you hear about us? <span className="normal-case tracking-normal text-soil">(optional)</span></label>
        <select id="heard" name="heard" className={input} defaultValue="" aria-invalid={!!errors.heard} aria-describedby={errors.heard ? 'heard-err' : undefined}>
          <option value="">Choose one</option>
          <option>A friend</option>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Sweet Roots</option>
          <option>A gift card</option>
          <option>Somewhere else</option>
        </select>
        {err('heard')}
      </div>

      {/* Honeypot: real people never see or reach this. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="border-t border-forest/15 pt-8">
        <div ref={widgetEl} />
        <button
          type="submit"
          disabled={sending}
          aria-disabled={sending}
          className="inline-flex min-h-[48px] items-center rounded-[3px] bg-clay px-8 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-clay-dark disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? 'Sending…' : waitlist ? 'Join the waitlist' : 'Save my seat'}
        </button>
        <p className="mt-4 max-w-[52ch] text-sm leading-[1.65] text-soil" aria-live="polite">
          {waitlist
            ? 'No payment now. If a seat opens, we’ll get in touch.'
            : 'Next you’ll pay to confirm. Tools are on the table to use during the workshop, and for sale if you fall for one.'}
        </p>
        <p className="mt-3 max-w-[52ch] text-sm leading-[1.65] text-soil">
          How we use this: we use your details only to run your workshop and, if you tick a box, to tell you about new dates. We never sell or share them. Questions?{' '}
          <a href={`mailto:${contactEmail}`} className="text-clay underline underline-offset-4 hover:text-clay-dark">{contactEmail}</a>
        </p>
      </div>
    </form>
  )
}
