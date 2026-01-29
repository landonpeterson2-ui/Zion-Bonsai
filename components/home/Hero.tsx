import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cream to-sage-50 py-20 md:py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nurturing <span className="text-coral">bonsai</span>
              <br />
              <span className="font-script text-4xl md:text-5xl text-sage">Nurtures the soul</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Unplug, create and grow together. Our hands-on bonsai workshops help you cultivate
              mindfulness, creativity and connection in under 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary text-center">
                Shop Plants
              </Link>
              <Link href="/workshops" className="btn-outline text-center">
                View Workshops
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-full bg-coral/10 flex items-center justify-center border-4 border-coral/20">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🌿</div>
                <p className="text-lg text-gray-600">
                  Portulacaria afra
                  <br />
                  <span className="text-coral font-semibold">(Dwarf Jade)</span>
                </p>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
