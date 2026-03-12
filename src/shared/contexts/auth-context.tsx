'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authTokenStorage, AuthTokens } from '../lib/auth-token-storage'

interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  setTokens: (tokens: AuthTokens) => void
  clearTokens: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const hasTokens = authTokenStorage.hasValidTokens()
      setIsAuthenticated(hasTokens)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const setTokens = (tokens: AuthTokens) => {
    authTokenStorage.setTokens(tokens)
    setIsAuthenticated(true)
  }

  const clearTokens = () => {
    authTokenStorage.clearTokens()
    setIsAuthenticated(false)
  }

  const value: AuthContextValue = {
    isAuthenticated,
    isLoading,
    setTokens,
    clearTokens,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
