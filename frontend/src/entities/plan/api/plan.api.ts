import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { GET, POST, PUT, DELETE } from '@/shared/api/client'

import { CreatePlan, UpdatePlan, Plan, PaginatedPlans } from '../model/plan.types'

export const useGetPlans = (page: number, limit: number) => {
  return useQuery<unknown, Error, { data: PaginatedPlans }>({
    queryKey: ['plans', page, limit],
    queryFn: () =>
      GET('/plans', {
        params: {
          query: {
            limit,
            offset: (page - 1) * limit,
          },
        },
      }),
  })
}

export const useGetPlan = (id: number, options?: { initialData?: unknown }) => {
  return useQuery<unknown, Error, { data: Plan }>({
    queryKey: ['plan', id],
    queryFn: () => GET('/plans/{id}', { params: { path: { id } } }),
    initialData: options?.initialData,
  })
}

export const useCreatePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePlan) => POST('/plans', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
  })
}

export const useUpdatePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & UpdatePlan) =>
      PUT('/plans/{id}', { params: { path: { id } }, body: data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
      queryClient.invalidateQueries({ queryKey: ['plan', id] })
    },
  })
}

export const useDeletePlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => DELETE('/plans/{id}', { params: { path: { id } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
  })
}
