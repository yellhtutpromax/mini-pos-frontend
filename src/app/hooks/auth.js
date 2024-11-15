// import { cookies } from "next/headers"
// import { decrypt } from "@/app/lib/session"

export const getAuthUser = async () => {
  return {id: 1, name: "Yell Myo"}
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('rats')?.value

  // Return null or handle the case where the token is missing
  if (!sessionToken) {
    console.error("No session token found.")
    return null
  }

  return await decrypt(sessionToken) // Decrypt the JWT
}
