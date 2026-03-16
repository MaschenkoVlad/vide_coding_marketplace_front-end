import { describe, it, expect } from 'vitest'
import {
  serializeFilters,
  deserializeFilters,
  createQueryString,
  getFiltersFromURL,
  hasActiveFilters,
  getFilterSummary
} from '@/features/catalog-filters/lib/filter-serialization'
import type { ListingFilters, PaginationParams, ListingCondition, SortOption } from '@/shared/api/types'

describe('filter-serialization', () => {
  const mockPagination: PaginationParams = {
    page: 2,
    limit: 12,
  }

  const mockFilters: Partial<ListingFilters> = {
    category: 'graphics-cards',
    condition: 'good',
    minPrice: 100,
    maxPrice: 500,
    city: 'New York',
    sort: 'price_asc',
  }

  describe('serializeFilters', () => {
    it('should serialize filters and pagination to query params', () => {
      const result = serializeFilters(mockFilters, mockPagination)

      expect(result).toEqual({
        page: '2',
        limit: '12',
        category: 'graphics-cards',
        condition: 'good',
        minPrice: '100',
        maxPrice: '500',
        city: 'New York',
        sort: 'price_asc',
      })
    })

    it('should handle empty filters', () => {
      const result = serializeFilters({}, mockPagination)

      expect(result).toEqual({
        page: '2',
        limit: '12',
      })
    })

    it('should handle undefined values in filters', () => {
      const filtersWithUndefined = {
        category: 'graphics-cards',
        condition: undefined,
        minPrice: undefined,
        maxPrice: 500,
      }

      const result = serializeFilters(filtersWithUndefined, mockPagination)

      expect(result).toEqual({
        page: '2',
        limit: '12',
        category: 'graphics-cards',
        maxPrice: '500',
      })
    })
  })

  describe('deserializeFilters', () => {
    it('should deserialize URL search params to filters and pagination', () => {
      const searchParams = new URLSearchParams({
        page: '3',
        limit: '24',
        category: 'processors',
        condition: 'new',
        minPrice: '200',
        maxPrice: '1000',
        city: 'Los Angeles',
        sort: 'price_desc',
      })

      const result = deserializeFilters(searchParams)

      expect(result).toEqual({
        filters: {
          category: 'processors',
          condition: 'new',
          minPrice: 200,
          maxPrice: 1000,
          city: 'Los Angeles',
          sort: 'price_desc',
        },
        pagination: {
          page: 3,
          limit: 24,
        },
      })
    })

    it('should use default values for missing pagination', () => {
      const searchParams = new URLSearchParams()

      const result = deserializeFilters(searchParams)

      expect(result.pagination).toEqual({
        page: 1,
        limit: 12,
      })
    })

    it('should handle invalid pagination values', () => {
      const searchParams = new URLSearchParams({
        page: 'invalid',
        limit: '-5',
      })

      const result = deserializeFilters(searchParams)

      expect(result.pagination).toEqual({
        page: 1,
        limit: 12,
      })
    })

    it('should handle negative price values', () => {
      const searchParams = new URLSearchParams({
        minPrice: '-100',
        maxPrice: '-50',
      })

      const result = deserializeFilters(searchParams)

      expect(result.filters).toEqual({})
    })

    it('should handle empty search params', () => {
      const searchParams = new URLSearchParams()

      const result = deserializeFilters(searchParams)

      expect(result).toEqual({
        filters: {},
        pagination: {
          page: 1,
          limit: 12,
        },
      })
    })
  })

  describe('createQueryString', () => {
    it('should create a query string from filters and pagination', () => {
      const result = createQueryString(mockFilters, mockPagination)

      expect(result).toBe(
        'page=2&limit=12&category=graphics-cards&condition=good&minPrice=100&maxPrice=500&city=New+York&sort=price_asc'
      )
    })

    it('should return empty string for no filters', () => {
      const result = createQueryString({}, { page: 1, limit: 12 })

      expect(result).toBe('page=1&limit=12')
    })
  })

  describe('getFiltersFromURL', () => {
    it('should extract filters from URL search params', () => {
      const searchParams = new URLSearchParams({
        category: 'memory',
        condition: 'like_new',
        minPrice: '50',
        maxPrice: '200',
        city: 'Chicago',
        sort: 'newest',
        page: '2',
        limit: '24',
      })

      const result = getFiltersFromURL(searchParams)

      expect(result.filters).toEqual({
        category: 'memory',
        condition: 'like_new',
        minPrice: 50,
        maxPrice: 200,
        city: 'Chicago',
        sort: 'newest',
      })

      expect(result.pagination).toEqual({
        page: 2,
        limit: 24,
      })
    })
  })

  describe('hasActiveFilters', () => {
    it('should return true when filters are active', () => {
      const filters: Partial<ListingFilters> = {
        category: 'graphics-cards',
        condition: 'good',
      }

      expect(hasActiveFilters(filters)).toBe(true)
    })

    it('should return false when no filters are active', () => {
      const filters = {}

      expect(hasActiveFilters(filters)).toBe(false)
    })

    it('should return false when filters have empty values', () => {
      const filters: Partial<ListingFilters> = {
        category: '',
        condition: undefined,
        city: '',
      }

      expect(hasActiveFilters(filters)).toBe(false)
    })

    it('should return false when filters have null/undefined values', () => {
      const filters: Partial<ListingFilters> = {
        category: undefined,
        condition: undefined,
        minPrice: undefined,
      }

      expect(hasActiveFilters(filters)).toBe(false)
    })
  })

  describe('getFilterSummary', () => {
    it('should create a summary of active filters', () => {
      const filters: Partial<ListingFilters> = {
        category: 'graphics-cards',
        condition: 'like_new' as ListingCondition,
        minPrice: 100,
        maxPrice: 500,
        city: 'New York',
        sort: 'price_asc' as SortOption,
      }

      const result = getFilterSummary(filters)

      expect(result).toEqual([
        'Category: graphics cards',
        'Condition: like new',
        'Price: $100 - $500',
        'City: New York',
        'Sort: Price: Low to High',
      ])
    })

    it('should handle partial filters', () => {
      const filters: Partial<ListingFilters> = {
        category: 'processors',
        maxPrice: 1000,
      }

      const result = getFilterSummary(filters)

      expect(result).toEqual(['Category: processors', 'Price: Any - $1000'])
    })

    it('should return empty array for no filters', () => {
      const filters = {}

      const result = getFilterSummary(filters)

      expect(result).toEqual([])
    })

    it('should handle min price only', () => {
      const filters: Partial<ListingFilters> = {
        minPrice: 200,
      }

      const result = getFilterSummary(filters)

      expect(result).toEqual(['Price: $200 - Any'])
    })

    it('should handle all sort options', () => {
      const sortOptions: SortOption[] = ['newest', 'price_asc', 'price_desc']

      const expectedLabels = {
        newest: 'Sort: Newest First',
        price_asc: 'Sort: Price: Low to High',
        price_desc: 'Sort: Price: High to Low',
      }

      sortOptions.forEach((sort) => {
        const result = getFilterSummary({ sort })
        expect(result).toContain(expectedLabels[sort])
      })
    })
  })
})
