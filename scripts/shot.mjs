// Full-page screenshots at phone (375) and desktop (1280) widths using the locally installed
// Chrome, driven over the DevTools protocol (no extra dependencies).
// Usage: node scripts/shot.mjs <url> [outDir]   e.g. node scripts/shot.mjs http://localhost:3121/workshops
// Writes <outDir>/<slug>-375.png and <slug>-1280.png (default outDir: .shots/, gitignored). View them with Read.
// The page is scrolled top to bottom before capture so scroll-reveal sections are visible.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const [url, outDir = '.shots'] = process.argv.slice(2)
if (!url) {
  console.error('Usage: node scripts/shot.mjs <url> [outDir]')
  process.exit(1)
}

const chromePath = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => existsSync(p))
if (!chromePath) {
  console.error('No Chrome/Edge found. Set CHROME_PATH.')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const port = 9300 + Math.floor(Math.random() * 500)
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'shot-'))}`, 'about:blank',
], { stdio: 'ignore' })

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      const page = targets.find((t) => t.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(200)
  }
  throw new Error('Could not connect to Chrome')
}

function client(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let id = 0
  const pending = new Map()
  const listeners = new Map()
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method)()
      listeners.delete(msg.method)
    }
  }
  return {
    open: new Promise((r) => (ws.onopen = r)),
    send: (method, params = {}) =>
      new Promise((res, rej) => {
        pending.set(++id, { res, rej })
        ws.send(JSON.stringify({ id, method, params }))
      }),
    once: (method) => new Promise((r) => listeners.set(method, r)),
    close: () => ws.close(),
  }
}

const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home'
mkdirSync(outDir, { recursive: true })

try {
  const cdp = client(await connect())
  await cdp.open
  await cdp.send('Page.enable')

  for (const [width, mobile] of [[375, true], [1280, false]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile })
    const loaded = cdp.once('Page.loadEventFired')
    await cdp.send('Page.navigate', { url })
    await loaded
    await sleep(800)
    // Scroll through so IntersectionObserver reveals fire, then return to top.
    await cdp.send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
        scrollTo(0, 0); await new Promise(r => setTimeout(r, 700))
      })()`,
    })
    const { cssContentSize } = await cdp.send('Page.getLayoutMetrics')
    const height = Math.min(Math.ceil(cssContentSize.height), 16000)
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 },
    })
    const file = resolve(outDir, `${slug}-${width}.png`)
    writeFileSync(file, Buffer.from(data, 'base64'))
    console.log(file)
  }
  cdp.close()
} finally {
  chrome.kill()
}
