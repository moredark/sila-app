'use client'
import { FC } from 'react'

import { useGetWorkoutById } from '@/entities/workout/model/workout.api'
import { ErrorCard } from '@/shared/ui'
import { UserInfo } from '@/widgets/UserInfo/ui/UserInfo'

import { WorkoutByIdSkeleton } from './ui/WorkoutByIdSkeleton'
import { WorkoutDetails } from './ui/WorkoutDetails'

interface WorkoutByIdPageProps {
  workoutId: number
}

export const WorkoutByIdPage: FC<WorkoutByIdPageProps> = ({ workoutId }) => {
  const { data: exerciseData, isLoading, error } = useGetWorkoutById({ workout_id: workoutId })

  if (isLoading) {
    return <WorkoutByIdSkeleton />
  }

  if (!exerciseData || error) {
    return <ErrorCard message={error?.message || 'Error loading workout'} />
  }

  return (
    <div className="space-y-6">
      {exerciseData.user && <UserInfo user={exerciseData.user} />}
      <WorkoutDetails exerciseData={exerciseData} />
    </div>
  )
}
