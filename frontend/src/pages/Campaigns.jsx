import React from 'react';
import CampaignCard from '../components/CampaignCard.jsx';

// Página simple que reutiliza tarjetas de campañas ficticias
const mockCampaigns = [
  {
    id: 101,
    name: 'Awareness Instagram',
    status: 'Activa',
    description: 'Secuencia de stories patrocinados con embajadores.',
    reach: '80K',
    budget: 2500000
  },
  {
    id: 102,
    name: 'Email Reactivación',
    status: 'Optimización',
    description: 'Serie de correos segmentados a clientes inactivos.',
    reach: '32K',
    budget: 1200000
  },
  {
    id: 103,
    name: 'Ads TikTok',
    status: 'Planeada',
    description: 'Contenido nativo con creadores de la generación Z.',
    reach: '65K',
    budget: 3100000
  }
];

export default function Campaigns() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-semibold">Campañas</h2>
        <p className="text-secondary/70">Gestiona las iniciativas activas y planeadas.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
