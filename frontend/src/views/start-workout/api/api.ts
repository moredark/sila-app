import { useGetExercises } from '@/entities/exercise'
import { useGetMuscleGroups } from '@/entities/muscle-group/api/useGetMuscleGroups'
import { useGetIncompleteWorkouts, useStartWorkout } from '@/entities/workout'

export const startWorkoutApi = {
  useGetExercises,
  useGetMuscleGroups,
  useGetIncompleteWorkouts,
  useStartWorkout,
}
