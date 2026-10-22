import Link from 'next/link'
import Image from 'next/image'

const workshopCards = [
  {
    slug: 'one-time',
    title: 'One-Time Workshops',
    description: 'Perfect introduction to bonsai',
    tags: ['2 hours', 'Beginner'],
    image: '/gallery/3.jpeg',
    alt: 'Bonsai in a white hexagonal pot',
  },
  {
    slug: 'series',
    title: 'Workshop Series',
    description: 'Multi-week learning journey',
    tags: ['Multi-week', 'All levels'],
    image: '/gallery/8.jpeg',
    alt: 'Bonsai in a grey ceramic pot',
  },
  {
    slug: 'private',
    title: 'Private Sessions',
    description: 'Personalized instruction',
    tags: ['Flexible', 'Groups welcome'],
    image: '/gallery/12.jpeg',
    alt: 'Bonsai in a white tapered pot',
  },
]

export default function WorkshopPreview() {
  return (
    <section className="bg-cream-dark py-16 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow text-sage-700">Workshops</span>
            <h2 className="text-3xl md:text-4xl mt-4 max-w-lg">
              Start with your hands, not your screen.
            </h2>
          </div>
          <Link href="/workshops" className="font-semibold text-coral-600 border-b-[1.5px] border-coral-600 pb-0.5 self-start md:self-auto">
            View all workshops &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {workshopCards.map((card) => (
            <div key={card.slug} className="card border-t-4 border-t-coral">
              <div className="relative h-[250px] w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-sage-700 border border-sage-300 rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl mb-2">{card.title}</h3>
                <p className="text-[15px] text-charcoal/70 mb-4">{card.description}</p>
                <Link href="/workshops" className="text-sm font-semibold text-coral-600">
                  Reserve your seat &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
