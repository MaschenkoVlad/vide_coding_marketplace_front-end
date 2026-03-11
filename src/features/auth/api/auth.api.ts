import { apiClient } from '@/shared/api/client'
import { AuthLoginRequest, AuthRegisterRequest, AuthResponse, User } from '@/shared/types'

export const authApi = {
  login: (data: AuthLoginRequest) => 
    apiClient.post<AuthResponse>('/api/auth/login', data),
  
  register: (data: AuthRegisterRequest) => 
    apiClient.post<AuthResponse>('/api/auth/register', data),
  
  getCurrentUser: () => 
    apiClient.get<User>('/api/auth/me'),
  
  refreshToken: (refreshToken: string) => 
    apiClient.post<{ accessToken: string }>('/api/auth/refresh', { refreshToken }),
  
  logout: () => 
    apiClient.post<void>('/api/auth/logout'),
}
