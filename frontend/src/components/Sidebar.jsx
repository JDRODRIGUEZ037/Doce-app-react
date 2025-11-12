import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, ClipboardList, Home, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';

// Item reutilizable de la barra lateral con animación al pasar el cursor
function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-secondary/30 text-white shadow-lg shadow-secondary/40'
            : 'text-secondary/70 hover:text-white hover:bg-secondary/20'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

// Barra lateral con branding y navegación contextual
export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 py-10 px-6 border-r border-white/10 bg-white/5">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-widest text-secondary/80">Doce Marketing</p>
        <h1 className="text-3xl font-display font-semibold text-white">Panel Estratégico</h1>
      </div>

      <nav className="flex flex-col gap-2 mt-6">
        <SidebarItem to="/dashboard" icon={Home} label="Resumen" />
        <SidebarItem to="/dashboard/campanas" icon={BarChart2} label="Campañas" />
        <SidebarItem to="/dashboard/publicaciones" icon={ClipboardList} label="Publicaciones" />
      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition"
      >
        <LogOut className="w-5 h-5" />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
