"use server"

import Joi from "joi";
import {createSession, decrypt, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation"; // don't add try catch block when you are redirecting
import {usersDb} from "@/app/constants/constants";
import {cookies} from "next/headers";

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

  const user = usersDb.find(
    (user) =>
      user.email === email &&
      user.password === password
  )
  if (!user) {
    return "Invalid credentials"
  }
  const result = await createSession(user)
  if (result){
    return user
  }
}

export async function logout() {
    const sessionDeleted = await deleteSession();
    if (sessionDeleted) {
      return redirect('/auth/login');
    }
}

export async function getUserInfo() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('rats')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  let session = null;

  if (accessToken) {
    session = await decrypt(accessToken)
  }
  return session
}

