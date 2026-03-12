import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authApiClient } from '../src/shared/api/auth-client'
import { authTokenStorage } from '../src/shared/lib/auth-token-storage'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('AuthApiClient', () => {
  const mockTokens = {
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token'
  }

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    role: 'BUYER' as const,
    firstName: 'Test',
    lastName: 'User'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    authTokenStorage.clearTokens()
    localStorageMock.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('login', () => {
    it('should store tokens on successful login', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockTokens })
      })

      const result = await authApiClient.login('test@example.com', 'password')

      expect(result).toEqual(mockTokens)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com', password: 'password' })
        })
      )
    })
  })

  describe('register', () => {
    it('should store tokens on successful registration', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        role: 'BUYER' as const
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockTokens })
      })

      const result = await authApiClient.register(userData)

      expect(result).toEqual(mockTokens)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/register'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userData)
        })
      )
    })
  })

  describe('getCurrentUser', () => {
    it('should make authenticated request with access token', async () => {
      authTokenStorage.setTokens(mockTokens)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockUser })
      })

      const result = await authApiClient.getCurrentUser()

      expect(result).toEqual(mockUser)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/me'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockTokens.accessToken}`
          })
        })
      )
    })

    it('should handle 401 and retry with refreshed token', async () => {
      authTokenStorage.setTokens(mockTokens)

      const newTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token'
      }

      // First call returns 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' })
      })

      // Refresh token call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: newTokens })
      })

      // Retry with new token succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockUser })
      })

      const result = await authApiClient.getCurrentUser()

      expect(result).toEqual(mockUser)
      expect(mockFetch).toHaveBeenCalledTimes(3)
      
      // Check that the retry used the new token
      const retryCall = mockFetch.mock.calls[2]
      expect(retryCall[1].headers.Authorization).toBe(`Bearer ${newTokens.accessToken}`)
    })

    it('should clear tokens and fail if refresh fails', async () => {
      authTokenStorage.setTokens(mockTokens)

      // First call returns 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' })
      })

      // Refresh token call fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Invalid refresh token' })
      })

      await expect(authApiClient.getCurrentUser()).rejects.toThrow()

      expect(authTokenStorage.hasValidTokens()).toBe(false)
    })
  })

  describe('logout', () => {
    it('should call logout endpoint and clear tokens', async () => {
      authTokenStorage.setTokens(mockTokens)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      })

      await authApiClient.logout()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ refreshToken: mockTokens.refreshToken })
        })
      )

      expect(authTokenStorage.hasValidTokens()).toBe(false)
    })

    it('should clear tokens even if logout request fails', async () => {
      authTokenStorage.setTokens(mockTokens)

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' })
      })

      await authApiClient.logout()

      expect(authTokenStorage.hasValidTokens()).toBe(false)
    })

    it('should not make request if no refresh token', async () => {
      authTokenStorage.setTokens({
        accessToken: mockTokens.accessToken,
        refreshToken: ''
      })

      await authApiClient.logout()

      expect(mockFetch).not.toHaveBeenCalled()
      expect(authTokenStorage.hasValidTokens()).toBe(false)
    })
  })

  describe('request with automatic retry', () => {
    it('should add authorization header when token exists', async () => {
      authTokenStorage.setTokens(mockTokens)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'success' })
      })

      await authApiClient.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockTokens.accessToken}`
          })
        })
      )
    })

    it('should not add authorization header when no token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'success' })
      })

      await authApiClient.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String)
          })
        })
      )
    })
  })
})
