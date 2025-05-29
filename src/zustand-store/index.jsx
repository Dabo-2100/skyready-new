import { create } from "zustand";
import { PiEngineDuotone } from "react-icons/pi";
import { FaBusinessTime } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import axios from "axios";
import { AuthService } from "../services/authService";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BiSolidPlaneAlt } from "react-icons/bi";

export const noRefreshState = { refetchOnReconnect: false, staleTime: Infinity, refetchOnWindowFocus: false };

export const domain = "http://82.112.241.233:2025";

export const api = axios.create({
  baseURL: "http://82.112.241.233:2025/graphql",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const sideMenuLinks = [
  { name: "Dashboard", path: "/", icon: <TbLayoutDashboardFilled />, hasEnd: true },
  { name: "Aircraft Models", path: "/model", icon: <MdOutlineAirplaneTicket /> },
  { name: "Aircraft List", path: "/aircraft", icon: <IoAirplaneSharp /> },
  { name: "Part Master", path: "/part", icon: <FaTools /> },
  { name: "Fleet Manager", path: "/fleet", icon: <BiSolidPlaneAlt /> },
  { name: "Warehouse", path: "/warehouse", icon: <FaBusinessTime /> },
];

export const allFilters = [
  { name: "Part No", value: "partNo", id: 1 },
  { name: "Part Description", value: "partDesc", id: 2 },
  { name: "Aircraft Model", value: "aircraft_model", id: 3 },
  { name: "Aircraft S/N", value: "aircraft", id: 4 },
  { name: "Serial No", value: "serialNo", id: 5 },
];

export const useTheme = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
