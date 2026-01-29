import { PrismaClient } from '@prisma/client'
import { sampleProducts } from '../lib/data/products'
import { sampleWorkshops } from '../lib/data/workshops'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (in development only)
  console.log('🧹 Clearing existing data...')
  await prisma.orderItem.deleteMany()
  await prisma.workshopRegistration.deleteMany()
  await prisma.order.deleteMany()
  await prisma.favoriteProduct.deleteMany()
  await prisma.address.deleteMany()
  await prisma.workshopDate.deleteMany()
  await prisma.workshop.deleteMany()
  await prisma.product.deleteMany()

  // Seed Products
  console.log('📦 Seeding products...')
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stage: product.stage,
        images: product.images,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        careLevel: product.careLevel,
        size: product.size,
        ageYears: product.ageYears,
      },
    })
  }
  console.log(`✅ Created ${sampleProducts.length} products`)

  // Seed Workshops
  console.log('🎓 Seeding workshops...')
  for (const workshop of sampleWorkshops) {
    await prisma.workshop.create({
      data: {
        id: workshop.id,
        title: workshop.title,
        type: workshop.type,
        description: workshop.description,
        price: workshop.price,
        duration: workshop.duration,
        capacity: workshop.capacity,
        skills: workshop.skills,
        includes: workshop.includes,
        image: workshop.image,
        dates: {
          create: workshop.dates.map((d) => ({
            id: d.id,
            date: d.date,
            startTime: d.startTime,
            endTime: d.endTime,
            spotsAvailable: d.spotsAvailable,
            location: d.location,
          })),
        },
      },
    })
  }
  console.log(`✅ Created ${sampleWorkshops.length} workshops`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
