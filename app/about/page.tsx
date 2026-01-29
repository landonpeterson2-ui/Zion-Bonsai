export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
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
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            We believe that nurturing bonsai nurtures the soul. In our fast-paced,
            digitally-connected world, we offer something different: a chance to slow down,
            create with your hands, and connect with nature and community.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Specializing in Portulacaria afra (Dwarf Jade), we provide plants at every stage
            of their journey - because we believe everyone should have the opportunity to
            experience the meditative art of bonsai, regardless of their experience level.
          </p>
          <p className="text-lg text-gray-700">
            Our workshops combine ancient techniques with modern wellness practices, creating
            spaces for mindfulness, creativity, and genuine human connection.
          </p>
        </div>
      </div>

      {/* The Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-olive-dark text-cream rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-coral text-xl">•</span>
              <span>Constant digital connectivity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral text-xl">•</span>
              <span>Limited creative opportunities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral text-xl">•</span>
              <span>Lack of community</span>
            </li>
          </ul>
        </div>

        <div className="bg-sage text-white rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">The Solution</h3>
          <p className="text-lg">
            Unplug, create and grow - together. Our hands-on bonsai workshops help you cultivate
            mindfulness, creativity and connection in under 2 hours.
          </p>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-gradient-to-br from-coral-50 to-sage-50 rounded-lg p-8 mb-16">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Who We Serve</h3>
        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
          Wellness-focused individuals from ages 25-45 seeking creative, community experiences
          that provide a break from digital overwhelm and nurture the soul.
        </p>
      </div>

      {/* Our Approach */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">What Makes Us Unique</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-4">🌱</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Every Stage</h4>
            <p className="text-gray-600">
              Plants available at all developmental stages, from cuttings to mature specimens
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Focus</h4>
            <p className="text-gray-600">
              Workshops designed to foster connection and creativity
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Artisan Collaboration</h4>
            <p className="text-gray-600">
              Custom ceramic pots and local maker partnerships
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-cream rounded-lg p-8 text-center">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
        <div className="space-y-2 text-lg text-gray-700">
          <p>
            <a href="mailto:zionbonsaiplants@gmail.com" className="text-coral hover:text-coral-600">
              zionbonsaiplants@gmail.com
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
