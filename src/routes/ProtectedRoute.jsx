import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../services/authService";

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const token = AuthService.getToken();

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
