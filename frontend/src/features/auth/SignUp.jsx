import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { registrate } from '../../services/accountService'

import AuthContext from '../../context/AuthProvider'

function SignUp () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

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
    console.log(response)
    
    if (response.status.code == 200) {
      setAuth({ email: response.data.email, accessToken: response.data.accessToken })
      localStorage.setItem('_authToken', response.data.access_token)
      navigate('/')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setUsername('')
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirmationInput">Password Confirmation:</label>
        <input
          id="passwordConfirmationInput"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}

export default SignUp
