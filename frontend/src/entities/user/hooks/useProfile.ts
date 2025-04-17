import { useQuery } from '@tanstack/react-query'

import { getUserProfile } from '../model/user.api'

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
  })
}
