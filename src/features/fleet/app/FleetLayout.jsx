import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

export default function FleetLayout() {
    const links = [
        { name: "Dashboard", path: "", hasEnd: true },
        { name: "Aircraft List", path: "aircraft" },
        { name: "Work Packages", path: "packages" },
        { name: "Aircraft Structure", path: "zones" },
        { name: "Aircraft Avionics", path: "designators" },
    ];

    const linkStyle = (isActive) => clsx(
        "text-lg p-3 transition duration-300",
        "hover:bg-black/50 hover:font-bold",
        isActive && "bg-black/50 font-bold"
    );

    return (
        <div className="w-full h-full flex flex-col">
            <nav className="w-full bg-indigo-950 flex border-b border-b-slate-50/20">
                {
                    links.map((el) => (
                        <NavLink key={el.name} end={el.hasEnd} to={el.path} className={({ isActive }) => linkStyle(isActive)}>{el.name}</NavLink>
                    ))
                }
            </nav>
            <div className="w-full grow overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
