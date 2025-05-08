import React, { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model'
import { useTranslation } from '@/shared/lib'
import { TabsContent } from '@/shared/ui'
import { SetsTable } from '@/widgets/SetsTable'
import { WorkoutNote } from '@/widgets/WorkoutNote'

interface LastWorkoutContentProps {
  data: WorkoutSession | undefined
}

const LastWorkoutContent: FC<LastWorkoutContentProps> = ({ data }) => {
  const t = useTranslation()

  return (
    <TabsContent value="last">
      <h2 className="mb-4 text-center text-lg">{t('last-session')}</h2>
      <div className="flex flex-col gap-4">
        {data?.last_session?.sets ? (
          <SetsTable sets={data.last_session?.sets} />
        ) : (
          <p className="text-center">{t('last-session-not-found')}</p>
        )}
        {data?.last_session?.note && <WorkoutNote note={data.last_session.note} />}
      </div>
    </TabsContent>
  )
}

export default LastWorkoutContent
