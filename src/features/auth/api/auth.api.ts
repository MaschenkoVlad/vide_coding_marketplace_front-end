import { authApiClient } from '@/shared/api/auth-client';
import { AuthLoginRequest, AuthRegisterRequest } from '@/shared/types';
import type { AuthUser, AuthTokens } from '@/shared/api/auth-client';

export const authApi = {
  login: (data: AuthLoginRequest): Promise<AuthTokens> => authApiClient.login(data.email, data.password),

  register: (data: AuthRegisterRequest): Promise<AuthTokens> =>
    authApiClient.register({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'BUYER', // Default role for registration
    }),

  getCurrentUser: (): Promise<AuthUser> => authApiClient.getCurrentUser(),

  refreshToken: (refreshToken: string): Promise<{ accessToken: string }> =>
    authApiClient.post<{ accessToken: string }>('/api/auth/refresh', { refreshToken }),

  logout: (): Promise<void> => authApiClient.logout(),
};
