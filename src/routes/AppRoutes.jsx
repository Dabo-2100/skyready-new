import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../shared/ui/components/Loader";
import ProtectedRoute from "./ProtectedRoute";
import AircraftModelLayout from "../features/aircraft-model/app/ModelLayout";
import NewAircraftModel from "../features/aircraft-model/ui/pages/NewAircraftModel";

export default function AppRoutes() {
  // System Pages
  const MainLayout = lazy(() => import("../shared/ui/layouts/MainLayout"));
  const LoginPage = lazy(() => import("../shared/ui/pages/LoginPage"));
  const Dashboard = lazy(() => import("../shared/ui/pages/Dashboard"));
  const Page404 = lazy(() => import("../shared/ui/pages/Page404"));
  const Page403 = lazy(() => import("../shared/ui/pages/Page403"));
  // Aircraft Routes
  const AircraftLayout = lazy(() => import("../features/aircraft-list/app/AircraftLayout"));
  const AircraftList = lazy(() => import("../features/aircraft-list/ui/pages/AircraftList"));
  const NewAircraft = lazy(() => import("../features/aircraft-list/ui/pages/NewAircraft"));
  const AircraftDetails = lazy(() => import("../features/aircraft-list/ui/pages/AircraftDetails"));
  // Aircraft Model Routes
  const AircraftModelList = lazy(() => import("../features/aircraft-model/ui/pages/AircraftModelList"));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<ProtectedRoute redirectPath="login" />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="model" element={<AircraftModelLayout />}>
              <Route index element={<AircraftModelList />} />
              <Route path="new" element={<NewAircraftModel />} />
              <Route path=":model_id" element={<h1>Show Model Details</h1>} />
            </Route>

            <Route path="aircraft" element={<AircraftLayout />}>
              <Route index element={<AircraftList />} />
              <Route path="new" element={<NewAircraft />} />
              <Route path=":aircraft_id" element={<AircraftDetails />} />
            </Route>

            {/* <Route path="part" element={<SparePartsLayout />}>
              <Route index element={<SparePartList />} />
              <Route path="new" element={<h1>New Part</h1>} />
              <Route path=":part_id" element={<h1>Spare Part Details</h1>} />
            </Route> */}

            {/* 
            <Route path="warehouse" element={<WarehouseLayout />}>
              <Route index element={<WarehousesList />} />
              <Route path="new" element={<h1>New WareHouse</h1>} />
              <Route path=":warehouse_id" element={<WarehouseDetails />}>
                <Route path="info" element={<h1>Warehouse Details Will Be Here</h1>} />
                <Route path="items">
                  <Route index element={<WarehouseItems />} />
                  <Route path="new" element={<h1>New Spare Part</h1>} />
                  <Route path=":part_id" element={<h1>Spare Part Details</h1>} />
                </Route>
                <Route path="locations">
                  <Route index element={<h1>Locations View</h1>} />
                  <Route path="new" element={<h1>New Location</h1>} />
                  <Route path=":part_id" element={<h1>Spare Part Details</h1>} />
                </Route>
              </Route>
            </Route>

            <Route path="fleet" element={<FleetLayout />}>
              <Route index element={<AircraftList />} />
              <Route path="new" element={<h1>New Aircraft</h1>} />
              <Route path=":part_id" element={<h1>Spare Part Details</h1>} />
            </Route>

            <Route path="manufacturer">
              <Route index element={<ManufacturerList />} />
              <Route path="new" element={<NewManufacturer />} />
              <Route path=":manufacturer_id" element={<ManufacturerDetails />} />
            </Route>

            <Route path="planning" element={<PlanningLayout />}>
              <Route index element={<h1>Planning Dashboard</h1>} />
            </Route> */}
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="403" element={<Page403 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
}
