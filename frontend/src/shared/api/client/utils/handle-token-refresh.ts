import { useUserStore } from '@/entities/user/model'
import { refreshTokens } from '@/features/auth/api'
import { TokensResponse } from '@/features/auth/model'

export async function handleTokenRefresh(refreshToken: string): Promise<TokensResponse> {
  const tokens = await refreshTokens(refreshToken)

  if (!tokens?.access_token || !tokens?.refresh_token) {
    throw new Error('Token refresh failed: Invalid response format')
  }

  useUserStore.getState().setTokens(tokens.access_token, tokens.refresh_token)

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  }
}
