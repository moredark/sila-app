import { Set } from '@/entities/workout/model/workout.types'

export function calculateAverageWeight(sets: Set[]): number {
  if (sets.length === 0) return 0

  const totalWeight = sets.reduce((sum, set) => sum + set.weight!, 0)
  const averageWeight = Math.round(totalWeight / sets.length)

  return averageWeight
}
