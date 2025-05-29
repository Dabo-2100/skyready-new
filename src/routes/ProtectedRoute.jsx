import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthService } from "../services/authService";
import { useQuery } from "@tanstack/react-query";
import { UserRepo } from "../shared/data/UserRepo";
import { noRefreshState } from "../zustand-store";

export default function ProtectedRoute({ redirectPath = "/login" }) {
  const currentPath = useLocation();
  const token = AuthService.getToken();
  const { data: userInfo, isLoading } = useQuery({ queryKey: ["userInfo"], ...noRefreshState, queryFn: UserRepo.user_auth, enabled: !!token });
  if (!token && !isLoading && !userInfo) {
    return <Navigate to={redirectPath} replace />;
  } else {
    if (!isLoading && userInfo) {
      if (currentPath.pathname == "/") {
        return <Outlet />;
      } else {
        let haveFeature = userInfo?.features.some((el) => currentPath.pathname.includes(el.system_feature.path));
        if (haveFeature) {
          if (currentPath.pathname.includes("/new")) {
            let canCreate = userInfo?.features.find((el) => currentPath.pathname.includes(el.system_feature.path))?.canCreate;
            if (canCreate == true) {
              return <Outlet />;
            } else {
              return <Navigate to={"/403"} replace />;
            }
          } else {
            return <Outlet />;
          }
        } else {
          return <Navigate to={"/403"} replace />;
        }
      }
    }
  }
}
