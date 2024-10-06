import { useMutation } from '@tanstack/react-query'

import { DELETE } from '@/shared/api'

export const useDeleteWorkout = () => {
  return useMutation({
    mutationFn: ({ workoutId }: { workoutId: number }) =>
      DELETE(`/workout/{id}`, {
        params: {
          path: {
            id: workoutId,
          },
        },
      }),
  })
}
