import { getWorkout } from '@/entities/workout/model/workout.api'
import WorkoutSessionPage from '@/views/workout-session/ui'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'
import { cookies } from 'next/headers'
import { FC } from 'react'

const WorkoutSession: FC<{ params: { id: string } }> = async ({ params }) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value

  const workout = await getWorkout(params.id, accessToken)

  if (!workout) {
    return (
      <div className="flex justify-center p-4">
        <p>Failed to load workout data</p>
      </div>
    )
  }

  return <WorkoutSessionPage workoutData={workout} />
}

export default WorkoutSession
