import { mockListingsAPI } from '@/shared/api/mock/listings'
import type { Listing } from '@/shared/api/types'

/**
 * API client for listings
 * In production, this would make real HTTP requests to the backend
 * For now, it uses the mock API
 */
export class ListingsAPI {
  async getListingById(id: string): Promise<Listing> {
    const listing = await mockListingsAPI.getListingById(id)
    if (!listing) {
      throw new Error('Listing not found')
    }
    return listing
  }
}

export const listingsAPI = new ListingsAPI()
