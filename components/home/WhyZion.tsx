import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import TextLink from '@/components/ui/TextLink'

// Approved copy from "Why Zion — Website Copy" (Landon, 2026-10-23). Use exactly as written.
export default function WhyZion() {
  return (
    <Section id="why-zion">
      <Reveal className="container-custom grid gap-8 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
            Why <em>Zion?</em>
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="max-w-[38rem] text-lg leading-[1.75] text-soil">
            Our name comes from two places close to our hearts. The first is Zion National Park, where the red rock
            and quiet canyons showed us what peace feels like. The second is what Zion means: a people of one heart
            and one mind. That idea is rooted in our faith and shared by many traditions. Through the ancient art of
            bonsai, we want to help nurture the Zion in all of us, connecting us to nature, to God, and to each other.
            Ten minutes a day with a tree can settle a busy mind and help us show up a little calmer, a little
            kinder, and more present for the people around us.
          </p>
          <TextLink href="/our-story#why-zion" className="mt-8 inline-flex min-h-[44px] items-center">
            Read the whole story
          </TextLink>
        </div>
      </Reveal>
    </Section>
  )
}
