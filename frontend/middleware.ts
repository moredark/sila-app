import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { APP_ROUTES } from '@/shared/config'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.url))
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (accessToken) {
      return NextResponse.redirect(new URL(APP_ROUTES.WORKOUT, request.url))
    } else {
      return NextResponse.next()
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/auth',
    '/auth/login',
    '/auth/register',
    '/workout/:path*',
    '/settings',
    '/profile',
    '/admin/:path*',
  ],
}
