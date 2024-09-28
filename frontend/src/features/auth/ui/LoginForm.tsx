'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { POST } from '@/shared/api'
import GoogleLogo from '@/shared/assets/GoogleLogo'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import { TokensResponse } from '../api/types'
import { handleSuccessfulLogin, useLogin } from '../api/useLogin'
import { loginSchema } from '../model/schema'

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { t } = useTranslation()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync, isPending } = useLogin()

  const onSubmit = async (data: LoginFormData) => {
    const loginResponse = await mutateAsync(data)
    handleSuccessfulLogin(loginResponse, push)
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const { data } = await POST('/auth/google/token', {
          body: { access_token: tokenResponse.access_token },
        })
        handleSuccessfulLogin(data as TokensResponse, push)
      } catch (error) {
        toast.error(t('login-failed'))
        console.error(error)
      }
    },
    onError: error => {
      console.error(error)
      toast.error(t('login-failed'))
    },
  })

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

      <div className="flex items-center">
        <div className="grow border-t border-zinc-800"></div>
        <p className="mx-4 text-center">{t('or')}</p>
        <div className="grow border-t border-zinc-800"></div>
      </div>

      <Button
        onClick={() => googleLogin()}
        variant="secondary"
        className="flex w-full items-center gap-3"
      >
        <GoogleLogo /> {t('google-sign-in')}
      </Button>
    </form>
  )
}
