import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ session }) => {
  return session ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute