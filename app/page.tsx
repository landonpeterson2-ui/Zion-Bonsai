import type { Metadata } from 'next'
import Close from '@/components/home/Close'
import Groups from '@/components/home/Groups'
import Hero from '@/components/home/Hero'
import Statement from '@/components/home/Statement'
import Testimonial from '@/components/home/Testimonial'
import TheWorkshop from '@/components/home/TheWorkshop'
import TreesWeveShaped from '@/components/home/TreesWeveShaped'
import WhoYoullLearnFrom from '@/components/home/WhoYoullLearnFrom'
import WhyZion from '@/components/home/WhyZion'

// The next-workshop block depends on today's date, so refresh hourly.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Zion Bonsai | Beginner Bonsai Workshops in Manti, Utah',
  description:
    'Screen-free beginner bonsai workshops in Sanpete County, Utah: two hours at the table, and you take home a jade bonsai in a handmade pot.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <WhyZion />
      <TheWorkshop />
      <WhoYoullLearnFrom />
      <TreesWeveShaped />
      <Groups />
      <Testimonial />
      <Close />
    </>
  )
}
