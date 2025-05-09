import React, { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'

interface WorkoutActionsProps {
  onAddSet: () => void
  onEndWorkout: () => void
  disabled?: boolean
}

const WorkoutActions: FC<WorkoutActionsProps> = ({ onAddSet, onEndWorkout, disabled = false }) => {
  const t = useTranslation()

  return (
    <div className="flex w-full justify-between gap-4">
      <Button
        className="w-full py-7"
        variant="destructive"
        onClick={onEndWorkout}
        disabled={disabled}
      >
        {t('end-workout')}
      </Button>
      <Button className="w-full py-7" variant="outline" onClick={onAddSet} disabled={disabled}>
        {t('add-set')}
      </Button>
    </div>
  )
}

export default WorkoutActions
