import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { GET, POST, PUT } from '@/shared/api/client'

import { useWorkoutStore } from './workout.store'
import { WorkoutSession } from './workout.types'

export const useStartWorkout = () => {
  const startWorkout = useWorkoutStore(state => state.startWorkout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ exerciseId }: { exerciseId: number }) =>
      POST('/workout/start', { body: { exercise_id: exerciseId } }),
    onSuccess: (res, variables) => {
      const { exerciseId } = variables
      if (res.data) startWorkout(exerciseId, res.data.session_id)

      queryClient.invalidateQueries({
        queryKey: ['workout', res.data?.session_id],
      })
    },
  })
}

export const useAddSet = () => {
  const addSet = useWorkoutStore(state => state.addSet)
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['workout'],
    mutationFn: ({
      workoutId,
      reps,
      weight,
    }: {
      workoutId: number
      reps: number
      weight: number
    }) =>
      POST(`/workout/add-set/{id}`, {
        params: {
          path: {
            id: workoutId,
          },
        },
        body: { reps, weight },
      }),
    onSuccess: (_, variables) => {
      const { reps, weight } = variables
      addSet(reps, weight)

      queryClient.invalidateQueries({
        queryKey: ['workout', variables.workoutId],
      })
    },
  })
}

export const useCompleteWorkout = () => {
  const completeWorkout = useWorkoutStore(state => state.completeWorkout)
  const resetWorkout = useWorkoutStore(state => state.resetWorkout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sessionId, feedback }: { sessionId: number; feedback: string }) =>
      PUT(`/workout/complete/{id}`, {
        params: {
          path: {
            id: sessionId,
          },
        },
        body: { note: feedback },
      }),
    onSuccess: (_, variables) => {
      completeWorkout()
      resetWorkout()

      queryClient.invalidateQueries({
        queryKey: ['workout', variables.sessionId],
      })
    },
  })
}

export const getWorkout = async (workoutId: string, accessToken?: string) => {
  try {
    const response = await GET(`/workout/{id}`, {
      params: { path: { id: Number(workoutId) } },
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch workout:', error)
    throw error
  }
}

export const useGetWorkout = ({
  workoutId,
  initialData,
}: {
  workoutId: number
  initialData: WorkoutSession
}) => {
  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => getWorkout(workoutId.toString()),
    initialData,
  })
}

export const getIncompleteWorkouts = async (accessToken?: string) => {
  try {
    const response = await GET(`/workout/incomplete`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch workout:', error)
    throw error
  }
}

export const useGetIncompleteWorkouts = () => {
  return useQuery({
    queryKey: ['incompleteWorkouts'],
    queryFn: () => GET('/workout/incomplete'),
  })
}
