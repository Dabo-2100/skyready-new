import { Outlet } from "react-router-dom";
import { noRefreshState } from "../../../zustand-store";
import { UserRepo } from "../../../shared/data/UserRepo";
import { AuthService } from "../../../services/authService";
import { useQuery } from "@tanstack/react-query";

export default function WarehouseLayout() {
  let token = AuthService.getToken();
  const { data: userInfo } = useQuery({ queryKey: ["userInfo"], ...noRefreshState, queryFn: UserRepo.user_auth, enabled: !!token });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full flex items-center justify-between p-4 border-b border-gray-200 text-[var(--color-text)] bg-white">
        <h1 className="text-2xl font-semibold">Warehouse Manager</h1>
        <p>Welcome : {userInfo?.user.username}</p>
      </div>
      <div className="w-full grow">
        <Outlet />
      </div>
    </div>
  );
}
