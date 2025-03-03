import { NextResponse, userAgent } from 'next/server';
import { decrypt, refreshAccessToken, deleteSession } from '@/app/lib/session';
import { cookies } from 'next/headers';

// Protected and public routes
const protectedRoutes = ['/dashboard', '/inventory', '/sale'];
const publicRoutes = ['/auth/login', '/signup', '/'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const { device } = userAgent(request)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  let session = null;

  // Attempt to decrypt the access token
  if (accessToken) {
    session = await decrypt(accessToken);
  }

  // If access token is expired or invalid, try to refresh it
  // if (!session && refreshToken) {
  //   const newAccessToken = await refreshAccessToken(refreshToken);
  //
  //   if (newAccessToken) {
  //     session = await decrypt(newAccessToken); // Refresh successful, get the new session
  //   } else {
  //     // If refresh fails, clear cookies and redirect to login
  //     await deleteSession();
  //     return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  //   }
  // }

  // Handle protected routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // Handle public routes
  if (isPublicRoute && session?.id && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
