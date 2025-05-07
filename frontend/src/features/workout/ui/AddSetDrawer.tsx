'use client'

import React, { FC } from 'react'

import { MinusCircle, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { useAddSet } from '@/entities/workout/api'
import { useTranslation } from '@/shared/lib'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Input,
} from '@/shared/ui'

import { REPS_STEP, WEIGHT_STEP } from '../config'

interface AddSetDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workoutId: number
  onSetAdded: () => void
}

const AddSetDrawer: FC<AddSetDrawerProps> = ({ open, onOpenChange, workoutId, onSetAdded }) => {
  const t = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ reps: number; weight: number }>({
    defaultValues: {
      reps: undefined,
      weight: undefined,
    },
  })

  const addSetMutation = useAddSet()

  const reps = watch('reps', 0)
  const weight = watch('weight', 0)

  const handleAddSetSubmit = (data: { reps: number; weight: number }) => {
    addSetMutation.mutate({
      workoutId,
      reps: Number(data.reps),
      weight: Number(data.weight),
    })
    onSetAdded()
    onOpenChange(false)
  }

  const increaseReps = () => setValue('reps', (Number(reps) || 0) + REPS_STEP)
  const decreaseReps = () => setValue('reps', Math.max((Number(reps) || 0) - REPS_STEP, 0))
  const increaseWeight = () => setValue('weight', (Number(weight) || 0) + WEIGHT_STEP)
  const decreaseWeight = () => setValue('weight', Math.max((Number(weight) || 0) - WEIGHT_STEP, 0))

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="mt-6">
          <DrawerTitle>{t('add-set')}</DrawerTitle>
          <DrawerDescription>{t('enter-reps-weight')}</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(handleAddSetSubmit)} className="space-y-6 px-6 py-12">
          <div className="flex w-full items-center gap-2">
            <Input
              type="number"
              {...register('reps', { required: t('reps-required') })}
              className="w-full py-4 text-center text-2xl"
              placeholder={t('reps')}
              value={reps || ''}
              onChange={e => setValue('reps', Number(e.target.value))}
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                onClick={increaseReps}
                aria-label="Increase reps"
                className="p-2"
              >
                <PlusCircle className="size-6" />
              </Button>
              <Button
                type="button"
                size="icon"
                onClick={decreaseReps}
                aria-label="Decrease reps"
                className="p-2"
              >
                <MinusCircle className="size-6" />
              </Button>
            </div>
          </div>
          {errors.reps && <span className="text-red-500">{errors.reps.message}</span>}

          <div className="flex w-full items-center gap-2">
            <Input
              type="number"
              {...register('weight', { required: t('weight-required') })}
              className="w-full py-4 text-center text-2xl"
              placeholder={t('weight')}
              value={weight || ''}
              onChange={e => setValue('weight', Number(e.target.value))}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                onClick={increaseWeight}
                aria-label="Increase weight"
                className="p-2"
              >
                <PlusCircle className="size-6" />
              </Button>
              <Button
                type="button"
                size="icon"
                onClick={decreaseWeight}
                aria-label="Decrease weight"
                className="p-2"
              >
                <MinusCircle className="size-6" />
              </Button>
            </div>
          </div>
          {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}

          <Button type="submit" className="mt-8 w-full py-6 text-lg">
            {t('submit')}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default AddSetDrawer
