import { WorkoutSessionPage } from '@/views/workout-session/ui'

// @ts-ignore: Ignore params typing issue with Next.js 15
export default async function WorkoutSession({ params }: any) {
  const { id } = await params

  return <WorkoutSessionPage workoutId={Number(id)} />
}
