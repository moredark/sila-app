import { toast } from 'sonner'

import { useUserStore } from '@/entities/user'
import { POST } from '@/shared/api/client'

export const refreshTokens = async (refresh_token: string) => {
  try {
    const result = await POST('/auth/refresh-token', {
      body: { refresh_token },
    })

    if (result.response.status !== 200) {
      throw new Error('Failed to refresh token')
    }

    const data = result.data

    if (data?.access_token && data?.refresh_token)
      useUserStore.getState().setTokens(data.access_token, data.refresh_token)

    return data
  } catch (error) {
    toast.error('Failed to refresh tokens. Please log in again.')
    useUserStore.getState().logout()
    throw error
  }
}
