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
  }
}

export default AuthServices