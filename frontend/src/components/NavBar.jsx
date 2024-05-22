import { Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import SignOut from '../features/auth/SignOut'

import LoginIcon from '../assets/icons/login'
import UserCircleIcon from '../assets/icons/user-circle'

function NavBar () {
  const { auth } = useAuth()

  return (
    <header className="navbar navbar-transparent">
      <div className="container-xl">
        <h1 className="navbar-brand">
          <Link to='/' className="nav-link">Todos</Link>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item">
            <div className="d-flex lh-1 nav-link p-0">
              {
                auth?.accessToken
                  ? <>
                      <UserCircleIcon />
                      <div className="d-none d-xl-block ps-2 me-4">
                        <div>{auth.username}</div>
                        <div className="mt-1 small text-secondary">{auth.email}</div>
                      </div>
                      <SignOut />
                    </>
                  : <div className="btn-group">
                      <Link to='/sign_in' className="btn">
                        <LoginIcon />
                        Sign In
                      </Link>
                      <Link to='/sign_up' className="btn">Sign Up</Link>
                    </div>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
