export default function CareGuidePage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="text-coral">Dwarf Jade</span> Care Guide
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Everything you need to know about caring for your Portulacaria afra bonsai
        </p>

        {/* Quick Reference */}
        <div className="card p-8 mb-12 bg-gradient-to-br from-cream to-sage-50">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-2xl mb-2">☀️ <strong className="text-coral">Sunlight</strong></p>
              <p className="text-gray-700">Bright to medium sunlight</p>
              <p className="text-gray-600 text-sm">6+ hours per day</p>
            </div>
            <div>
              <p className="text-2xl mb-2">💧 <strong className="text-coral">Water</strong></p>
              <p className="text-gray-700">Moderate watering</p>
              <p className="text-gray-600 text-sm">Once a week in winter, 2-3x weekly in summer</p>
            </div>
            <div>
              <p className="text-2xl mb-2">🌡️ <strong className="text-coral">Temperature</strong></p>
              <p className="text-gray-700">Warm & humid is best</p>
              <p className="text-gray-600 text-sm">55°F - 95°F ideal range</p>
            </div>
            <div>
              <p className="text-2xl mb-2">🌱 <strong className="text-coral">Fertilizer</strong></p>
              <p className="text-gray-700">Regular feeding</p>
              <p className="text-gray-600 text-sm">Every other month during growing season</p>
            </div>
          </div>
        </div>

        {/* Detailed Care Instructions */}
        <div className="space-y-8">
          {/* Watering */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">💧 Watering</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Portulacaria afra is a succulent, which means it stores water in its leaves and can
                tolerate some drought. However, for healthy growth as a bonsai, consistent watering
                is important.
              </p>
              <div>
                <p className="font-semibold text-coral mb-2">Winter (Cold months):</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Water once a week</li>
                  <li>Allow soil to dry slightly between waterings</li>
                  <li>Reduce watering if plant goes dormant</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-coral mb-2">Summer (Warm months):</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Water 2-3 times per week</li>
                  <li>Check soil daily during hot weather</li>
                  <li>Water thoroughly until it drains from bottom</li>
                </ul>
              </div>
              <p className="bg-sage-50 p-3 rounded">
                <strong>Tip:</strong> Water in the morning to allow excess moisture to evaporate during the day.
              </p>
            </div>
          </div>

          {/* Light */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">☀️ Light Requirements</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Dwarf Jade thrives in bright light and can tolerate direct sunlight, especially
                when acclimated gradually.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide 6+ hours of bright light daily</li>
                <li>South or west-facing windows are ideal indoors</li>
                <li>Can be placed outdoors in partial to full sun during warm months</li>
                <li>Leaves may develop red edges in bright light (this is normal and attractive)</li>
                <li>Insufficient light leads to leggy growth and pale leaves</li>
              </ul>
              <p className="bg-sage-50 p-3 rounded">
                <strong>Tip:</strong> When moving your plant to brighter light, do so gradually over 1-2 weeks
                to prevent sunburn.
              </p>
            </div>
          </div>

          {/* Temperature */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌡️ Temperature & Humidity</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Portulacaria afra is native to South Africa and prefers warm temperatures.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ideal temperature range: 55°F - 95°F (13°C - 35°C)</li>
                <li>Can tolerate brief periods down to 40°F (4°C)</li>
                <li>Protect from frost - bring indoors if temperatures drop below 40°F</li>
                <li>Prefers moderate to high humidity but adapts to average household humidity</li>
                <li>Good air circulation is beneficial</li>
              </ul>
            </div>
          </div>

          {/* Feeding */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌱 Fertilizing</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Regular feeding promotes healthy growth and vibrant foliage.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fertilize every other month during the growing season (spring through fall)</li>
                <li>Use a balanced fertilizer (10-10-10 or similar) at half strength</li>
                <li>Reduce or stop fertilizing in winter when growth slows</li>
                <li>Organic options: diluted fish emulsion or compost tea</li>
              </ul>
              <p className="bg-sage-50 p-3 rounded">
                <strong>Tip:</strong> Always water before fertilizing to prevent root burn.
              </p>
            </div>
          </div>

          {/* Pruning & Shaping */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">✂️ Pruning & Shaping</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Dwarf Jade responds well to pruning and can be shaped into beautiful bonsai forms.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prune during growing season for best results</li>
                <li>Use sharp, clean scissors or bonsai shears</li>
                <li>Remove crossing branches and those growing straight up or down</li>
                <li>Wiring can be done but isn't always necessary</li>
                <li>Branches become brittle with age - wire young, flexible growth</li>
                <li>Pinch back new growth to encourage ramification</li>
              </ul>
            </div>
          </div>

          {/* Repotting */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">🏺 Repotting</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Repotting refreshes the soil and promotes healthy root development.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Repot young plants every 2 years</li>
                <li>Mature specimens can go 3-4 years between repotting</li>
                <li>Best time: early spring before new growth begins</li>
                <li>Use well-draining bonsai soil mix (50% organic, 50% inorganic)</li>
                <li>Trim up to 1/3 of root mass when repotting</li>
                <li>Water thoroughly after repotting and keep out of direct sun for 1-2 weeks</li>
              </ul>
            </div>
          </div>

          {/* Common Issues */}
          <div className="card p-8 bg-coral-50">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">⚠️ Common Issues</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-coral">Leaf Drop:</p>
                <p>Usually caused by overwatering or sudden environmental changes. Adjust watering and keep conditions stable.</p>
              </div>
              <div>
                <p className="font-semibold text-coral">Wrinkled Leaves:</p>
                <p>Sign of underwatering. Water thoroughly and establish a consistent watering schedule.</p>
              </div>
              <div>
                <p className="font-semibold text-coral">Leggy Growth:</p>
                <p>Insufficient light. Move to a brighter location and prune back leggy stems.</p>
              </div>
              <div>
                <p className="font-semibold text-coral">Pests:</p>
                <p>Occasionally affected by mealybugs or aphids. Treat with insecticidal soap or neem oil.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-br from-sage to-olive rounded-lg text-white">
          <h3 className="text-3xl font-semibold mb-4">Questions?</h3>
          <p className="text-lg mb-6">
            Join one of our workshops or reach out for personalized care advice!
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/workshops" className="bg-white text-sage px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              View Workshops
            </a>
            <a href="mailto:zionbonsaiplants@gmail.com" className="bg-coral text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
