import Quote from '@/components/ui/Quote'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import { getRotatingTestimonial } from '@/lib/content'

/** A real attendee quote. Rotates hourly through the Home quotes in content/testimonials.json. */
export default function Testimonial() {
  const t = getRotatingTestimonial('home')
  if (!t) return null
  return (
    <Section>
      <Reveal className="container-custom">
        <Quote testimonial={t} className="max-w-3xl" />
      </Reveal>
    </Section>
  )
}
