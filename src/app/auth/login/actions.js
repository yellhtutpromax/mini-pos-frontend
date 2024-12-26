"use server"

import Joi from "joi";
import {createSession, decrypt, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation"; // don't add try catch block when you are redirecting
import {cookies} from "next/headers";
import {callApi} from "@/app/actions";

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
  // const { isValid, errors, value } = validateCredentials(email, password)
  // if (!isValid) {
  //   return false  // Return early if validation fails
  // }

  const loginResponse = await callApi({
    url: 'auth/login',
    method: 'POST',
    isAuth: false,
    data: {
      email: email,
      password: password
    },
  })
  if(loginResponse.status === 200){
    loginResponse.data.user.access_token = loginResponse.data.access_token
    // console.log(loginResponse.data.user)
    // console.log('#$######################################$#')
    const result = await createSession(loginResponse.data.user)
    if (result){
      return {status: 200, user:loginResponse.data.user}
    }
  }else{
    return loginResponse; // Return all errors early if validation is fails
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
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  let session = null;

  if (accessToken) {
    session = await decrypt(accessToken)
  }
  return session
}

