import { useState } from 'react'

import { WorkoutSession } from '@/entities/workout/model/workout.types'

import { startWorkoutApi } from '../api'

export function useStartWorkoutPage() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
  const { data: incompleteWorkoutsData } = startWorkoutApi.useGetIncompleteWorkouts()
  const { data: muscleGroups } = startWorkoutApi.useGetMuscleGroups()

  const [search, setSearch] = useState('')
  const [muscleGroupId, setMuscleGroupId] = useState<number | undefined>()

  const {
    data: exercises,
    isLoading,
    error: exercisesError,
  } = startWorkoutApi.useGetExercises({ search, muscle_group_id: muscleGroupId })

  const handleSearchChange = (query: string) => {
    setSearch(query)
  }

  const handleMuscleGroupsChange = (id: number | undefined) => {
    setMuscleGroupId(id)
  }

  const onSelectExercise = (exerciseId: number) => {
    if (exerciseId === selectedExerciseId) {
      setSelectedExerciseId(null)
    } else {
      setSelectedExerciseId(exerciseId)
    }
  }

  const incompleteWorkouts = (incompleteWorkoutsData?.data as WorkoutSession[]) || []

  return {
    exercises,
    incompleteWorkouts,
    isLoading,
    exercisesError,
    muscleGroups,
    selectedExerciseId,
    handleSearchChange,
    handleMuscleGroupsChange,
    onSelectExercise,
  }
}
