import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useUserStore } from '@/entities/user'
import { POST } from '@/shared/api/client'

import { RegisterError, RegisterResponse } from './types'

interface RegisterData {
  email: string
  password: string
  username: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const result = await POST('/auth/register', { body: data })
      if (result.response.status !== 200) {
        throw result
      }
      return result.data as RegisterResponse
    },
    onSuccess: (data: RegisterResponse) => {
      const { access_token: accessToken, refresh_token: refreshToken } = data

      if (accessToken && refreshToken) {
        useUserStore.getState().setTokens(accessToken, refreshToken)
        toast.success('Registration successful!')
      } else {
        toast.error('Failed to retrieve tokens.')
      }
    },
    onError: (error: {
      response?: { status: number; data?: RegisterError }
    }) => {
      const response = error?.response

      if (response?.status === 409) {
        toast.error(response.data?.error || 'This email is already registered.')
      } else if (response?.status === 400) {
        toast.error('Invalid input. Please check your data.')
      } else {
        toast.error('Registration failed. Try again.')
      }
    },
  })
}
