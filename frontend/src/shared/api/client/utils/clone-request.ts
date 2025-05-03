import { AUTHORIZATION_HEADER, BEARER_PREFIX } from '@/shared/config'

export function cloneRequest(originalRequest: Request, newToken: string): Request {
  const newRequest = new Request(originalRequest.url, {
    method: originalRequest.method,
    headers: new Headers(originalRequest.headers),
    body: originalRequest.body,
    credentials: originalRequest.credentials,
    cache: originalRequest.cache,
    redirect: originalRequest.redirect,
    referrer: originalRequest.referrer,
    integrity: originalRequest.integrity,
    keepalive: originalRequest.keepalive,
    signal: originalRequest.signal,
  })
  
  newRequest.headers.set(AUTHORIZATION_HEADER, `${BEARER_PREFIX}${newToken}`)
  return newRequest
}