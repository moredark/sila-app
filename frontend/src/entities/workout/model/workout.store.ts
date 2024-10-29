import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

interface Set {
  reps: number
  weight: number
}

interface WorkoutState {
  workoutId: number | null
  exerciseId: number | null
  sets: Set[]
  isCompleted: boolean
  startWorkout: (exerciseId: number, workoutId: number) => void
  addSet: (reps: number, weight: number) => void
  completeWorkout: () => void
  resetWorkout: () => void
}

export const useWorkoutStore = create<WorkoutState>()(
  devtools(
    persist(
      set => ({
        workoutId: null,
        exerciseId: null,
        sets: [],
        isCompleted: false,
        startWorkout: (exerciseId, workoutId) =>
          set({
            workoutId,
            exerciseId,
            sets: [],
            isCompleted: false,
          }),
        addSet: (reps, weight) =>
          set(state => ({
            sets: [...state.sets, { reps, weight }],
          })),
        completeWorkout: () => set({ isCompleted: true }),
        resetWorkout: () =>
          set({
            workoutId: null,
            exerciseId: null,
            sets: [],
            isCompleted: false,
          }),
      }),
      {
        name: 'workout-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)
