import React, { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model'
import { useTranslation } from '@/shared/lib'
import { TabsContent } from '@/shared/ui'
import { SetsTable } from '@/widgets/SetsTable'
import { WorkoutNote } from '@/widgets/WorkoutNote'

import LastWorkoutContentSkeleton from './LastWorkoutContentSkeleton'

interface LastWorkoutContentProps {
  data?: WorkoutSession
  isLoading: boolean
}

const LastWorkoutContent: FC<LastWorkoutContentProps> = ({ data, isLoading }) => {
  const t = useTranslation()
  const lastSession = data?.last_session

  if (isLoading) {
    return <LastWorkoutContentSkeleton />
  }

  return (
    <TabsContent value="last">
      <h2 className="mb-4 text-center text-lg">{t('last-session')}</h2>
      <div className="flex flex-col gap-4">
        {lastSession && lastSession.sets.length > 0 ? (
          <SetsTable sets={lastSession.sets} />
        ) : (
          <p className="text-center">{t('last-session-not-found')}</p>
        )}

        {lastSession?.note && <WorkoutNote note={lastSession.note} />}
      </div>
    </TabsContent>
  )
}

export default LastWorkoutContent
