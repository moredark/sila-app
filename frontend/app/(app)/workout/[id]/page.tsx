import { WorkoutSessionPage } from '@/views/workout-session/ui'

interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkoutSession({ params }: Props) {
  const { id } = await params

  return <WorkoutSessionPage workoutId={Number(id)} />
}
