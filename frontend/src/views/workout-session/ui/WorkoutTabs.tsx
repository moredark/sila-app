import { FC, ReactNode } from 'react'

import { DeleteWorkout } from '@/features/workout/ui'
import { useTranslation } from '@/shared/lib'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'

interface WorkoutTabsProps {
  children: ReactNode
  workoutId: number | undefined
}

const WorkoutTabs: FC<WorkoutTabsProps> = ({ children, workoutId }) => {
  const { t } = useTranslation()

  return (
    <Tabs defaultValue="current" className="h-full">
      <div className="mb-4 flex items-center gap-2">
        <TabsList className="flex w-full gap-2">
          <TabsTrigger className="w-full" value="current">
            {t('current-workout')}
          </TabsTrigger>
          <TabsTrigger className="w-full" value="last">
            {t('last-workout')}
          </TabsTrigger>
        </TabsList>
        {workoutId && <DeleteWorkout workoutId={workoutId} />}
      </div>
      {children}
    </Tabs>
  )
}

export default WorkoutTabs
