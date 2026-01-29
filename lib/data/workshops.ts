import type { Workshop } from '@/types'

// Sample workshop data - this would eventually come from a database
export const sampleWorkshops: Workshop[] = [
  // One-Time Workshops
  {
    id: 'workshop-001',
    title: 'Introduction to Bonsai',
    type: 'one-time',
    description: 'Perfect for beginners! Learn the basics of bonsai care, styling, and philosophy. You\'ll create your own small bonsai to take home.',
    price: 50,
    duration: '2 hours',
    capacity: 12,
    dates: [
      {
        id: 'date-001',
        workshopId: 'workshop-001',
        date: new Date('2026-03-15'),
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        spotsAvailable: 8,
        location: 'Zion Bonsai Studio',
      },
      {
        id: 'date-002',
        workshopId: 'workshop-001',
        date: new Date('2026-03-22'),
        startTime: '2:00 PM',
        endTime: '4:00 PM',
        spotsAvailable: 12,
        location: 'Zion Bonsai Studio',
      },
    ],
    skills: ['Basic pruning', 'Wiring techniques', 'Soil selection', 'Watering basics'],
    includes: ['Take-home pre-bonsai plant', 'Basic tool kit', 'Care guide', 'Refreshments'],
  },
  {
    id: 'workshop-002',
    title: 'Wiring & Shaping Masterclass',
    type: 'one-time',
    description: 'Advanced techniques for shaping bonsai through wiring. Learn professional methods to create dramatic movements and styles.',
    price: 75,
    duration: '2.5 hours',
    capacity: 8,
    dates: [
      {
        id: 'date-003',
        workshopId: 'workshop-002',
        date: new Date('2026-04-05'),
        startTime: '1:00 PM',
        endTime: '3:30 PM',
        spotsAvailable: 5,
        location: 'Zion Bonsai Studio',
      },
    ],
    skills: ['Wire selection', 'Branch positioning', 'Cascade styling', 'Trunk bending'],
    includes: ['Practice plant', 'Professional wire set', 'Styling tools', 'Light snacks'],
  },

  // Workshop Series
  {
    id: 'workshop-003',
    title: 'Bonsai Fundamentals Series',
    type: 'series',
    description: 'Comprehensive 4-week journey into bonsai artistry. Each week builds on the last, taking you from beginner to confident practitioner.',
    price: 200,
    duration: '4 weeks, 2 hours each',
    capacity: 10,
    dates: [
      {
        id: 'date-004',
        workshopId: 'workshop-003',
        date: new Date('2026-04-10'),
        startTime: '6:00 PM',
        endTime: '8:00 PM',
        spotsAvailable: 7,
        location: 'Zion Bonsai Studio',
      },
    ],
    skills: [
      'Week 1: Bonsai philosophy & plant selection',
      'Week 2: Pruning & shaping fundamentals',
      'Week 3: Repotting & root work',
      'Week 4: Year-round care & styling progression',
    ],
    includes: [
      'Plant for each session',
      'Complete tool set',
      'Course workbook',
      'Private community access',
      'Follow-up support',
    ],
  },

  // Private Sessions
  {
    id: 'workshop-004',
    title: 'Private One-on-One Session',
    type: 'private',
    description: 'Personalized instruction tailored to your goals and experience level. Work on your own trees or start something new.',
    price: 100,
    duration: 'Flexible (typically 1.5-2 hours)',
    capacity: 1,
    dates: [], // Private sessions scheduled individually
    skills: ['Customized to your needs'],
    includes: ['Personalized instruction', 'Custom care plan', 'Refreshments'],
  },
]

export function getWorkshopsByType(type: Workshop['type']) {
  return sampleWorkshops.filter((workshop) => workshop.type === type)
}

export function getWorkshopById(id: string) {
  return sampleWorkshops.find((workshop) => workshop.id === id)
}

export function getAllWorkshops() {
  return sampleWorkshops
}
