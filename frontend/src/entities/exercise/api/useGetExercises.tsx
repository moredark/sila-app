import { useQuery } from '@tanstack/react-query'

import { useLanguage } from '@/features/locale-selector/model'
import { GET } from '@/shared/api/client'

export const useGetExercises = ({
  muscle_group_id,
  search,
}: { muscle_group_id?: number; search?: string } = {}) => {
  const { currentLanguage } = useLanguage()

  return useQuery({
    queryKey: ['exercises', muscle_group_id, search, currentLanguage],
    queryFn: async () => {
      const result = await GET('/exercises', {
        params: {
          query: { muscle_group_id, search },
        },
      })

      if (result.response.status !== 200) {
        throw new Error('Failed to fetch exercises')
      }

      if (!result.data) {
        throw new Error('No exercises data found')
      }

      return result.data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
