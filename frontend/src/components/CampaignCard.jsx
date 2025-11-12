import React from 'react';

// Tarjeta descriptiva para visualizar campañas ficticias
export default function CampaignCard({ campaign }) {
  return (
    <article className="p-6 rounded-3xl bg-white/10 border border-white/5 hover:border-secondary/40 transition">
      <header className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{campaign.name}</h3>
        <span className="px-3 py-1 rounded-full bg-secondary/20 text-sm">{campaign.status}</span>
      </header>
      <p className="text-secondary/70 mt-3">{campaign.description}</p>
      <footer className="mt-4 flex items-center justify-between text-sm text-secondary/60">
        <span>Alcance: {campaign.reach}</span>
        <span>Presupuesto: ${campaign.budget.toLocaleString('es-CO')}</span>
      </footer>
    </article>
  );
}
