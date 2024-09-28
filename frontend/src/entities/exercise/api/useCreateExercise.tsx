import { useMutation } from '@tanstack/react-query'

import { POST } from '@/shared/api'

import { CreateExercise } from '../model/exercise.types'

export const useCreateExercise = () => {
  return useMutation({
    mutationFn: async (data: CreateExercise) => {
      const result = await POST('/exercises', { body: data })

      if (result.response.status !== 200 || !result.data) {
        throw new Error('Ошибка при создании упражнения')
      }

      return result.data
    },
  })
}
