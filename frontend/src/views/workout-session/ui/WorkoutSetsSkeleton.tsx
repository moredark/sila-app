import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

const WorkoutSetsSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[58px]" />
      <Skeleton className="h-[58px]" />
      <Skeleton className="h-[58px]" />
    </div>
  )
}

export default WorkoutSetsSkeleton
