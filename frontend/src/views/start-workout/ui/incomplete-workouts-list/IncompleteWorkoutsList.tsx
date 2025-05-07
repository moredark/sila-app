import { FC } from 'react'

import { useRouter } from 'next/navigation'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { APP_ROUTES } from '@/shared/config/routes'
import { useTranslation } from '@/shared/lib'

import { WorkoutItem } from './WorkoutItem'

interface IncompleteWorkoutsListProps {
  workouts: WorkoutSession[]
}

export const IncompleteWorkoutsList: FC<IncompleteWorkoutsListProps> = ({ workouts }) => {
  const t = useTranslation()
  const { push } = useRouter()

  if (workouts.length === 0) {
    return <p className="text-center">{t('no-incomplete-workouts')}</p>
  }

  const handleWorkoutSelect = (workoutId: number) => {
    push(APP_ROUTES.WORKOUT.DETAIL(workoutId))
  }

  return (
    <ul className="mb-6">
      {workouts.map(workout => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          onSelect={() => handleWorkoutSelect(workout.id)}
        />
      ))}
    </ul>
  )
}
