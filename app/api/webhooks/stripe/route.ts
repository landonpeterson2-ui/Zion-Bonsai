import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db/prisma'
import { sendOrderConfirmationEmail } from '@/lib/email/send'

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
      const orderId = session.metadata?.orderId

      if (!orderId) {
        console.error('No orderId in session metadata')
        break
      }

      try {
        // 1. Update order status and add payment/shipping info
        const order = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'processing',
            paymentStatus: 'paid',
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
            customerEmail: session.customer_details?.email || '',
            customerName: session.customer_details?.name || '',
            customerPhone: session.customer_details?.phone || null,
            // Save shipping address inline for guest orders
            shippingName: session.shipping_details?.name || null,
            shippingLine1: session.shipping_details?.address?.line1 || null,
            shippingLine2: session.shipping_details?.address?.line2 || null,
            shippingCity: session.shipping_details?.address?.city || null,
            shippingState: session.shipping_details?.address?.state || null,
            shippingPostal: session.shipping_details?.address?.postal_code || null,
            shippingCountry: session.shipping_details?.address?.country || null,
            shippingPhone: session.shipping_details?.phone || null,
            completedAt: new Date(),
          },
          include: { items: true },
        })

        console.log('✅ Order updated:', order.orderNumber)

        // 2. Create workshop registrations and update spots
        for (const item of order.items) {
          if (item.workshopDateId) {
            // Create registration if user is logged in
            if (order.userId) {
              await prisma.workshopRegistration.create({
                data: {
                  userId: order.userId,
                  workshopDateId: item.workshopDateId,
                  orderId: order.id,
                  status: 'registered',
                },
              })
              console.log('✅ Workshop registration created')
            }

            // Decrement workshop spots
            await prisma.workshopDate.update({
              where: { id: item.workshopDateId },
              data: {
                spotsAvailable: {
                  decrement: item.quantity,
                },
              },
            })
            console.log('✅ Workshop spots decremented')
          }
        }

        // 3. Update product inventory
        for (const item of order.items) {
          if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stockQuantity: {
                  decrement: item.quantity,
                },
              },
            })
            console.log('✅ Product inventory updated')
          }
        }

        // 4. Send confirmation email
        await sendOrderConfirmationEmail(order)

        console.log('✅ Order fulfillment completed for:', order.orderNumber)
      } catch (error) {
        console.error('❌ Error processing order:', error)
      }

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
