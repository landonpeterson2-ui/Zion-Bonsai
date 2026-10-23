import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { formatDate, formatTime } from '@/components/ui/NextWorkshop'
import { getFaq, getUpcomingWorkshops } from '@/lib/content'

export function Shaping() {
  const sessions = getUpcomingWorkshops().filter((w) => w.type === 'shaping')
  return (
    <Section>
      <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Return shaping sessions">Your tree keeps growing.</SectionHeading>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <p className="max-w-xl leading-[1.7] text-soil">
            Come back six to nine months after your workshop and we&rsquo;ll help you shape and train your tree as it
            grows. Bring it in, put the phone down again, and see what it has been up to.
          </p>
          {sessions.length > 0 ? (
            <ul className="mt-8 max-w-xl border-t border-forest/15">
              {sessions.map((w) => (
                <li key={w.id} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-forest/15 py-4">
                  <span className="font-display text-xl text-forest">{formatDate(w.date)}</span>
                  <span className="text-sm text-soil">
                    {formatTime(w.start)}&ndash;{formatTime(w.end)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8">
            <TextLink href="#dates">See all dates</TextLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

const whoFor = [
  { title: 'Complete beginners.', body: 'Never touched a bonsai? Perfect. That’s who this is for.' },
  { title: 'Couples and friends.', body: 'A good excuse to spend two hours together without a screen between you.' },
  { title: 'Gift-givers.', body: 'Give someone an afternoon and a tree. Ask us about gift certificates.' },
]

export function WhoFor() {
  return (
    <Section tone="paper-deep">
      <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Who it’s for">Anyone who could use a quiet table.</SectionHeading>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <ul className="border-t border-forest/15">
            {whoFor.map((w) => (
              <li key={w.title} className="border-b border-forest/15 py-6">
                <h3 className="text-[1.45rem] leading-snug md:text-[1.65rem]">{w.title}</h3>
                <p className="mt-1.5 max-w-xl leading-[1.7] text-soil">{w.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href="/contact#gift">Gift certificates</TextLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Faq() {
  const faq = getFaq()
  return (
    <Section>
      <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Questions">Good to know.</SectionHeading>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <div className="border-t border-forest/15">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-forest/15">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.35rem] leading-snug text-forest md:text-[1.5rem] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="font-label text-xl text-moss transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-xl pb-6 leading-[1.7] text-soil">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export function GroupsLine() {
  return (
    <Section tone="paper-deep">
      <div className="container-custom flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow>Groups?</Eyebrow>
          <p className="mt-3 max-w-xl font-display text-[1.9rem] leading-tight text-forest">
            Bringing a team, a party or a class? We&rsquo;ll set up a private table.
          </p>
        </div>
        <TextLink href="/events">Plan a private event</TextLink>
      </div>
    </Section>
  )
}
