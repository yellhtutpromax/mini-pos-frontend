'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {getUserInfo} from "@/app/auth/login/actions";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [isDecrypt, setIsDecrypt] = useState(true)
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const fetchUser =  async (req, res, next) => {
      setLoading(true)
      const userInfo = await getUserInfo()
      setLoading(false)
      setAuthUser(userInfo)
    }
    if(isDecrypt)fetchUser()
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading, isDecrypt }}>
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
