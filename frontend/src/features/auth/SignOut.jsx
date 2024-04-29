import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <button onClick={handleLogout}>Sign Out</button>
  )
}

export default SignOut
