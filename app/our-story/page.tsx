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
              {/* Cass's approved copy (2026-10-23). Use exactly as written. */}
              <p>
                My husband, Landon, fell down a bonsai rabbit hole on YouTube &mdash; the kind where it&rsquo;s suddenly
                2am and you&rsquo;re watching Peter Chan wire a juniper in the UK.
              </p>
              <p>
                In 2021 he ordered his first tree from Amazon. Inspired by Gilbert Cantu of Little Jade Bonsai, he
                started with a dwarf jade, forgiving enough to grow indoors. One plant turned into two, then a small
                collection quietly taking over our back room.
              </p>
              <p>
                The wiring, the ancient technique, the soil science? Information overload for me. I just wanted
                something pretty to look at, and I wasn&rsquo;t too keen on the &ldquo;rules.&rdquo;
              </p>
              <p>
                Then our youngest was born in 2022. Postpartum complications blindsided me, and some days all I could
                do was sit and watch Landon trim his trees.
              </p>
              <p>
                Somewhere in that fog, I started sitting with them myself. Not to learn anything or get it right. Just
                to be near something quiet and alive. The trees didn&rsquo;t ask anything of me. They kept growing, at
                their own pace, on their own terms. Slowly, so did I.
              </p>
              <p>Bonsai taught me to give myself the same grace I gave those trees.</p>
              <p>
                Landon brought the knowledge. I found the heart of it. And eventually I wondered: what if other people
                could have this too?
              </p>
              <p>If you&rsquo;re in a hard season of your own, there&rsquo;s a seat for you at our table.</p>
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
                caption="Landon, showing a dwarf jade cutting with bare roots."
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

      {/* 3b. Why Zion: approved copy from "Why Zion — Website Copy" (Landon, 2026-10-23). Use exactly as written. */}
      <Section id="why-zion">
        <div className="container-custom">
          <Reveal className="mx-auto max-w-[40rem]">
            <h2 className="text-[2.4rem] leading-[1.05] md:text-[3.25rem]">
              Why <em>Zion?</em>
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-[1.8] text-soil">
              <p>
                The name started with a place. We spent the first eight years of our marriage in St. George, and Zion
                National Park became one of the places we felt most at peace: the red rock, the wide vistas, the
                stillness. Those colors are woven into everything we make, because we want our workshops to feel the
                way that canyon feels.
              </p>
              <p>
                But Zion means more to us than a park. In our faith as members of The Church of Jesus Christ of
                Latter-day Saints, Zion describes a people &ldquo;of one heart and one mind,&rdquo; a oneness we try to
                build in our home and our community. That hope isn&rsquo;t ours alone. It echoes through the Hebrew
                psalms, through the Christian longing for a city of peace, and through the quiet traditions bonsai
                itself grew from. Through the ancient art of bonsai, we want to help nurture the Zion in all of us:
                connection to nature, to God, and to each other.
              </p>
              <p>Our trees have a way of teaching us along the way. Landon puts it like this:</p>
            </div>
          </Reveal>

          {/* Landon's Zeus story: a direct quote, set as a pull quote in his voice. */}
          <Reveal className="mx-auto my-14 max-w-[46rem] md:my-20">
            <figure className="border-l border-clay pl-6 md:pl-10">
              <blockquote className="font-display text-[1.6rem] italic leading-[1.4] text-forest md:text-[2.1rem]">
                <p>
                  &ldquo;Zeus taught me a lot about not fighting things you can&rsquo;t control. He was basically a side
                  branch forced into becoming a main trunk, and despite my early mistakes, he never stalled out. He
                  just rerouted his energy and kept going. Plants don&rsquo;t care about the setback; they just adapt
                  and put out new leaves. It&rsquo;s been a really good reminder that you can&rsquo;t always pick the
                  situation, but you can always decide where to put your energy.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
                Landon
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="mx-auto max-w-[40rem]">
            <div className="space-y-6 text-lg leading-[1.8] text-soil">
              <p>
                For us, a lot of that energy goes into small things, like taking an extra fifteen seconds to look the
                cashier in the eye, say hello, and really ask how they&rsquo;re doing. At seventeen, Cass worked as a
                housekeeper and learned firsthand how it feels when people look through you instead of at you. When
                Landon worked at Dixie State University (now Utah Tech University), he knew everyone by name, from the
                custodian who emptied his office trash to the vice presidents. People are people. Titles
                shouldn&rsquo;t matter.
              </p>
              <p>
                Bonsai gives us room to practice that. Some days our ten minutes with the trees is just watering them,
                or sitting and taking in their beauty. That&rsquo;s often enough to quiet an anxious mind so we can show
                up a little calmer. Other days, &ldquo;I&rsquo;ll trim this one tree&rdquo; turns into hours of shaping
                half the collection. Either way, time with a tree, spent reflecting on the blessings we&rsquo;ve been
                given, makes us a little more whole.
              </p>
              <p>
                This is how we try to show up for our boys, our friends, and the wonderful people at our local gas
                station, who see us several times a day for our daily dose of Mormon caffeine. And it&rsquo;s what we
                hope you&rsquo;ll find in a workshop: a little more of the Zion in you.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 4. Wabi-sabi */}
      <Section tone="paper-deep">
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
        <p className="mt-5 font-display text-[1.75rem] italic text-soil">Come grow with us.</p>
        <Link href="/workshops#dates" className="btn-primary mt-9">Book a workshop</Link>
        <div className="mt-8">
          <TextLink href="/contact" className="inline-flex min-h-[44px] items-center">Get in touch</TextLink>
        </div>
      </section>
    </>
  )
}
