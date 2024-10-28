import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const RequireAuth = ({ allowedRoles }) => {
  const { localAuth } = useAuth()
  const location = useLocation()

  return localAuth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : localAuth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
