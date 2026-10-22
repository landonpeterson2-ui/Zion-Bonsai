// Runs before `next build` (npm "prebuild"). Validates content/*.json with the
// same schemas as lib/content.ts. Needs Node with TypeScript type stripping (22.18+).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { contentFiles, parseContent } from '../lib/content-schemas.ts'

let failed = false
for (const [file, schema] of Object.entries(contentFiles)) {
  try {
    const raw = readFileSync(fileURLToPath(new URL(`../content/${file}`, import.meta.url)), 'utf8')
    parseContent(file, schema, JSON.parse(raw))
  } catch (err) {
    failed = true
    console.error(err instanceof Error ? err.message : err)
  }
}
if (failed) {
  console.error('\nContent check failed. Fix the fields above, then run `npm run build` again.')
  process.exit(1)
}
console.log('Content check passed.')
