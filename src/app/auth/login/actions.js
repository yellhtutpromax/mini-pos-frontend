"use server"

import Joi from "joi";
import {createSession, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation"; // don't add try catch block when you are redirecting
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
  // try {
    const sessionDeleted = await deleteSession();
    if (sessionDeleted) {
      return redirect('/auth/login');
    }
  // } catch (error) {
  //   console.error("Logout error:", error);
  //   return NextResponse.error(); // Optionally handle with a specific error page
  // }
}

