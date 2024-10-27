import React, { FC } from 'react'

import { useRouter } from 'next/navigation'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { useTranslation } from '@/shared/lib'
import { Card } from '@/shared/ui/card'

interface IncompleteWorkoutsListProps {
  workouts: WorkoutSession[]
}

export const IncompleteWorkoutsList: FC<IncompleteWorkoutsListProps> = ({ workouts }) => {
  const t = useTranslation()
  const { push } = useRouter()

  if (workouts.length === 0) return <p>{t('no-incomplete-workouts')}</p>

  return (
    <ul className="mb-6">
      {workouts.map(workout => (
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
  )
}
