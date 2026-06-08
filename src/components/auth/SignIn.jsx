import { useState } from 'react'
import { SupabaseServices } from '../../services/SupabaseServices'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../templates/LoadingScreen'
import { FcGoogle } from 'react-icons/fc'
import * as BsIcons from 'react-icons/bs'

const SignIn = () => {
  // const isDev = window.location.hostname === 'localhost';
  // const redirectTo = isDev ? 'http://localhost:3000' : window.location.origin;
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function verifySignIn(e) {
    e.preventDefault()
    setLoading(true)

    const result = await SupabaseServices.auth.signInWithPassword({ email, password })

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
    }
  }
  async function signInWithGoogle() {
    setLoading(true)

    const result = await SupabaseServices.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
    }
  }

  if (loading) return <LoadingScreen />
  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-auto">
        <div className="flex justify-center">
          <div className="w-96 p-5">
            <div className="card">
              <div className="card-body">
                <form className="flex flex-col gap-3" onSubmit={verifySignIn}>
                  <span className="flex items-center font-bold text-2xl mx-auto mb-10"><BsIcons.BsLayers className="me-1" />PRSYS</span>
                  <h1 className="text-2xl font-bold">Sign In</h1>
                  <p className="text-gray-600">Welcome back! Enter your registered email and password to sign in.</p>
                  {error && ( <div role="alert" className="alert alert-error alert-soft"><BsIcons.BsXCircle className="me-1" /><span>{error}</span></div> )}
                  <label className="input">
                    <BsIcons.BsEnvelope className="me-1" />
                    <input
                      type="email"
                      value={email}
                      placeholder="e.g. johndoe@site.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label className="input">
                    <BsIcons.BsKey className="me-1" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      placeholder="e.g. @Johndoe123"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <BsIcons.BsEye className="me-1" /> : <BsIcons.BsEyeSlash className="me-1" />}
                    </button>
                  </label>
                  <button className="btn btn-neutral mt-3" type="submit">Sign In</button>
                  <div className="divider">
                    <span className="text-xs text-gray-400">OR</span>
                  </div>
                  <button className="btn" type="button" onClick={signInWithGoogle}><FcGoogle className="me-1" />Sign In with Google</button>
                  <span className="flex items-center text-gray-400 text-xs mx-auto mt-20"><BsIcons.BsCCircle className="me-1" />PRSYS</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn