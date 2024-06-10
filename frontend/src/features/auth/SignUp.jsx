import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { registrate } from '../../services/accountService'

import useAuth from '../../hooks/useAuth'

function SignUp () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const previousPage = location.state?.from?.pathname || '/'
  const { setAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accountData = {
      account: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        username
      }
    }

    const response = await registrate(accountData)

    if (response.status === 200) {
      setAuth({ email: response.data.email, username: response.data.username, accessToken: response.headers.get('Authorization').split(' ')[1] })
      localStorage.setItem('_authToken', response.headers.get('Authorization').split(' ')[1])
      localStorage.setItem('_authEmail', response.data.email)
      localStorage.setItem('_authUsername', response.data.username)
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setUsername('')
      navigate(previousPage, { replace: true })
      toast.success(response.data.message)
    } else {
      response.data.errors.forEach(error => toast.error(error))
    }
  }

  return (
    <div className="container container-tight py-4">
      <div className="card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">Create new account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="emailInput">Email address</label>
              <input
                id="emailInput"
                className="form-control"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordInput">Password</label>
              <input
                id="passwordInput"
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordConfirmationInput">Password Confirmation</label>
              <input
                id="passwordConfirmationInput"
                className="form-control"
                type="password"
                placeholder="Confirm password"
                value={passwordConfirmation}
                autoComplete="new-password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="usernameInput">Username</label>
              <input
                id="usernameInput"
                className="form-control"
                type="text"
                placeholder="Enter username"
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">Create new account</button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center text-secondary mt-3">
        Already have account? <a href="/sign_in" tabIndex="-1">Sign in</a>
      </div>
    </div>
  )
}

export default SignUp
