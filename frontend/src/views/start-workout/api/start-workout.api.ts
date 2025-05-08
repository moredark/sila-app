import { useGetExercises } from '@/entities/exercise/api'
import { useGetMuscleGroups } from '@/entities/muscle-group/api'
import { useGetIncompleteWorkouts, useStartWorkout } from '@/entities/workout/api'

export const startWorkoutApi = {
  useGetExercises,
  useGetMuscleGroups,
  useGetIncompleteWorkouts,
  useStartWorkout,
}
