'use client'

import { FC, useState } from 'react'

import { useGetWorkout } from '@/entities/workout/model/workout.api'
import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { Timer } from '@/shared/ui'

import CurrentWorkoutContent from './CurrentWorkoutContent'
import LastWorkoutContent from './LastWorkoutContent'
import WorkoutTabs from './WorkoutTabs'

interface Props {
  workoutData: WorkoutSession
}

export const WorkoutSessionPage: FC<Props> = ({ workoutData }) => {
  const { data } = useGetWorkout({
    workoutId: workoutData.id!,
    initialData: workoutData,
  })
  const [isAddSetDrawerOpen, setAddSetDrawerOpen] = useState(false)
  const [isEndWorkoutDrawerOpen, setEndWorkoutDrawerOpen] = useState(false)

  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

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
    <div className="h-full p-4 pb-[85px]">
      <WorkoutTabs workoutId={workoutData.id}>
        <CurrentWorkoutContent
          data={data}
          workoutData={workoutData}
          isAddSetDrawerOpen={isAddSetDrawerOpen}
          setAddSetDrawerOpen={setAddSetDrawerOpen}
          isEndWorkoutDrawerOpen={isEndWorkoutDrawerOpen}
          setEndWorkoutDrawerOpen={setEndWorkoutDrawerOpen}
          handleSetAdded={handleSetAdded}
        />
        <LastWorkoutContent data={data} />
      </WorkoutTabs>
      <Timer
        isRunning={isTimerRunning}
        onPauseToggle={handlePauseToggle}
        onReset={handleTimerReset}
      />
    </div>
  )
}
