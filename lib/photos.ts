import { getGallery } from '@/lib/content'

/** Look up a gallery entry by file name (e.g. 'cheesecake-blue-pot'). Throws if missing so a typo fails the build. */
export function getPhoto(name: string) {
  const item = getGallery().find((g) => g.src === `/photos/${name}.jpg`)
  if (!item) throw new Error(`Photo "${name}" is not in content/gallery.json`)
  return item
}
