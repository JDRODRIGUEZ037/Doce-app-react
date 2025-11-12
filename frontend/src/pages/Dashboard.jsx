import React from 'react';
import { Activity, PieChart, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard.jsx';
import CampaignCard from '../components/CampaignCard.jsx';

// Información ficticia para alimentar la interfaz mientras se conecta al backend
const campaigns = [
  {
    id: 1,
    name: 'Campaña Primavera',
    status: 'Activa',
    description: 'Impulsa la venta de productos florales con influencers locales.',
    reach: '120K',
    budget: 3500000
  },
  {
    id: 2,
    name: 'Lanzamiento Nueva Línea',
    status: 'Planeada',
    description: 'Prepara el lanzamiento de la nueva línea de skincare con expectativa en redes.',
    reach: '95K',
    budget: 5400000
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Engagement promedio" value="5.4%" trend="▲ 12% vs mes anterior" icon={TrendingUp} />
        <MetricCard title="Campañas activas" value="8" trend="3 campañas en fase de prueba" icon={Activity} />
        <MetricCard title="Inversión mensual" value="$12.4M" trend="Presupuesto optimizado" icon={PieChart} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Campañas destacadas</h2>
            <p className="text-secondary/70">Monitorea el desempeño y estado de tus iniciativas.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}
