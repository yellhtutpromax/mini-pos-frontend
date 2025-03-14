import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import mysqlDb from "@/app/lib/database/mysql";

const secretKey = process.env.SESSION_SECRET || '0Z3ZEdzSHX0um9OeWkVONY6OI7fmNVUe4LZmBl0Z'
if (!secretKey) throw new Error("SESSION_SECRET environment variable is not set.")
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload, expiry='7d') {
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

export async function createSession(user) {
  try {

    const cookieStore = await cookies() // Await `cookies()` to get the instance
    const accessExpireAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const refreshExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const accessToken = await encrypt({
      id: user.id,
      name: user.name, // etc ...
      email: user.email,
      expiresAt: accessExpireAt,
    })
    cookieStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: accessExpireAt,
      sameSite: 'lax',
      path: '/',
    })
    return true;
    // Set refresh token (long-lived)
    // const refreshToken = await encrypt({
    //   id: user.id,
    //   expiresAt: refreshExpireAt,
    // })
    // cookieStore.set('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   expires: refreshExpireAt,
    //   sameSite: 'lax',
    //   path: '/',
    // })
    //
    // const updateToken = await mysqlDb.query("UPDATE users SET refresh_token = ? WHERE email = ?",[refreshToken, user.email]);
    // if (updateToken)
    // {
    //   return true
    // }
  } catch (error) {
    console.error('Error creating session:', error)
  }
}

export async function signup(formData) {
  // Validate form fields, insert user into database, etc.
  const user = { id: 1 } // Replace with actual user creation logic
  await createSession(user.id)
  return NextResponse.redirect('/dashboard')
}

export async function updateSession() {

  const cookieStore = await cookies() // Await `cookies()` to get the instance
  const sessionCookie = cookieStore.get('access_token')?.value
  if (!sessionCookie) return null

  const payload = await decrypt(sessionCookie)
  if (!payload || !sessionCookie) return null

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookieStore.set('access_token', sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
    return true
  }catch (error) {
    console.log("Session deletion error:", error)
    return false
  }
}

export async function refreshAccessToken(refreshToken) {
  try {
    // Decrypt the refresh token
    const payload = await decrypt(refreshToken);

    // Validate refresh token expiration
    if (!payload?.expiresAt || new Date(payload.expiresAt) <= new Date()) {
      console.log("Refresh token expired or invalid.");
      await deleteSession();
      return null;
    }

    // Fetch user data from the database
    const userId = payload.id;
    // console.log(payload)
    const [rows] = await mysqlDb.query("SELECT * FROM users WHERE id = ?", [userId]);
    const user = rows[0];
    console.log(user)

    if (!user) {
      console.log("User not found for the given refresh token.");
      await deleteSession();
      return null;
    }

    // Generate new access token
    const accessExpireAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minutes
    const newAccessToken = await encrypt({
      id: user.id,
      name: user.name,
      email: user.email,
      expiresAt: accessExpireAt,
    });

    // Update access token in cookies
    const cookieStore = await cookies(); // Await `cookies()` to get the instance
    cookieStore.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: accessExpireAt,
      sameSite: 'lax',
      path: '/',
    });

    return newAccessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh token:", error);
    await deleteSession();
    return null;
  }
}

