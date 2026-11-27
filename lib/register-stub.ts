import { getSignupWorkshops } from '@/lib/registration'

/**
 * TEMPORARY (task 61b). Stands in for lib/signups.ts until 61a is merged.
 * Integration swaps the imports of getSignup / SignupInput / SignupRow to '@/lib/signups'; then delete this file.
 */

/** JSON body of POST /api/register (shared contract). */
export type SignupInput = {
  workshopId: string
  seats: 1 | 2
  name: string
  email: string
  phone?: string
  guest?: string
  giftCard: boolean
  notes?: string
  emailOptIn: boolean
  textOptIn: boolean
  photoOk: boolean
  heard?: string
  turnstileToken: string
  company: string
}

/** A saved row, as the thank-you page needs it (subset of the D1 signups columns). */
export type SignupRow = {
  id: string
  workshop_id: string
  seats: 1 | 2
  waitlist: 0 | 1
  name: string
  gift_card: 0 | 1
}

/** Fake lookup: a row for id "demo" (on the first upcoming sign-up workshop), null otherwise. */
export async function getSignup(id: string): Promise<SignupRow | null> {
  if (id !== 'demo') return null
  return { id, workshop_id: getSignupWorkshops()[0]?.id ?? 'demo', seats: 2, waitlist: 0, name: 'Test Person', gift_card: 1 }
}
