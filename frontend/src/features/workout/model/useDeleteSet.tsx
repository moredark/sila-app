import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DELETE } from '@/shared/api'

export const useDeleteSet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ setId }: { setId: number }) =>
      DELETE(`/workout/set/{id}`, {
        params: {
          path: {
            id: setId,
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workout'],
      })
    },
  })
}
