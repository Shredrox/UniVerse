import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user ? <Outlet/> : <Navigate to='/' state={{from: location}} replace />
  )
}
