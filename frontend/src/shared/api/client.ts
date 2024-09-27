import i18n from 'i18next'
import Cookies from 'js-cookie'
import createClient, { Middleware } from 'openapi-fetch'

import { useUserStore } from '@/entities/user'
import { refreshTokens } from '@/features/auth'
import { backendBaseUrl } from '@/shared/config'

import { ACCESS_TOKEN_KEY } from '../config/auth'

import { paths } from './schema'

const languageMiddleware: Middleware = {
  async onRequest({ request }) {
    const currentLanguage = i18n.language || 'en'

    request.headers.set('accept-language', currentLanguage)

    return request
  },
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken: string | null = Cookies.get(ACCESS_TOKEN_KEY)!

    if (accessToken) {
      request.headers.set('Authorization', accessToken)
    }

    return request
  },
  async onResponse({ response }) {
    const userStore = useUserStore.getState()

    const refreshToken: string | null = userStore.refreshToken

    if (response.status === 401) {
      try {
        if (refreshToken) {
          const tokens = await refreshTokens(refreshToken)
          if (tokens && tokens.access_token && tokens.refresh_token) {
            useUserStore
              .getState()
              .setTokens(tokens.access_token, tokens.refresh_token)
          } else {
            throw new Error('Token refresh failed')
          }
        }
      } catch (error) {
        console.error(error)
        useUserStore.getState().logout()
        throw new Error('Unauthorized, token refresh failed')
      }
    }

    return response
  },
}

const client = createClient<paths>({
  baseUrl: backendBaseUrl,
})

client.use(authMiddleware)
client.use(languageMiddleware)

export const { GET, POST, PUT, DELETE } = client
