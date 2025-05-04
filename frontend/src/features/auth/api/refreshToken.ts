import { toast } from 'sonner'

import { POST } from '@/shared/api/client'

import { TokensResponse } from '../model/auth.types'
/**
 * Refreshes access tokens using refresh_token
 * @param refresh_token Refresh token
 * @param onSuccess Callback function on successful token refresh
 * @param onError Callback function on token refresh error
 */
export const refreshTokens = async (
  refresh_token: string,
  onSuccess?: (tokens: TokensResponse) => void,
  onError?: () => void
): Promise<TokensResponse | null> => {

  try {
    const result = await POST('/auth/refresh-token', {
      body: { refresh_token },
    })

    if (result.response.status !== 200) {
      throw new Error('failed-refresh-token')
    }

    const data = result.data as TokensResponse

    if (data?.access_token && data?.refresh_token) {
      if (onSuccess) {
        onSuccess(data)
      }
      return data
    }
    
    throw new Error('invalid-token-response')
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message
      : "Authentication failed. Please try again later."
    
    toast.error(errorMessage)
    
    if (onError) {
      onError()
    }
    
    throw error
  }
}
