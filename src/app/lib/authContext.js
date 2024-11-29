import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserData} from "@/app/lib/session"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(); // Wait for the asynchronous function
      setUser(userData); // Update the state
    };

    fetchUserData(); // Call the async function
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
