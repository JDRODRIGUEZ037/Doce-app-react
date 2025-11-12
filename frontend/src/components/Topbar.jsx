import React from 'react';
import { Bell, Search } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';

// Cabecera que muestra al usuario activo y un cuadro de búsqueda ficticio
export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="px-6 py-5 flex items-center justify-between border-b border-white/10 bg-white/10">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-5 h-5 text-secondary absolute left-3 top-3" />
          <input
            className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/40"
            placeholder="Buscar campañas, clientes o publicaciones"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full bg-white/10 hover:bg-secondary/30 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
        </button>
        <div className="text-right">
          <p className="text-sm text-secondary/80">Bienvenido</p>
          <p className="text-lg font-semibold">{user?.fullName || 'Equipo de Marketing'}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center font-bold">
          {user?.initials || 'DM'}
        </div>
      </div>
    </header>
  );
}
