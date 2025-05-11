import { create } from "zustand";
import { GiHelicopter } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";

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
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const sideMenuLinks = [
  { name: "Dashboard", path: "", icon: <GiHelicopter />, hasEnd: true },
  { name: "Fleet Manager", path: "/fleet", icon: <GiHelicopter /> },
  { name: "Projects Manager", path: "/projects", icon: <FaBusinessTime /> },
  { name: "Warehouse Manager", path: "/warehouse", icon: <FaBusinessTime /> },
  { name: "Users Manager", path: "/users", icon: <FaUsersCog /> },
];

export const useTheme = create((set) => ({
  isDark: true,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
