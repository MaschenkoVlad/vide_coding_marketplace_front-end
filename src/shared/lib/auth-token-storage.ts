interface AuthTokens {
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN_KEY = 'auth_access_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'

class AuthTokenStorage {
  private inMemoryTokens: AuthTokens | null = null

  setTokens(tokens: AuthTokens): void {
    this.inMemoryTokens = tokens
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    }
  }

  getTokens(): AuthTokens | null {
    if (this.inMemoryTokens) {
      return this.inMemoryTokens
    }

    if (typeof window === 'undefined') {
      return null
    }

    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!accessToken || !refreshToken) {
      return null
    }

    this.inMemoryTokens = { accessToken, refreshToken }
    return this.inMemoryTokens
  }

  getAccessToken(): string | null {
    const tokens = this.getTokens()
    return tokens?.accessToken || null
  }

  getRefreshToken(): string | null {
    const tokens = this.getTokens()
    return tokens?.refreshToken || null
  }

  clearTokens(): void {
    this.inMemoryTokens = null
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }

  hasValidTokens(): boolean {
    const tokens = this.getTokens()
    return !!(tokens?.accessToken && tokens?.refreshToken)
  }
}

export const authTokenStorage = new AuthTokenStorage()
export type { AuthTokens }
