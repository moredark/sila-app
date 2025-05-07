import { useRouter } from 'next/navigation'

import { WorkoutSession } from '@/entities/workout/model'
import { APP_ROUTES } from '@/shared/config'

import { WorkoutCard } from './WorkoutCard'

type WorkoutListProps = {
  workouts: WorkoutSession[]
}

export const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-4">
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onClick={() => router.push(APP_ROUTES.WORKOUT_HISTORY.DETAIL(workout.id))}
        />
      ))}
    </div>
  )
}
