import { useQuery } from '@tanstack/react-query';
import { listingsAPI } from './listings-api';

export const useListing = (id: string) => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingsAPI.getListingById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
