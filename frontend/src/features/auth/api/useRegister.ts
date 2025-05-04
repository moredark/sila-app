import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { POST } from '@/shared/api/client'
import { useTranslation } from '@/shared/lib'

import { useAuth } from '../model/auth.provider'
import { RegisterError, RegisterResponse , RegisterCredentials } from '../model/auth.types'

export const useRegister = () => {
  const { login } = useAuth()
  const t = useTranslation()

  return useMutation({
    mutationFn: async (data: RegisterCredentials) => {      
      const result = await POST('/auth/register', { body: data })
      if (result.response.status !== 200) {
        const status = result.response.status
        
        if (status === 409) {
          throw new Error('email-already-registered')
        } else if (status === 400) {
          throw new Error('invalid-input')
        } else {
          throw new Error('registration-failed')
        }
      }
      return result.data as RegisterResponse
    },
    onSuccess: (data: RegisterResponse) => {
      if (data.access_token && data.refresh_token) {
        login(data)
        toast.success(t('register-successful'))
      } else {
        toast.error(t('register-failed'))
      }
    },
    onError: (error: Error | { response?: { status: number; data?: RegisterError } }) => {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        const response = error?.response
        
        if (response?.status === 409) {
          toast.error(t('email-already-registered'))
        } else if (response?.status === 400) {
          toast.error(t('auth-error'))
        } else {
          toast.error(t('register-failed'))
        }
      }
    },
  })
}
