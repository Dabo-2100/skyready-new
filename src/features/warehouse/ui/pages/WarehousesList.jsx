import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../../../../services/authService";
import { UserAuthorties } from "../../../../services/featureService";
import { UserRepo } from "../../../../shared/data/UserRepo";
import { noRefreshState } from "../../../../zustand-store";
import { WarehouseRepo } from "../../data/WarehouseRepo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function WarehousesList() {
  const navigate = useNavigate();
  let token = AuthService.getToken();
  const { data: userInfo } = useQuery({ queryKey: ["userInfo"], ...noRefreshState, queryFn: UserRepo.user_auth, enabled: !!token });
  const { data: warehousesList } = useQuery({ queryKey: ["userWarehouses"], ...noRefreshState, queryFn: () => WarehouseRepo.index_user_warehouses(userInfo?.user?.documentId), enabled: !!userInfo });

  const [view, setView] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setView(warehousesList || []);
  }, [warehousesList]);
  useEffect(() => {
    if (search) {
      setView(warehousesList?.filter((el) => el?.warehouse?.name.toLowerCase().includes(search.toLowerCase())));
    } else {
      setView(warehousesList || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3 grow items-center">
          <input className="my-input" type="search" placeholder="Search Warehouses" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-3">
          {UserAuthorties().canCreate("warehouse") && (
            <Link to="new" className="btn btn-primary text-white">
              + New Warehouse
            </Link>
          )}
        </div>
      </div>

      <div className="flex p-4 w-full grow overflow-hidden">
        <div className="w-full overflow-auto rounded-box border border-base-content/5">
          <table className="table text-center border border-gray-200">
            <thead>
              <tr className="text-[var(--color-text)]  border-b border-gray-200 bg-slate-200">
                <th>#</th>
                <th>Warehouse Name</th>
                <th>My Role</th>
                <th>Warehouse Manager</th>
              </tr>
            </thead>
            <tbody>
              {view?.map((el, index) => (
                <tr key={el.documentId} className="transition cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => navigate(el?.warehouse?.documentId)}>
                  <th>{index + 1}</th>
                  <td>{el?.warehouse?.name}</td>
                  <td>{el?.role}</td>
                  <td>{el?.warehouse?.warehouse_manager?.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
