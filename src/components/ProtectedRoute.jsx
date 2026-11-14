import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user } = useAdminAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}