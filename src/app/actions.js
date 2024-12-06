'use server'

import { cookies } from 'next/headers'
import {decrypt} from "@/app/lib/session";

export async function getAuthUser() {
  // Get cookie
  const cookieStore = await cookies()

  // Get cookie
  const accessToken = cookieStore.get('rats')?.value;
  let session = null;

  if (accessToken) {
    try {
      session = await decrypt(accessToken);
    } catch (error) {
      console.log("Error decrypting access token:", error);
      session = null; // Ensure session is null on error
    }
  }
  return session
}
