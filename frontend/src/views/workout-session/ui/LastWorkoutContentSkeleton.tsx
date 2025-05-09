import { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { TabsContent } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/skeleton'

const LastWorkoutContentSkeleton: FC = () => {
  const t = useTranslation()

  return (
    <TabsContent value="last">
      <h2 className="mb-4 text-center text-lg">{t('last-session')}</h2>
      <div className="space-y-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-16" />
      </div>
    </TabsContent>
  )
}

export default LastWorkoutContentSkeleton
