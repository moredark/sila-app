// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Set } from '@/entities/workout/model/workout.types'

import { calculateAverageWeight } from '../calculateAverageWeight'

describe('calculateAverageWeight', () => {
  it('should return 0 for empty array', () => {
    expect(calculateAverageWeight([])).toBe(0)
  })

  it('should return weight for single set', () => {
    const sets: Set[] = [{ id: '1', weight: 50, reps: 10 }]
    expect(calculateAverageWeight(sets)).toBe(50)
  })

  it('should calculate average weight for multiple sets', () => {
    const sets: Set[] = [
      { id: '1', weight: 50, reps: 10 },
      { id: '2', weight: 60, reps: 8 },
      { id: '3', weight: 70, reps: 6 },
    ]
    // (50 + 60 + 70) / 3 = 60
    expect(calculateAverageWeight(sets)).toBe(60)
  })

  it('should round average weight to nearest integer', () => {
    const sets: Set[] = [
      { id: '1', weight: 50, reps: 10 },
      { id: '2', weight: 55, reps: 8 },
    ]
    // (50 + 55) / 2 = 52.5, rounded to 53
    expect(calculateAverageWeight(sets)).toBe(53)
  })

  it('should handle fractional weights', () => {
    const sets: Set[] = [
      { id: '1', weight: 50.5, reps: 10 },
      { id: '2', weight: 60.25, reps: 8 },
      { id: '3', weight: 70.75, reps: 6 },
    ]
    // (50.5 + 60.25 + 70.75) / 3 = 60.5, rounded to 61
    expect(calculateAverageWeight(sets)).toBe(61)
  })
})
