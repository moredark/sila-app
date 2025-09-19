'use client'

import { useRouter } from 'next/navigation'

import { useGetPlan } from '@/entities/plan/api'
import { useStartWorkout } from '@/entities/workout/api'
import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { UserInfo } from '@/widgets/UserInfo'

export const PlanDetailsPage = ({ planId }: { planId: number }) => {
  const { data: planData, isLoading } = useGetPlan(planId)
  const { mutateAsync: startWorkout } = useStartWorkout()
  const t = useTranslation()
  const router = useRouter()

  const plan = planData?.data

  const handleStartWorkout = async (exerciseId: number) => {
    const res = await startWorkout({ exerciseId })
    if (res.data?.session_id) {
      router.push(APP_ROUTES.WORKOUT.DETAIL(res.data.session_id))
    }
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-4 h-16 w-full" />
        <Card className="mt-4">
          <CardHeader>
            <Skeleton className="mb-2 h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-5 w-24" />
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="mb-1 h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!plan) {
    return <p>Plan not found</p>
  }

  return (
    <div>
      {plan.user && <UserInfo user={plan.user} />}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-lg font-semibold">{t('exercises')}:</h3>
          <div className="grid gap-4">
            {plan.exercises?.map(exercise => (
              <Card key={exercise.exercise?.id} className="cursor-pointer" onClick={() => handleStartWorkout(exercise.exercise!.id!)} >
                <CardHeader className='pb-2'>
                  <CardTitle>{exercise.exercise?.name}</CardTitle>
                  <CardDescription>{exercise.exercise?.muscle_group?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-m'>{exercise.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
