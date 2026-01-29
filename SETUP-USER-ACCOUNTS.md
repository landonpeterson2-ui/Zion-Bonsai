# User Accounts & Order History - Setup Guide

## ✅ What's Been Implemented

The core foundation for user accounts and order history has been implemented:

### Database & Schema
- ✅ Prisma ORM configured with PostgreSQL
- ✅ Complete database schema with 11 models:
  - User, Account, Session (authentication)
  - Product, Workshop, WorkshopDate (catalog)
  - Order, OrderItem (transactions)
  - Address, FavoriteProduct, WorkshopRegistration (user data)
- ✅ Database seed script to migrate hardcoded data

### Authentication
- ✅ NextAuth.js v5 configured
- ✅ Credentials provider (email/password)
- ✅ Google OAuth provider (optional)
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ Protected route middleware
- ✅ Auth API routes ([...nextauth])

### Order Processing
- ✅ Checkout API creates orders in database before Stripe redirect
- ✅ Order number generator (format: ZB-2026-0001)
- ✅ Stripe webhook processes orders:
  - Updates order status to "paid"
  - Creates workshop registrations
  - Decrements product inventory
  - Decrements workshop spots
  - Sends confirmation email

### Email System
- ✅ Order confirmation email template (React Email)
- ✅ Email sending service with Resend
- ✅ Automatic emails after successful payment

### Core Files Created
- `prisma/schema.prisma` - Database schema
- `lib/db/prisma.ts` - Prisma client singleton
- `lib/auth/auth.ts` & `lib/auth/auth.config.ts` - Authentication
- `lib/utils/password.ts` - Password hashing utilities
- `lib/utils/order-number.ts` - Order number generator
- `lib/email/send.ts` - Email sending service
- `lib/email/templates/OrderConfirmation.tsx` - Email template
- `app/api/auth/[...nextauth]/route.ts` - Auth API
- `middleware.ts` - Route protection
- Modified `app/api/checkout/route.ts` - Order creation
- Modified `app/api/webhooks/stripe/route.ts` - Order fulfillment

## 🚧 What Still Needs To Be Built

The UI components and user-facing pages need to be created:

### Auth Pages
- `/login` - Login page with email/password form
- `/register` - Registration page
- Auth components (LoginForm, RegisterForm, AuthButton)

### Customer Dashboard
- `/dashboard` - Dashboard layout with navigation
- `/dashboard/orders` - Order history
- `/dashboard/orders/[id]` - Order details
- `/dashboard/workshops` - Workshop registrations
- `/dashboard/addresses` - Saved addresses
- `/dashboard/favorites` - Favorite products
- `/dashboard/profile` - Profile settings

### Dashboard API Routes
- `/api/user/profile` - User profile management
- `/api/user/addresses` - Address CRUD
- `/api/user/favorites` - Favorites management
- `/api/orders` - List orders
- `/api/orders/[id]` - Order details
- `/api/workshops/registrations` - Workshop registrations
- `/api/orders/claim` - Guest order claiming

### Updates to Existing Pages
- Update Header component with auth button
- Update checkout page with saved address selection
- Update success page with order details from database

## 📋 Setup Instructions

### Step 1: Set Up Database

**Option A: Vercel Postgres (Recommended for Vercel deployment)**

1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` connection string
4. Add to `.env.local`

**Option B: Railway (Free tier available)**

1. Visit [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the `DATABASE_URL` from connection string
4. Add to `.env.local`

**Option C: Supabase (Free tier available)**

1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Go to Project Settings → Database
4. Copy the connection string (use "Pooler" for production)
5. Add to `.env.local`

**Option D: Local PostgreSQL**

```bash
# Install PostgreSQL locally
# Then create database:
createdb zion_bonsai

# Connection string:
DATABASE_URL="postgresql://localhost:5432/zion_bonsai"
```

### Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your values:

**Required:**
```env
DATABASE_URL="your-database-url-here"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

**Optional (for Google OAuth):**
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

To set up Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Step 3: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Seed database (migrate products/workshops from hardcoded files)
npx prisma db seed
```

### Step 4: Test the Setup

```bash
# Start development server
npm run dev
```

**Test Order Flow:**

1. Add products to cart
2. Go to checkout
3. You'll be redirected to Stripe
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Check console logs for order processing
7. Order should be saved to database

**Verify in Database:**

```bash
# Open Prisma Studio to view database
npx prisma studio
```

Check:
- Products and workshops are seeded
- Order was created after checkout
- Order status is "paid" after webhook
- Inventory was decremented

### Step 5: Test Stripe Webhook Locally

```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Use the webhook secret from Terminal 2 in .env.local
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Step 6: Build UI Components (Next Phase)

Use the plan in `~/.claude/plans/cozy-soaring-pond.md` as your guide.

**Priority order:**

1. **Auth Pages** - Start with login/register so users can create accounts
2. **Auth Button** - Add to header so users can access auth
3. **Dashboard Layout** - Basic dashboard with navigation
4. **Orders Page** - Show order history (most valuable to users)
5. **Other Dashboard Pages** - Workshops, addresses, favorites, profile

**Quick Start Templates:**

For login page (`app/(auth)/login/page.tsx`):
```typescript
import { signIn } from '@/lib/auth/auth'

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server'
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    })
  }

  return (
    <form action={handleLogin}>
      {/* Add form fields */}
    </form>
  )
}
```

For register page, see plan for full implementation.

## 🔍 Verification Checklist

After setting up:

- [ ] Database connection works (`npx prisma studio`)
- [ ] Products and workshops seeded
- [ ] Guest checkout creates order in database
- [ ] Stripe webhook processes order successfully
- [ ] Order status updates to "paid"
- [ ] Inventory decrements after purchase
- [ ] Workshop spots decrement after booking
- [ ] (If email configured) Confirmation email sent

## 📚 Database Schema Overview

**Key Models:**

- `User` - User accounts (email, password, name)
- `Order` - Orders (can be linked to user or guest)
  - `userId` is nullable for guest checkout
  - `orderNumber` is human-readable (ZB-2026-0001)
  - Stores shipping address inline for guests
- `OrderItem` - Items in order (products or workshops)
- `Product` - Product catalog
- `Workshop` - Workshops with multiple dates
- `WorkshopRegistration` - User workshop bookings
- `Address` - Saved user addresses
- `FavoriteProduct` - User favorites

**Guest Checkout Flow:**
- Order created with `userId = null`
- Customer email/name captured from Stripe
- When user registers with matching email, orders can be "claimed"

## 🎯 Next Steps

1. **Set up database** (choose from options above)
2. **Configure environment variables**
3. **Run migrations and seed**
4. **Test order flow** end-to-end
5. **Build auth pages** (login/register)
6. **Build dashboard** (order history first)
7. **Deploy to production**

## 📖 Resources

- **Plan File:** `~/.claude/plans/cozy-soaring-pond.md` (comprehensive implementation plan)
- **Prisma Docs:** https://www.prisma.io/docs
- **NextAuth.js Docs:** https://next-auth.js.org
- **Resend Docs:** https://resend.com/docs
- **React Email:** https://react.email

## 🐛 Troubleshooting

**Database connection fails:**
- Verify `DATABASE_URL` is correct
- Check database is running
- For cloud databases, check IP allowlist

**Migrations fail:**
- Delete `prisma/migrations` folder
- Run `npx prisma migrate dev --name init` again

**Webhook not working:**
- Check `STRIPE_WEBHOOK_SECRET` is set
- Use `stripe listen` for local testing
- Check console logs for errors

**Email not sending:**
- Verify `RESEND_API_KEY` is set
- Check `FROM_EMAIL` is valid
- For production, verify domain in Resend
- For testing, use `onboarding@resend.dev` as `FROM_EMAIL`

## 🎉 Success!

You now have a solid foundation for user accounts and order history. The core backend is complete - just add the UI!

Key achievements:
- ✅ Database with complete schema
- ✅ Authentication ready
- ✅ Orders persist to database
- ✅ Workshop registrations tracked
- ✅ Inventory management
- ✅ Email confirmations

Continue building the customer dashboard to give users visibility into their orders and account!
