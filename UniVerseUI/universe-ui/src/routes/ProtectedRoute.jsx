import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.accessToken ? <Outlet/> : <Navigate to='/' state={{from: location}} replace />
  )
}

export default ProtectedRoute
