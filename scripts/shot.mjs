// Screenshot a page at phone and desktop widths with the locally installed Chrome (headless).
// Usage: node scripts/shot.mjs <url> [outDir]   e.g. node scripts/shot.mjs http://localhost:3105/directions/a
// Writes <outDir>/<slug>-375.png and <slug>-1280.png (default outDir: .shots/, gitignored). View them with the Read tool.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const [url, outDir = '.shots'] = process.argv.slice(2)
if (!url) {
  console.error('Usage: node scripts/shot.mjs <url> [outDir]')
  process.exit(1)
}

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) {
  console.error('No Chrome/Edge found. Set CHROME_PATH.')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })
const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home'
const profile = mkdtempSync(join(tmpdir(), 'shot-'))

for (const [width, height] of [[375, 2400], [1280, 2400]]) {
  const file = resolve(outDir, `${slug}-${width}.png`)
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=6000',
    `--window-size=${width},${height}`, `--user-data-dir=${profile}`, `--screenshot=${file}`, url,
  ], { stdio: 'ignore', timeout: 60000 })
  console.log(file)
}
