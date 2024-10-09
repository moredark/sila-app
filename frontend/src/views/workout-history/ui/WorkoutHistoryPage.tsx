'use client'

import { useState } from 'react'

import { useGetExercises } from '@/entities/exercise'
import { useGetWorkoutsByExercises, WORKOUTS_BY_EXERCISES_LIMIT } from '@/entities/workout'
import { useTranslation } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/skeleton'

import { ExerciseSelector } from './ExerciseSelector'
import { WorkoutList } from './WorkoutList'
import { WorkoutPagination } from './WorkoutPagination'

const BENCH_PRESS_ID = 16

export const WorkoutHistoryPage = () => {
  const t = useTranslation()

  const [selectedExerciseId, setSelectedExerciseId] = useState<number>(BENCH_PRESS_ID)
  const [page, setPage] = useState(1)

  const { data: exercises, isLoading: loadingExercises } = useGetExercises()
  const { data: workouts, isLoading: loadingWorkouts } = useGetWorkoutsByExercises({
    exercise_id: selectedExerciseId,
    page,
    limit: WORKOUTS_BY_EXERCISES_LIMIT,
  })

  const totalPages = workouts?.data?.total
    ? Math.ceil(workouts?.data?.total / WORKOUTS_BY_EXERCISES_LIMIT) || 1
    : 1

  const handleExerciseSelect = (value: number | null) => {
    if (value === null) return
    setSelectedExerciseId(value)
    setPage(1)
  }

  if (loadingExercises || loadingWorkouts) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="mb-3 text-center text-lg">{t('history')}</h2>
      <ExerciseSelector
        exercises={
          exercises?.map(exercise => ({
            label: exercise.name as string,
            value: exercise.id as number,
          })) || []
        }
        defaultValue={BENCH_PRESS_ID}
        onSelect={handleExerciseSelect}
      />

      {workouts?.data?.items && workouts?.data?.items.length > 0 ? (
        <WorkoutList workouts={workouts?.data?.items || []} />
      ) : (
        <p className="w-full text-center">{t('nothing-found')}</p>
      )}

      <WorkoutPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}

export default WorkoutHistoryPage
