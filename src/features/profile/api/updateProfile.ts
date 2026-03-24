import { authApiClient } from '@/shared/api/auth-client';
import type { UpdateProfileRequest, UpdateProfileResponse } from '@/entities/user/model/user.types';

/**
 * Updates the current user's profile
 * TODO: Replace with actual backend API call when endpoint is available
 */
export async function updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  // TODO: Replace this mock implementation with actual API call
  // return authApiClient.patch<UpdateProfileResponse>('/api/users/me', data)

  // Mock implementation for now
  const currentUser = await authApiClient.getCurrentUser();

  const updatedUser: UpdateProfileResponse = {
    id: currentUser.id,
    email: currentUser.email,
    role: currentUser.role,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    displayName: data.displayName,
    city: data.city,
    phone: data.phone,
  };

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return updatedUser;
}
