'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import { useRegister } from '../api/useRegister'
import { registerSchema } from '../model/schema'

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const t = useTranslation()
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutateAsync, isPending } = useRegister()

  const onSubmit = async (data: RegisterFormData) => {
    await mutateAsync(data)
    push(APP_ROUTES.HOME)
  }

  return (
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
          id="username"
          {...register('username')}
          placeholder={t('username')}
          aria-invalid={!!errors.username}
          aria-describedby="username-error"
        />
        {errors.username && (
          <p id="username-error" className="text-sm text-red-500">
            {t('username-invalid')}
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
      <div>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder={t('confirm-password')}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirmPassword-error"
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-sm text-red-500">
            {t('passwords-no-match')}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? t('registering') : t('register')}
      </Button>
    </form>
  )
}
