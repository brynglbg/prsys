import { useEffect, useState } from 'react'
import { SupabaseServices } from '../../services/SupabaseServices'
import LoadingScreen from '../templates/LoadingScreen'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const logout = async () => {
      await SupabaseServices.auth.signOut()
      setLoading(false)
      navigate('/')
    }
    logout()
  }, [])

  if (loading) return <LoadingScreen />
  return null
}

export default SignOut