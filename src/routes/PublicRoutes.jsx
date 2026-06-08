import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ session }) => {
  return !session ? <Outlet /> : <Navigate to="/dashboard" />
}

export default PublicRoutes