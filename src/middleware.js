import { NextResponse } from 'next/server'
import {decrypt, deleteSession, refreshAccessToken} from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard','/members']
const publicRoutes = ['/auth/login', '/signup', '/unauthorized', '/system-health-check']

export default async function middleware(request) {
  // 2. Check if the current route is protected or public
  // const path = request.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(path)
  // const isPublicRoute = publicRoutes.includes(path)


  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/dashboard/:path*',
    '/inventory/:path*'
  ],
}
