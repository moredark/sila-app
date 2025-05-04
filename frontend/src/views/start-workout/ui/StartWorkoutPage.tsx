'use client'

import { FC, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useGetExercises } from '@/entities/exercise'
import { useGetMuscleGroups } from '@/entities/muscle-group/api/useGetMuscleGroups'
import { useGetIncompleteWorkouts, useStartWorkout } from '@/entities/workout'
import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { ExerciseCardList } from './ExerciseCardList'
import { ExerciseSearch } from './ExerciseSearch'
import { IncompleteWorkoutsList } from './IncompleteWorkoutsList'

export const StartWorkoutPage: FC = () => {
  const t = useTranslation()
  const { push } = useRouter()
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
  const { mutateAsync: startWorkout } = useStartWorkout()
  const { data: incompleteWorkouts } = useGetIncompleteWorkouts()
  const { data: muscleGroups } = useGetMuscleGroups()

  const [search, setSearch] = useState('')
  const [muscleGroupId, setMuscleGroupId] = useState<number | undefined>()
  const {
    data: exercises,
    isLoading,
    error: exercisesError,
  } = useGetExercises({ search, muscle_group_id: muscleGroupId })

  const handleStartTraining = async () => {
    if (selectedExerciseId) {
      const res = await startWorkout({ exerciseId: selectedExerciseId })
      if (res.data?.session_id) {
        push(`/workout/${res.data.session_id}`)
      }
    }
  }

  const handleSearchChange = (query: string) => {
    setSearch(query)
  }

  const handleMuscleGroupsChange = (id: number | undefined) => {
    setMuscleGroupId(id)
  }

  const onSelectExercise = (exerciseId: number | null) => {
    if (exerciseId === selectedExerciseId) {
      setSelectedExerciseId(null)
    } else {
      setSelectedExerciseId(exerciseId)
    }
  }

  return (
    <div className="p-4">
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
          <IncompleteWorkoutsList workouts={incompleteWorkouts?.data as WorkoutSession[] || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
