import Image from 'next/image'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { getPhoto } from '@/lib/photos'

export default function Groups() {
  const photo = getPhoto('workshop-barn-tables-ready')
  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative backdrop under a dark overlay */}
      <Image src={photo.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-soil/75" />
      <div className="container-custom py-24 text-linen md:py-32">
        <Eyebrow tone="linen">Private &amp; corporate events</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-[2.4rem] leading-[1.05] text-linen md:text-[3.25rem]">
          Bring your people <em>to the table.</em>
        </h2>
        <p className="mt-6 max-w-xl leading-[1.7] text-linen/90">
          Wellness retreats, team days, school programs, private parties. We bring the trees, the pots and the tools;
          you bring the people who could use two hours away from their screens.
        </p>
        <Link
          href="/events"
          className="mt-9 inline-flex min-h-[44px] items-center rounded-[3px] border border-linen/70 px-6 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-linen hover:text-soil"
        >
          Plan an event
        </Link>
      </div>
    </section>
  )
}
