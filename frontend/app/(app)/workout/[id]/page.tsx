import { WorkoutSessionPage } from '@/views/workout-session'
import { FC } from 'react'

const WorkoutSession: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params

  return <WorkoutSessionPage workoutId={Number(id)} />
}

export default WorkoutSession
