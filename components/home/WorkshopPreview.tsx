export default function WorkshopPreview() {
  const features = [
    {
      emoji: '🌿',
      title: 'Hands-on learning',
      description:
        'We guide you through every step, from selecting your tree to shaping and potting it.',
    },
    {
      emoji: '🪴',
      title: 'Beginner-friendly plants',
      description:
        'We work with succulents and indoor-tolerant varieties that are forgiving and beautiful.',
    },
    {
      emoji: '🤝',
      title: 'Good company',
      description:
        'Small groups (8-12 people) mean you get personalized attention and real connection.',
    },
    {
      emoji: '🏡',
      title: 'Take it home',
      description:
        "Your tree is yours to keep and grow. We'll teach you how to care for it long after the workshop ends.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-sage-50 to-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What to <span className="text-coral">Expect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="card">
              <div className="p-6">
                <div className="text-3xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
