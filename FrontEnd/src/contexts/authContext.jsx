import { createContext, useContext, useEffect, useState } from 'react'
import { getAccessToken, login } from '../services/authApi'
import { setAuthToken } from '../services/axiosInstanceWithTokenAuth'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  const loginUser = async (username, password) => {
    try {
      const res = await login(username, password)
      const { access, refresh, user_type } = res
      setAuthToken(access)
      setUserType(user_type)
      sessionStorage.setItem('refresh', refresh)
      setIsAuthenticated(true)
      return user_type
    } catch {
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAuthToken(null)
    sessionStorage.removeItem('refresh')
    setUserType(null)
  }

  useEffect(() => {
    const getAccess = async () => {
      const refresh = sessionStorage.getItem('refresh')
      if (!refresh) {
        setIsAuthenticated(false)
        setLoadingAuth(false)
        return
      }

      try {
        const res = await getAccessToken(refresh)
        const { access, user_type } = res
        setAuthToken(access)
        setUserType(user_type)
        setIsAuthenticated(true)
      } catch {
        logout() // Clear invalid tokens
      } finally {
        setLoadingAuth(false)
      }
    }
    getAccess()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login: loginUser,
        logout,
        userType,
        isAuthenticated,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
