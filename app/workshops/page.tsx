import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import PhotoHero from '@/components/ui/PhotoHero'
import TextLink from '@/components/ui/TextLink'
import Dates from '@/components/workshops/Dates'
import Expect from '@/components/workshops/Expect'
import TakeHome from '@/components/workshops/TakeHome'
import Collage from '@/components/workshops/Collage'
import { Faq, GroupsLine, Shaping, WhoFor } from '@/components/workshops/Rest'
import { getPhoto } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Bonsai Workshops in Manti & Central Utah',
  description:
    'Beginner bonsai workshops in Sanpete County, Utah. Two screen-free hours, your hands in the soil, and a dwarf jade bonsai in a handmade pot. No experience needed.',
}

// Re-render hourly so past dates drop off without a redeploy.
export const revalidate = 3600

export default function WorkshopsPage() {
  const photo = getPhoto('workshop-tables-set-for-class')
  return (
    <>
      <PhotoHero src={photo.src} alt={photo.alt} objectPosition="object-[40%_50%]">
        <Eyebrow tone="linen">Workshops &middot; Manti, Utah</Eyebrow>
        <h1 className="mt-6 text-[2.9rem] leading-[1.02] text-linen md:text-[4.5rem]">
          Two hours. No notifications. <em>Just you, some soil, and a tree.</em>
        </h1>
        <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-linen/90">
          A beginner-friendly bonsai workshop in Sanpete County. Your phone stays in your bag, your hands get dirty, and
          the tree is going to be yours.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
          <Link href="#dates" className="btn-primary">See dates</Link>
          <TextLink href="/events" tone="linen">Plan a private event</TextLink>
        </div>
      </PhotoHero>
      <Dates />
      <Expect />
      <TakeHome />
      <Collage />
      <Shaping />
      <WhoFor />
      <Faq />
      <GroupsLine />
    </>
  )
}
