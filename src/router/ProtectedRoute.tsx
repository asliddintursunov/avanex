import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../lib/actions";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isAuthenticated = Boolean(getCookie("access_token"));
  const userRole = "";
  const currentPath = window.location.pathname;
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole || "")) {
    return <Navigate to={currentPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
