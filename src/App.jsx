import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SupabaseServices } from './services/SupabaseServices'
// Protected
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './Layout'
import Dashboard from './components/dashboard/Dashboard'
import EmployeeList from './components/employees/EmployeeList'
import EmployeeMod from './components/employees/EmployeeMod'
// Public
import PublicRoutes from './routes/PublicRoutes'
import SignIn from './components/auth/SignIn'
// Global
import SignOut from './components/auth/SignOut'
// Error
import PageNotFound from './components/error/PageNotFound'
import LoadingScreen from './components/templates/LoadingScreen'

const App = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    SupabaseServices.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = SupabaseServices.auth.onAuthStateChange((e, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <LoadingScreen />
  return (
    <Routes>
      {/* For Authenticated Users */}
      <Route element={<ProtectedRoute session={session} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeMod />} />
          <Route path="/employees/edit/:id" element={<EmployeeMod />} />
        </Route>
      </Route>
      {/* For Non-Authenticated Users */}
      <Route element={<PublicRoutes session={session} />}>
        <Route path="/" element={<SignIn />} />
      </Route>
      {/* Global */}
      <Route path="/signout" element={<SignOut />} />
      {/* Error */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App