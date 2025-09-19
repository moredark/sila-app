'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { GripVertical } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetExercises } from '@/entities/exercise/api'
import { useCreatePlan } from '@/entities/plan/api'
import { useTranslation } from '@/shared/lib'
import { Button, Input } from '@/shared/ui'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Combobox } from '@/shared/ui/combobox'
import { Textarea } from '@/shared/ui/textarea'



const planExerciseSchema = z.object({
  exercise_id: z.number(),
  order: z.number(),
  description: z.string().optional(),
})

const createPlanSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().optional(),
  exercises: z.array(planExerciseSchema),
})

type CreatePlanFormData = z.infer<typeof createPlanSchema>

interface CreatePlanFormProps {
  onSuccess?: () => void
}

export const CreatePlanForm: React.FC<CreatePlanFormProps> = ({ onSuccess }) => {
  const t = useTranslation()
  const { mutateAsync, isPending } = useCreatePlan()
  const { data: exercises } = useGetExercises()
  const [selectedExercise, setSelectedExercise] = useState<number | undefined>()

  const { control, register, handleSubmit, formState: { errors } } = useForm<CreatePlanFormData>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      exercises: [],
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'exercises',
  })

  const onSubmit = async (data: CreatePlanFormData) => {
    const orderedData = {
      ...data,
      exercises: data.exercises.map((exercise, index) => ({ ...exercise, order: index + 1 }))
    }
    try {
      await mutateAsync(orderedData)
      toast.success(t('plan-created-successfully'))
      onSuccess?.()
    } catch {
      toast.error(t('failed-to-create-plan'))
    }
  }

  const onAddExercise = () => {
    if (selectedExercise) {
      append({ exercise_id: selectedExercise, order: fields.length + 1, description: '' })
    }
  }

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return
    move(draggedIndex, index)
    setDraggedIndex(null)
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <h2 className="mb-4 text-2xl">{t('create-plan')}</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder={t('plan-name')} {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Textarea placeholder={t('plan-description')} {...register('description')} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">{t('exercises')}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Combobox
                  options={exercises?.map(e => ({ label: e.name, value: e.id })) || []}
                  onSelect={value => setSelectedExercise(value)}
                  placeholder={t('select-exercise')}
                />
                <Button type="button" onClick={onAddExercise}>{t('add')}</Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mt-2 flex items-center gap-2 rounded-md border p-2"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <GripVertical className="cursor-move" />
                  <div className="grow">
                    <p>{exercises?.find(e => e.id === field.exercise_id)?.name}</p>
                    <Textarea placeholder={t('description')} {...register(`exercises.${index}.description`)} className="mt-1 text-sm" />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    {t('remove')}
                  </Button>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? t('creating') : t('create-plan')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
