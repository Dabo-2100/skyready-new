import { useQuery } from "@tanstack/react-query";
import { IoMdNotificationsOutline } from "react-icons/io";
import { UserRepo } from "../../data/UserRepo";
import { AuthService } from "../../../services/authService";
import { noRefreshState } from "../../../zustand-store";
export default function Dashboard() {
  const widgets = ["Count", "Chart", "Table"];
  const { data: userInfo } = useQuery({ queryKey: ["userInfo"], queryFn: UserRepo.user_auth, ...noRefreshState, enabled: !!AuthService.getToken() });
  return (
    <div className="w-full h-full flex flex-col text-[var(--color-text)]">
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Dashboard</h1>
        <div className="flex items-center gap-3">
          <IoMdNotificationsOutline />
        </div>
      </div>
      <div className="w-full p-3 grow-1 shadow">
        <div className="flex flex-col overflow-auto h-full w-full bg-white p-4 rounded-xl">
          <h1 className="text-2xl font-semibold mb-4">Welcom {userInfo?.username}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
            {widgets.map((index) => (
              <div key={index} className="bg-white border border-gray-200 shadow-2xl p-4 rounded-lg">
                <h2 className="text-lg font-semibold">Total Aircraft</h2>
                <p className="text-2xl font-semibold">{userInfo?.aircraftCount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
