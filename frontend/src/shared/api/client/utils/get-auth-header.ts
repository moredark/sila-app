import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'
import { BEARER_PREFIX } from '@/shared/config'

export function getAuthorizationHeader(): string | null {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  return accessToken ? `${BEARER_PREFIX}${accessToken}` : null
}