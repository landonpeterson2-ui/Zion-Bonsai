# Stripe Integration Setup Guide

Your Zion Bonsai website is now ready to accept payments! Follow these steps to complete the Stripe integration.

## Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click **Start now** or **Sign in**
3. Fill out your business information
4. Complete identity verification (required for live payments)

## Step 2: Get Your API Keys

### Test Keys (For Development)

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top right)
3. Go to **Developers** → **API keys**
4. You'll see:
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...` (click **Reveal** to see it)

### Add Keys to Your Local Environment

Create a `.env.local` file in your project root:

```bash
# Stripe Keys (TEST MODE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51abc123...
STRIPE_SECRET_KEY=sk_test_51abc123...
STRIPE_WEBHOOK_SECRET=whsec_abc123...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

## Step 3: Test Your Integration Locally

### 3.1 Restart Development Server

```bash
# Stop your dev server (Ctrl+C)
npm run dev
```

### 3.2 Test a Purchase

1. Go to http://localhost:3000
2. Add a product or workshop to cart
3. Go to checkout
4. Click "Proceed to Secure Checkout"

You'll be redirected to Stripe's checkout page.

### 3.3 Use Test Cards

Stripe provides test card numbers:

**Successful Payment:**
```
Card number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Declined Payment:**
```
Card number: 4000 0000 0000 0002
```

**Requires 3D Secure:**
```
Card number: 4000 0025 0000 3155
```

[Full list of test cards](https://stripe.com/docs/testing#cards)

### 3.4 View Test Payments

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure **Test mode** is enabled
3. Click **Payments** to see your test transactions

## Step 4: Set Up Webhooks (Important!)

Webhooks allow Stripe to notify your website when payments succeed/fail.

### 4.1 Install Stripe CLI (for local testing)

**Windows:**
```bash
# Using Scoop
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

[Other installation methods](https://stripe.com/docs/stripe-cli#install)

### 4.2 Login to Stripe CLI

```bash
stripe login
```

This opens your browser to authorize the CLI.

### 4.3 Forward Webhooks to Local Server

In a new terminal window:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You'll see output like:
```
> Ready! Your webhook signing secret is whsec_abc123... (^C to quit)
```

**Copy this webhook secret** and add it to your `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

### 4.4 Test Webhook Events

With the Stripe CLI listening, make a test purchase. You'll see webhook events in the terminal.

## Step 5: Go Live (Production)

Once you're ready to accept real payments:

### 5.1 Activate Your Stripe Account

1. Complete business verification in Stripe Dashboard
2. Add bank account for payouts
3. Set up tax settings (if applicable)

### 5.2 Get Live API Keys

1. Switch to **Live mode** in Stripe Dashboard (toggle top right)
2. Go to **Developers** → **API keys**
3. Copy your live keys:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### 5.3 Add Live Keys to Vercel

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Don't add webhook secret yet** - we'll set that up next.

### 5.4 Create Production Webhook

1. In Stripe Dashboard (Live mode), go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**

6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

8. Redeploy your site for environment variables to take effect

## Step 6: Test Live Payments

1. Go to your live site
2. Make a real purchase (you can refund it later if testing)
3. Check Stripe Dashboard → Payments to see the transaction

**Or use live test mode:**
- Stripe lets you enable "Test mode" on your live account
- This uses real checkout flows but doesn't charge real cards

## Customization Options

### Update Success/Cancel URLs

Edit `app/api/checkout/route.ts`:

```typescript
success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
```

### Add More Payment Methods

In `app/api/checkout/route.ts`, change:

```typescript
payment_method_types: ['card'], // Default: credit/debit cards
```

To:

```typescript
payment_method_types: ['card', 'us_bank_account', 'cashapp'], // Multiple options
```

[Available payment methods](https://stripe.com/docs/payments/payment-methods/integration-options)

### Collect Billing Address

In `app/api/checkout/route.ts`:

```typescript
billing_address_collection: 'required',
```

### Adjust Shipping Countries

```typescript
shipping_address_collection: {
  allowed_countries: ['US', 'CA', 'MX'], // Expand as needed
},
```

## Troubleshooting

### "Stripe key is invalid"
- Make sure you copied the entire key (they're long!)
- Check you're using test keys locally, live keys in production
- Restart your dev server after adding keys

### Webhooks not firing
- Make sure Stripe CLI is running (`stripe listen`)
- Check webhook secret matches in `.env.local`
- Look for errors in terminal where CLI is running

### Checkout session creation fails
- Check API route logs for errors
- Verify all required environment variables are set
- Make sure products have valid prices

### Payments succeed but webhook doesn't fire
- Verify webhook endpoint URL is correct
- Check webhook secret matches
- Look at Stripe Dashboard → Webhooks → Logs for errors

## Security Best Practices

✅ **Do:**
- Keep secret keys in environment variables
- Use webhook secrets to verify webhook authenticity
- Log all webhook events for debugging
- Test thoroughly in test mode first

❌ **Don't:**
- Commit API keys to git
- Use live keys in development
- Skip webhook signature verification
- Process payments without webhooks

## Next Steps

Once Stripe is working:

1. **Set up email confirmations** - Send order receipts via Resend
2. **Add order management** - Build admin panel to view/fulfill orders
3. **Inventory tracking** - Update stock levels after purchases
4. **Refunds** - Handle refunds via Stripe Dashboard or API
5. **Analytics** - Track revenue and popular products

## Support

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: Available in dashboard
- **Test your integration**: [Stripe's testing guide](https://stripe.com/docs/testing)

---

Your Stripe integration is ready! Start with test mode, then go live when you're confident everything works.
