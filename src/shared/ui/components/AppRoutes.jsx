import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Loader";

export default function AppRoutes() {
  const MainLayout = lazy(() => import("../layouts/MainLayout"));
  const LoginPage = lazy(() => import("../pages/LoginPage"));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}
