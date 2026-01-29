import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OrderConfirmationProps {
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    description?: string | null
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: {
    name?: string | null
    line1?: string | null
    city?: string | null
    state?: string | null
    postal?: string | null
  }
}

export default function OrderConfirmation({
  orderNumber,
  customerName,
  items,
  total,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Zion Bonsai order confirmation #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your order!</Heading>

          <Text style={text}>Hi {customerName},</Text>

          <Text style={text}>
            Your order <strong>#{orderNumber}</strong> has been confirmed and is being
            processed. We'll send you another email when your order ships.
          </Text>

          <Section style={orderDetails}>
            <Heading as="h2" style={h2}>
              Order Details
            </Heading>

            {items.map((item, index) => (
              <div key={index} style={itemRow}>
                <div>
                  <Text style={itemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={itemDescription}>{item.description}</Text>
                  )}
                </div>
                <Text style={itemPrice}>
                  {item.quantity} × ${item.price.toFixed(2)} = $
                  {(item.quantity * item.price).toFixed(2)}
                </Text>
              </div>
            ))}

            <div style={totalRow}>
              <Text style={totalLabel}>Total:</Text>
              <Text style={totalPrice}>${total.toFixed(2)}</Text>
            </div>
          </Section>

          {shippingAddress.line1 && (
            <Section style={addressSection}>
              <Heading as="h2" style={h2}>
                Shipping Address
              </Heading>
              <Text style={address}>
                {shippingAddress.name}
                <br />
                {shippingAddress.line1}
                <br />
                {shippingAddress.city}, {shippingAddress.state}{' '}
                {shippingAddress.postal}
              </Text>
            </Section>
          )}

          <Section style={footer}>
            <Text style={text}>
              Questions about your order? Contact us at{' '}
              <Link href="mailto:support@zionbonsai.com">
                support@zionbonsai.com
              </Link>
            </Text>

            <Text style={footerText}>
              Thank you for supporting Zion Bonsai!
              <br />
              The Zion Bonsai Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 0 12px',
}

const text = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
}

const orderDetails = {
  margin: '24px 40px',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  paddingBottom: '12px',
  borderBottom: '1px solid #e5e7eb',
}

const itemName = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
}

const itemDescription = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '4px 0 0 0',
}

const itemPrice = {
  fontSize: '14px',
  margin: '0',
}

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: '2px solid #333',
}

const totalLabel = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const totalPrice = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
}

const addressSection = {
  margin: '24px 40px',
}

const address = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#333',
  margin: '8px 0',
}

const footer = {
  margin: '40px 40px 0',
  paddingTop: '24px',
  borderTop: '1px solid #e5e7eb',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0 0',
}
