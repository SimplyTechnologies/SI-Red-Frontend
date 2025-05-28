import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom"; // Import Outlet

export default function Layout() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Header />
        <main className="flex-1 overflow-auto p-0 bg-main-bg">
          <Outlet /> {/* Render child routes here */}
        </main>
      </div>
    </div>
  );
}
