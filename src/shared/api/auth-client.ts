import { authTokenStorage, type AuthTokens } from '../lib/auth-token-storage';
import { ApiError, ApiClient } from './client';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthUser {
  id: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  firstName?: string;
  lastName?: string;
}

class AuthApiClient extends ApiClient {
  private isRefreshing = false;
  private refreshPromise: Promise<AuthTokens> | null = null;

  private async refreshTokens(): Promise<AuthTokens> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const tokens = await this.refreshPromise;
      return tokens;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<AuthTokens> {
    const refreshToken = authTokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await super.post<RefreshResponse>('/api/auth/refresh', {
        refreshToken,
      });

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };

      authTokenStorage.setTokens(tokens);
      return tokens;
    } catch (error) {
      authTokenStorage.clearTokens();
      throw error;
    }
  }

  private async addAuthHeader(options: RequestInit = {}): Promise<RequestInit> {
    const accessToken = authTokenStorage.getAccessToken();

    if (!accessToken) {
      return options;
    }

    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const authOptions = await this.addAuthHeader(options);

    try {
      return await super.request<T>(endpoint, authOptions);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        const hasRefreshToken = authTokenStorage.getRefreshToken();

        if (hasRefreshToken) {
          try {
            await this.refreshTokens();
            const retryOptions = await this.addAuthHeader(options);
            return await super.request<T>(endpoint, retryOptions);
          } catch (refreshError) {
            authTokenStorage.clearTokens();
            throw error;
          }
        } else {
          authTokenStorage.clearTokens();
        }
      }

      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const response = await super.post<AuthTokens>('/api/auth/login', {
      email,
      password,
    });

    authTokenStorage.setTokens(response);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: 'BUYER' | 'SELLER';
  }): Promise<AuthTokens> {
    const response = await super.post<AuthTokens>('/api/auth/register', userData);

    authTokenStorage.setTokens(response);
    return response;
  }

  async getCurrentUser(): Promise<AuthUser> {
    return this.request<AuthUser>('/api/auth/me');
  }

  async logout(): Promise<void> {
    const refreshToken = authTokenStorage.getRefreshToken();

    if (refreshToken) {
      try {
        await super.post('/api/auth/logout', { refreshToken });
      } catch (error) {
        console.warn('Logout request failed, but clearing local tokens anyway');
      }
    }

    authTokenStorage.clearTokens();
  }

  async logoutAll(): Promise<void> {
    try {
      await this.request('/api/auth/logout-all');
    } catch (error) {
      console.warn('Logout all request failed, but clearing local tokens anyway');
    }

    authTokenStorage.clearTokens();
  }

  async get<T>(endpoint: string, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const authApiClient = new AuthApiClient();
export type { AuthUser, AuthTokens };
