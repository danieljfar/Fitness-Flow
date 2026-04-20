# Copilot Project Instructions: Fitico Engine

You are an expert Senior Full Stack Developer. Act as a pair programmer for this Reservation Engine project.

## General Principles
- **Clean Architecture**: Maintain strict separation between Domain (Core), Infrastructure, and Interfaces.
- **DRY & SOLID**: Prioritize maintainability and reusability.
- **Language**: Use ES Modules (ESM) and clean JavaScript/Node.js v24+ standards.
- **Project Pattern**: Keep Controller-Service-Repository boundaries explicit.
- **Canonical Domain**: `Class` is the canonical schedulable/bookable entity. Do not introduce new `Slot` models.

## Backend (Node.js + Express + Sequelize)
- **Concurrency Control**: ALL booking operations MUST use Sequelize Transactions.
- **Pessimistic Locking**: Use `lock: Transaction.LOCK.UPDATE` (SELECT FOR UPDATE) when checking slot availability to prevent race conditions.
- **Atomic Operations**: Ensure that slot decrement and booking creation are part of the same atomic transaction.
- **Error Handling**: Use centralized error middleware and meaningful HTTP status codes.
- **Credits Integrity**:
	- Reserving a class must consume exactly 1 credit.
	- Cancelling a reservation must refund exactly 1 credit.
	- Admin class cancellation must refund all active reservations in the same transaction.
- **Backward Compatibility**: Keep both `/api/reservations/*` and `/api/bookings/*` aliases working unless explicitly removed by a migration plan.
- **Realtime Events**: Emit `class_updated` and preserve `slot_updated` compatibility when relevant occupancy/status changes happen.
- **Caching**: If changing instructor/class data flows, ensure Redis cache invalidation remains correct for featured/admin lists.

## Frontend (React)
- **Functional Components**: Use Hooks (useState, useEffect, useCallback) for state management.
- **Real-time**: Use `socket.io-client` to listen for 'slot_updated' events and update the UI without page refreshes.
- **State Consistency**: After reservation mutations (create/cancel), refresh both reservations and authenticated user data (`/api/auth/me`) so credits stay in sync.
- **Admin UX**: Preserve working flows for class/instructor CRUD, class reservations, and credits management.

## Testing Standards
- **Framework**: Use Vitest.
- **Unit Tests**: Mock the database layer to test business logic in services.
- **Integration Tests**: Use Supertest to verify API endpoints and real database transactions.
- **Coverage Priorities**:
	- Transactional booking + credit consumption
	- Reservation/class cancellation + credit refund
	- Authorization boundaries (`member` vs `admin`)

## Docker
- Always consider that the app runs in a containerized environment (MySQL host is 'db').
- Redis is available as service `redis` and backend should use `REDIS_URL=redis://redis:6379` in Compose.