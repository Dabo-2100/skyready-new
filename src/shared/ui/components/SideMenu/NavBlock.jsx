import { NavLink, useNavigate } from "react-router-dom";
import { sideMenuLinks } from "../../../../zustand-store";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
export default function NavBlock() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const navStyle = clsx("flex grow p-2", "flex-row md:flex-col");
  const linkStyle = (isActive) =>
    clsx(
      "flex text-md transition-all",
      "flex-col md:flex-row",
      " grow md:grow-0",
      "items-center p-3",
      "gap-0 md:gap-3",
      "hover:bg-black/20 hover:rounded hover:font-bold",
      isActive && "bg-black/20 rounded font-bold"
    );
  return (
    <nav className={navStyle}>
      {sideMenuLinks?.map((link) => (
        <NavLink
          key={link.name}
          end={link.hasEnd}
          className={({ isActive }) => linkStyle(isActive)}
          to={link.path}
        >
          {link.icon} {link.name}
        </NavLink>
      ))}
      <div
        className="flex text-md transition-all p-3 items-center gap-3 cursor-pointer hover:bg-black/20 hover:rounded hover:font-bold"
        onClick={() => {
          queryClient.setQueryData(["userInfo"], null);
          localStorage.clear();
          sessionStorage.clear();
          navigate("/login");
        }}
      >
        <FaSignOutAlt /> Logout
      </div>
    </nav>
  );
}
