'use client'

import { FC, useState } from 'react'

import { useGetWorkout } from '@/entities/workout/api'
import { ErrorCard } from '@/shared/ui/error-card'
import { Timer, useWorkoutTimer } from '@/widgets/Timer'

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

  const { time, isRunning, resetTimer, togglePause, handleSetAdded } = useWorkoutTimer()

  const [isAddSetDrawerOpen, setAddSetDrawerOpen] = useState(false)
  const [isEndWorkoutDrawerOpen, setEndWorkoutDrawerOpen] = useState(false)

  if (error) {
    return (
      <div className="h-full pb-[85px]">
        <ErrorCard message={error.message} />
      </div>
    )
  }

  return (
    <div className="relative h-full">
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

      <div className="absolute bottom-2 w-full">
        <Timer time={time} isRunning={isRunning} onPauseToggle={togglePause} onReset={resetTimer} />
      </div>
    </div>
  )
}
