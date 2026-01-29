import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session

      // Payment was successful
      console.log('Payment successful:', session.id)
      console.log('Customer email:', session.customer_details?.email)
      console.log('Amount paid:', session.amount_total)

      // Here you would:
      // 1. Save the order to your database
      // 2. Send confirmation email
      // 3. Update inventory
      // 4. For workshops: send workshop details

      // Get the cart items from metadata
      const cartItems = session.metadata?.cartItems
        ? JSON.parse(session.metadata.cartItems)
        : []

      console.log('Cart items:', cartItems)

      // TODO: Implement order fulfillment logic
      // Example:
      // await saveOrder({
      //   stripeSessionId: session.id,
      //   customerEmail: session.customer_details?.email,
      //   items: cartItems,
      //   total: session.amount_total,
      //   shippingAddress: session.shipping_details?.address,
      // })
      //
      // await sendConfirmationEmail(session.customer_details?.email, orderDetails)

      break

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('PaymentIntent succeeded:', paymentIntent.id)
      break

    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', failedPaymentIntent.id)
      // TODO: Send payment failure email or notification
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
