// Screenshot a page at phone and desktop widths with the locally installed Chrome (headless).
// Usage: node scripts/shot.mjs <url> [outDir]   e.g. node scripts/shot.mjs http://localhost:3105/directions/a
// SHOT_HEIGHT=6000 for long pages. Writes <outDir>/<slug>-375.png and <slug>-1280.png (default outDir: .shots/, gitignored). View them with the Read tool.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

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

const tall = Number(process.env.SHOT_HEIGHT) || 2400
const capture = (target, width, file) =>
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=6000',
    `--window-size=${width},${tall}`, `--user-data-dir=${profile}`, `--screenshot=${file}`, target,
  ], { stdio: 'ignore', timeout: 60000 })

// Desktop: straight capture.
const desktop = resolve(outDir, `${slug}-1280.png`)
capture(url, 1280, desktop)

// Phone: headless Chrome won't make a window narrower than 500px, so render the page
// inside a 375px iframe and crop the screenshot to it.
const frame = join(profile, 'frame.html')
writeFileSync(frame, `<!doctype html><body style="margin:0"><iframe src="${url}" style="border:0;width:375px;height:${tall}px;display:block"></iframe></body>`)
const raw = join(profile, 'phone-raw.png')
capture(pathToFileURL(frame).href, 500, raw)
const phone = resolve(outDir, `${slug}-375.png`)
await sharp(raw).extract({ left: 0, top: 0, width: 375, height: tall }).toFile(phone)

console.log(phone)
console.log(desktop)
