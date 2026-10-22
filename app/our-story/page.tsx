import type { Metadata } from 'next'
import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import TextLink from '@/components/ui/TextLink'
import { getPhoto } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Landon fell down a bonsai rabbit hole, Cass joined in, and now they teach beginner, screen-free bonsai workshops in Sanpete County, Central Utah.',
}

export default function OurStoryPage() {
  const origin = getPhoto('jade-white-origami-pot-porch')
  const landon = getPhoto('workshop-instructor-holding-jade-roots')
  const both = getPhoto('workshop-selfie-in-venue')
  const soil = getPhoto('workshop-hands-in-soil-round-table')
  const cheesecake = getPhoto('cheesecake-blue-pot')

  return (
    <>
      {/* Quiet header: a story reads better led by words than by a full-bleed photo. */}
      <header className="container-custom pb-16 pt-16 md:pb-24 md:pt-24">
        <Eyebrow>Our story</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[2.9rem] leading-[1.02] md:text-[4.5rem]">
          A rabbit hole, a living room full of trees, <em>and an idea.</em>
        </h1>
      </header>

      {/* 1. Opening: mission */}
      <Section bordered tone="paper-deep">
        <Reveal className="container-custom text-center">
          <Eyebrow>Zion Bonsai</Eyebrow>
          <p className="mx-auto mt-6 max-w-3xl font-display text-[1.9rem] font-medium leading-[1.25] text-forest md:text-[2.6rem]">
            Zion Bonsai cultivates stillness, curiosity, and connection &mdash; <em>one tree at a time.</em>
          </p>
        </Reveal>
      </Section>

      {/* 2. How it started */}
      <Section>
        <div className="container-custom grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6 md:col-start-1">
            <SectionHeading eyebrow="How it started">
              It started during <em>COVID.</em>
            </SectionHeading>
            <div className="mt-6 space-y-4 leading-[1.7] text-soil">
              <p>
                My husband fell down a bonsai rabbit hole on YouTube &mdash; the kind where it&rsquo;s suddenly 2am and
                you&rsquo;re watching someone wire a juniper in Japan.
              </p>
              <p>
                In 2021 he ordered his first tree from Little Jade Bonsai, a succulent forgiving enough to grow indoors.
                One plant turned into two, then a small collection taking over our living room.
              </p>
              <p>
                Our second son was born in 2022, and life got beautifully chaotic. In the middle of sleepless nights, I
                watched him tend those little trees. It was the calmest thing in our house.
              </p>
              <p>
                Eventually I joined in. He learned the traditional art. I just wanted to make things that felt good. And
                that&rsquo;s when it clicked: what if other people could experience this too?
              </p>
            </div>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <Photo src={origin.src} alt={origin.alt} sizes="(min-width: 768px) 40vw, 100vw" aspect="aspect-[4/5]" />
          </Reveal>
        </div>
      </Section>

      {/* 3. Landon & Cass */}
      <Section tone="paper-deep">
        <div className="container-custom">
          <SectionHeading eyebrow="Who we are">
            Landon &amp; Cass, <em>the how and the why.</em>
          </SectionHeading>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Photo
                src={landon.src}
                alt={landon.alt}
                sizes="(min-width: 768px) 40vw, 100vw"
                aspect="aspect-[4/5]"
                caption="Landon, showing a jade cutting with bare roots."
              />
              <h3 className="mt-6 font-display text-3xl">Landon</h3>
              <p className="mt-3 leading-[1.7] text-soil">
                Soil, roots and technique. He learned the traditional art and brings that knowledge to the table, minus
                the jargon.
              </p>
            </div>
            <div className="md:mt-16">
              <h3 className="font-display text-3xl">Cass</h3>
              <p className="mt-3 leading-[1.7] text-soil">
                A floral designer&rsquo;s eye, and the aesthetic and feel of it all. She likes making something
                beautiful without needing to know all the rules.
              </p>
              <p className="mt-6 leading-[1.7] text-soil">
                Together we made workshops that respect the art form and stay approachable for real people with real
                lives. We live here, and we&rsquo;re raising our family here.
              </p>
              <div className="mt-8 max-w-md">
                <Photo
                  src={both.src}
                  alt={both.alt}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  aspect="aspect-[4/3]"
                  caption="Cass and Landon."
                  objectPosition="object-[50%_35%]"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Wabi-sabi */}
      <Section>
        <Reveal className="container-custom text-center">
          <Eyebrow>Wabi-sabi</Eyebrow>
          <p className="mx-auto mt-6 max-w-2xl leading-[1.7] text-soil">
            The crooked trunk, the branch that went its own way: that&rsquo;s the beauty. Nobody&rsquo;s tree is supposed
            to look perfect, and yours won&rsquo;t.
          </p>
          <p className="mx-auto mt-8 max-w-2xl font-script text-3xl leading-snug text-forest md:text-4xl">
            &ldquo;You don&rsquo;t force a flower &mdash; the flower tells you where it wants to go.&rdquo;
          </p>
          <p className="mt-4 text-sm italic text-soil/80">Cass</p>
        </Reveal>
      </Section>

      {/* 5. Why unplug: the one dark band */}
      <section className="bg-soil py-20 text-linen md:py-28">
        <div className="container-custom grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <Photo src={soil.src} alt={soil.alt} sizes="(min-width: 768px) 40vw, 100vw" aspect="aspect-[4/5]" />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading eyebrow="Why unplug" tone="linen" headingClassName="text-linen">
              Two hours. <em>Hands full of soil.</em>
            </SectionHeading>
            <div className="mt-6 space-y-4 leading-[1.7] text-linen/90">
              <p>
                Central Utah is full of beautiful outdoor recreation, but not many places to unplug, work with your
                hands and make something living.
              </p>
              <p>
                So that&rsquo;s the table we built. Phones away, no pressure to be perfect, just soil, tools, good
                company and a tree that&rsquo;s yours to grow. You don&rsquo;t need a green thumb. You just need to show
                up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cheesecake */}
      <Section id="cheesecake">
        <div className="container-custom grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:order-2 md:col-span-6">
            <Photo
              src={cheesecake.src}
              alt={cheesecake.alt}
              sizes="(min-width: 768px) 45vw, 100vw"
              aspect="aspect-[4/5]"
            />
          </Reveal>
          <div className="md:order-1 md:col-span-5">
            <SectionHeading eyebrow="Meet Cheesecake">
              Our oldest tree, <em>and he knows it.</em>
            </SectionHeading>
            <div className="mt-6 space-y-4 leading-[1.7] text-soil">
              <p>Cheesecake is our oldest bonsai, and he&rsquo;s at every workshop.</p>
              <p>He&rsquo;s six now. Landon started him as a cutting in a plastic Cheesecake Factory cup, from one of our kids. Look at him now.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Close */}
      <section className="container-custom pb-24 pt-8 text-center md:pb-32">
        <h2 className="text-[2.6rem] leading-[1.05] md:text-[3.75rem]">
          Unplug. Create. <em>Grow.</em>
        </h2>
        <p className="mt-5 font-script text-2xl text-soil">Come grow with us.</p>
        <Link href="/workshops#dates" className="btn-primary mt-9">Book a workshop</Link>
        <div className="mt-8">
          <TextLink href="/contact">Get in touch</TextLink>
        </div>
      </section>
    </>
  )
}
