import React, { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

interface WorkoutHeaderProps {
  exerciseName?: string
}

const WorkoutHeader: FC<WorkoutHeaderProps> = ({ exerciseName }) => {
  return (
    <div className="flex justify-center">
      {exerciseName ? (
        <h2 className="text-2xl">{exerciseName}</h2>
      ) : (
        <Skeleton className="h-8 w-40" />
      )}
    </div>
  )
}

export default WorkoutHeader
