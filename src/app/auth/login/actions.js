"use server"

import Joi from "joi";
import mysqlDb from "@/app/lib/database/mysql";
import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs package
import {createSession, decrypt, deleteSession} from "@/app/lib/session";
import {redirect} from "next/navigation"; // don't add try catch block when you are redirecting
import {cookies} from "next/headers";
import {errorResponse, successResponse} from "@/app/utils/apiFormat";

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

export async function login(credentials) {
  try {
    const {email, password} = credentials;
    const [rows] = await mysqlDb.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0]; // user data
    console.log('_______________')
    console.log(user);
    if (!user) {
      return errorResponse({
        status: 404,
        message: 'Credentials not found',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse({
        status: 422,
        message: 'Invalid password'
      });
    }
    const response = await createSession(user) // Create a new session
    if (response){
      const { password, refresh_token, ...userData } = user; // Exclude password and refresh_token
      return successResponse({
        status: 200,
        message: 'Login successful',
        data: userData,
      })
    }
  }catch (error) {
    console.log('Error during login:', error.message); // Log the error for debugging
    // Optionally, you can rethrow the error or return a custom response
    return { error: error.message || 'An error occurred during login' };
  }
}

export async function logout() {
    // const response = await callApi({
    //   url: 'auth/logout',
    //   method: 'POST',
    //   isAuth: true,
    // })
    // if (response.)
    const sessionDeleted = await deleteSession();
    if (sessionDeleted) {
      return redirect('/auth/login');
    }
}

export async function getUserInfo() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  // const refreshToken = cookieStore.get('refresh_token')?.value
  let session = null;

  if (accessToken) {
    session = await decrypt(accessToken)
  }
  return session
}

