import { Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import SignOut from '../features/auth/SignOut'

function NavBar () {
  const { auth } = useAuth()

  return (
    <nav>
      <Link to='/'>Index</Link>
      {' | '}
      <Link to='tasks/new'>New</Link>
      {' | '}
      {
        auth?.accessToken
          ? <SignOut />
          : <><Link to='/sign_in'>Sign In</Link> | <Link to='/sign_up'>Sign Up</Link></>
      }
    </nav>
  )
}

export default NavBar
