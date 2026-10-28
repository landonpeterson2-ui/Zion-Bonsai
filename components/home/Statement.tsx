import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'

export default function Statement() {
  return (
    <Section bordered tone="paper-deep">
      <Reveal className="container-custom text-center">
        <Eyebrow>Our mission</Eyebrow>
        <p className="mx-auto mt-6 max-w-3xl font-display text-[1.9rem] font-medium leading-[1.25] text-forest md:text-[2.6rem]">
          Zion Bonsai cultivates stillness, curiosity, and connection &mdash; <em>one tree at a time.</em>
        </p>
      </Reveal>
    </Section>
  )
}
