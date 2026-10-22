import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { getPartner, getUpcomingWorkshops } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Home concept',
  robots: { index: false },
}

const label = 'font-label text-[11px] font-semibold uppercase tracking-[0.22em]'
const textLink =
  'font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-forest border-b border-forest/60 pb-1 hover:border-forest transition-colors'

const beats = [
  { title: 'The phone goes face-down.', body: 'The table is screen-free. Nothing to check, nothing to post. Just your hands and what is in front of you.' },
  { title: 'You choose your tree and your pot.', body: 'A dwarf jade, and a pot thrown by hand by Taya’s Clay Creations. No two are alike.' },
  { title: 'We shape it together.', body: 'Landon walks you through soil, roots and your first cuts. No jargon, no wrong answers.' },
  { title: 'It goes home with you.', body: 'Your tree keeps growing. Come back in six to nine months and we’ll shape it again.' },
]

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC',
  })
}

function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`
}

export default function HomeConcept() {
  const next = getUpcomingWorkshops()[0]
  const venue = next ? getPartner(next.venue) : undefined

  return (
    <>
      {/* Hero */}
      <section className="container-custom grid items-center gap-10 pb-20 pt-10 md:grid-cols-12 md:gap-12 md:pb-28 md:pt-16">
        <div className="md:col-span-5">
          <p className={`${label} text-clay`}>Bonsai workshops &middot; Manti, Utah</p>
          <h1 className="mt-6 text-[2.9rem] leading-[1.02] md:text-[4.25rem]">
            Put the phone down.
            <br />
            <em>Pick up a tree.</em>
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-soil">
            Two hours, a little soil under your nails, and a dwarf jade in a handmade pot that goes home with you. No
            experience needed.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link href="/workshops#dates" className="btn-primary">Book a workshop</Link>
            <Link href="/events" className={textLink}>Plan a private event</Link>
          </div>
        </div>
        <div className="md:col-span-7 md:pl-6">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src="/photos/cheesecake-blue-pot.jpg"
              alt="Cheesecake, our oldest dwarf jade bonsai, with a thick curving trunk and layered canopy in a blue glazed pot"
              fill
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm italic text-soil/80">Cheesecake, our oldest tree. He comes to every workshop.</p>
        </div>
      </section>

      {/* Statement */}
      <section className="border-y border-forest/10">
        <Reveal className="container-custom py-20 text-center md:py-28">
          <p className={`${label} text-moss`}>Zion Bonsai</p>
          <p className="mx-auto mt-6 max-w-3xl font-display text-[1.9rem] font-medium leading-[1.25] text-forest md:text-[2.6rem]">
            Zion Bonsai cultivates stillness, curiosity, and connection &mdash; <em>one tree at a time.</em>
          </p>
        </Reveal>
      </section>

      {/* The workshop */}
      <section className="bg-paper-deep py-20 md:py-28">
        <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/photos/workshop-tables-set-for-class.jpg"
                alt="Round tables set with kraft paper, scissors, thank-you cards and large jade plants before class"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm italic text-soil/80">Tables set, before anyone arrives.</p>
          </Reveal>

          <div className="md:col-span-7">
            <p className={`${label} text-moss`}>The workshop</p>
            <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
              Two hours at the table.
            </h2>
            <ol className="mt-10 border-t border-forest/15">
              {beats.map((b, i) => (
                <li key={b.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-forest/15 py-6 md:grid-cols-[3.5rem_1fr]">
                  <span className="font-display text-2xl italic text-soil md:text-3xl" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.45rem] leading-snug md:text-[1.65rem]">{b.title}</h3>
                    <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{b.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-6 border border-forest/20 bg-paper p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              {next ? (
                <div>
                  <p className={`${label} text-clay`}>Next workshop</p>
                  <p className="mt-2 font-display text-[1.9rem] font-medium leading-tight text-forest">
                    {formatDate(next.date)}
                  </p>
                  <p className="mt-1 text-sm text-soil">
                    {formatTime(next.start)}&ndash;{formatTime(next.end)}
                    {venue ? ` · ${venue.name}${venue.location ? `, ${venue.location}` : ''}` : ''}
                  </p>
                </div>
              ) : (
                <p className="font-display text-2xl text-forest">New dates soon.</p>
              )}
              <Link href="/workshops#dates" className="btn-primary shrink-0">See dates</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Made by hand */}
      <section className="py-20 md:py-28">
        <div className="container-custom grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:order-2 md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/photos/workshop-instructor-holding-jade-roots.jpg"
                alt="An instructor holds a jade cutting with bare roots up to show the class, tools on the table below"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="md:order-1 md:col-span-5 md:col-start-1">
            <p className={`${label} text-moss`}>Who you&rsquo;ll learn from</p>
            <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
              An old art, <em>made new at the table.</em>
            </h2>
            <div className="mt-6 space-y-4 leading-[1.7] text-soil">
              <p>
                Bonsai has a thousand years of tradition behind it. We love that, and we skip the gatekeeping.
              </p>
              <p>
                Landon brings the soil, the roots and the technique. Cass brings a floral designer&rsquo;s eye and the belief
                that you don&rsquo;t force a tree, you listen to where it wants to go.
              </p>
            </div>
            <Link href="/our-story" className={`${textLink} mt-8 inline-block`}>Our story</Link>
          </div>
        </div>
      </section>

      {/* Trees we've shaped */}
      <section className="bg-paper-deep py-20 md:py-28">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${label} text-moss`}>Trees we&rsquo;ve shaped</p>
              <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
                Each one its own.
              </h2>
            </div>
            <Link href="/gallery" className={textLink}>See the gallery</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-6">
            <div className="relative aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[640px]">
              <Image
                src="/photos/jade-white-origami-pot-porch.jpg"
                alt="Jade bonsai with a sweeping, thick trunk and exposed roots in a white origami-style pot"
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1 md:gap-6">
              <div className="relative aspect-square overflow-hidden md:aspect-auto md:min-h-[308px]">
                <Image
                  src="/photos/variegated-jade-grey-pot.jpg"
                  alt="Variegated jade bonsai with cream and green leaves and pink tips in a pale grey pot"
                  fill
                  sizes="(min-width: 768px) 38vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden md:aspect-auto md:min-h-[308px]">
                <Image
                  src="/photos/workshop-finished-jade-thank-you-card.jpg"
                  alt="Freshly potted jade in a handmade swirled pot beside a card reading Thank you for growing with us today"
                  fill
                  sizes="(min-width: 768px) 38vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm italic text-soil/80">Pots by Taya&rsquo;s Clay Creations, thrown by hand for every workshop.</p>
        </div>
      </section>

      {/* Groups */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/photos/workshop-barn-tables-ready.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-soil/75" />
        <div className="container-custom py-24 text-linen md:py-32">
          <p className={`${label} text-linen/85`}>Private &amp; corporate events</p>
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

      {/* Close */}
      <section className="container-custom py-24 text-center md:py-32">
        <h2 className="text-[2.6rem] leading-[1.05] md:text-[3.75rem]">
          Unplug. Create. <em>Grow.</em>
        </h2>
        <p className="mt-5 font-script text-2xl text-soil">Come grow with us.</p>
        <Link href="/workshops#dates" className="btn-primary mt-9">Book a workshop</Link>
      </section>
    </>
  )
}
