# Fitness Flow - High Concurrency Reservation Engine

Sistema integral de gestión de reservas diseñado para entornos de alta demanda. Este motor de reservas prioriza la consistencia de datos, la escalabilidad mediante contenedores y el manejo de concurrencia masiva.

## Visión del Proyecto
El objetivo es resolver el desafío técnico de permitir que múltiples usuarios intenten reservar cupos limitados simultáneamente. El sistema garantiza que nunca se exceda la capacidad disponible y que cada transacción se procese de forma atómica y segura.

## Arquitectura del Sistema
El proyecto está completamente Dockerizado para garantizar un entorno de desarrollo consistente y facilitar el despliegue:

* **Frontend**: Aplicación cliente (React) contenida en un entorno aislado.
* **Backend**: API REST construida con Node.js, encargada de la lógica de negocio y transacciones.
* **Database**: Instancia de MySQL optimizada para persistencia de datos relacionales.

## Stack Tecnológico & Librerías
Se han implementado librerías clave para demostrar un dominio avanzado del ecosistema JavaScript y bases de datos:

1. **`express`**: Framework para la construcción de la API.
2. [cite_start]**`sequelize`**: ORM para gestionar la persistencia en MySQL e implementar transacciones ACID[cite: 130, 136, 141].
3. [cite_start]**`jsonwebtoken`**: Estándar para la protección de rutas y gestión de sesiones de usuario[cite: 128].
4. [cite_start]**`socket.io`**: Comunicación bidireccional en tiempo real para actualizaciones de disponibilidad[cite: 139].
5. [cite_start]**`moment`**: Manejo preciso de tiempos, validaciones de horarios y expiración de cupos[cite: 209].

## Desafíos Técnicos Resueltos
* **Gestión de Concurrencia (Race Conditions)**: Implementación de bloqueos a nivel de fila (`FOR UPDATE`) para evitar el overbooking.
* **Transacciones Atómicas**: Uso de transacciones de base de datos para asegurar que la asignación de cupos y registros asociados ocurran como una unidad indivisible.
* **Infraestructura como Código**: Orquestación de servicios mediante Docker Compose.

## Instalación y Despliegue con Docker
El único requisito previo es tener instalado **Docker** y **Docker Compose**.

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repo>