import { createContext, useContext, useEffect, useState } from 'react'
import SessionServices from '../services/SessionServices'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    SessionServices.getSession().then((s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    const subscription = SessionServices.onAuthStateChange(
      (_, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)