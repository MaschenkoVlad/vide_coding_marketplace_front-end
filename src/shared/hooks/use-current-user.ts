'use client'

import { useQuery } from '@tanstack/react-query'
import { authApiClient } from '../api/auth-client'
import { useAuthState } from './use-auth'

export function useCurrentUser() {
  const { isAuthenticated, isLoading: authLoading } = useAuthState()

  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApiClient.getCurrentUser(),
    enabled: isAuthenticated && !authLoading,
    retry: (failureCount, error) => {
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as { status: number }).status
        if (status === 401 || status === 403) {
          return false
        }
      }
      return failureCount < 3
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    user: query.data,
    isLoading: query.isLoading || authLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}

export type { AuthUser } from '../api/auth-client'
