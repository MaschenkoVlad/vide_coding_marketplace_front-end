import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { authTokenStorage } from '../src/shared/lib/auth-token-storage'

describe('AuthTokenStorage', () => {
  const mockTokens = {
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token'
  }

  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
  })

  afterEach(() => {
    // Clear localStorage after each test
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
    authTokenStorage.clearTokens()
  })

  describe('setTokens', () => {
    it('should store tokens in memory', () => {
      authTokenStorage.setTokens(mockTokens)
      
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toEqual(mockTokens)
    })

    it('should store tokens in localStorage when window is available', () => {
      authTokenStorage.setTokens(mockTokens)
      
      expect(localStorage.getItem('auth_access_token')).toBe(mockTokens.accessToken)
      expect(localStorage.getItem('auth_refresh_token')).toBe(mockTokens.refreshToken)
    })
  })

  describe('getTokens', () => {
    it('should return tokens from memory when available', () => {
      authTokenStorage.setTokens(mockTokens)
      
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toEqual(mockTokens)
    })

    it('should restore tokens from localStorage when memory is empty', () => {
      // Simulate tokens in localStorage but not in memory
      localStorage.setItem('auth_access_token', mockTokens.accessToken)
      localStorage.setItem('auth_refresh_token', mockTokens.refreshToken)
      
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toEqual(mockTokens)
    })

    it('should return null when no tokens exist', () => {
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toBeNull()
    })

    it('should return null when tokens are incomplete in localStorage', () => {
      localStorage.setItem('auth_access_token', mockTokens.accessToken)
      // Missing refresh token
      
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toBeNull()
    })
  })

  describe('getAccessToken', () => {
    it('should return access token when tokens exist', () => {
      authTokenStorage.setTokens(mockTokens)
      
      const accessToken = authTokenStorage.getAccessToken()
      expect(accessToken).toBe(mockTokens.accessToken)
    })

    it('should return null when no tokens exist', () => {
      const accessToken = authTokenStorage.getAccessToken()
      expect(accessToken).toBeNull()
    })
  })

  describe('getRefreshToken', () => {
    it('should return refresh token when tokens exist', () => {
      authTokenStorage.setTokens(mockTokens)
      
      const refreshToken = authTokenStorage.getRefreshToken()
      expect(refreshToken).toBe(mockTokens.refreshToken)
    })

    it('should return null when no tokens exist', () => {
      const refreshToken = authTokenStorage.getRefreshToken()
      expect(refreshToken).toBeNull()
    })
  })

  describe('clearTokens', () => {
    it('should clear tokens from memory', () => {
      authTokenStorage.setTokens(mockTokens)
      authTokenStorage.clearTokens()
      
      const tokens = authTokenStorage.getTokens()
      expect(tokens).toBeNull()
    })

    it('should clear tokens from localStorage when window is available', () => {
      authTokenStorage.setTokens(mockTokens)
      authTokenStorage.clearTokens()
      
      expect(localStorage.getItem('auth_access_token')).toBeNull()
      expect(localStorage.getItem('auth_refresh_token')).toBeNull()
    })
  })

  describe('hasValidTokens', () => {
    it('should return true when both tokens exist', () => {
      authTokenStorage.setTokens(mockTokens)
      
      const hasValidTokens = authTokenStorage.hasValidTokens()
      expect(hasValidTokens).toBe(true)
    })

    it('should return false when no tokens exist', () => {
      const hasValidTokens = authTokenStorage.hasValidTokens()
      expect(hasValidTokens).toBe(false)
    })

    it('should return false when only access token exists', () => {
      authTokenStorage.setTokens({
        accessToken: mockTokens.accessToken,
        refreshToken: ''
      })
      
      const hasValidTokens = authTokenStorage.hasValidTokens()
      expect(hasValidTokens).toBe(false)
    })

    it('should return false when only refresh token exists', () => {
      authTokenStorage.setTokens({
        accessToken: '',
        refreshToken: mockTokens.refreshToken
      })
      
      const hasValidTokens = authTokenStorage.hasValidTokens()
      expect(hasValidTokens).toBe(false)
    })
  })
})
