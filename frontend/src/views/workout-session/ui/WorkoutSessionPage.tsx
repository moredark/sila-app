'use client'

import { FC, useState } from 'react'

import { useGetWorkout } from '@/entities/workout/model/workout.api'
import { WorkoutSession } from '@/entities/workout/model/workout.types'

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

  return (
    <div className="h-full p-4 pb-16">
      <WorkoutTabs>
        <CurrentWorkoutContent
          data={data}
          workoutData={workoutData}
          isAddSetDrawerOpen={isAddSetDrawerOpen}
          setAddSetDrawerOpen={setAddSetDrawerOpen}
          isEndWorkoutDrawerOpen={isEndWorkoutDrawerOpen}
          setEndWorkoutDrawerOpen={setEndWorkoutDrawerOpen}
        />
        <LastWorkoutContent data={data} />
      </WorkoutTabs>
    </div>
  )
}
