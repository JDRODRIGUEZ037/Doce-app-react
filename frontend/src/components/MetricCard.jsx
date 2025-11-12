import React from 'react';

// Tarjeta resumen con animación de entrada y gradiente morado
export default function MetricCard({ title, value, trend, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-6 bg-white/10 border border-white/5 shadow-xl shadow-primary/20 transition transform hover:-translate-y-1">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/30 transition-opacity" />
      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-sm text-secondary/70">{title}</p>
          <p className="text-3xl font-semibold mt-1">{value}</p>
          <p className="text-xs mt-2 text-accent">{trend}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </div>
  );
}
