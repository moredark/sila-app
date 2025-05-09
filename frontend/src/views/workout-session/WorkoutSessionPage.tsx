'use client'

import { FC, useState } from 'react'

import { useGetWorkout } from '@/entities/workout/api'
import { Timer } from '@/shared/ui'
import { ErrorCard } from '@/shared/ui/error-card'

import CurrentWorkoutContent from './ui/CurrentWorkoutContent'
import LastWorkoutContent from './ui/LastWorkoutContent'
import WorkoutTabs from './ui/WorkoutTabs'

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

  if (error) {
    return (
      <div className="h-full pb-[85px]">
        <ErrorCard message={error.message} />
      </div>
    )
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
          isLoading={isLoading}
          isAddSetDrawerOpen={isAddSetDrawerOpen}
          setAddSetDrawerOpen={setAddSetDrawerOpen}
          isEndWorkoutDrawerOpen={isEndWorkoutDrawerOpen}
          setEndWorkoutDrawerOpen={setEndWorkoutDrawerOpen}
          handleSetAdded={handleSetAdded}
        />
        <LastWorkoutContent data={workoutData} isLoading={isLoading} />
      </WorkoutTabs>
      <Timer
        isRunning={isTimerRunning}
        onPauseToggle={handlePauseToggle}
        onReset={handleTimerReset}
      />
    </div>
  )
}
