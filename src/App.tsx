import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/custom/signin';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Account from './pages/Account';

export default function App() {
  return (
    <Routes>
      {/* Routes without Layout */}
      <Route path="/signin" element={<Signin />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}