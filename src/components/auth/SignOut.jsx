import { useEffect, useState } from 'react'
import LoadingScreen from '../templates/LoadingScreen'
import { useNavigate } from 'react-router-dom'
import AuthServices from '../../services/AuthServices'

const SignOut = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const logout = async () => {
      const result = await AuthServices.signOut()
      if (result?.error) {
        console.error(result.error)
      }
      setLoading(false)
      navigate('/')
    }
    logout()
  }, [])

  if (loading) return <LoadingScreen />
  return null
}

export default SignOut