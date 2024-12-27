'use server'

import axios   from "axios"
import { cookies } from 'next/headers'
import {decrypt} from "@/app/lib/session"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss"

export async function getBearerToken() {
  // Get cookie
  const cookieStore = await cookies()

  // Get cookie
  const accessToken = cookieStore.get('refresh_token')?.value
  let session = null
  if (accessToken) {
    try {
      const response = await decrypt(accessToken)
      session = response.access_token
    } catch (error) {
      console.log("Error decrypting refresh token for bearer ...", error)
      session = null // Ensure session is null on error
    }
  }
  return session
}

export async function callApi({
                              url,
                              method = 'GET',
                              isAuth = true,
                              data = null,
                              params = {},
                              headers = {},
                              timeout = 10000 // 10s timeout
                              })
{
  // Create a base axios instance
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Use base API URL from environment variables
    timeout, // Configurable timeout
    headers: {
      'Accept': 'application/json',
      ...(isAuth && { Authorization: `Bearer ${await getBearerToken()}` }), // Add Authorization header if isAuth is true
      ...headers, // Add additional custom headers
    },
  })
  try {
    // Perform the request with the provided options
    const result = await axiosInstance.request({
      url, // Relative endpoint
      method: method.toUpperCase(), // Ensure the HTTP method is uppercase
      params, // Query parameters
      data
    })
    return {
      status: result.status,
      message: result.message, // Return a user-friendly error message
      data: result.data.data
    }
  } catch (error) {
    // console.log(`API call error : `, error)
    // console.log('Error Response Data:', error.response?.data)
    console.log('Error Status:', error.response?.status)
    // console.log('Error Message:', error.message)
    // console.log({error: error.response?.data})
    return {
      status: error.response?.status ?? 500,
      message: error.response?.data?.message || error.message, // Return a user-friendly error message
      data: error.response?.data
    }
  }
}
