import React, { useState } from 'react'

import { useSwipeable } from 'react-swipeable'

import { Set } from '@/entities/workout/model/workout.types'
import DeleteSetButton from '@/features/workout/ui/DeleteSetButton'
import { useTranslation } from '@/shared/lib'
import { Card } from '@/shared/ui/card'

interface WorkoutSetProps {
  set: Set
}

export const WorkoutSet: React.FC<WorkoutSetProps> = ({ set }) => {
  const { t } = useTranslation()
  const [isSwiped, setIsSwiped] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
    trackMouse: true,
  })

  return (
    <div {...handlers} className="relative">
      <Card
        className={`flex items-center justify-between p-4 transition-transform ${isSwiped ? '-translate-x-20' : 'translate-x-0'}`}
      >
        <span>
          {set.reps} {t('reps')}
        </span>

        <div className="flex items-center gap-2">
          <span>
            {set.weight} {t('weight')}
          </span>
        </div>
      </Card>

      {isSwiped && (
        <div className="absolute right-0 top-0 flex h-full items-center pr-4">
          <DeleteSetButton setId={set.id!} />
        </div>
      )}
    </div>
  )
}
