'use client'

import { useState } from 'react'

import { useGetExercises } from '@/entities/exercise'
import { useGetWorkoutsByExercises, WORKOUTS_BY_EXERCISES_LIMIT } from '@/entities/workout'
import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { useTranslation } from '@/shared/lib'

import { DEFAULT_EXERCISE_ID, mapExercisesToOptions } from './lib'
import { ExerciseSelector } from './ui/ExerciseSelector'
import { WorkoutHistorySkeleton } from './ui/WorkoutHistorySkeleton'
import { WorkoutList } from './ui/WorkoutList'
import { WorkoutPagination } from './ui/WorkoutPagination'

export const WorkoutHistoryPage = () => {
  const t = useTranslation()

  const [selectedExerciseId, setSelectedExerciseId] = useState<number>(DEFAULT_EXERCISE_ID)
  const [page, setPage] = useState(1)

  const { data: exercises, isLoading: loadingExercises } = useGetExercises()
  const { data: workouts, isLoading: loadingWorkouts } = useGetWorkoutsByExercises({
    exercise_id: selectedExerciseId,
    page,
    limit: WORKOUTS_BY_EXERCISES_LIMIT,
  })

  const totalPages = workouts?.data?.total
    ? Math.ceil(workouts.data.total / WORKOUTS_BY_EXERCISES_LIMIT) || 1
    : 1

  const exerciseOptions = mapExercisesToOptions(exercises)
  const workoutItems = (workouts?.data?.items as WorkoutSession[]) || []
  const hasWorkouts = workoutItems.length > 0
  const isLoading = loadingExercises || loadingWorkouts

  const handleExerciseSelect = (value: number | undefined) => {
    if (value === undefined) return
    setSelectedExerciseId(value)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-center text-xl font-semibold">{t('history')}</h2>

      <div className="space-y-6">
        <ExerciseSelector
          exercises={exerciseOptions}
          defaultValue={DEFAULT_EXERCISE_ID}
          onSelect={handleExerciseSelect}
        />

        <div className="min-h-[300px]">
          {isLoading ? (
            <WorkoutHistorySkeleton />
          ) : hasWorkouts ? (
            <WorkoutList workouts={workoutItems} />
          ) : (
            <p className="mt-8 w-full text-center text-muted-foreground">{t('nothing-found')}</p>
          )}
        </div>

        {!isLoading && hasWorkouts && (
          <WorkoutPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}
