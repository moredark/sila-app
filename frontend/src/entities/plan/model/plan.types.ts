import { components } from '@/shared/api/schema'

export type Plan = components['schemas']['models.PlanDetailResponse']
export type CreatePlan = components['schemas']['models.CreatePlanRequest']
export type UpdatePlan = components['schemas']['models.UpdatePlanRequest']
export type PaginatedPlans = components['schemas']['models.PaginatedPlanResponse']
