'use client'

import { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model'
import AddSetDrawer from '@/features/workout/ui/AddSetDrawer'
import EndWorkoutDrawer from '@/features/workout/ui/EndWorkoutDrawer'
import { TabsContent } from '@/shared/ui'

import WorkoutActions from './WorkoutActions'
import WorkoutHeader from './WorkoutHeader'
import WorkoutSets from './WorkoutSets'
import WorkoutSetsSkeleton from './WorkoutSetsSkeleton'

interface CurrentWorkoutContentProps {
  workoutData?: WorkoutSession
  isLoading: boolean
  isAddSetDrawerOpen: boolean
  setAddSetDrawerOpen: (open: boolean) => void
  isEndWorkoutDrawerOpen: boolean
  setEndWorkoutDrawerOpen: (open: boolean) => void
  handleSetAdded: () => void
}

const CurrentWorkoutContent: FC<CurrentWorkoutContentProps> = ({
  workoutData,
  isLoading,
  isAddSetDrawerOpen,
  setAddSetDrawerOpen,
  isEndWorkoutDrawerOpen,
  setEndWorkoutDrawerOpen,
  handleSetAdded,
}) => {
  if (!workoutData && !isLoading) return null

  return (
    <TabsContent value="current">
      <div className="flex flex-col gap-6">
        <WorkoutHeader exerciseName={workoutData?.exercise?.name} />
        <WorkoutActions
          onAddSet={() => setAddSetDrawerOpen(true)}
          onEndWorkout={() => setEndWorkoutDrawerOpen(true)}
          disabled={isLoading || !workoutData}
        />

        {isLoading ? <WorkoutSetsSkeleton /> : <WorkoutSets sets={workoutData?.sets} />}

        {workoutData && (
          <>
            <AddSetDrawer
              open={isAddSetDrawerOpen}
              onOpenChange={setAddSetDrawerOpen}
              workoutId={workoutData.id}
              onSetAdded={handleSetAdded}
            />
            <EndWorkoutDrawer
              open={isEndWorkoutDrawerOpen}
              onOpenChange={setEndWorkoutDrawerOpen}
              workoutId={workoutData.id}
            />
          </>
        )}
      </div>
    </TabsContent>
  )
}

export default CurrentWorkoutContent
