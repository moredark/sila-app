import React, { FC } from 'react'

import { Set } from '@/entities/workout/model/workout.types'
import { useTranslation } from '@/shared/lib'
import { Card } from '@/shared/ui/card'

interface WorkoutSetsProps {
  sets?: Set[]
}

const WorkoutSets: FC<WorkoutSetsProps> = ({ sets }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      {!!sets?.length ? (
        sets?.map(set => (
          <Card key={set.id} className="flex items-center justify-between p-4">
            <span>
              {set.reps} {t('reps')}
            </span>
            <span>
              {set.weight} {t('weight')}
            </span>
          </Card>
        ))
      ) : (
        <h2 className="text-center text-xl text-zinc-500">{t('set-is-empty')}</h2>
      )}
    </div>
  )
}

export default WorkoutSets
