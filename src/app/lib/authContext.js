'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {getUserInfo} from "@/app/auth/login/actions";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userInfo = await getUserInfo();
        if (isMounted) {
          setAuthUser(userInfo); // Set the authenticated user
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        if (isMounted) {
          setAuthUser(null); // Ensure authUser is null if there's an error
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Set loading to false after the operation
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
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
