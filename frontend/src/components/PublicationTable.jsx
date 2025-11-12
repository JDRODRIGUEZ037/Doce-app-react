import React from 'react';
import { Edit, Share2, ThumbsUp, Trash2 } from 'lucide-react';
import useAuth from '../hooks/useAuth.js';

// Tabla de publicaciones con acciones condicionadas por permisos
export default function PublicationTable({ items, onEdit, onDelete }) {
  const { hasPermission } = useAuth();

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/10 text-left text-secondary/70 uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-4">Contenido</th>
            <th className="px-6 py-4">Engagement</th>
            <th className="px-6 py-4">Actualizado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {items.map((item) => (
            <tr key={item.publication_id} className="hover:bg-white/10 transition">
              <td className="px-6 py-4">
                <p className="font-medium text-white max-w-xl whitespace-pre-wrap">{item.content}</p>
                {item.image_url && (
                  <p className="text-xs text-secondary/60 mt-1">Imagen: {item.image_url}</p>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4 text-sm text-secondary/70">
                  <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {item.total_likes}</span>
                  <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> {item.total_shares}</span>
                  <span>{item.total_comments} comentarios</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-secondary/60">
                {new Date(item.updated_at).toLocaleString('es-CO')}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3">
                  {hasPermission('can_update') && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {hasPermission('can_delete') && (
                    <button
                      onClick={() => onDelete(item.publication_id)}
                      className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
