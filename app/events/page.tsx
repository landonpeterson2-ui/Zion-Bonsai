import type { Metadata } from 'next'
import InquiryForm from '@/components/events/InquiryForm'
import Eyebrow from '@/components/ui/Eyebrow'
import Photo from '@/components/ui/Photo'
import PhotoHero from '@/components/ui/PhotoHero'
import Quote from '@/components/ui/Quote'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { getSite, getTestimonials } from '@/lib/content'
import { getPhoto } from '@/lib/photos'

export const metadata: Metadata = {
  title: { absolute: 'Corporate Wellness & Private Bonsai Events | Central Utah' },
  description:
    'Team building, wellness retreats and private parties with Zion Bonsai. Screen-free, hands-on bonsai workshops for your group in Sanpete County, Utah.',
}

const ways = [
  {
    title: 'Corporate wellness & retreats',
    body: 'A team that puts its phones away together and makes something with its hands. Our first was an HR retreat for Snow College.',
  },
  {
    title: 'Private parties',
    body: 'Birthdays, showers, friend groups, date nights. Everyone makes their own tree, and nobody checks their phone to see what time it is.',
  },
  {
    title: 'Private tutoring',
    body: 'One-on-one or a small group, for people who want to go deeper, or who have a tree of their own that needs shaping.',
  },
  {
    title: 'Pop-ups & markets',
    body: 'We set up a table and let people try it. Invite us to yours.',
  },
]

const steps = [
  ['You write to us', 'Tell us who, roughly how many, and when. Rough is fine.'],
  [
    'We plan it together',
    'Group size, length, and where. We can come to you, or host at Sweet Roots Farm & Flora in Manti.',
  ],
  ['Workshop day', 'Phones away, sleeves up. We do the teaching; your people do the making.'],
]

const link = 'font-semibold text-clay underline underline-offset-2'

export default function EventsPage() {
  const site = getSite()
  const [eventQuote] = getTestimonials('events')
  const hero = getPhoto('workshop-barn-tables-ready')
  const landon = getPhoto('workshop-instructor-holding-jade-roots')
  const retreat = getPhoto('event-hr-retreat-repotting-table')

  return (
    <>
      <PhotoHero src={hero.src} alt={hero.alt} objectPosition="object-[30%_50%] md:object-[50%_50%]">
        <Eyebrow tone="linen">Private &amp; corporate events</Eyebrow>
        <h1 className="mt-6 text-[2.9rem] leading-[1.02] text-linen md:text-[4.5rem]">
          Bring the workshop
          <br />
          <em>to your people.</em>
        </h1>
        <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-linen/90">
          Two hours, no notifications, and a table full of tiny trees. Your team or your friends, making something with
          their hands, together.
        </p>
        <div className="mt-9">
          <a href="#inquire" className="btn-primary">Start an inquiry</a>
        </div>
      </PhotoHero>

      {eventQuote ? (
        <Section tone="paper-deep">
          <Reveal className="container-custom">
            <Quote testimonial={eventQuote} size="md" className="max-w-3xl" />
          </Reveal>
        </Section>
      ) : null}

      <Section>
        <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Ways to book us">
              Pick a table. <em>We&rsquo;ll set it.</em>
            </SectionHeading>
            <p className="mt-6 leading-[1.7] text-soil">
              Every event is the same idea: put the phones down and be with a tree. We shape the rest around you.
            </p>
            <Reveal className="mt-10">
              <Photo
                src={retreat.src}
                alt={retreat.alt}
                sizes="(min-width: 768px) 40vw, 100vw"
                aspect="aspect-[4/3]"
                caption="Your people, at the table."
              />
            </Reveal>
          </div>
          <ol className="md:col-span-7">
            {ways.map((w, i) => (
              <li
                key={w.title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-forest/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr]"
              >
                <span className="font-display text-3xl italic text-clay md:text-4xl">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-[1.7rem] leading-tight text-forest md:text-[2rem]">{w.title}</h3>
                  <p className="mt-3 max-w-xl leading-[1.7] text-soil">{w.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper-deep">
        <div className="container-custom grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Photo
              src={landon.src}
              alt={landon.alt}
              sizes="(min-width: 768px) 38vw, 100vw"
              aspect="aspect-[4/5]"
              caption="Landon, with a freshly lifted dwarf jade."
            />
          </div>
          <div className="md:col-span-7">
            <SectionHeading eyebrow="How it works">
              Easy on you, <em>start to finish.</em>
            </SectionHeading>
            <ol className="mt-10">
              {steps.map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-forest/15 py-6 md:grid-cols-[4rem_1fr]">
                  <span className="font-display text-3xl italic text-clay md:text-4xl">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight text-forest">{t}</h3>
                    <p className="mt-2 max-w-lg leading-[1.7] text-soil">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="inquire">
        <div className="container-custom grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Inquire" tone="clay">
              Tell us about <em>your group.</em>
            </SectionHeading>
            <p className="mt-6 leading-[1.7] text-soil">
              A few details is plenty. We&rsquo;ll write back to plan the rest together. You can also email{' '}
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>.
            </p>
            <p className="mt-4 leading-[1.7] text-soil">
              Prefer to talk? Call <a href={`tel:${site.phone}`} className={link}>{site.phone}</a>.
            </p>
          </div>
          <div className="md:col-span-8">
            {site.eventsInquiryUrl ? (
              <div>
                <p className="max-w-xl leading-[1.7] text-soil">Our inquiry form takes about two minutes.</p>
                <a href={site.eventsInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
                  Open the inquiry form
                </a>
              </div>
            ) : (
              <InquiryForm email={site.email} />
            )}
          </div>
        </div>
      </Section>

    </>
  )
}
