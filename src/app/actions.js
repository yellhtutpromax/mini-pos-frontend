'use server'

import { cookies } from 'next/headers'
import {decrypt} from "@/app/lib/session";
import axios   from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function getBearerToken() {
  // Get cookie
  const cookieStore = await cookies()

  // Get cookie
  const accessToken = cookieStore.get('rats')?.value;
  return accessToken
  // let session = null;
  //
  // if (accessToken) {
  //   try {
  //     session = await decrypt(accessToken);
  //   } catch (error) {
  //     console.log("Error decrypting access token:", error);
  //     session = null; // Ensure session is null on error
  //   }
  // }
  // return session
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

    baseURL: 'http://127.0.0.1:8000/api', // Use base API URL from environment variables
    timeout, // Configurable timeout
    headers: {
      ...(isAuth && { Authorization: `Bearer ${await getBearerToken()}` }), // Add Authorization header if isAuth is true
      ...headers, // Add additional custom headers
    },
  });

  try {
    // Perform the request with the provided options
    const response = await axiosInstance.request({
      url, // Relative endpoint
      method: method.toUpperCase(), // Ensure the HTTP method is uppercase
      params, // Query parameters
      data, // Request body for POST, PUT, etc.
    });
    return response; // Return the API response
  } catch (error) {
    console.log(`API call (${method}) error:`, error);
  }
}



