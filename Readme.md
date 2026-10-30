# Zion Bonsai 🌿

> *Nurturing bonsai Nurtures the soul*

A modern e-commerce and workshop booking platform for Zion Bonsai, specializing in Portulacaria afra (Dwarf Jade) bonsai at every stage of development.

## 🎨 Brand Colors

- **Coral**: `#E87461` - Primary brand color
- **Sage Green**: `#8B9456` - Secondary color
- **Olive**: `#5C6B3D` - Accent color
- **Cream**: `#F5F1E8` - Background color

## ✨ Features

### E-Commerce
- 🌱 **Shop by Stage**: Four developmental categories
  - Seedlings & Cuttings
  - Pre-Bonsai Starters
  - Intermediate Trained
  - Mature Specimens
- 🛒 **Shopping Cart**: Persistent cart using Zustand
- 💳 **Stripe Integration**: Secure payment processing (ready to configure)
- 📦 **Product Management**: Detailed product pages with care information

### Workshops & Classes
- ✨ **One-Time Workshops**: Introductory bonsai experiences
- 📚 **Workshop Series**: Multi-week comprehensive courses
- 👤 **Private Sessions**: Personalized one-on-one instruction
- 📅 **Date Selection**: Choose from available workshop dates
- 💺 **Capacity Management**: Track available spots

### Content
- 📖 **Care Guide**: Comprehensive Dwarf Jade care instructions
- ℹ️ **About Page**: Business mission and values
- 🎯 **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Stripe account (for payment processing)
- Resend account (for email notifications - optional)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Create a `.env.local` file in the root directory:
   ```env
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Email (Resend)
   RESEND_API_KEY=re_...
   FROM_EMAIL=zionbonsaiplants@gmail.com

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zion-bonsai/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page
│   ├── shop/                # Product catalog
│   │   ├── [stage]/         # Stage-specific shop pages
│   │   └── product/[id]/    # Individual product pages
│   ├── workshops/           # Workshop listings and details
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── about/               # About page
│   └── care-guide/          # Plant care guide
├── components/              # React components
│   ├── layout/              # Header, Footer
│   ├── home/                # Home page sections
│   └── cart/                # Cart components
├── lib/                     # Utilities and data
│   ├── data/                # Sample product and workshop data
│   └── store/               # Zustand state management
├── types/                   # TypeScript type definitions
└── public/                  # Static assets

```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Payments**: Stripe
- **Email**: Resend
- **Date Handling**: date-fns
- **Calendar**: react-big-calendar
- **Deployment**: Cloudflare Workers (see docs/deploy-cloudflare.md)

## 🎯 Next Steps

### Immediate Priorities

1. **Stripe Integration**
   - Create API route for Stripe checkout sessions
   - Set up webhook handlers
   - Test payment flow

2. **Database Setup**
   - Choose database (PostgreSQL, MongoDB, etc.)
   - Set up product and workshop schemas
   - Migrate from sample data to database

3. **Email Notifications**
   - Set up Resend
   - Create email templates
   - Send order confirmations
   - Send workshop booking confirmations

4. **Image Management**
   - Add real product photos
   - Set up image hosting (Cloudinary, S3, etc.)
   - Optimize images for web

5. **Admin Panel**
   - Create admin dashboard
   - Product management interface
   - Workshop scheduling interface
   - Order management

### Future Enhancements

- User accounts and authentication
- Order history
- Wishlist functionality
- Product reviews
- Workshop waitlist
- Gift cards
- Subscription boxes
- Blog/educational content
- SEO optimization
- Analytics integration

## 💳 Stripe Setup

To enable payments:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add them to `.env.local`
4. Create API route at `app/api/create-checkout-session/route.ts`
5. Install Stripe CLI for local webhook testing

Example checkout session API route:

```typescript
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { items } = await req.json()

  const session = await stripe.checkout.sessions.create({
    // Configure checkout session
  })

  return Response.json({ sessionId: session.id })
}
```

## 📧 Email Setup

Using Resend for transactional emails:

1. Create account at [resend.com](https://resend.com)
2. Get API key and add to `.env.local`
3. Create email templates
4. Send emails via API routes

## 🎨 Customization

### Colors

Brand colors are defined in [tailwind.config.ts](tailwind.config.ts). Modify the color palette to match your brand.

### Content

- Update product data in `lib/data/products.ts`
- Update workshop data in `lib/data/workshops.ts`
- Modify copy in component files

### Fonts

Add custom fonts in [app/layout.tsx](app/layout.tsx) using `next/font`.

## 🚀 Deployment

The site runs on Cloudflare Workers at https://zionbonsai.com. Every push to `main` builds and deploys automatically. Setup and commands: [docs/deploy-cloudflare.md](docs/deploy-cloudflare.md).

## 📱 Contact

- **Email**: zionbonsaiplants@gmail.com
- **Phone**: 435-201-0336
- **Facebook**: [@zionbonsai](https://facebook.com/zionbonsai)
- **Instagram**: [@zionbonsai](https://instagram.com/zionbonsai)

## 📄 License

Copyright © 2026 Zion Bonsai. All rights reserved.

---

Built with 💚 for the love of bonsai
