import { create } from "zustand";
import { GiHelicopter } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";
import { AuthService } from "../services/authService";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BiSolidPlaneAlt } from "react-icons/bi";

export const noRefreshState = {
  refetchOnReconnect: false,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
};

export const domain = "http://82.112.241.233:2000";

export const api = axios.create({
  baseURL: "http://82.112.241.233:2000/graphql",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const sideMenuLinks = [
  { name: "Dashboard", path: "", icon: <TbLayoutDashboardFilled />, hasEnd: true },
  { name: "Fleet", path: "/fleet", icon: <BiSolidPlaneAlt /> },
  { name: "Projects", path: "/projects", icon: <FaBusinessTime /> },
  { name: "Warehouse", path: "/warehouse", icon: <FaBusinessTime /> },
  { name: "Users", path: "/users", icon: <FaUsersCog /> },
];

export const useTheme = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
