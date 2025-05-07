'use client'

import { FC } from 'react'

import { useRouter } from 'next/navigation'

import { APP_ROUTES } from '@/shared/config/routes'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { startWorkoutApi } from './api'
import { useStartWorkoutPage } from './model'
import { ExerciseCardList, ExerciseSearch, IncompleteWorkoutsList } from './ui'

export const StartWorkoutPage: FC = () => {
  const t = useTranslation()
  const { push } = useRouter()
  const { mutateAsync: startWorkout } = startWorkoutApi.useStartWorkout()

  const {
    exercises,
    incompleteWorkouts,
    isLoading,
    exercisesError,
    muscleGroups,
    selectedExerciseId,
    handleSearchChange,
    handleMuscleGroupsChange,
    onSelectExercise,
  } = useStartWorkoutPage()

  const handleStartTraining = async () => {
    if (selectedExerciseId) {
      const res = await startWorkout({ exerciseId: selectedExerciseId })
      if (res.data?.session_id) {
        push(APP_ROUTES.WORKOUT.DETAIL(res.data.session_id))
      }
    }
  }

  return (
    <div>
      <Tabs defaultValue="new">
        <TabsList className="mb-4 flex gap-2">
          <TabsTrigger className="tabs-trigger w-full" value="new">
            {t('new-workout')}
          </TabsTrigger>
          <TabsTrigger className="tabs-trigger w-full" value="incomplete">
            {t('incomplete-workouts')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="flex flex-col gap-4">
          <h2 className="text-center text-lg">{t('choose-exercise')}</h2>

          <ExerciseSearch
            onSearch={handleSearchChange}
            onSelectMuscleGroup={handleMuscleGroupsChange}
            muscleGroups={muscleGroups || []}
          />

          <ExerciseCardList
            exercises={exercises}
            isLoading={isLoading}
            exercisesError={exercisesError}
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={onSelectExercise}
          />

          <div
            className={`fixed inset-x-0 bottom-20 flex justify-center p-4 transition-all duration-300 ${
              selectedExerciseId
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-10 opacity-0'
            }`}
          >
            <Button onClick={handleStartTraining} className="w-full max-w-xs p-6 text-lg">
              {t('start-workout')}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="incomplete">
          <IncompleteWorkoutsList workouts={incompleteWorkouts || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
