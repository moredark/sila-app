'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateMuscleGroup } from '@/features/admin/api'
import { Button, Input } from '@/shared/ui'
import React from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { APP_ROUTES } from '@/shared/config'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const muscleGroupSchema = z.object({
  name_ru: z.string().min(1, { message: 'Required' }),
  name_eng: z.string().min(1, { message: 'Required' }),
})

type MuscleGroupFormData = z.infer<typeof muscleGroupSchema>

const MuscleGroupContent = () => {
  const { mutateAsync, isPending } = useCreateMuscleGroup()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MuscleGroupFormData>({
    resolver: zodResolver(muscleGroupSchema),
  })

  const onSubmit = async (data: MuscleGroupFormData) => {
    try {
      await mutateAsync(data)
      toast.success('Muscle group created successfully!')
      reset()
    } catch (error) {
      toast.error('Failed to create muscle group.')
    }
  }

  return (
    <div className="p-4">
      <Card>
        <Link href={APP_ROUTES.ADMIN.HOME}>
          <Button variant="outline" className="m-2">
            Back
          </Button>
        </Link>
        <CardHeader>
          <h2 className="mb-4 text-2xl">Create Muscle Group</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
            <div>
              <Input
                placeholder="Name in Russian"
                {...register('name_ru')}
                aria-invalid={!!errors.name_ru}
              />
              {errors.name_ru && <p className="text-sm text-red-500">{errors.name_ru.message}</p>}
            </div>

            <div>
              <Input
                placeholder="Name in English"
                {...register('name_eng')}
                aria-invalid={!!errors.name_eng}
              />
              {errors.name_eng && <p className="text-sm text-red-500">{errors.name_eng.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Muscle Group'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const DynamicMuscleGroupContent = dynamic(() => Promise.resolve(MuscleGroupContent), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>,
  ssr: false,
})

const AdminMuscleGroup = () => {
  return <DynamicMuscleGroupContent />
}

export default AdminMuscleGroup
