import clsx from "clsx"
import { useTheme } from "./zustand-store";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./shared/ui/pages/LoginPage";
import MainLayout from "./shared/ui/layouts/MainLayout";
import FleetLayout from "./features/fleet/app/FleetLayout";
import AircraftList from "./features/fleet/app/AircraftList";
import AircraftDetails from "./features/fleet/ui/pages/Aircraft/AircraftDetails";
import NewAircraft from "./features/fleet/ui/pages/Aircraft/NewAircraft";
import TypeList from "./features/fleet/ui/pages/AircraftType/AirctaftTypeList";
import NewAircraftType from "./features/fleet/ui/pages/AircraftType/NewAircraftType";
import ModelList from "./features/fleet/ui/pages/AircraftModel/ModelList";
import ManufacturerList from "./features/fleet/ui/pages/AircraftManufacturer/ManufacturerList";

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

          <Route path="fleet" element={<FleetLayout />}>
            <Route index element={<h1>Dashboard</h1>} />

            <Route path="aircraft">
              <Route index element={<AircraftList />} />

              <Route path="type">
                <Route index element={<TypeList />} />
                <Route path="new" element={<NewAircraftType />} />
                <Route path=":type_id" element={<h1>Type Details</h1>} />
              </Route>

              <Route path="manufacturer">
                <Route index element={<ManufacturerList />} />
                <Route path="new" element={<h1>New Manufacturer</h1>} />
                <Route path=":manufacturer_id" element={<h1>Manufacturer Details</h1>} />
              </Route>

              <Route path="model">
                <Route index element={<ModelList />} />
                <Route path="new" element={<h1>New Model</h1>} />
                <Route path=":model_id" element={<h1>Model Details</h1>} />
              </Route>

              <Route path="usage">
                <Route index element={<h1>Usage List</h1>} />
                <Route path="new" element={<h1>New Usage</h1>} />
                <Route path=":usage_id" element={<h1>Usage Details</h1>} />
              </Route>

              <Route path="status">
                <Route index element={<h1>Status List</h1>} />
                <Route path="new" element={<h1>New Status</h1>} />
                <Route path=":status_id" element={<h1>Status Details</h1>} />
              </Route>
              <Route path="new" element={<NewAircraft />} />
              <Route path=":aircraft_id" element={<AircraftDetails />} />
            </Route>

            <Route path="packages">
              <Route index element={<h1>Package List</h1>} />
              <Route path="new" element={<h1>New Package</h1>} />
              <Route path=":package_id" element={<h1>Package Details</h1>} />
            </Route>

            <Route path="zones">
              <Route index element={<h1>Zones List</h1>} />
              <Route path="new" element={<h1>New Zone</h1>} />
              <Route path=":package_id" element={<h1>Zone Details</h1>} />
            </Route>

            <Route path="designators">
              <Route index element={<h1>Designators List</h1>} />
              <Route path="new" element={<h1>New Designator</h1>} />
              <Route path=":package_id" element={<h1>Designator Details</h1>} />
            </Route>


          </Route>

          <Route path="projects" element={<h1>Projects List</h1>} />
          <Route path="users" element={<h1>Users List</h1>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}
