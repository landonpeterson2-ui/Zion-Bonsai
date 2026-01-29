import { prisma } from '@/lib/db/prisma'

/**
 * Generate a unique human-readable order number
 * Format: ZB-YYYY-NNNN (e.g., ZB-2026-0001)
 * @returns Promise resolving to the generated order number
 */
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()

  // Count existing orders for this year
  const count = await prisma.order.count({
    where: {
      orderNumber: {
        startsWith: `ZB-${year}`,
      },
    },
  })

  // Increment and pad with zeros
  const sequence = (count + 1).toString().padStart(4, '0')

  return `ZB-${year}-${sequence}`
}
