import WorkoutByIdPage from '@/views/workout-by-id/ui/WorkoutByIdPage'
interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkoutById({ params }: Props) {
  const { id } = await params

  return <WorkoutByIdPage workoutId={Number(id)} />
}
