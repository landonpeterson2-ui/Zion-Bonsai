import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-sage text-charcoal py-14">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/ZB Logo Transparent.png"
              alt="Zion Bonsai"
              width={160}
              height={160}
              className="h-32 w-auto mb-2"
            />
            <p className="mt-2 font-heading italic text-charcoal/80 text-base">
              Nurturing bonsai nurtures the soul.
            </p>
          </div>

          {/* Workshops */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest mb-5">Workshops</h4>
            <ul className="space-y-3 text-[14.5px] font-medium">
              <li><Link href="/workshops" className="hover:text-cream-light transition-colors">View All Classes</Link></li>
              <li><Link href="/workshops/one-time" className="hover:text-cream-light transition-colors">One-Time Workshops</Link></li>
              <li><Link href="/workshops/series" className="hover:text-cream-light transition-colors">Workshop Series</Link></li>
              <li><Link href="/workshops/private" className="hover:text-cream-light transition-colors">Private Sessions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest mb-5">Connect</h4>
            <ul className="space-y-3 text-[14.5px] font-medium">
              <li>
                <a href="mailto:plants@zionbonsai.com" className="hover:text-cream-light transition-colors">
                  plants@zionbonsai.com
                </a>
              </li>
              <li>
                <a href="tel:435-201-0336" className="hover:text-cream-light transition-colors">
                  435-201-0336
                </a>
              </li>
              <li className="flex space-x-5 mt-2">
                <a href="https://facebook.com/zionbonsai" target="_blank" rel="noopener noreferrer" className="hover:text-cream-light transition-colors">
                  Facebook
                </a>
                <a href="https://instagram.com/zionbonsai" target="_blank" rel="noopener noreferrer" className="hover:text-cream-light transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal/20 flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-charcoal/75">
          <p>&copy; {new Date().getFullYear()} Zion Bonsai. All rights reserved.</p>
          <p>Central Utah</p>
        </div>
      </div>
    </footer>
  )
}
