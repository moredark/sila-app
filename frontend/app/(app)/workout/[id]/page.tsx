import { WorkoutSessionPage } from '@/views/workout-session/ui'

export default async function WorkoutSession({ params }: any) {
  const { id } = await params

  return <WorkoutSessionPage workoutId={Number(id)} />
}
