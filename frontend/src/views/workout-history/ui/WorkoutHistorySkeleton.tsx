import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

export const WorkoutHistorySkeleton: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  )
}
