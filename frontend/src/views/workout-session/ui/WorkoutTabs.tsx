import React, { FC, ReactNode } from 'react'

import { useTranslation } from '@/shared/lib'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

interface WorkoutTabsProps {
  children: ReactNode
}

const WorkoutTabs: FC<WorkoutTabsProps> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <Tabs defaultValue="current" className="h-full">
      <TabsList className="mb-4 flex gap-2">
        <TabsTrigger className="w-full" value="current">
          {t('current-workout')}
        </TabsTrigger>
        <TabsTrigger className="w-full" value="last">
          {t('last-workout')}
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

export default WorkoutTabs
