// Adds a row to the Site_Sync table in Grist so Cass can see what the last sync did.
// Usage: node scripts/grist-log.mjs "<Result>" "<details>"
// Result is one of the Site_Sync choices: Published / Published, some rows waiting / Not published.
// Skips the write when the newest row already says the same thing, so repeat runs don't pile up.
const DOC = process.env.GRIST_DOC_API ?? 'http://nuc.pug-scylla.ts.net:8484/api/docs/sMHSTmja714b'
const KEY = process.env.GRIST_API_KEY
const [result, details = ''] = process.argv.slice(2)
if (!KEY || !result) {
  console.error('Usage: node scripts/grist-log.mjs "<Result>" "<details>" (needs GRIST_API_KEY)')
  process.exit(1)
}
const headers = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }
const table = `${DOC}/tables/Site_Sync/records`

const latest = await fetch(`${table}?sort=-When&limit=1`, { headers }).then((r) => r.json())
const last = latest.records?.[0]?.fields
if (last && last.Result === result && last.Details === details.trim()) process.exit(0)

const res = await fetch(table, {
  method: 'POST',
  headers,
  body: JSON.stringify({ records: [{ fields: { When: Date.now() / 1000, Result: result, Details: details.trim() } }] }),
})
if (!res.ok) {
  console.error(`Couldn't log to Grist Site_Sync: ${res.status} ${await res.text()}`)
  process.exit(1)
}
