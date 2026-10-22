import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'

/** PLACEHOLDER: replace with a real attendee quote (with permission). Never invent one. */
export default function Testimonial() {
  return (
    <Section>
      <Reveal className="container-custom">
        <figure className="relative mx-auto max-w-3xl border border-dashed border-forest/30 px-6 py-12 text-center md:px-12">
          <span className="absolute -top-2.5 left-6 bg-paper px-2 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-soil">
            Placeholder
          </span>
          <blockquote className="font-display text-[1.7rem] italic leading-[1.3] text-forest md:text-[2.2rem]">
            [TESTIMONIAL &mdash; from a real attendee]
          </blockquote>
          <figcaption className="mt-5 font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-moss">
            [NAME, TOWN]
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  )
}
