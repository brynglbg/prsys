import { SupabaseServices } from './SupabaseServices'

const SessionServices = {
  // Get current session
  async getSession() {
    const { data, error } = await SupabaseServices.auth.getSession()
    if (error) {
      console.error('Error getting session:', error.message)
      return null
    }
    return data.session
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    const { data } = SupabaseServices.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })

    return data.subscription
  },

  // Get current user (optional helper)
  async getUser() {
    const { data, error } = await SupabaseServices.auth.getUser()
    if (error) {
      console.error('Error getting user:', error.message)
      return null
    }
    return data.user
  },

  // Sign out (optional helper)
  async signOut() {
    const { error } = await SupabaseServices.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    }
  }
}

export default SessionServices