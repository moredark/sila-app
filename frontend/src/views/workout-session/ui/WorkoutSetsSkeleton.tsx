import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

const WorkoutSetsSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-20" />
      <Skeleton className="h-20" />
      <Skeleton className="h-20" />
    </div>
  )
}

export default WorkoutSetsSkeleton
