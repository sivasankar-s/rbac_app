import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row md:h-screen ">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto h-screen bg-zinc-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
