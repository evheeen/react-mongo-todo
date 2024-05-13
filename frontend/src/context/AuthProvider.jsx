import { createContext, useState, useEffect } from 'react'

import { validateToken } from '../services/accountService'

const AuthContext = createContext({ auth: {}, setAuth: () => {} })

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({ accessToken: localStorage.getItem('_authToken') }) || {})

  useEffect(() => {
    const validateAndStoreAuth = async () => {
      if (auth.accessToken) {
        try {
          const isValid = await validateToken()

          if (!isValid) {
            setAuth({})
            localStorage.removeItem('_authToken')
          }
        } catch (error) {
          console.error('Token Validation Error:', error)
        }
      }
    }

    validateAndStoreAuth()
  }, [auth.accessToken])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
