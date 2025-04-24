import clsx from "clsx"
import { useTheme } from "./zustand-store";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./shared/ui/pages/LoginPage";
import MainLayout from "./shared/ui/layouts/MainLayout";

export default function App() {
  const { isDark } = useTheme();

  const appStyle = clsx(
    isDark && "dark",
    "w-full h-[100svh] overflow-hidden",
    "text-gray-900 dark:text-slate-100",
    "bg-slate-100 dark:bg-gray-900",
  )

  return (
    <div className={appStyle}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="fleet" element={<h1>Fleet List</h1>} />
          <Route path="projects" element={<h1>Projects List</h1>} />
          <Route path="users" element={<h1>Users List</h1>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}
