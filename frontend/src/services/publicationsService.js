import apiClient from './apiClient.js';

// Obtiene publicaciones aplicando filtros opcionales desde el backend
export async function fetchPublications(filters = {}) {
  const { data } = await apiClient.get('/publications', { params: filters });
  return data;
}

// Envía al backend la información de una nueva publicación
export async function createPublication(payload) {
  const { data } = await apiClient.post('/publications', payload);
  return data;
}

// Actualiza una publicación existente identificada por su id
export async function updatePublication(id, payload) {
  const { data } = await apiClient.put(`/publications/${id}`, payload);
  return data;
}

// Elimina una publicación utilizando su id
export async function deletePublication(id) {
  const { data } = await apiClient.delete(`/publications/${id}`);
  return data;
}

// Solicita al backend un archivo Excel generado al vuelo
export async function exportPublications(filters = {}) {
  const response = await apiClient.get('/publications/export', {
    params: filters,
    responseType: 'blob'
  });
  return response.data;
}
