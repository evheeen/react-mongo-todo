import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AuthenticateAccount = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth?.email
      ? <Outlet />
      : <Navigate to="/sign_in" state={{ from: location }} replace />
  )
}

export default AuthenticateAccount
