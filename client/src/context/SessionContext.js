import { createContext, useContext, useState } from 'react'

const SessionContext = createContext()

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }) => {
  const [iseLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  return (
    <SessionContext.Provider value={{ iseLoggedIn, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}
