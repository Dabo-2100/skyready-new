import clsx from "clsx";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserRepo } from "../../data/UserRepo";
import Loader from "../components/Loader";
import { AuthService } from "../../../services/authService";

export default function MainLayout() {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: UserRepo.user_auth,
    enabled: !!AuthService.getToken(),
  });

  const navigate = useNavigate();
  const layoutStyle = useMemo(() => clsx("w-full h-full overflow-hidden flex", "flex-col md:flex-row"), []);

  useEffect(() => {
    !isLoading && !userInfo && navigate("/login");
  }, [isLoading, userInfo, navigate]);

  return (
    <div className={layoutStyle}>
      {isLoading && <Loader />}
      <SideMenu />
      <div className="grow order-1 md:order-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
