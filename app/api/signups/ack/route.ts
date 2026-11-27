import { getCloudflareContext } from '@opennextjs/cloudflare'
import { z } from 'zod'
import { isAuthorized, json } from '@/lib/signups'

const bodySchema = z.object({ ids: z.array(z.string().min(1).max(64)).max(100) })

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true })
  if (!isAuthorized(request, env.SIGNUPS_TOKEN)) return json({ error: 'Unauthorized' }, 401)

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return json({ error: 'Body must be {"ids": [...]}' }, 400)
  const { ids } = parsed.data
  if (ids.length === 0) return json({ acked: 0 })

  const now = new Date().toISOString()
  const marks = ids.map(() => '?').join(',')
  const result = await env.DB.prepare(`UPDATE signups SET picked_up_at = ? WHERE picked_up_at IS NULL AND id IN (${marks})`)
    .bind(now, ...ids)
    .run()
  return json({ acked: result.meta.changes ?? 0 })
}
