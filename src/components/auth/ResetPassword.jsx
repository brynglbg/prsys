import React, { useEffect, useState } from 'react'
import { APP } from '../../utils/constants'
import * as BsIcons from 'react-icons/bs'
import AppCopyright from '../templates/AppCopyright'
import AuthServices from '../../services/AuthServices'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [newPass, setNewPass] = useState('')
  const [cNewPass, setCNewPass] = useState('')
  const [showNewPass, setShowNewPass] = useState(false)
  const [showCNewPass, setShowCNewPass] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const subscription = AuthServices.onPasswordRecovery(() => {
      setReady(true)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function verifyPassword(e) {
    e.preventDefault()
    let isValid = true

    if (newPass !== cNewPass) {
      setError('Passwords don\'t match.')
      return
    }

    setError(false)
    setLoading(true)

    const result = await AuthServices.resetPassword(newPass)

    setLoading(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    console.log(result)

    navigate('/')
  }

  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-auto">
        <div className="flex justify-center">
          <div className="w-96 p-5">
            <div className="card">
              <div className="card-body">
                <form className="flex flex-col gap-3" onSubmit={verifyPassword}>
                  <span className="flex items-center font-bold text-2xl mx-auto mb-10"><APP.icon className="me-1" />{APP.name}</span>
                  <h1 className="text-2xl font-bold">Reset Password</h1>
                  <p className="text-gray-600">Enter your new newPass at least 8-50 characters.</p>
                  {error && (
                    <div role="alert" className="alert alert-error alert-soft">
                      <BsIcons.BsXCircle className="me-1" />
                      <span>{error}</span>
                    </div>
                  )}
                  <label className="input">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPass}
                      minLength={8}
                      maxLength={50}
                      placeholder="e.g. @Johndoe123"
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" onClick={() => setShowNewPass(!showNewPass)}>
                      {showNewPass ? <BsIcons.BsEye className="me-1" /> : <BsIcons.BsEyeSlash className="me-1" />}
                    </button>
                  </label>
                  <label className="input">
                    <input
                      type={showCNewPass ? 'text' : 'password'}
                      value={cNewPass}
                      minLength={8}
                      maxLength={50}
                      placeholder="e.g. @Johndoe123"
                      onChange={(e) => setCNewPass(e.target.value)}
                      required
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" onClick={() => setShowCNewPass(!showCNewPass)}>
                      {showCNewPass ? <BsIcons.BsEye className="me-1" /> : <BsIcons.BsEyeSlash className="me-1" />}
                    </button>
                  </label>
                  <button className="btn btn-neutral mt-3" type="submit">Reset Password</button>
                  <div className="mx-auto mt-20">
                    <AppCopyright />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword