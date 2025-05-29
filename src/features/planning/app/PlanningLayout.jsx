import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

export default function PlanningLayout() {
  const navLinkStyle = ({ isActive }) => {
    return clsx("p-3 transition", "hover:text-white hover:bg-gray-500", isActive && "text-white bg-gray-500");
  };
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="w-full bg-white border-b border-b-gray-100 shadow flex">
        <nav className="flex">
          <NavLink className={navLinkStyle} end>
            Dashboard
          </NavLink>
          <NavLink className={navLinkStyle} to={"pacakges"}>
            Work Package
          </NavLink>
        </nav>
      </div>
      <div className="grow w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
