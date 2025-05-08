import { Exercise } from '@/entities/exercise/model'

/**
 * Преобразует данные упражнений в формат для селектора
 */
export const mapExercisesToOptions = (exercises?: Exercise[]) => {
  if (!exercises) return []

  return exercises.map(exercise => ({
    label: exercise.name as string,
    value: exercise.id as number,
  }))
}
