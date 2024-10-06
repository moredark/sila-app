import React, { FC } from 'react'

import { Set } from '@/entities/workout/model/workout.types'
import { WorkoutSet } from '@/entities/workout/ui'
import DeleteSetButton from '@/features/workout/ui/DeleteSetButton'
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
        sets?.map(set => <WorkoutSet key={set.id} set={set} />)
      ) : (
        <h2 className="text-center text-xl text-zinc-500">{t('set-is-empty')}</h2>
      )}
    </div>
  )
}

export default WorkoutSets
