export default function About() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The <span className="text-coral">Zion Bonsai</span> Story
              </h2>
              <p className="text-gray-700 mb-4">
                We believe that nurturing bonsai nurtures the soul. In our fast-paced,
                digitally-connected world, we offer something different: a chance to slow down,
                create with your hands, and connect with nature and community.
              </p>
              <p className="text-gray-700 mb-4">
                Specializing in Portulacaria afra (Dwarf Jade), we provide plants at every stage
                of their journey - because we believe everyone should have the opportunity to
                experience the meditative art of bonsai, regardless of their experience level.
              </p>
              <p className="text-gray-700 mb-6">
                Our workshops combine ancient techniques with modern wellness practices, creating
                spaces for mindfulness, creativity, and genuine human connection.
              </p>
            </div>

            <div className="bg-gradient-to-br from-coral/10 to-sage/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Plant Care Basics</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-coral mb-1">☀️ Sunlight</p>
                  <p className="text-sm text-gray-600">Thrives in bright to medium sunlight. 6+ hours/day</p>
                </div>
                <div>
                  <p className="font-semibold text-coral mb-1">💧 Water</p>
                  <p className="text-sm text-gray-600">Once a week in cold months. 2-3 times/week in summer.</p>
                </div>
                <div>
                  <p className="font-semibold text-coral mb-1">🌡️ Temperature</p>
                  <p className="text-sm text-gray-600">Warm & humid is best. 55°F - 95°F ideal range</p>
                </div>
                <div>
                  <p className="font-semibold text-coral mb-1">🌱 Plant Food</p>
                  <p className="text-sm text-gray-600">Fertilize every other month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
