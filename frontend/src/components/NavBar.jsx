import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

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
          ? <Link to='/sign_out'>Sign Out</Link>
          : <><Link to='/sign_in'>Sign In</Link> | <Link to='/sign_up'>Sign Up</Link></>
      }
    </nav>
  )
}

export default NavBar
