import { createContext, useState, useEffect, useRef } from 'react'

import { validateToken } from '../services/accountService'

const AuthContext = createContext({ auth: {}, setAuth: () => {} })

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    accessToken: localStorage.getItem('_authToken'),
    email:       localStorage.getItem('_authEmail'),
    username:    localStorage.getItem('_authUsername') 
  }) || {})

  const hasValidated = useRef(false)

  useEffect(() => {
    const validateAndStoreAuth = async () => {
      if (hasValidated.current) return

      hasValidated.current = true

      if (auth.accessToken) {
        try {
          const isValid = await validateToken()

          if (!isValid) {
            setAuth({})
            localStorage.removeItem('_authToken')
            localStorage.removeItem('_authEmail')
            localStorage.removeItem('_authUsername')
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
