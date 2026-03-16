import type { 
  Listing, 
  Category, 
  User, 
  ListingCondition,
  ListingsQuery,
  ListingsResponse 
} from '../types'

// Mock data generators
const generateMockCategories = (): Category[] => [
  { id: '1', name: 'Graphics Cards', slug: 'graphics-cards' },
  { id: '2', name: 'Processors', slug: 'processors' },
  { id: '3', name: 'Memory', slug: 'memory' },
  { id: '4', name: 'Storage', slug: 'storage' },
  { id: '5', name: 'Motherboards', slug: 'motherboards' },
  { id: '6', name: 'Power Supplies', slug: 'power-supplies' },
  { id: '7', name: 'Cooling', slug: 'cooling' },
  { id: '8', name: 'Cases', slug: 'cases' },
]

const generateMockUsers = (): User[] => [
  { id: '1', username: 'tech_enthusiast', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { id: '2', username: 'gamer_pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
  { id: '3', username: 'pc_builder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
  { id: '4', username: 'hardware_expert', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  { id: '5', username: 'budget_gamer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' },
]

const generateMockListings = (): Listing[] => {
  const categories = generateMockCategories()
  const users = generateMockUsers()
  const conditions: ListingCondition[] = ['new', 'like_new', 'good', 'fair', 'poor']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego']
  
  const titles = [
    'NVIDIA RTX 4090 Gaming Graphics Card',
    'AMD Ryzen 9 7950X Processor',
    'Corsair Vengeance RGB 32GB DDR5 RAM',
    'Samsung 980 PRO 2TB NVMe SSD',
    'ASUS ROG Strix X670E-E Gaming Motherboard',
    'EVGA SuperNOVA 1000W Power Supply',
    'Noctua NH-D15 CPU Cooler',
    'Lian Li O11 Dynamic XL Case',
    'MSI RTX 4080 Gaming X Trio',
    'Intel Core i9-13900K Processor',
    'G.Skill Trident Z5 64GB DDR5',
    'WD Black SN850X 4TB NVMe SSD',
    'Gigabyte Z790 AORUS Master',
    'Seasonic PRIME TX-1300 Power Supply',
    'be quiet! Dark Rock Pro 4',
    'Fractal Design Meshify 2 XL',
    'ASUS TUF Gaming RTX 4070',
    'AMD Ryzen 7 7700X CPU',
    'Kingston Fury Beast 32GB DDR5',
    'Crucial MX500 1TB SATA SSD'
  ]

  const descriptions = [
    'Excellent condition, barely used. Upgrading to newer model.',
    'Like new, tested and working perfectly. Original box included.',
    'Good working condition, minor cosmetic wear.',
    'Fully functional, great performance for gaming.',
    'Well maintained, never overclocked.',
    'Great value, works as expected.',
    'Purchased recently, selling due to upgrade.',
    'Tested and verified working condition.',
    'Reliable component, used in light gaming setup.',
    'Professional grade equipment, excellent performance.'
  ]

  return Array.from({ length: 85 }, (_, i) => {
    const price = Math.floor(Math.random() * 2000) + 100
    const category = categories[Math.floor(Math.random() * categories.length)]
    const user = users[Math.floor(Math.random() * users.length)]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const title = titles[i % titles.length]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    
    return {
      id: `listing-${i + 1}`,
      title,
      description,
      price,
      condition,
      category,
      seller: user,
      location: {
        city,
        state: undefined,
        country: 'USA'
      },
      images: [
        `https://picsum.photos/seed/${i}/400/300.jpg`,
        `https://picsum.photos/seed/${i}-2/400/300.jpg`,
        `https://picsum.photos/seed/${i}-3/400/300.jpg`
      ],
      createdAt,
      updatedAt: createdAt,
      views: Math.floor(Math.random() * 500) + 10
    }
  })
}

// Mock API implementation
class MockListingsAPI {
  private listings: Listing[] = generateMockListings()

  async getListings(query: ListingsQuery): Promise<ListingsResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))

    let filteredListings = [...this.listings]

    // Apply filters
    if (query.category) {
      filteredListings = filteredListings.filter(listing => 
        listing.category.slug === query.category || listing.category.id === query.category
      )
    }

    if (query.condition) {
      filteredListings = filteredListings.filter(listing => 
        listing.condition === query.condition
      )
    }

    if (query.minPrice !== undefined) {
      filteredListings = filteredListings.filter(listing => 
        listing.price >= query.minPrice!
      )
    }

    if (query.maxPrice !== undefined) {
      filteredListings = filteredListings.filter(listing => 
        listing.price <= query.maxPrice!
      )
    }

    if (query.city) {
      filteredListings = filteredListings.filter(listing => 
        listing.location.city.toLowerCase().includes(query.city!.toLowerCase())
      )
    }

    // Apply sorting
    switch (query.sort) {
      case 'price_asc':
        filteredListings.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filteredListings.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        filteredListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    // Apply pagination
    const total = filteredListings.length
    const totalPages = Math.ceil(total / query.limit)
    const startIndex = (query.page - 1) * query.limit
    const endIndex = startIndex + query.limit
    const paginatedListings = filteredListings.slice(startIndex, endIndex)

    return {
      listings: paginatedListings,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrev: query.page > 1
      }
    }
  }

  async getListingById(id: string): Promise<Listing | null> {
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100))
    return this.listings.find(listing => listing.id === id) || null
  }
}

export const mockListingsAPI = new MockListingsAPI()
export { generateMockCategories, generateMockUsers }
