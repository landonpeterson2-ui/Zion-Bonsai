import { getCloudflareContext } from '@opennextjs/cloudflare'
import { SIGNUP_COLUMNS, isAuthorized, json, type Signup } from '@/lib/signups'

const KEEP_DAYS = 30

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true })
  if (!isAuthorized(request, env.SIGNUPS_TOKEN)) return json({ error: 'Unauthorized' }, 401)

  // Clean up rows n8n picked up more than 30 days ago.
  const cutoff = new Date(Date.now() - KEEP_DAYS * 24 * 60 * 60 * 1000).toISOString()
  await env.DB.prepare('DELETE FROM signups WHERE picked_up_at IS NOT NULL AND picked_up_at < ?').bind(cutoff).run()

  const { results } = await env.DB.prepare(
    `SELECT ${SIGNUP_COLUMNS} FROM signups WHERE picked_up_at IS NULL ORDER BY created_at ASC LIMIT 100`,
  ).all<Signup>()
  return json({ signups: results })
}
