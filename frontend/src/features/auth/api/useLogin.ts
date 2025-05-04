import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { POST } from '@/shared/api/client'
import { useTranslation } from '@/shared/lib'

import { useAuth } from '../model/auth.provider'
import { TokensResponse , LoginCredentials } from '../model/auth.types'

export const useLogin = () => {
  const { login } = useAuth()
  const t = useTranslation()

  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials): Promise<TokensResponse> => {
      const result = await POST('/auth/login', { body: { email, password } })

      if (result.response.status !== 200 || !result.data) {
        const status = result.response.status
        
        if (status === 401) {
          throw new Error('invalid-credentials')
        } else if (status === 404) {
          throw new Error('user-not-found')
        } else {
          throw new Error('login-failed')
        }
      }

      return result.data as TokensResponse
    },
    onSuccess: (data) => {
      if (data && data.access_token && data.refresh_token) {
        login(data)
        toast.success(t('login-successful'))
      } else {
        toast.error(t('auth-error'))
      }
    },
    onError: (error: Error) => {
      const errorMessage = error.message ? error.message : t('login-failed')
      toast.error(errorMessage)
    },
  })
}
