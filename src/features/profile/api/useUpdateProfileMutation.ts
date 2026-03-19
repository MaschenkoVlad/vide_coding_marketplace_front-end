import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from './updateProfile'
import type { UpdateProfileRequest } from '@/entities/user/model/user.types'

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update the current user query cache with the new data
      queryClient.setQueryData(['currentUser'], updatedUser)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}
