import clsx from "clsx";
import { useTheme } from "./zustand-store";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  const { isDark } = useTheme();
  const appStyle = useMemo(() => clsx(isDark && "dark", "w-full h-[100dvh] overflow-hidden font-poppins", "text-[var(--color-text)] ", "bg-[var(--color-bg)]"), [isDark]);
  return (
    <div className={appStyle}>
      <Toaster position="top-center" />
      <AppRoutes />
    </div>
  );
}
