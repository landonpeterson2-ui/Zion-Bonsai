import { getSite, getUpcomingWorkshops } from '@/lib/content'
import type { Workshop } from '@/lib/content'

/** open = a seat (pay after); full/waitlist = waitlist sign-up, no payment; tentative = not taking sign-ups. */
export function signupKind(w: Workshop): 'seat' | 'waitlist' | null {
  if (w.status === 'open') return 'seat'
  if (w.status === 'full' || w.status === 'waitlist') return 'waitlist'
  return null
}

/** Upcoming workshops that take sign-ups on the site. */
export function getSignupWorkshops(): Workshop[] {
  return getUpcomingWorkshops().filter((w) => signupKind(w) !== null)
}

/** True when Register buttons should go to /register instead of the Google Form. */
export function siteSignupsOn(): boolean {
  return getSite().registration.mode === 'site'
}

export function registerHref(w: Workshop): string {
  return `/register?date=${encodeURIComponent(w.id)}`
}
