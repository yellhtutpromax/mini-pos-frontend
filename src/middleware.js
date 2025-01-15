import { NextResponse } from 'next/server'
import {decrypt, deleteSession, refreshAccessToken} from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard','/members']
const publicRoutes = ['/auth/login', '/signup', '/unauthorized', '/system-health-check']

export default async function middleware(request) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // console.log('Path:', path)
  // console.log('Is Protected Route:', isProtectedRoute)
  // console.log('Is Public Route:', isPublicRoute)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  let session

  if (accessToken) {
    session = await decrypt(accessToken)
    // if(!session.path.includes(path) && path !== '/unauthorized'){
    //   return NextResponse.redirect(new URL('/unauthorized', request.nextUrl))
    // }
  }

  // If access token is expired, attempt to refresh
  if (!session?.id && refreshToken) {
    const response = await refreshAccessToken(refreshToken)
    if (response.status === 401) {
      await deleteSession()
      return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }else if (response.status === 503) {
      if (path !== '/system-health-check') {
        return NextResponse.redirect(new URL('/system-health-check', request.nextUrl))
      }
    }
  }

  console.log('Middleware is running at '+ path)
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('*********************************************')

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id && !refreshToken) {
    await deleteSession()
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }

  // Redirect to specific route ( After user is authenticated )
  if (
    isPublicRoute &&
    session?.id &&
    !request.nextUrl.pathname.startsWith(`/${session.redirect_route}`)
  ) {
    request.user = session // add decrypt data to request
    return NextResponse.redirect(new URL(`/${session.redirect_route}`, request.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}
