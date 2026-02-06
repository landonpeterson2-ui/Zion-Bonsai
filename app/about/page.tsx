export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          About <span className="text-coral">Zion Bonsai</span>
        </h1>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
          <span className="font-script text-coral text-3xl">Nurturing bonsai</span>
          <br />
          Nurtures the soul
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="card p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-4">
            It started during COVID. My husband fell down a bonsai rabbit hole on YouTube — the kind where you look up one video and suddenly it's 2am and you're watching someone wire a juniper in Japan.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            In 2021, he ordered his first tree from Little Jade Bonsai. It was a succulent variety, something forgiving enough to grow indoors without needing a degree in horticulture. One plant turned into two. Two turned into a small collection taking over our living room.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Then our second son was born in 2022, and life got beautifully chaotic. In the middle of sleepless nights and toddler meltdowns, I'd watch him tend to these little trees. Shaping them, pruning them, turning them into tiny pieces of living art. It was the most calming thing in our house.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Eventually, I started joining in. I loved the creative side — making something beautiful without needing to know all the "rules" or spend years studying ancient techniques. He learned the traditional art. I just wanted to make things that felt good.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            And that's when it clicked: what if other people could experience this too?
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Why Zion Bonsai Exists</h3>
          <p className="text-lg text-gray-700 mb-4">
            Here in Central Utah, we don't have a lot of spaces where you can unplug, work with your hands, and create something living. We're surrounded by beautiful outdoor recreation, but when it comes to creative, hands-on experiences? The options are pretty limited.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Zion Bonsai fills that gap. We're building a space where you can step away from screens, connect with people in your community, and leave with a piece of living art you made yourself. No intimidating jargon. No pressure to be perfect. Just soil, tools, good company, and a tree that's yours to grow.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We focus on beginner-friendly varieties — especially succulents and indoor-tolerant species — because we believe bonsai shouldn't require a greenhouse or years of study to get started. You can do this in your living room. You can do this with zero experience. And honestly? That's the whole point.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">What Makes Us Different?</h3>
          <ul className="space-y-4 mb-6">
            <li>
              <span className="font-semibold text-coral">We're beginner-focused, not expert-obsessed.</span>
              <p className="text-lg text-gray-700 mt-1">You won't find complicated terminology or gatekeeping here. We break things down so anyone can follow along, ask questions, and actually enjoy the process.</p>
            </li>
            <li>
              <span className="font-semibold text-coral">We prioritize accessibility over tradition.</span>
              <p className="text-lg text-gray-700 mt-1">My husband brings knowledge of traditional bonsai techniques. I bring a love for creating without overthinking it. Together, we've built workshops that respect the art form while making it approachable for real people with real lives.</p>
            </li>
            <li>
              <span className="font-semibold text-coral">We're local to Central Utah.</span>
              <p className="text-lg text-gray-700 mt-1">This isn't a franchise or a side hustle shipped in from somewhere else. We live here. We're raising our family here. And we're building something we wish existed when we first got curious about bonsai.</p>
            </li>
            <li>
              <span className="font-semibold text-coral">We believe in the power of unplugging.</span>
              <p className="text-lg text-gray-700 mt-1">Our workshops are screen-free zones. No phones, no distractions — just two hours where you get to be fully present, work with your hands, and connect with the people around you.</p>
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Who This is for</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-coral">•</span>
              <span>Complete beginners who've always been curious but didn't know where to start</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral">•</span>
              <span>People looking for a creative outlet that doesn't require a huge time commitment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral">•</span>
              <span>Anyone feeling burned out by screens and craving something tactile and grounding</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral">•</span>
              <span>Couples, friends, or families who want to do something together that isn't dinner and a movie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral">•</span>
              <span>Gift-givers looking for a unique, memorable experience (we offer gift certificates!)</span>
            </li>
          </ul>
          <p className="text-lg text-gray-700 mb-4">
            You don't need a green thumb. You don't need prior experience. You just need to show up — we'll handle the rest.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you've never touched a bonsai or you've been curious for years, we'd love to have you. <span className="font-semibold text-coral">Come grow with us.</span>
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-cream rounded-lg p-8 text-center">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h3>
        <div className="space-y-2 text-lg text-gray-700">
          <p>
            <a href="mailto:plants@zionbonsai.com" className="text-coral hover:text-coral-600">
              plants@zionbonsai.com
            </a>
          </p>
          <p>
            <a href="tel:435-201-0336" className="text-coral hover:text-coral-600">
              435-201-0336
            </a>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://facebook.com/zionbonsai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-coral-600"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/zionbonsai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral hover:text-coral-600"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
