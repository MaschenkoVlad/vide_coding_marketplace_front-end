import { useQuery, useQueryClient } from '@tanstack/react-query'
import { mockListingsAPI } from '@/shared/api/mock/listings'
import type { ListingsQuery } from '@/shared/api/types'

const QUERY_KEY = 'listings'

export const useListingsQuery = (query: ListingsQuery) => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: [QUERY_KEY, query],
    queryFn: () => mockListingsAPI.getListings(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  })

  // Prefetch next page
  const prefetchNextPage = async () => {
    if (result.data?.pagination?.hasNext) {
      const nextPageQuery = {
        ...query,
        page: query.page + 1,
      }
      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY, nextPageQuery],
        queryFn: () => mockListingsAPI.getListings(nextPageQuery),
        staleTime: 1000 * 60 * 5,
      })
    }
  }

  // Prefetch previous page
  const prefetchPrevPage = async () => {
    if (result.data?.pagination?.hasPrev && query.page > 1) {
      const prevPageQuery = {
        ...query,
        page: query.page - 1,
      }
      await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY, prevPageQuery],
        queryFn: () => mockListingsAPI.getListings(prevPageQuery),
        staleTime: 1000 * 60 * 5,
      })
    }
  }

  return {
    ...result,
    prefetchNextPage,
    prefetchPrevPage,
  }
}

export const useListingById = (id: string) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => mockListingsAPI.getListingById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Helper to invalidate listings cache
export const invalidateListingsCache = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
}
