export interface Listing {
  id: string
  title: string
  description: string
  category: ListingCategory
  brand?: string
  condition: ListingCondition
  price: number
  itemCount: number
  location: string
  attributes: Record<string, unknown>
  status: ListingStatus
  sellerId: string
  seller: {
    id: string
    username: string
    email: string
  }
  media: ListingMedia[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export type ListingCategory = 
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'storage'
  | 'motherboard'
  | 'psu'
  | 'monitor'
  | 'mouse'
  | 'keyboard'
  | 'networking'

export type ListingCondition = 
  | 'new'
  | 'like-new'
  | 'good'
  | 'fair'
  | 'poor'

export type ListingStatus = 
  | 'draft'
  | 'published'
  | 'archived'
  | 'sold'
  | 'blocked'

export interface ListingMedia {
  id: string
  url: string
  alt?: string
  order: number
}

export interface ListingAttributes {
  cpu?: {
    socket: string
    cores: number
    threads: number
    baseClockGhz: number
    boostClockGhz?: number
  }
  gpu?: {
    chipset: string
    memoryGb: number
    memoryType: string
    boostClockMhz?: number
  }
  ram?: {
    capacityGb: number
    type: 'DDR4' | 'DDR5' | 'DDR3'
    speedMhz: number
    modules: number
  }
  storage?: {
    type: 'SSD' | 'HDD' | 'NVMe'
    capacityGb: number
    interface: string
    formFactor?: string
  }
  monitor?: {
    sizeInches: number
    resolution: string
    refreshRateHz: number
    panelType: 'IPS' | 'TN' | 'VA' | 'OLED'
  }
}
