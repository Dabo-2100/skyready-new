import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

export default function WarehouseTabs() {
  const navLinkStyle = ({ isActive }) => {
    return clsx("px-3 transition py-2 border-b border-b-slate", "hover:text-indigo-500 hover:border-b hover:border-b-indigo-500", isActive && " border-b border-b-indigo-500 text-indigo-500 ");
  };
  return (
    <div className="grow w-full flex flex-col">
      <div className="w-full pb-3">
        <nav className="w-full flex">
          <NavLink className={navLinkStyle} to="info">
            Warehouse Details
          </NavLink>
          <NavLink className={navLinkStyle} to="items">
            Items in Warehouse
          </NavLink>
          <NavLink className={navLinkStyle} to="locations">
            Locations
          </NavLink>
        </nav>
      </div>
      <div className="p-3 w-full h-100 grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
