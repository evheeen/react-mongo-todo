import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { logout } from '../../services/accountService'

import useAuth from '../../hooks/useAuth'

function SignOut () {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleLogout = async () => {
    if (!localStorage.getItem('_authToken')) {
      return null
    }

    const response = await logout()

    if (response.status.code === 200) {
      localStorage.removeItem('_authToken')
      setAuth({})
      navigate('/sign_in')
    }
  }

  return (
    <Link onClick={handleLogout}>Sign Out</Link>
  )
}

export default SignOut
