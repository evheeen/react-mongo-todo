import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { authenticate } from '../../services/accountService'

import useAuth from '../../hooks/useAuth'

function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const previousPage = location.state?.from?.pathname || '/'
  const { setAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accountData = {
      account: {
        email,
        password
      }
    }

    const { response, headers } = await authenticate(accountData)

    if (response.status.code === 200) {
      setAuth({ email: response.data.email, username: response.data.username, accessToken: headers.get('Authorization').split(' ')[1] })
      localStorage.setItem('_authToken', headers.get('Authorization').split(' ')[1])
      localStorage.setItem('_authEmail', response.data.email)
      localStorage.setItem('_authUsername', response.data.username)
      setEmail('')
      setPassword('')
      navigate(previousPage, { replace: true })
    }
  }

  return (
    <div className="container container-tight py-4">
      <div className="card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="emailInput">Email address</label>
              <input
                id="emailInput"
                className="form-control"
                type="text"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label" htmlFor="passwordInput">Password</label>
              <input
                id="passwordInput"
                className="form-control"
                type="password"
                placeholder="Your password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center text-secondary mt-3">
        Don't have account yet? <a href="/sign_up" tabIndex="-1">Sign up</a>
      </div>
    </div>
  )
}

export default SignIn
