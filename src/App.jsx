import { Fragment, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
// Templates
import LoadingScreen from './components/templates/LoadingScreen'
import { useAuth } from './context/AuthContext'
import { getPageTitle } from './utils/helpers'
import { PAGES } from './utils/constants'
import ResetPassword from './components/auth/ResetPassword'

const App = () => {
  const { session, loading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    document.title = getPageTitle(location.pathname)
  }, [location.pathname])

  if (loading) return <LoadingScreen />
  return (
    <Routes>
      {/* Signed In */}
      <Route element={<ProtectedRoute session={session} />}>
        <Route element={<Layout />}>
          {PAGES.map((p) => (
            <Fragment key={p.path}>
              <Route path={p.path} element={<p.element />} />
              {p.items.map((pi) => (
                <Route key={pi.path} path={pi.path} element={<pi.element />} />
              ))}
            </Fragment>
          ))}
        </Route>
      </Route>
      {/* Signed Out */}
      <Route element={<PublicRoutes session={session} />}>
        <Route path="/" element={<SignIn />} />
      </Route>
      {/* Global */}
      <Route path="/signout" element={<SignOut />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Error */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App