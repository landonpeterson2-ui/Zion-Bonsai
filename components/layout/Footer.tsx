import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-sage-700 text-cream py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/ZB Logo Transparent.png"
              alt="Zion Bonsai"
              width={100}
              height={100}
              className="h-20 w-auto mb-2"
            />
            <p className="mt-2 text-cream-dark text-sm italic">
              Nurturing bonsai Nurtures the soul
            </p>
          </div>

          {/* Workshops */}
          <div>
            <h4 className="font-semibold mb-4">Workshops</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/workshops" className="text-cream-dark hover:text-coral transition-colors">View All Classes</Link></li>
              <li><Link href="/workshops/one-time" className="text-cream-dark hover:text-coral transition-colors">One-Time Workshops</Link></li>
              <li><Link href="/workshops/series" className="text-cream-dark hover:text-coral transition-colors">Workshop Series</Link></li>
              <li><Link href="/workshops/private" className="text-cream-dark hover:text-coral transition-colors">Private Sessions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:plants@zionbonsai.com" className="text-cream-dark hover:text-coral transition-colors">
                  plants@zionbonsai.com
                </a>
              </li>
              <li>
                <a href="tel:435-201-0336" className="text-cream-dark hover:text-coral transition-colors">
                  435-201-0336
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
                <a href="https://facebook.com/zionbonsai" target="_blank" rel="noopener noreferrer" className="text-cream-dark hover:text-coral transition-colors">
                  Facebook
                </a>
                <a href="https://instagram.com/zionbonsai" target="_blank" rel="noopener noreferrer" className="text-cream-dark hover:text-coral transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cream-dark/20 text-center text-sm text-cream-dark">
          <p>&copy; {new Date().getFullYear()} Zion Bonsai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
