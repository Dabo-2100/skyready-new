import clsx from "clsx";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

    const layoutStyle = clsx(
        "w-full h-full overflow-hidden flex",
        "flex-col md:flex-row"
    );

    return (
        <div className={layoutStyle}>
            <SideMenu />
            <div className="grow order-1 md:order-2">
                <Outlet />
            </div>
        </div>
    )
}
