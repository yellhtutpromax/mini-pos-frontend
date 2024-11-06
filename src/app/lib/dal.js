import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import {redirect} from "next/navigation";

export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value
  if (!cookie) {
    redirect('auth/login');
    return;
  }
  const session = await decrypt(cookie)

  if (!session.userId) {
    redirect('auth/login')
    return
  }

  return { isAuth: true, userId: session.userId }
}
