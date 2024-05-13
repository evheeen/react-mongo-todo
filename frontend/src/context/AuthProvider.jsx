import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({ auth: {}, setAuth: () => {} })

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({ accessToken: localStorage.getItem('_authToken') }) || {})

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
