import { NavLink } from "react-router-dom";
import { sideMenuLinks } from "../../../../zustand-store";
import clsx from "clsx";

export default function NavBlock() {
    const navStyle = clsx(
        "flex grow p-2",
        "flex-row md:flex-col"
    )
    const linkStyle = (isActive) => clsx(
        "flex text-md transition-all",
        "flex-col md:flex-row",
        " grow md:grow-0",
        "items-center p-3",
        "gap-0 md:gap-3",
        "hover:bg-black/20 hover:rounded hover:font-bold",
        isActive && "bg-black/20 rounded font-bold"
    );
    return (
        <nav className={navStyle} >
            {
                sideMenuLinks?.map((link) => (
                    <NavLink key={link.name} end={link.hasEnd} className={({ isActive }) => linkStyle(isActive)} to={link.path}>{link.icon} {link.name}</NavLink>
                ))
            }
        </nav>
    )
}
