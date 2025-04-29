import { create } from "zustand";
import { GiHelicopter } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";
export const noRefreshState = { refetchOnReconnect: false, staleTime: Infinity, refetchOnWindowFocus: false };
export const domain = "http://82.112.241.233:2000/graphql";

export const api = axios.create({
    baseURL: domain,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
    }
})

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