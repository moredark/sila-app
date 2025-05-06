import WorkoutByIdPage from '@/views/workout-by-id/ui/WorkoutByIdPage'

export default async function WorkoutById({ params }: any) {
  const { id } = await params

  return <WorkoutByIdPage workoutId={Number(id)} />
}
