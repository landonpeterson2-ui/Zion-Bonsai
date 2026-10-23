import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import PhotoHero from '@/components/ui/PhotoHero'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

// Swap the hero photo here (one place). Each photo keeps its own crop so the subject stays in frame.
const HERO_PHOTO = 'jade-trio-sunlit-shelf'
const CROPS: Record<string, string> = {
  'cheesecake-blue-pot': 'object-[60%_30%] md:object-[40%_60%]',
  'jade-trio-sunlit-shelf': 'object-[30%_50%] md:object-[62%_50%]',
  'jade-shelf-window-display': 'object-[40%_25%] md:object-[55%_20%]',
}

export default function Hero() {
  const photo = getPhoto(HERO_PHOTO)
  return (
    <PhotoHero
      src={photo.src}
      alt={photo.alt}
      caption={photo.caption}
      objectPosition={CROPS[HERO_PHOTO] ?? "object-center"}
    >
      <Eyebrow tone="linen">Bonsai workshops &middot; Manti, Utah</Eyebrow>
      <h1 className="mt-6 text-[2.9rem] leading-[1.02] text-linen md:text-[4.5rem]">
        Put the phone down.
        <br />
        <em>Pick up a tree.</em>
      </h1>
      <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-linen/90">
        Two hours, a little soil under your nails, and a dwarf jade in a handmade pot that goes home with you. No
        experience needed.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
        <Link href="/workshops#dates" className="btn-primary">Book a workshop</Link>
        <TextLink href="/events" tone="linen">Plan a private event</TextLink>
      </div>
    </PhotoHero>
  )
}
