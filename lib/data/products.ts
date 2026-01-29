import type { Product } from '@/types'

// Sample product data - this would eventually come from a database
export const sampleProducts: Product[] = [
  // Seedlings & Cuttings
  {
    id: 'seed-001',
    name: 'Dwarf Jade Cutting Set (3 cuttings)',
    description: 'Three healthy Portulacaria afra cuttings ready to root. Perfect for beginners wanting to start their bonsai journey from the very beginning.',
    price: 15,
    stage: 'seedlings',
    images: ['/products/cutting-set.jpg'],
    inStock: true,
    stockQuantity: 25,
    careLevel: 'Beginner',
    size: '3-4 inch cuttings',
  },
  {
    id: 'seed-002',
    name: 'Rooted Seedling',
    description: 'Young rooted Portulacaria afra seedling in 2-inch pot. Approximately 3 months old.',
    price: 20,
    stage: 'seedlings',
    images: ['/products/seedling.jpg'],
    inStock: true,
    stockQuantity: 18,
    careLevel: 'Beginner',
    size: '2" pot, 4-6" tall',
  },

  // Pre-Bonsai Starters
  {
    id: 'start-001',
    name: 'Pre-Bonsai Starter',
    description: 'Well-established Dwarf Jade ready for initial training. 1-2 years old with good trunk thickness for its age.',
    price: 35,
    stage: 'starters',
    images: ['/products/starter.jpg'],
    inStock: true,
    stockQuantity: 12,
    careLevel: 'Beginner',
    size: '4" pot, 8-10" tall',
    ageYears: 1.5,
  },
  {
    id: 'start-002',
    name: 'Premium Starter - Thick Trunk',
    description: 'Premium pre-bonsai with exceptional trunk thickness. Perfect for intermediate styling projects.',
    price: 55,
    stage: 'starters',
    images: ['/products/premium-starter.jpg'],
    inStock: true,
    stockQuantity: 8,
    careLevel: 'Intermediate',
    size: '6" pot, 10-12" tall',
    ageYears: 2,
  },

  // Intermediate Trained
  {
    id: 'inter-001',
    name: 'Cascade Style Bonsai',
    description: 'Beautifully styled cascade form Dwarf Jade. Wire-trained with established movement and character.',
    price: 75,
    stage: 'intermediate',
    images: ['/products/cascade.jpg'],
    inStock: true,
    stockQuantity: 5,
    careLevel: 'Intermediate',
    size: '8" pot, 14" cascade',
    ageYears: 3,
  },
  {
    id: 'inter-002',
    name: 'Informal Upright Bonsai',
    description: 'Classic informal upright styling with natural movement. Partially developed canopy and good ramification.',
    price: 90,
    stage: 'intermediate',
    images: ['/products/informal-upright.jpg'],
    inStock: true,
    stockQuantity: 6,
    careLevel: 'Intermediate',
    size: '8" pot, 12-14" tall',
    ageYears: 4,
  },

  // Mature Specimens
  {
    id: 'mature-001',
    name: 'Show Quality Specimen',
    description: 'Exceptional mature Dwarf Jade bonsai with years of careful training. Display-worthy piece with refined branching and aged appearance.',
    price: 150,
    stage: 'mature',
    images: ['/products/specimen.jpg'],
    inStock: true,
    stockQuantity: 2,
    careLevel: 'Advanced',
    size: '10" pot, 16" tall',
    ageYears: 6,
  },
  {
    id: 'mature-002',
    name: 'Ancient Style Masterpiece',
    description: 'Premium mature specimen with exceptional trunk character and deadwood features. A true statement piece.',
    price: 250,
    stage: 'mature',
    images: ['/products/masterpiece.jpg'],
    inStock: true,
    stockQuantity: 1,
    careLevel: 'Advanced',
    size: '12" pot, 18" tall',
    ageYears: 8,
  },
]

export function getProductsByStage(stage: Product['stage']) {
  return sampleProducts.filter((product) => product.stage === stage)
}

export function getProductById(id: string) {
  return sampleProducts.find((product) => product.id === id)
}
