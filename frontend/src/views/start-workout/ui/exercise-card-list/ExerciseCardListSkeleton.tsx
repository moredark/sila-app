import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

export const ExerciseCardListSkeleton: FC = () => (
  <div className="grid grid-cols-2 gap-2">
    {[...Array(6)].map((_, index) => (
      <Skeleton key={index} className="h-32 w-full" />
    ))}
  </div>
)
