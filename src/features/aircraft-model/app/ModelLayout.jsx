import { Link, Outlet } from "react-router-dom";
import { UserAuthorties } from "../../../services/featureService";

export default function AircraftModelLayout() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full flex items-center justify-between p-4 border-b border-gray-200 text-[var(--color-text)] bg-white">
        <h1 className="text-2xl font-semibold">Aircraft Models</h1>
        {UserAuthorties().canCreate("model") && (
          <Link to="new" className="btn btn-primary text-white w-full md:w-auto">
            + New Aircraft Model
          </Link>
        )}
      </div>
      <div className="w-full h-full p-3 flex flex-col overflow-hidden">
        <div className="w-full h-full overflow-hidden bg-white rounded-xl shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
