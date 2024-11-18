"use server"

import Joi from "joi";
import {createSession, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {usersDb} from "@/app/constants/constants";
import {NextResponse} from "next/server";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
})

function validateCredentials(email, password) {
  const { error, value } = loginSchema.validate({ email, password })
  if (error) {
    const errorArray = error.details.map((err) => err.message)
    return { isValid: false, errors: errorArray }
  }
  return { isValid: true, value }
}

export async function login(email, password) {

  // Validate input
  const { isValid, errors, value } = validateCredentials(email, password)
  if (!isValid) {
    return false  // Return early if validation fails
  }
  // console.log(isValid)
  // console.log(errors)
  // console.log('-----------------')
  const user = usersDb.find(
    (user) =>
      user.email === email &&
      user.password === password
  )
  if (!user) {
    console.log("Invalid credentials")
    return false
  }
  const result = await createSession(user)
  if (result) {
    // setError("") // Update the error state
    // setLoading(false)
    redirect("/dashboard")
    // return result // Return the result of the signIn
  }
}

export async function logout() {
  try {
    const sessionDeleted = await deleteSession();
    if (sessionDeleted) {
      return redirect('/auth/login');
    }
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.error(); // Optionally handle with a specific error page
  }
}

// export async function refreshAccessToken() {
//   try {
//     const cookieStore = await cookies();
//     const refreshToken = cookieStore.get('refresh_token')?.value;
//
//     if (!refreshToken) {
//       throw new Error("No refresh token found");
//     }
//
//     const payload = await decrypt(refreshToken);
//
//     // Validate and issue a new access token
//     const newAccessToken = await encrypt({
//       id: payload.id,
//       name: userDb.name,
//       role: userDb.role,
//     }, ACCESS_EXPIRATION);
//
//     cookieStore.set('access_token', newAccessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       path: '/',
//     });
//
//     return newAccessToken;
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     throw new Error("Failed to refresh access token.");
//   }
// }

