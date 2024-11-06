import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from "next/server"
// import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET || '0Z3ZEdzSHX0um9OeWkVONY6OI7fmNVUe4LZmBl0Z'
if (!secretKey) throw new Error("SESSION_SECRET environment variable is not set.")
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session:', error)
  }
}

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function signup(formData) {
  // Validate form fields, insert user into database, etc.
  const user = { id: 1 } // Replace with actual user creation logic
  await createSession(user.id)
  return NextResponse.redirect('/dashboard')
}

export async function updateSession() {
  const sessionCookie = (await cookies()).get('session')?.value
  if (!sessionCookie) return null

  const payload = await decrypt(sessionCookie)
  if (!payload || !sessionCookie) return null

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    (await cookies())
    .set('session', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function logout() {
  await deleteSession()
  return NextResponse.redirect('/login')
}
