import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth?.accessToken
      ? <Navigate to='/' replace />
      : <Outlet />
  )
}

export default ProtectedRoute
