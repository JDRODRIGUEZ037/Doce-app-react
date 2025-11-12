import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import FilterBar from '../components/FilterBar.jsx';
import PublicationForm from '../components/PublicationForm.jsx';
import PublicationTable from '../components/PublicationTable.jsx';
import useAuth from '../hooks/useAuth.js';
import {
  createPublication,
  deletePublication,
  exportPublications,
  fetchPublications,
  updatePublication
} from '../services/publicationsService.js';
import downloadBlob from '../utils/downloadBlob.js';

// Vista principal para gestionar publicaciones de redes
export default function Publications() {
  const { hasPermission } = useAuth();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({});
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['publications', filters],
    queryFn: () => fetchPublications(filters),
    placeholderData: { items: [], meta: { total: 0 } }
  });

  const createMutation = useMutation({
    mutationFn: createPublication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      setEditing(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updatePublication(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      setEditing(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePublication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
    }
  });

  const isSaving = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending]
  );

  const handleSubmit = async (formValues) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.publication_id, payload: formValues });
    } else {
      await createMutation.mutateAsync(formValues);
    }
  };

  const handleExport = async () => {
    const blob = await exportPublications(filters);
    downloadBlob(blob, 'publicaciones.xlsx');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Publicaciones</h2>
          <p className="text-secondary/70">Gestiona tu contenido y exporta reportes personalizados.</p>
        </div>
        {hasPermission('can_export') && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-secondary to-primary font-semibold shadow-lg shadow-secondary/40"
          >
            <Download className="w-4 h-4" />
            Exportar a Excel
          </button>
        )}
      </header>

      <FilterBar onFilter={setFilters} />

      {hasPermission('can_create') && (
        <PublicationForm
          defaultValues={editing
            ? {
                content: editing.content,
                imageUrl: editing.image_url,
                totalLikes: editing.total_likes,
                totalComments: editing.total_comments,
                totalShares: editing.total_shares
              }
            : undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Listado</h3>
          <span className="text-sm text-secondary/70">{data?.meta?.total} publicaciones</span>
        </div>

        {isLoading ? (
          <p className="text-secondary/60">Cargando publicaciones...</p>
        ) : (
          <PublicationTable
            items={data?.items || []}
            onEdit={(item) => setEditing(item)}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        )}
      </section>

      {isSaving && <p className="text-sm text-secondary/70">Guardando cambios...</p>}
    </div>
  );
}
