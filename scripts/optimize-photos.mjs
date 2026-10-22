// Optimize photos for the site.
//
//   npm run photos
//
// Reads:  public/gallery/*.jpeg  and  photos-inbox/**/*.{jpg,jpeg,png,heic,webp}
// Writes: public/photos/<name>.jpg  (max 2000px long edge, EXIF-rotated, metadata stripped, mozjpeg q74)
//
// Output names come from scripts/photos-map.json (original -> new name), so the
// originals stay traceable. Files not in the map fall back to a slug of the
// original filename. Anything in photos-inbox/workshop/ is a workshop photo:
// add it to content/gallery.json with status "workshop".
//
// Idempotent: skips an output that is newer than its input.

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'photos')
const mapFile = path.join(import.meta.dirname, 'photos-map.json')
const map = fs.existsSync(mapFile) ? JSON.parse(fs.readFileSync(mapFile, 'utf8')).map : {}
const exts = new Set(['.jpg', '.jpeg', '.png', '.heic', '.webp'])

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}

const inputs = [
  ...walk(path.join(root, 'public', 'gallery')).map((f) => ({ file: f, key: 'gallery/' + path.basename(f) })),
  ...walk(path.join(root, 'photos-inbox')).map((f) => ({
    file: f,
    key: path.relative(path.join(root, 'photos-inbox'), f).split(path.sep).join('/'),
  })),
].filter((i) => exts.has(path.extname(i.file).toLowerCase()))

const slug = (s) => s.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

fs.mkdirSync(outDir, { recursive: true })
let done = 0, skipped = 0, failed = 0

for (const { file, key } of inputs) {
  const name = map[key] ?? `${slug(key.replace('/', '-'))}.jpg`
  const out = path.join(outDir, name)
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) {
    skipped++
    continue
  }
  try {
    await sharp(file)
      .rotate() // apply EXIF orientation; metadata is dropped by default
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(out)
    done++
    console.log(`ok    ${key} -> public/photos/${name}`)
  } catch (err) {
    failed++
    console.warn(`SKIP  ${key}: could not decode (${err.message}). Convert it to JPG and try again.`)
  }
}

console.log(`\n${done} written, ${skipped} up to date, ${failed} skipped.`)
