import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { logout } from '../../services/accountService'

import useAuth from '../../hooks/useAuth'

import LogoutIcon from '../../assets/icons/logout'

function SignOut () {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleLogout = async () => {
    if (!localStorage.getItem('_authToken')) {
      localStorage.removeItem('_authEmail')
      localStorage.removeItem('_authUsername')

      toast.error('You need to sign in or sign up before continuing.')
      return setAuth({})
    }

    const response = await logout()

    if (response.status === 200) {
      localStorage.removeItem('_authToken')
      localStorage.removeItem('_authEmail')
      localStorage.removeItem('_authUsername')
      setAuth({})
      navigate('/sign_in')
    }

    toast.success(response.data.message)
  }

  return (
    <Link onClick={handleLogout} className="btn btn-outline-dark">
      <LogoutIcon />
      Logout
    </Link>
  )
}

export default SignOut
