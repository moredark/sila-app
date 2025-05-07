'use client'

import React, { FC } from 'react'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useCompleteWorkout } from '@/entities/workout/api'
import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui'
import { Textarea } from '@/shared/ui/textarea'

interface EndWorkoutDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workoutId: number
}

const EndWorkoutDrawer: FC<EndWorkoutDrawerProps> = ({ open, onOpenChange, workoutId }) => {
  const t = useTranslation()
  const router = useRouter()
  const { register, handleSubmit } = useForm<{ feedback: string }>()
  const completeWorkoutMutation = useCompleteWorkout()

  const handleEndWorkoutSubmit = (data: { feedback: string }) => {
    completeWorkoutMutation
      .mutateAsync({
        sessionId: workoutId,
        feedback: data.feedback,
      })
      .then(() => {
        router.push(APP_ROUTES.WORKOUT.LIST)
      })
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="mt-6">
          <DrawerTitle>{t('end-workout')}</DrawerTitle>
          <DrawerDescription>{t('optional-feedback')}</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(handleEndWorkoutSubmit)} className="space-y-6 px-6 py-12">
          <div>
            <label>{t('feedback')}</label>
            <Textarea {...register('feedback')} placeholder={t('feedback-placeholder')} />
          </div>
          <Button type="submit" className="mt-4 w-full">
            {t('end-workout')}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export default EndWorkoutDrawer
