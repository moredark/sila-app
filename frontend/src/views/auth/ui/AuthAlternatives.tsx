'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'

import { useAuthActions } from '@/features/auth/model'
import { POST } from '@/shared/api'
import { GoogleLogo } from '@/shared/assets'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

export const AuthAlternatives = () => {
  const t = useTranslation()
  const { login } = useAuthActions()

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const { data } = await POST('/auth/google/token', {
          body: { access_token: tokenResponse.access_token },
        })
        if (data) login(data)
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
    <div className="space-y-4">
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
    </div>
  )
}
