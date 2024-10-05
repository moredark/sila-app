'use client'

import React, { FC, useState } from 'react'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import AddSetDrawer from '@/features/workout/ui/AddSetDrawer'
import EndWorkoutDrawer from '@/features/workout/ui/EndWorkoutDrawer'
import { TabsContent, Timer } from '@/shared/ui'

import WorkoutActions from './WorkoutActions'
import WorkoutHeader from './WorkoutHeader'
import WorkoutSets from './WorkoutSets'

interface CurrentWorkoutContentProps {
  data: WorkoutSession | undefined
  workoutData: WorkoutSession
  isAddSetDrawerOpen: boolean
  setAddSetDrawerOpen: (open: boolean) => void
  isEndWorkoutDrawerOpen: boolean
  setEndWorkoutDrawerOpen: (open: boolean) => void
  handleSetAdded: () => void
}

const CurrentWorkoutContent: FC<CurrentWorkoutContentProps> = ({
  data,
  workoutData,
  isAddSetDrawerOpen,
  setAddSetDrawerOpen,
  isEndWorkoutDrawerOpen,
  setEndWorkoutDrawerOpen,
  handleSetAdded,
}) => {
  return (
    <TabsContent value="current">
      <div className="flex flex-col gap-6">
        <WorkoutHeader exerciseName={data?.exercise?.name} />
        <WorkoutActions
          onAddSet={() => setAddSetDrawerOpen(true)}
          onEndWorkout={() => setEndWorkoutDrawerOpen(true)}
        />
        <WorkoutSets sets={data?.sets} />
        <AddSetDrawer
          open={isAddSetDrawerOpen}
          onOpenChange={setAddSetDrawerOpen}
          workoutId={workoutData.id!}
          onSetAdded={handleSetAdded}
        />
        <EndWorkoutDrawer
          open={isEndWorkoutDrawerOpen}
          onOpenChange={setEndWorkoutDrawerOpen}
          workoutId={workoutData.id!}
        />
      </div>
    </TabsContent>
  )
}

export default CurrentWorkoutContent
