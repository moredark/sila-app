import { WorkoutByIdPage } from '@/views/workout-by-id'
import { FC } from 'react'
import { notFound } from 'next/navigation'

interface WorkoutByIdProps {
  params: Promise<{ id: string }>
}

const WorkoutById: FC<WorkoutByIdProps> = async ({ params }) => {
  const { id } = await params
  const workoutId = Number(id)

  if (isNaN(workoutId) || workoutId <= 0) {
    return notFound()
  }

  return <WorkoutByIdPage workoutId={workoutId} />
}

export default WorkoutById
