import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from "next/navigation"

export const verifySession = async () => {
  const cookie = (await cookies()).get('rats')?.value
  if (!cookie) {
    redirect('/auth/login')
    return
  }

  const session = await decrypt(cookie)
  if (!session.id) {
    redirect('/auth/login')
    return
  }

  return { isAuth: true, id: session.id }
}
