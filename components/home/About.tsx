import Link from 'next/link'

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why <span className="text-coral">Bonsai</span>?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            In a world that&apos;s constantly pulling your attention in a hundred directions,
            bonsai asks you to slow down. To focus. To create something with intention.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            It&apos;s not complicated. It&apos;s not expensive. And you don&apos;t need to be an expert.
          </p>
          <p className="text-xl font-medium text-sage mb-10">
            You just need to show up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workshops" className="btn-primary text-center">
              See Upcoming Workshops
            </Link>
            <Link href="/gift" className="btn-outline text-center">
              Buy a Gift Certificate
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
