import WorkoutByIdPage from '@/views/workout-by-id/ui/WorkoutByIdPage'

// @ts-ignore: Ignore params typing issue with Next.js 15
export default async function WorkoutById({ params }: any) {
  const { id } = await params

  return <WorkoutByIdPage workoutId={Number(id)} />
}
