import { Navigate } from 'react-router-dom'
import { useAuth } from './authContext'

export default function ProtectedRoute({ allowdUserType, children }) {
  const { isAuthenticated, userType } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

 
  if (!allowdUserType.includes(userType)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
