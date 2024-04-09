import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { authenticate } from '../../services/accountService'

import AuthContext from '../../context/AuthProvider'

function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accountData = {
      account: {
        email,
        password
      }
    }

    const response = await authenticate(accountData)
    console.log(response)

    if (response.status.code == 200) {
      setAuth({ email: response.data.email, accessToken: response.data.accessToken })
      navigate('/')
      setEmail('')
      setPassword('')
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
