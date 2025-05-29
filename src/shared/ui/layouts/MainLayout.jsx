import clsx from "clsx";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { useMemo } from "react";
export default function MainLayout() {
  const layoutStyle = useMemo(() => clsx("w-full h-full overflow-hidden flex", "flex-col md:flex-row"), []);
  return (
    <div className={layoutStyle}>
      <SideMenu />
      <div className="grow order-1 md:order-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
