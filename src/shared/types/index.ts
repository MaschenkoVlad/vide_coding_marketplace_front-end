// API request/response types
export interface AuthLoginRequest {
  email: string
  password: string
}

export interface AuthRegisterRequest {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
}

// Re-export domain types from entities
import type { User, UserProfile } from '@/entities/user/model'
import type {
  Listing,
  ListingCategory,
  ListingCondition,
  ListingStatus,
  ListingMedia,
  ListingAttributes,
} from '@/entities/listing/model'
import type { Category, CategoryAttributeSchema } from '@/entities/category/model'

export type { User, UserProfile }
export type {
  Listing,
  ListingCategory,
  ListingCondition,
  ListingStatus,
  ListingMedia,
  ListingAttributes,
}
export type { Category, CategoryAttributeSchema }

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

// API response wrappers
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Filter and sort types
export interface ListingFilters {
  category?: ListingCategory
  condition?: ListingCondition
  minPrice?: number
  maxPrice?: number
  location?: string
  search?: string
  sellerId?: string
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

export interface ListingQuery extends ListingFilters {
  sort?: SortOption
  page?: number
  limit?: number
}
