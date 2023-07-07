import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoutes() {
  const { user, isAuthenticated, loading } = useAuth();
  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
