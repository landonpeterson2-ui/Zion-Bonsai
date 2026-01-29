import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '@/lib/data/products'
import { getWorkshopById } from '@/lib/data/workshops'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import { generateOrderNumber } from '@/lib/utils/order-number'

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

    // Get user session (if logged in)
    const session = await auth()

    // Build line items for Stripe and calculate totals
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    const orderItems: Array<{
      productId?: string
      workshopDateId?: string
      name: string
      description: string
      price: number
      quantity: number
    }> = []
    let subtotal = 0

    for (const item of items) {
      if (item.type === 'product') {
        const product = getProductById(item.productId)
        if (!product) continue

        const itemTotal = product.price * item.quantity
        subtotal += itemTotal

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `${product.stage} - ${product.size}`,
              images: [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity,
        })

        orderItems.push({
          productId: item.productId,
          name: product.name,
          description: `${product.stage} - ${product.size}`,
          price: product.price,
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

        const itemTotal = workshop.price * item.quantity
        subtotal += itemTotal

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

        orderItems.push({
          workshopDateId: item.workshopDateId,
          name: workshop.title,
          description: `Workshop on ${dateStr}${workshopDate ? ` at ${workshopDate.startTime}` : ''}`,
          price: workshop.price,
          quantity: item.quantity,
        })
      }
    }

    const tax = 0 // Calculate based on shipping address if needed
    const shippingCost = 0 // Calculate based on items and shipping address if needed
    const total = subtotal + tax + shippingCost

    // Create Order in database (pending until payment confirmed)
    const order = await prisma.order.create({
      data: {
        orderNumber: await generateOrderNumber(),
        userId: session?.user?.id || null,
        customerEmail: session?.user?.email || 'pending',
        customerName: session?.user?.name || 'pending',
        subtotal,
        tax,
        shippingCost,
        total,
        status: 'pending',
        paymentStatus: 'pending',
        items: {
          create: orderItems,
        },
      },
    })

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_email: session?.user?.email || undefined,
      metadata: {
        orderId: order.id,
        userId: session?.user?.id || '',
        cartItems: JSON.stringify(items),
      },
    })

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
