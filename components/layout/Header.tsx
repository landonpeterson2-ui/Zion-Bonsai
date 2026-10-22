import { getSite } from '@/lib/content'
import { ShopifyCart } from '@/components/shopify'
import HeaderNav from './HeaderNav'

// Server component: reads content, hands plain props to the client nav.
export default function Header() {
  const { shopEnabled } = getSite()
  return <HeaderNav shopEnabled={shopEnabled} cart={shopEnabled ? <ShopifyCart /> : null} />
}
