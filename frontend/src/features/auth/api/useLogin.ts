import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useUserStore } from '@/entities/user'
import { POST } from '@/shared/api/client'
import { APP_ROUTES } from '@/shared/config'

import { TokensResponse } from './types'

interface LoginCredentials {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: LoginCredentials): Promise<TokensResponse> => {
      const result = await POST('/auth/login', { body: { email, password } })

      if (result.response.status !== 200 || !result.data) {
        throw new Error('Login failed')
      }

      return result.data as TokensResponse
    },
    onError: () => {
      toast.error('Login failed. Check your credentials.') //TODO: Add different statuses and translate
    },
  })
}

export const handleSuccessfulLogin = (
  data: TokensResponse,
  push: (url: string) => void
) => {
  if (data && data.access_token && data.refresh_token) {
    useUserStore.getState().setTokens(data.access_token, data.refresh_token)
    toast.success('Login successful!')
    push(APP_ROUTES.WORKOUT)
  } else {
    toast.error('Failed to retrieve tokens.')
  }
}
