import { NavLink } from "react-router-dom";
import { sideMenuLinks } from "../../../../zustand-store";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
export default function NavBlock() {
  const logout = useLogout();
  const navStyle = clsx("flex grow p-3 gap-2", "flex-row md:flex-col");
  const linkStyle = (isActive) => clsx("flex text-md transition-all", "flex-col md:flex-row", " grow md:grow-0", "items-center p-3", "gap-0 md:gap-3", "hover:bg-white/20 hover:rounded-lg hover:font-bold hover:text-white", isActive && "bg-white/20 rounded-lg font-bold text-white");
  return (
    <nav className={navStyle}>
      {sideMenuLinks?.map((link) => (
        <NavLink key={link.name} end={link.hasEnd} className={({ isActive }) => linkStyle(isActive)} to={link.path}>
          {link.icon} {link.name}
        </NavLink>
      ))}
      <div className="flex text-md transition-all p-3 items-center gap-3 cursor-pointer hover:bg-white/20 text-white hover:rounded-lg hover:font-bold" onClick={logout}>
        <FaSignOutAlt /> Logout
      </div>
    </nav>
  );
}
