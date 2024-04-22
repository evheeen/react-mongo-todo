import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../services/accountService'

import AuthContext from '../../context/AuthProvider'

function SignOut () {
  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

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
