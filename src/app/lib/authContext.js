'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {getUserInfo} from "@/app/auth/login/actions";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const fetchUser =  async (req, res, next) => {
      setLoading(true)
      const userInfo = await getUserInfo()
      setLoading(false)
      setAuthUser(userInfo)
    }
    fetchUser()
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    console.log('AuthContext is not defined. Ensure AuthProvider is rendered higher in the component tree.')
  }
  return context
}
