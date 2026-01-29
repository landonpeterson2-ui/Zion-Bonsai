import { Resend } from 'resend'
import { render } from '@react-email/render'
import OrderConfirmation from './templates/OrderConfirmation'
import type { Order, OrderItem } from '@prisma/client'

const resend = new Resend(process.env.RESEND_API_KEY)

type OrderWithItems = Order & {
  items: OrderItem[]
}

export async function sendOrderConfirmationEmail(order: OrderWithItems) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
    console.warn('⚠️  Email not configured - skipping email send')
    return
  }

  try {
    const emailHtml = render(
      OrderConfirmation({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        items: order.items.map((item) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          price: Number(item.price),
        })),
        total: Number(order.total),
        shippingAddress: {
          name: order.shippingName,
          line1: order.shippingLine1,
          city: order.shippingCity,
          state: order.shippingState,
          postal: order.shippingPostal,
        },
      })
    )

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order Confirmation #${order.orderNumber} - Zion Bonsai`,
      html: emailHtml,
    })

    if (error) {
      console.error('❌ Failed to send email:', error)
      return
    }

    console.log('✅ Confirmation email sent:', data?.id)
  } catch (error) {
    console.error('❌ Error sending email:', error)
  }
}
