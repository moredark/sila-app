'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import { loginSchema } from '../model/schema'
import { useAuthActions } from '../model/useAuthActions'

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const t = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { login, isLoggingIn: isPending } = useAuthActions()

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            {...register('email')}
            placeholder={t('email')}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500">
              {t('email-invalid')}
            </p>
          )}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder={t('password')}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500">
              {t('password-invalid')}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? t('logging-in') : t('login')}
        </Button>
      </form>
    </div>
  )
}
