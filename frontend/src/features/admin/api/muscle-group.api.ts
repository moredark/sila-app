import { useMutation } from '@tanstack/react-query'

import { POST } from '@/shared/api'

export const useCreateMuscleGroup = () => {
  return useMutation({
    mutationKey: ['adminMuscleGroup'],
    mutationFn: async (data: { name_ru: string; name_eng: string }) => {
      const result = await POST('/muscle-groups', { body: data })

      if (result.response.status !== 200 || !result.data) {
        throw new Error('Login failed')
      }

      return result.data
    },
  })
}
