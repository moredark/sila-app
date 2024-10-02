import WorkoutByIdPage from '@/views/workout-by-id/ui/WorkoutByIdPage'
import React, { FC } from 'react'

const WorkoutById: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  return <WorkoutByIdPage workoutId={Number(id)} />
}

export default WorkoutById
