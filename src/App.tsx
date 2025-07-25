import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/custom/signin/signin";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Account from "./pages/Account";
import VehicleDetails from "./components/custom/vehicles/VehiclesDetails/VehicleDetails";
import AccountActivation from "./pages/AccountActivation";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import PublicOnlyRoute from "./components/layout/PublicOnlyRoute";
import { USER_ROLE } from "./constants/constants";
import Roles from "./lib/roles";
import VehicleFilters from "./pages/VehicleFilters";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const role = Roles();

  useEffect(() => {
    if (location.pathname === "/reset-password") {
      useAuthStore.getState().logout();
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/activate" element={<AccountActivation />} />
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <Signin variant="signin" />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicOnlyRoute>
            <Signin variant="reset" />
          </PublicOnlyRoute>
        }
      />

      <Route
        element={
          <ProtectedLayout>
            <Layout />
          </ProtectedLayout>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/filters" element={<VehicleFilters />} />
        <Route
          path="/users"
          element={
            role === USER_ROLE.SUPER_ADMIN ? <Users /> : <Navigate to="/" />
          }
        />
        <Route path="/customers" element={<Customers />} />
        <Route path="/account" element={<Account />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
