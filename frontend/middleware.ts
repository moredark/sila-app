import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { APP_ROUTES } from '@/shared/config'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
