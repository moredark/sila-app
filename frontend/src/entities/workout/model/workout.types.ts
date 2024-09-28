import { components } from '@/shared/api/schema'

export interface StartTrainingArgs {
  exerciseId: number
}

export interface AddSetArgs {
  workoutId: number
  reps: number
  weight: number
}

export interface CompleteTrainingArgs {
  sessionId: number
  feedback: string
}

export type WorkoutSession = components['schemas']['models.WorkoutSessionResponse']

export type Set = components['schemas']['models.Set']
