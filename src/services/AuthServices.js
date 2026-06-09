// services/AuthServices.js
import { SupabaseServices } from './SupabaseServices'

const AuthServices = {
  async signIn(email, password) {
    const { data, error } = await SupabaseServices.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { error: error.message }
    }

    return { data }
  },

  async signInWithGoogle() {
    const { data, error } = await SupabaseServices.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      return { error: error.message }
    }

    return { data }
  },
  
  async signOut() {
    const { error } = await SupabaseServices.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  },

  async resetPassword(newPass) {
    const { data, error } = await SupabaseServices.auth.updateUser({
      password: newPass,
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      return { error: error.message }
    }

    return { data }
  },

  async sendResetEmail(email) {
    const { data, error } = await SupabaseServices.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
      queryParams: {
        type: 'PASSWORD_RECOVERY'
      }
    })

    if (error) {
      return { error: error.message }
    }

    return { data }
  },

  onPasswordRecovery(callback) {
    const { data } = SupabaseServices.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          callback(session)
        }
      }
    )

    return data.subscription
  }
}

export default AuthServices