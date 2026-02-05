# Shopify Buy Button Setup Guide

This guide walks you through setting up Shopify Buy Button integration for Zion Bonsai.

## Prerequisites

1. A Shopify store (Starter plan at $5/month is sufficient)
2. Products added to your Shopify store

## Step 1: Create Your Shopify Store

1. Go to [shopify.com](https://www.shopify.com) and sign up
2. Choose the **Starter** plan ($5/month) - this supports Buy Button
3. Complete the basic store setup

## Step 2: Add Products

Add your bonsai products to Shopify:

### For Bonsai Plants
- **Title**: Product name (e.g., "Dwarf Jade Cutting Set")
- **Description**: Full product description
- **Price**: Set your price
- **Images**: Upload product photos

### For Workshops
- **Title**: Workshop name (e.g., "Introduction to Bonsai")
- **Description**: Workshop details, date, time, location
- **Price**: Workshop price
- **Inventory**: Set to track quantity and limit to workshop capacity

## Step 3: Generate Storefront Access Token

1. Go to **Settings > Apps and sales channels** in Shopify admin
2. Click **Develop apps**
3. Click **Create an app**
4. Name it "Zion Bonsai Buy Button"
5. Click **Configure Storefront API scopes**
6. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
7. Click **Save**
8. Go to **API credentials** tab
9. Click **Install app**
10. Copy the **Storefront API access token**

## Step 4: Configure Environment Variables

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
```

Replace:
- `your-store` with your actual Shopify store subdomain
- `your-storefront-access-token` with the token from Step 3

## Step 5: Add Product IDs to Your Pages

### Finding Product IDs

1. Go to **Products** in Shopify admin
2. Click on a product
3. The ID is in the URL: `https://admin.shopify.com/store/your-store/products/1234567890`
4. The number at the end (`1234567890`) is the Product ID

### Adding Products to Shop Page

Edit `app/shop/page.tsx` and add your products:

```tsx
const products = [
  { id: 'gid://shopify/Product/1234567890', name: 'Dwarf Jade Cutting Set', stage: 'seedlings' },
  { id: 'gid://shopify/Product/1234567891', name: 'Premium Starter', stage: 'starters' },
  // Add more products...
]
```

### Adding Workshops

Edit `app/workshops/page.tsx` and add your workshops:

```tsx
const workshops = [
  { id: 'gid://shopify/Product/1234567892', title: 'Introduction to Bonsai', type: 'one-time' },
  { id: 'gid://shopify/Product/1234567893', title: 'Bonsai Fundamentals Series', type: 'series' },
  // Add more workshops...
]
```

**Note:** The ID format is `gid://shopify/Product/` followed by the product number.

## Testing

1. Run `npm run dev`
2. Visit your shop page
3. Verify products display with Buy Button
4. Test adding items to cart
5. Complete a test checkout (use Shopify test mode)

## Customization

### Button Styling
Edit `components/shopify/ShopifyBuyButton.tsx` to customize:
- Button colors (currently green: #166534)
- Button text
- Price display
- Product card layout

## Shopify Test Mode

For testing without real payments:

1. Go to **Settings > Payments** in Shopify admin
2. Enable **Shopify Payments** test mode, or
3. Use **Bogus Gateway** for testing

Test credit card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

## Going Live

Before launching:

1. [ ] Add all products with images and descriptions
2. [ ] Configure shipping rates in Shopify
3. [ ] Set up payment processing (Stripe via Shopify Payments recommended)
4. [ ] Configure tax settings
5. [ ] Update environment variables in production (Vercel)
6. [ ] Disable test mode in Shopify Payments

## Troubleshooting

### Products Not Loading
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure Storefront API access token has correct scopes
- Verify product ID format: `gid://shopify/Product/XXXXX`

### Checkout Not Working
- Verify `unauthenticated_write_checkouts` scope is enabled
- Check that products are published and active

### Styling Issues
- Clear browser cache
- Check for CSS conflicts with Tailwind
- Inspect Shopify Buy Button iframe for styling overrides

## Support

- [Shopify Buy Button Documentation](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/buy-button)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
