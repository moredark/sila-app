import { WorkoutSessionPage } from '@/views/workout-session/ui'
import { FC } from 'react'

const WorkoutSession: FC<{ params: { id: string } }> = async ({ params }) => {
  return <WorkoutSessionPage workoutId={Number(params.id)} />
}

export default WorkoutSession
