'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authApiClient } from '../api/auth-client'
import { useAuth } from '../contexts/auth-context'

interface RegisterUserData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  role?: 'BUYER' | 'SELLER'
}

export function useAuthActions() {
  const { setTokens, clearTokens } = useAuth()
  const queryClient = useQueryClient()

  const login = useCallback(
    async (email: string, password: string) => {
      const tokens = await authApiClient.login(email, password)
      setTokens(tokens)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      return tokens
    },
    [setTokens, queryClient]
  )

  const register = useCallback(
    async (userData: RegisterUserData) => {
      const tokens = await authApiClient.register(userData)
      setTokens(tokens)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      return tokens
    },
    [setTokens, queryClient]
  )

  const logout = useCallback(async () => {
    try {
      await authApiClient.logout()
    } catch (error) {
      console.warn('Logout request failed, but clearing local state anyway')
    } finally {
      clearTokens()
      queryClient.clear()
    }
  }, [clearTokens, queryClient])

  const logoutAll = useCallback(async () => {
    try {
      await authApiClient.logoutAll()
    } catch (error) {
      console.warn('Logout all request failed, but clearing local state anyway')
    } finally {
      clearTokens()
      queryClient.clear()
    }
  }, [clearTokens, queryClient])

  return {
    login,
    register,
    logout,
    logoutAll,
  }
}

export function useAuthState() {
  const auth = useAuth()

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
  }
}
