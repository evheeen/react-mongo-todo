import { useState, useContext } from 'react'
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
      setAuth({ email: response.data.email, accessToken: headers.get('Authorization').split(' ')[1] })
      localStorage.setItem('_authToken', headers.get('Authorization').split(' ')[1])
      setEmail('')
      setPassword('')
      navigate(previousPage, { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="emailInput">Email:</label>
        <input
          id="emailInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordInput">Password:</label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  )
}

export default SignIn
