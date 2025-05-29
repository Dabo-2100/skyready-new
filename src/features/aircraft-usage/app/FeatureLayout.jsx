import { Outlet } from "react-router-dom";

export default function FeatureLayout() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full p-4 border-b border-gray-200 text-[var(--color-text)] bg-white">
        <h1 className="text-2xl font-semibold">Feature Name</h1>
      </div>
      <div className="w-full h-full p-3 flex flex-col overflow-hidden">
        <div className="w-full h-full overflow-hidden bg-white rounded-xl shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
