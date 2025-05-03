import Cookies from 'js-cookie'

import { BEARER_PREFIX } from '@/shared/config'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'

export function getAuthorizationHeader(): string | null {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  return accessToken ? `${BEARER_PREFIX}${accessToken}` : null
}