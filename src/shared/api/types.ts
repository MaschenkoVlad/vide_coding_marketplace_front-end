// Core domain types for the marketplace

export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor'

export type SortOption = 'newest' | 'price_asc' | 'price_desc'

export interface Category {
  id: string
  name: string
  slug: string
}

export interface User {
  id: string
  username: string
  avatar?: string
}

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  condition: ListingCondition
  category: Category
  seller: User
  location: {
    city: string
    state?: string
    country?: string
  }
  images: string[]
  createdAt: string
  updatedAt: string
  views: number
}

export interface ListingFilters {
  category?: string
  condition?: ListingCondition
  minPrice?: number
  maxPrice?: number
  city?: string
  sort?: SortOption
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface ListingsResponse {
  listings: Listing[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ListingsQuery extends ListingFilters, PaginationParams {}

// API request/response contracts
export interface GetListingsRequest {
  filters?: Partial<ListingFilters>
  pagination: PaginationParams
}

export interface GetListingsResponse extends ListingsResponse {}
