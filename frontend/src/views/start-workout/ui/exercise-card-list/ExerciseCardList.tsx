import { FC } from 'react'

import { Exercise } from '@/entities/exercise'
import { ErrorCard } from '@/shared/ui'

import { ExerciseCard } from './ExerciseCard'
import { ExerciseCardListSkeleton } from './ExerciseCardListSkeleton'

interface ExerciseCardListProps {
  exercises: Exercise[] | undefined
  isLoading: boolean
  selectedExerciseId: number | null
  onSelectExercise: (id: number) => void
  exercisesError: Error | null
}

export const ExerciseCardList: FC<ExerciseCardListProps> = ({
  exercises,
  isLoading,
  selectedExerciseId,
  onSelectExercise,
  exercisesError,
}) => {
  if (isLoading) {
    return <ExerciseCardListSkeleton />
  }

  if (exercisesError || !exercises) {
    return <ErrorCard message={exercisesError?.message || 'Error loading exercises'} />
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {exercises.map(exercise => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isSelected={selectedExerciseId === exercise.id}
          onSelect={onSelectExercise}
        />
      ))}
    </div>
  )
}
