import WorkoutByIdPage from '@/views/workout-by-id/ui/WorkoutByIdPage'
import { FC } from 'react'

const WorkoutById: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params

  return <WorkoutByIdPage workoutId={Number(id)} />
}

export default WorkoutById
