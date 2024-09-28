import React, { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'

interface WorkoutActionsProps {
  onAddSet: () => void
  onEndWorkout: () => void
}

const WorkoutActions: FC<WorkoutActionsProps> = ({ onAddSet, onEndWorkout }) => {
  const { t } = useTranslation()

  return (
    <div className="flex w-full justify-between gap-4">
      <Button className="w-full py-7" variant="destructive" onClick={onEndWorkout}>
        {t('end-workout')}
      </Button>
      <Button className="w-full py-7" variant="outline" onClick={onAddSet}>
        {t('add-set')}
      </Button>
    </div>
  )
}

export default WorkoutActions
