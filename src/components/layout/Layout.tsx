import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Header />
        <main className="flex-1 overflow-auto p-0 bg-main-bg">{children}</main>
      </div>
    </div>
  );
}
