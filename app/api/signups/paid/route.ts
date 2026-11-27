import { getCloudflareContext } from '@opennextjs/cloudflare'
import { z } from 'zod'
import { buildPaidEmail, sendBrevo } from '@/lib/confirmation-email'
import { getUpcomingWorkshops } from '@/lib/content'
import { SIGNUP_COLUMNS, isAuthorized, json, workshopForEmail, type Signup } from '@/lib/signups'

// n8n posts the website bookings Grist has marked Paid. Each sign-up gets the
// "you're confirmed" email once; repeats are ignored, so n8n can send the whole list every run.
const bodySchema = z.object({
  paid: z
    .array(z.object({ email: z.string().trim().toLowerCase().min(3).max(200), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }))
    .max(200),
})

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true })
  if (!isAuthorized(request, env.SIGNUPS_TOKEN)) return json({ error: 'Unauthorized' }, 401)

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return json({ error: 'Body must be {"paid": [{"email", "date"}]}' }, 400)

  const counts = { sent: 0, skipped: 0, failed: 0, unmatched: 0 }
  const upcoming = getUpcomingWorkshops()
  for (const { email, date } of parsed.data.paid) {
    const rows = await env.DB.prepare(
      `SELECT ${SIGNUP_COLUMNS} FROM signups WHERE email = ? AND workshop_date = ? AND paid_email_at IS NULL`,
    )
      .bind(email, date)
      .all<Signup>()
    if (!rows.results.length) {
      counts.unmatched++
      continue
    }
    for (const row of rows.results) {
      const w = upcoming.find((x) => x.id === row.workshop_id)
      if (!w) {
        counts.skipped++
        continue
      }
      const result = await sendBrevo(env.BREVO_API_KEY, buildPaidEmail(row, workshopForEmail(w)))
      counts[result]++
      if (result === 'sent') {
        await env.DB.prepare('UPDATE signups SET paid_email_at = ? WHERE id = ?').bind(new Date().toISOString(), row.id).run()
      }
    }
  }
  return json(counts)
}
