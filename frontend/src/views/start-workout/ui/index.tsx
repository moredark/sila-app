'use client'

import React, { FC, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useStartWorkout } from '@/entities/workout'
import { useGetIncompleteWorkouts } from '@/entities/workout/model/workout.api'
import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { ExerciseList } from './ExerciseList'

export const StartWorkoutPage: FC = () => {
  const t = useTranslation()
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
  const { mutateAsync: startWorkout } = useStartWorkout()
  const { push } = useRouter()

  const { data: incompleteWorkouts } = useGetIncompleteWorkouts()

  const handleStartTraining = () => {
    if (selectedExerciseId) {
      startWorkout({ exerciseId: selectedExerciseId }).then(res => {
        if (res.data?.session_id) {
          push(`/workout/${res.data.session_id}`)
        }
      })
    }
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="new">
        <TabsList className="mb-4 flex gap-2">
          <TabsTrigger className="w-full" value="new">
            {t('new-workout')}
          </TabsTrigger>
          <TabsTrigger className="w-full" value="incomplete">
            {t('incomplete-workouts')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <h2 className="mb-3 text-center text-lg">{t('choose-exercise')}</h2>
          <ExerciseList
            selectedExerciseId={selectedExerciseId}
            onSelectExercise={id => setSelectedExerciseId(id === selectedExerciseId ? null : id)}
          />
          <div
            className={`fixed inset-x-0 bottom-20 flex justify-center p-4 transition-all duration-300${selectedExerciseId ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}
          >
            <Button onClick={handleStartTraining} className="w-full max-w-xs p-6 text-lg">
              {t('start-workout')}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="incomplete">
          <h2 className="mb-3 text-center text-lg">{t('incomplete-workouts')}</h2>
          {incompleteWorkouts ? (
            <ul className="mb-6">
              {incompleteWorkouts.data?.map((workout: WorkoutSession) => (
                <li key={workout.id} className="mb-3">
                  <Card
                    className="flex w-full justify-between p-4"
                    onClick={() => push(`/workout/${workout.id}`)}
                  >
                    <p>{workout.exercise?.name}</p>
                    <p>
                      {t('sets')}: {workout.sets?.length || 0}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('no-incomplete-workouts')}</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
