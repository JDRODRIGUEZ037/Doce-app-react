import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

// Layout principal con barra lateral y cabecera animada
export default function Layout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-dark via-purple-950 to-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col backdrop-blur-sm bg-white/5">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-purple">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
