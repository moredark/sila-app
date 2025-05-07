'use client'

import { FC, useState } from 'react'

import { useGetWorkout } from '@/entities/workout/api'
import { Timer } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { ErrorCard } from '@/shared/ui/error-card'
import { Skeleton } from '@/shared/ui/skeleton'

import CurrentWorkoutContent from './CurrentWorkoutContent'
import LastWorkoutContent from './LastWorkoutContent'
import WorkoutTabs from './WorkoutTabs'

interface Props {
  workoutId: number
}

export const WorkoutSessionPage: FC<Props> = ({ workoutId }) => {
  const {
    data: workoutData,
    isLoading,
    error,
  } = useGetWorkout({
    workoutId: workoutId,
  })
  const [isAddSetDrawerOpen, setAddSetDrawerOpen] = useState(false)
  const [isEndWorkoutDrawerOpen, setEndWorkoutDrawerOpen] = useState(false)

  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  if (isLoading) {
    return (
      <div className="h-full p-4 pb-[85px]">
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full p-4 pb-[85px]">
        <ErrorCard message={error.message} />
      </div>
    )
  }

  if (!workoutData) {
    return null
  }

  const handleSetAdded = () => {
    setIsTimerRunning(false)
    setTimeout(() => {
      setIsPaused(false)
      setIsTimerRunning(true)
    }, 0)
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setIsPaused(false)
  }

  const handlePauseToggle = () => {
    if (isTimerRunning) {
      setIsPaused(!isPaused)
      setIsTimerRunning(!isPaused)
    } else {
      setIsTimerRunning(true)
    }
  }

  return (
    <div className="h-full pb-[85px]">
      <WorkoutTabs workoutId={workoutId}>
        <CurrentWorkoutContent
          workoutData={workoutData}
          isAddSetDrawerOpen={isAddSetDrawerOpen}
          setAddSetDrawerOpen={setAddSetDrawerOpen}
          isEndWorkoutDrawerOpen={isEndWorkoutDrawerOpen}
          setEndWorkoutDrawerOpen={setEndWorkoutDrawerOpen}
          handleSetAdded={handleSetAdded}
        />
        <LastWorkoutContent data={workoutData} />
      </WorkoutTabs>
      <Timer
        isRunning={isTimerRunning}
        onPauseToggle={handlePauseToggle}
        onReset={handleTimerReset}
      />
    </div>
  )
}
