// The Shopify Buy Button SDK renders into its own iframe-less DOM and takes raw
// style values, so it can't read our CSS variables. These hex values MIRROR the
// tokens in app/globals.css (clay, clay-dark, linen, forest). If a token changes,
// change it here too. This is the only place these hexes live.
export const SHOPIFY_COLORS = {
  clay: '#A84A2B', // --color-clay
  clayDark: '#8F3E23', // --color-clay-dark
  linen: '#FBF8F3', // --color-linen
  forest: '#2F3B22', // --color-forest
} as const

/** Shared primary-button style: clay with linen label, 3px radius, uppercase tracked label. */
export const shopifyButtonStyle = {
  'background-color': SHOPIFY_COLORS.clay,
  color: SHOPIFY_COLORS.linen,
  'border-radius': '3px',
  'font-family': 'Montserrat, sans-serif',
  'font-weight': '600',
  'font-size': '12px',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  ':hover': { 'background-color': SHOPIFY_COLORS.clayDark, color: SHOPIFY_COLORS.linen },
  ':focus': { 'background-color': SHOPIFY_COLORS.clayDark, color: SHOPIFY_COLORS.linen },
}
