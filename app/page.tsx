import Hero from '@/components/home/Hero'
// import ShopByStage from '@/components/home/ShopByStage'
import WorkshopPreview from '@/components/home/WorkshopPreview'
import About from '@/components/home/About'

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-cream via-sage-50 via-75% to-white">
      {/* Texture rides on top of the color gradient across the whole homepage,
          fading out near the bottom so it dissolves before the footer instead
          of cutting off in a hard line. */}
      <div
        className="bg-grain-legacy absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
        }}
      />
      <div className="relative">
        <Hero />
        {/* <ShopByStage /> */}
        <About />
        <WorkshopPreview />
      </div>
    </div>
  )
}
