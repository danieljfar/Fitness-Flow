# AI-First Workflow (AGENTS.md)

Este proyecto ha sido desarrollado bajo una filosofía **AI-first**, utilizando **GitHub Copilot** como copiloto de arquitectura y programación para maximizar la calidad técnica y la velocidad de entrega.

## Uso Estratégico de GitHub Copilot

La IA no se utilizó solo para generar código, sino como un consultor técnico en los siguientes hitos:

### 1. Diseño de Arquitectura y Concurrencia
Se definieron instrucciones personalizadas (`.github/copilot-instructions.md`) para asegurar que la IA respetara el patrón **Controller-Service-Repository** y, lo más importante, la implementación de **Pessimistic Locking**. Esto garantizó que el motor de reservas fuera resistente a condiciones de carrera desde la primera línea de código.

### 2. Automatización de Pruebas (TDD Asistido)
Se utilizó Copilot para:
* Generar **Mocks** de Sequelize, permitiendo probar la lógica de negocio de forma aislada.
* Crear suites de pruebas unitarias en **Jest** para cubrir casos de borde (ej. intentos de reserva cuando el cupo llega exactamente a cero).
* Estructurar pruebas de integración que validan el flujo completo de la API.

### 3. Infraestructura y Dockerización
La configuración de la red entre contenedores (Backend, Frontend y MySQL) y la persistencia de volúmenes en `docker-compose.yml` fue optimizada mediante el análisis de agentes, asegurando un entorno de desarrollo reproducible y ligero.

### 4. Refactorización y Clean Code
Cada módulo crítico pasó por una revisión asistida para detectar posibles fugas de memoria en los WebSockets (`socket.io`) y asegurar que los esquemas de validación de datos fueran robustos.

## Impacto en el Proyecto
* **Eficiencia**: Reducción del tiempo de creación de *boilerplate* en un 50%, permitiendo mayor foco en la lógica de transacciones críticas.
* **Robustez**: Implementación inmediata de estándares de seguridad y buenas prácticas de SQL que suelen obviarse en desarrollos rápidos.
* **Consistencia**: Uniformidad total en el estilo de código y la estructura de carpetas.

---
*Este documento certifica que el desarrollador domina las herramientas de IA generativa para elevar el estándar de ingeniería de software.*