import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Formulario reutilizable para crear o actualizar publicaciones
export default function PublicationForm({ defaultValues, onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues || {
      content: '',
      imageUrl: '',
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0
    }
  });

  // Sincroniza el formulario cada vez que cambian los valores por defecto
  useEffect(() => {
    reset(
      defaultValues || {
        content: '',
        imageUrl: '',
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
      }
    );
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white/10 rounded-3xl border border-white/10"
    >
      <div>
        <label className="block text-sm text-secondary/70 mb-1">Contenido</label>
        <textarea
          {...register('content', { required: true })}
          className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          rows="3"
          placeholder="¿Qué quieres contar hoy?"
        />
      </div>

      <div>
        <label className="block text-sm text-secondary/70 mb-1">URL de imagen</label>
        <input
          {...register('imageUrl')}
          className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-secondary/70 mb-1">Likes</label>
          <input
            type="number"
            {...register('totalLikes', { valueAsNumber: true })}
            className="w-full p-3 rounded-2xl bg-white/5 border border-white/10"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary/70 mb-1">Comentarios</label>
          <input
            type="number"
            {...register('totalComments', { valueAsNumber: true })}
            className="w-full p-3 rounded-2xl bg-white/5 border border-white/10"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary/70 mb-1">Compartidos</label>
          <input
            type="number"
            {...register('totalShares', { valueAsNumber: true })}
            className="w-full p-3 rounded-2xl bg-white/5 border border-white/10"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold shadow-lg shadow-primary/40"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
