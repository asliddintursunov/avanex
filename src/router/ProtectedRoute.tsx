import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../lib/actions";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isAuthenticated = Boolean(getCookie("access_token"));
  const userRole = getCookie("job_title") || "";
  const previousPage = sessionStorage.getItem("prevPath") || "/";
  const location = useLocation();

  if (location.pathname !== "/login" && isAuthenticated) {
    sessionStorage.setItem("previousPage", location.pathname);
  }

  if (location.pathname === "/login" && isAuthenticated) {
    return (
      <Navigate
        to={userRole === "bugalter" ? "/sales-order" : "/dashboard"}
        replace
      />
    );
  }

  if (location.pathname === "/") {
    return (
      <Navigate
        to={
          isAuthenticated
            ? `${userRole === "bugalter" ? "/sales-order" : "/dashboard"}`
            : "/login"
        }
        replace
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={previousPage} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
