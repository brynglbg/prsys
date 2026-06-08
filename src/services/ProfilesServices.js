import { SupabaseServices } from './SupabaseServices';

// profile
export async function getAuthProfile(){
  // get current user
  const { data: userData, error: userError } = await SupabaseServices.auth
    .getUser()
  
  if (userError || !userData?.user) {
    return { data: null, error: userError || 'No user found' }
  }
  
  const userId = userData.user.id
  const { data, error } = await SupabaseServices
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}