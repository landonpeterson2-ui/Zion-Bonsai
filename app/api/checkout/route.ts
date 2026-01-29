import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '@/lib/data/products'
import { getWorkshopById } from '@/lib/data/workshops'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for (const item of items) {
      if (item.type === 'product') {
        const product = getProductById(item.productId)
        if (!product) continue

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `${product.stage} - ${product.size}`,
              images: [], // Add product image URLs when you have them
            },
            unit_amount: Math.round(product.price * 100), // Stripe uses cents
          },
          quantity: item.quantity,
        })
      } else if (item.type === 'workshop') {
        const workshop = getWorkshopById(item.productId)
        if (!workshop) continue

        const workshopDate = workshop.dates.find(d => d.id === item.workshopDateId)
        const dateStr = workshopDate
          ? new Date(workshopDate.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          : ''

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: workshop.title,
              description: `Workshop on ${dateStr}${workshopDate ? ` at ${workshopDate.startTime}` : ''}`,
            },
            unit_amount: Math.round(workshop.price * 100),
          },
          quantity: item.quantity,
        })
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'], // Expand as needed
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_email: undefined, // Will be collected in Stripe Checkout
      metadata: {
        // Store cart items for webhook processing
        cartItems: JSON.stringify(items),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
