import Eyebrow from '@/components/ui/Eyebrow'
import Quote from '@/components/ui/Quote'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getFaq, getTestimonials } from '@/lib/content'

const whoFor = [
  { title: 'Complete beginners.', body: 'Never touched a bonsai? Perfect. That’s who this is for.' },
  { title: 'Couples and friends.', body: 'A good excuse to spend two hours together without a screen between you.' },
  { title: 'Gift-givers.', body: 'Give someone an afternoon and a tree. Ask us about gift certificates.' },
]

export function WhoFor() {
  const quotes = getTestimonials('workshops')
  return (
    <Section>
      <div className="container-custom grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Who it’s for">Anyone who could use a quiet table.</SectionHeading>
          {quotes.length > 0 ? (
            <div className="mt-12 hidden space-y-10 border-l border-clay pl-6 md:block">
              {quotes.map((q) => (
                <Quote key={q.id} testimonial={q} size="md" align="left" />
              ))}
            </div>
          ) : null}
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
          {/* Phones: quotes follow the list instead of sitting beside it. */}
          {quotes.length > 0 ? (
            <div className="mt-12 space-y-10 border-l border-clay pl-6 md:hidden">
              {quotes.map((q) => (
                <Quote key={q.id} testimonial={q} size="md" align="left" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  )
}

export function Faq() {
  const faq = getFaq()
  return (
    <Section tone="paper-deep">
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
    <Section>
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
