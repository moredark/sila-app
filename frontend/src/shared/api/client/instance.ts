import createClient from 'openapi-fetch'

import { backendBaseUrl } from '@/shared/config'

import { paths } from '../schema'

import { authMiddleware, languageMiddleware } from './middlewares'

const client = createClient<paths>({
  baseUrl: backendBaseUrl,
})

client.use(languageMiddleware)
client.use(authMiddleware)

export const { GET, POST, PUT, DELETE } = client