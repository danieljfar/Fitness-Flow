# AI-First Workflow (AGENTS.md)

Este proyecto ha sido desarrollado bajo una filosofía **AI-first**, utilizando **GitHub Copilot** como copiloto de arquitectura y programación para maximizar la calidad técnica y la velocidad de entrega.

## Uso Estratégico de GitHub Copilot

La IA no se utilizó solo para generar código, sino como un consultor técnico en los siguientes hitos:

### 1. Diseño de Arquitectura y Concurrencia
Se definieron instrucciones personalizadas ([.github/copilot-instructions.md](.github/copilot-instructions.md)) para asegurar que la IA respetara el patrón **Controller-Service-Repository** y la implementación de **Pessimistic Locking** con transacciones Sequelize en operaciones de reserva. Esto volvió el motor robusto frente a condiciones de carrera.

### 2. Dominio de Creditos y Reglas de Integridad
Copilot se utilizó para consolidar la capa de créditos como parte del flujo transaccional:

- Consumo de 1 crédito por reserva activa.
- Reembolso de 1 crédito al cancelar una reserva.
- Reembolso masivo al cancelar una clase desde admin.
- Sincronización de frontend para reflejar saldo actualizado tras mutaciones (incluyendo refresh de /api/auth/me).

### 3. Automatizacion de Pruebas (TDD Asistido)
Se utilizó Copilot para:

- Generar **mocks** de repositorios y dependencias de base de datos para aislar servicios.
- Crear suites unitarias con **Vitest** para reglas de negocio y permisos.
- Estructurar pruebas de integración con **Supertest** para validar endpoints y contratos de API.

### 4. Infraestructura, Docker y Entorno Reproducible
La configuración de la red entre contenedores (Backend, Frontend y MySQL) y la persistencia de volúmenes en `docker-compose.yml` fue optimizada mediante el análisis de agentes, asegurando un entorno de desarrollo reproducible y ligero.

Además, se incorporó Redis como dependencia operativa para cache backend y se normalizó el uso de variables de entorno para API y websocket.

### 5. Realtime, Cache y Mantenibilidad
Cada módulo crítico pasó por revisión asistida para:

- Preservar compatibilidad de eventos realtime (class_updated y slot_updated).
- Mantener invalidación de cache Redis en mutaciones de entidades administrativas.
- Evitar regresiones al coexistir rutas alias /api/bookings y /api/reservations.

## Impacto en el Proyecto

- **Eficiencia**: Menor tiempo de implementación en capas repetitivas (controllers, servicios, repositorios, pruebas).
- **Robustez**: Reglas transaccionales de reservas y créditos aplicadas de forma consistente.
- **Consistencia**: Alineación entre backend, frontend y documentación técnica.
- **Escalabilidad**: Mejor base para evolución de panel admin, métricas y operaciones de crédito.

## Estado Tecnico Resumido

- Backend ESM Node.js 24+ con Express, Sequelize, MySQL, Redis, JWT y Socket.IO.
- Frontend React + Vite con vistas de cliente y admin.
- Documentación OpenAPI publicada en /docs y /docs.json.
- Pruebas con Vitest y Supertest.

---
*Este documento certifica que el desarrollador domina las herramientas de IA generativa para elevar el estándar de ingeniería de software.*