import { Middleware } from 'openapi-fetch'

import { useUserStore } from '@/entities/user/model'
import { AUTHORIZATION_HEADER } from '@/shared/config'

import { cloneRequest, getAuthorizationHeader, handleTokenRefresh } from '../utils'

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const authHeader = getAuthorizationHeader()

    if (authHeader) {
      request.headers.set(AUTHORIZATION_HEADER, authHeader)
    } else {
      console.warn('Auth middleware: No access token found in cookies')
    }

    return request
  },
  async onResponse({ response, request }) {
    if (response.status !== 401) {
      return response
    }

    const userStore = useUserStore.getState()
    const refreshToken = userStore.refreshToken

    try {
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const tokens = await handleTokenRefresh(refreshToken)
      const newRequest = cloneRequest(request, tokens.access_token)

      return fetch(newRequest)
    } catch (error) {
      console.error(
        'Authentication error:',
        error instanceof Error ? error.message : 'Unknown error',
      )
      useUserStore.getState().logout()
      throw new Error('Unauthorized: token refresh failed')
    }
  },
}
