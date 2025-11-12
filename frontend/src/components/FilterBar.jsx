import React from 'react';
import { Controller, useForm } from 'react-hook-form';

// Barra de filtros que permite enviar parámetros dinámicos al backend
export default function FilterBar({ onFilter }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      search: '',
      minLikes: '',
      maxLikes: ''
    }
  });

  const submit = handleSubmit((values) => {
    onFilter({
      search: values.search || undefined,
      minLikes: values.minLikes || undefined,
      maxLikes: values.maxLikes || undefined
    });
  });

  return (
    <form
      onSubmit={submit}
      className="flex flex-col md:flex-row gap-4 p-4 bg-white/5 rounded-3xl border border-white/10"
    >
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <input
            {...field}
            placeholder="Buscar por contenido"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/10"
          />
        )}
      />
      <Controller
        control={control}
        name="minLikes"
        render={({ field }) => (
          <input
            {...field}
            type="number"
            placeholder="Likes mínimos"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/10"
          />
        )}
      />
      <Controller
        control={control}
        name="maxLikes"
        render={({ field }) => (
          <input
            {...field}
            type="number"
            placeholder="Likes máximos"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/10"
          />
        )}
      />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            reset();
            onFilter({});
          }}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-secondary to-primary font-semibold"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
