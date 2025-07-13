import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './contexts/authContext'
import ProtectedRoute from './contexts/protectedRoute'
import Admin from './pages/admin/admin'
import Leader from './pages/leader/leader'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Unauthorized from './pages/unauthorized'

function App() {
  const { loadingAuth } = useAuth()
  if (loadingAuth) {
    return null
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowdUserType={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leader"
          element={
            <ProtectedRoute allowdUserType={['leader']}>
              <Leader />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
