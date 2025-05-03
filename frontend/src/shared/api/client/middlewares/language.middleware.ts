import { Middleware } from 'openapi-fetch'

import { ACCEPT_LANGUAGE_HEADER } from '@/shared/config'

import { getLanguageHeader } from '../utils'

export const languageMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set(ACCEPT_LANGUAGE_HEADER, getLanguageHeader())
    return request
  },
}