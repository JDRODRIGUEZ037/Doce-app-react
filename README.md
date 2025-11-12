# Doce Marketing Suite

Aplicación full-stack para gestionar campañas de marketing con panel morado, autenticación por roles y exportación a Excel.

## Requisitos previos

- Node.js >= 18
- MySQL 8.x o compatible

## Configuración del backend

1. Copia el archivo `.env.example` ubicado en `backend/` a `.env` y ajusta las variables según tu entorno.
2. Ejecuta el script `database/dummy_data.txt` en tu base de datos para cargar los datos de ejemplo y el trigger requerido.
3. Instala las dependencias con `npm install` dentro de la carpeta `backend/`.
4. Inicia el servidor con `npm run dev` (puerto por defecto: `4000`).

### Endpoints principales

- `POST /api/auth/login` — Inicia sesión con uno de los usuarios de ejemplo (`ana@doce.com / admin123`, etc.).
- CRUD completos para `/api/publications`, `/api/customers`, `/api/products`, `/api/branches`.
- `GET /api/publications/export` — Devuelve un Excel con los filtros aplicados.

El trigger `trg_publications_update_audit` se asegura de registrar en `audit_log` cualquier actualización hecha desde la aplicación.

## Configuración del frontend

1. Dentro de `frontend/` instala dependencias con `npm install`.
2. Crea un archivo `.env` en `frontend/` si necesitas apuntar a un backend remoto (`VITE_API_URL=http://localhost:4000/api`).
3. Ejecuta `npm run dev` para levantar el panel en `http://localhost:5173`.

El frontend incluye animaciones suaves, paleta morada y componentes reutilizables para métricas, filtros y tablas. Usa React Router, React Query y TailwindCSS (sin necesidad de configurar nada adicional).

## Notas adicionales

- Las contraseñas de los usuarios demo se guardan en texto plano solo para fines de prueba. Ajusta el registro de usuarios a hashing antes de ir a producción.
- El archivo `database/dummy_data.txt` también reinicia tablas clave; ejecuta el script solo en entornos controlados.
- Los permisos (`can_create`, `can_update`, etc.) se consumen directamente desde el frontend para habilitar o deshabilitar acciones en tiempo real.
