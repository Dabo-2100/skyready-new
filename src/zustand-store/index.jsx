import { create } from "zustand";
import { GiHelicopter } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";

export const domain = "http://82.112.241.233:2000";

export const sideMenuLinks = [
    { name: "Dashboard", path: "", icon: <GiHelicopter />, hasEnd: true },
    { name: "Fleet Manager", path: "/fleet", icon: <GiHelicopter /> },
    { name: "Projects Manager", path: "/projects", icon: <FaBusinessTime /> },
    { name: "Warehouse Manager", path: "/warehouse", icon: <FaBusinessTime /> },
    { name: "Users Manager", path: "/users", icon: <FaUsersCog /> },
]

export const useTheme = create((set) => ({
    isDark: true,
    toggleTheme: () => (set((state) => ({ isDark: !state.isDark })))
}))