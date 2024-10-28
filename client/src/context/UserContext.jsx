import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const localAuth = JSON.parse(localStorage.getItem("auth"))

  const setAuthenticated = (data) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...data, expiresAt: Date.now() + 86400000 })
    )
    setAuth({ ...data, expiresAt: Date.now() + 86400000 })
  }

  const clearAuthentication = () => {
    localStorage.removeItem("auth")
    setAuth(null)
  }

  return (
    <AuthContext.Provider
      value={{ auth, setAuthenticated, clearAuthentication, localAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
