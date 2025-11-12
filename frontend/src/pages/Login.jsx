import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth.js';

// Pantalla de inicio de sesión con animaciones suaves
export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login, loading, error } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-primary/40 to-dark p-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-lg shadow-2xl">
        <h2 className="text-3xl font-display font-semibold text-center">Doce Marketing</h2>
        <p className="text-secondary/70 text-center mt-2">Ingresa tus credenciales para continuar</p>

        <form
          onSubmit={handleSubmit(login)}
          className="mt-8 space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm text-secondary/70">Correo electrónico</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/40"
              placeholder="usuario@doce.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-secondary/70">Contraseña</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/40"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-secondary font-semibold shadow-lg shadow-primary/40 disabled:opacity-60"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
