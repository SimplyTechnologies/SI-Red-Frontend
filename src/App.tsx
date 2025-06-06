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

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/account-activation" element={<AccountActivation />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/account" element={<Account />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
