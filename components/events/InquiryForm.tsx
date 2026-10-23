'use client'

import { useState, useSyncExternalStore } from 'react'

export const EVENT_TYPES = [
  'Corporate wellness or retreat',
  'Private party',
  'School program',
  'Private tutoring',
  'Pop-up or market',
  'Something else',
] as const

type Fields = {
  name: string
  email: string
  phone: string
  organization: string
  eventType: string
  groupSize: string
  dates: string
  message: string
}

const input =
  'mt-2 block min-h-[44px] w-full rounded-[3px] border border-forest/40 bg-linen px-4 py-3 text-forest placeholder:text-soil/60'
const label = 'block font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest'
const hint = 'font-normal normal-case tracking-normal text-soil'

/**
 * Without JS the form posts as a plain-text mailto (works in most mail apps).
 * With JS we validate inline and build a cleaner, formatted mailto body instead.
 */
export default function InquiryForm({ email }: { email: string }) {
  const enhanced = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const data: Fields = {
      name: raw.name ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      organization: raw.organization ?? '',
      eventType: raw.eventType ?? '',
      groupSize: raw.groupSize ?? '',
      dates: raw.dates ?? '',
      message: raw.message ?? '',
    }
    const next: typeof errors = {}
    if (!data.name.trim()) next.name = 'Please tell us your name.'
    if (!data.email.trim()) next.email = 'Please add an email so we can reply.'
    else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) next.email = 'That email doesn’t look quite right.'
    if (!data.eventType) next.eventType = 'Pick the closest type of event.'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      document.getElementById(`ev-${first}`)?.focus()
      return
    }
    const line = (k: string, v: string) => `${k}: ${v.trim() || '-'}`
    const body = [
      line('Name', data.name),
      line('Email', data.email),
      line('Phone', data.phone),
      line('Organization', data.organization),
      line('Event type', data.eventType),
      line('Approximate group size', data.groupSize),
      line('Preferred dates', data.dates),
      '',
      'Message:',
      data.message.trim() || '-',
    ].join('\n')
    const href = `mailto:${email}?subject=${encodeURIComponent(`Event inquiry: ${data.eventType}`)}&body=${encodeURIComponent(body)}`
    setSent(href)
    window.location.href = href
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`ev-${k}-err`} className="mt-2 text-sm font-semibold text-clay">
        {errors[k]}
      </p>
    ) : null
  const a11y = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `ev-${k}-err` : undefined,
  })

  return (
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate={enhanced}
      className="grid gap-6 md:grid-cols-2"
    >
      <div>
        <label htmlFor="ev-name" className={label}>Name</label>
        <input id="ev-name" name="name" type="text" autoComplete="name" required className={input} {...a11y('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="ev-email" className={label}>Email</label>
        <input id="ev-email" name="email" type="email" autoComplete="email" required className={input} {...a11y('email')} />
        {err('email')}
      </div>
      <div>
        <label htmlFor="ev-phone" className={label}>Phone <span className={hint}>(optional)</span></label>
        <input id="ev-phone" name="phone" type="tel" autoComplete="tel" className={input} />
      </div>
      <div>
        <label htmlFor="ev-organization" className={label}>Organization <span className={hint}>(optional)</span></label>
        <input id="ev-organization" name="organization" type="text" autoComplete="organization" className={input} />
      </div>
      <div>
        <label htmlFor="ev-eventType" className={label}>Type of event</label>
        <select id="ev-eventType" name="eventType" required defaultValue="" className={input} {...a11y('eventType')}>
          <option value="" disabled>Choose one</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {err('eventType')}
      </div>
      <div>
        <label htmlFor="ev-groupSize" className={label}>Approximate group size</label>
        <input id="ev-groupSize" name="groupSize" type="text" inputMode="numeric" placeholder="e.g. 12" className={input} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="ev-dates" className={label}>Preferred dates</label>
        <input id="ev-dates" name="dates" type="text" placeholder="A few options, or a rough season" className={input} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="ev-message" className={label}>Anything else we should know?</label>
        <textarea id="ev-message" name="message" rows={5} className={input} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="btn-primary">Send inquiry</button>
        <p className="mt-4 max-w-xl text-sm leading-[1.6] text-soil" role="status">
          {sent ? (
            <>
              Your email app should have opened with everything filled in. Hit send there and we&rsquo;ll write back to
              plan the details with you. Nothing opened?{' '}
              <a href={sent} className="font-semibold text-clay underline underline-offset-2">Try this link</a>, or write to{' '}
              <a href={`mailto:${email}`} className="font-semibold text-clay underline underline-offset-2">{email}</a>.
            </>
          ) : (
            <>
              This opens an email to {email} with your answers filled in. Hit send there and we&rsquo;ll write back to
              plan the details together.
            </>
          )}
        </p>
      </div>
    </form>
  )
}
