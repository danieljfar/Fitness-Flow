# Fitico

Motor de reservas fitness con enfoque en concurrencia, integridad transaccional y UX en tiempo real.

Stack principal:

- Backend: Node.js 24+, Express, Sequelize, MySQL, Redis, JWT, Socket.IO.
- Frontend: React 18 + Vite + React Bootstrap + Socket.IO client.
- Infra local: Docker Compose con servicios db, redis, backend y frontend.

## Arquitectura

- [backend](backend): API REST ESM con patrón Controller-Service-Repository.
- [frontend](frontend): SPA para miembros y panel admin.
- [docker-compose.yml](docker-compose.yml): entorno reproducible para desarrollo.

El dominio canónico de agenda/reservas es Class. Slot solo se mantiene como evento de compatibilidad en realtime.

## Capacidades actuales

- Autenticación JWT con endpoints de registro, login y perfil.
- Reservas con transacciones Sequelize y bloqueo pesimista (SELECT FOR UPDATE).
- Gestión de créditos por usuario:
	- Reservar consume 1 crédito.
	- Cancelar una reserva devuelve 1 crédito.
	- Cancelar una clase desde admin devuelve créditos a todas las reservas activas.
- Dashboard y operación admin:
	- Métricas agregadas.
	- CRUD de instructores y clases.
	- Listado de reservas por clase.
	- Creación/cancelación de reservas por admin.
	- Búsqueda de usuarios y actualización de créditos (add, subtract, set, delete).
- Cache Redis para instructores destacados con invalidación en mutaciones.
- Realtime por Socket.IO:
	- Eventos class_updated y slot_updated.
	- Frontend refresca clases, reservas y datos de usuario autenticado tras cambios.

## Requisitos

- Node.js >=24 <26
- Docker + Docker Compose

## Variables de entorno

Plantillas disponibles:

- [.env.example](.env.example)
- [backend/.env.example](backend/.env.example)
- [frontend/.env.example](frontend/.env.example)

Variables backend clave:

- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
- DB_SYNC_ALTER
- PORT
- JWT_SECRET
- CORS_ORIGIN
- REDIS_URL

Variables frontend clave:

- VITE_API_URL
- VITE_SOCKET_URL

## Ejecucion local

### Opcion 1: Docker (recomendada)

```bash
docker compose up -d --build
```

Servicios por defecto:

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Swagger UI: http://localhost:4000/docs
- OpenAPI JSON: http://localhost:4000/docs.json

### Opcion 2: Manual

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Scripts utiles

Backend ([backend/package.json](backend/package.json)):

- npm run start
- npm run dev
- npm run migrate
- npm run test

Frontend ([frontend/package.json](frontend/package.json)):

- npm run dev
- npm run build
- npm run preview

## API principal

Public/Auth:

- GET /health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/classes
- GET /api/classes/featured-instructors

Reservas (requiere JWT):

- GET /api/reservations/me
- POST /api/reservations
- DELETE /api/reservations/:id

Alias legacy/compatibilidad:

- /api/bookings/me
- /api/bookings
- /api/bookings/:id

Admin (requiere JWT + role admin):

- GET /api/admin/dashboard
- GET|POST|PATCH|DELETE /api/admin/instructors
- GET|POST|PATCH|DELETE /api/admin/classes
- GET /api/admin/classes/:classId/reservations
- POST /api/admin/classes/:classId/reservations
- DELETE /api/admin/reservations/:reservationId
- GET /api/admin/users
- POST /api/admin/credits/assign
- PATCH /api/admin/credits/:userId

## Testing

- Framework: Vitest
- Unit tests en servicios/controladores con mocks
- Integration tests con Supertest para endpoints y flujo API

## Notas de dominio

- Todas las operaciones de reserva/cancelacion deben ser atomicas.
- No introducir nuevas entidades Slot en backend; usar Class como entidad canónica.
- Cualquier cambio que afecte saldo de créditos debe mantener sincronizado el user del frontend.