import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { GET } from '@/shared/api'

export const useGetMuscleGroups = () => {
    return useQuery({
        queryKey: ['muscleGroups'],
        queryFn: async () => {
            const result = await GET('/muscle-groups')

            if (result.response.status !== 200 || !result.data) {
                throw new Error('Failed to fetch muscle groups')
            }

            return result.data
        },
        placeholderData: keepPreviousData
    })
}
