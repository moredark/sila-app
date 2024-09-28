import React, { FC } from 'react'

interface WorkoutHeaderProps {
  exerciseName?: string
}

const WorkoutHeader: FC<WorkoutHeaderProps> = ({ exerciseName }) => {
  return (
    <div className="flex justify-center">
      <h2 className="text-4xl">{exerciseName}</h2>
    </div>
  )
}

export default WorkoutHeader
