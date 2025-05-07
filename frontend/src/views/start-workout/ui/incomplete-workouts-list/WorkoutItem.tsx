import { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model'
import { useTranslation } from '@/shared/lib'
import { Card } from '@/shared/ui/card'

interface WorkoutItemProps {
  workout: WorkoutSession
  onSelect: () => void
}

export const WorkoutItem: FC<WorkoutItemProps> = ({ workout, onSelect }) => {
  const t = useTranslation()

  return (
    <li className="mb-3">
      <Card className="flex w-full justify-between p-4" onClick={onSelect}>
        <p>{workout.exercise?.name}</p>
        <p>
          {t('sets')}: {workout.sets?.length || 0}
        </p>
      </Card>
    </li>
  )
}
