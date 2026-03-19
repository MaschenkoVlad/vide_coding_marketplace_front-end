import type { AuthUser } from '@/shared/api/auth-client'

export interface UserProfile extends AuthUser {
  displayName?: string
  city?: string
  phone?: string
}

export interface UpdateProfileRequest {
  displayName?: string
  city?: string
  phone?: string
}

export interface UpdateProfileResponse extends UserProfile {}
