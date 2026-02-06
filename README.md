# Sistema de Gestión Web - Constructora Andina SpA

## 📄 Resumen Ejecutivo
Este proyecto consiste en una plataforma web centralizada bajo arquitectura MVC, diseñada para resolver la problemática de gestión de inventario en las obras de **Constructora Andina SpA**. El sistema digitaliza los procesos de bodegaje, permitiendo trazabilidad completa de entradas, asignaciones a trabajadores y control de mermas.

## 🎯 Objetivos del Proyecto
El objetivo principal es garantizar la trazabilidad del **100% del ciclo de vida de los materiales** en obra.

### Objetivos Específicos:
1.  **Digitalizar Entradas:** Registro automatizado de stock mediante guías de despacho.
2.  **Controlar Asignaciones:** Sistema de "Cargo y Descargo" digital vinculado al trabajador.
3.  **Gestionar Mermas:** Tipificación de pérdidas (Robo, Daño, Vencimiento) para reportes de gestión.
4.  **Reportabilidad:** Dashboards para la toma de decisiones gerenciales.

## 🛠️ Arquitectura Técnica
El sistema opera bajo un modelo Cliente-Servidor desacoplado:

*   **Frontend (Cliente):** Desarrollado con **React.js** y **Vite**, utilizando **TailwindCSS** para una interfaz moderna y responsiva.
*   **Backend (Servidor):** API RESTful construida con **Node.js** y **Express**.
*   **Base de Datos:** **SQLite** (Modelo Relacional) para persistencia de datos y fácil despliegue local.
*   **Seguridad:** Arquitectura preparada para autenticación JWT y control de acceso basado en roles (RBAC).

## 🚀 Instalación y Despliegue Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

### 1. Prerrequisitos
*   Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
*   Git instalado.

### 2. Clonar el repositorio
```bash
git clone https://github.com/cielostone/ConstructoraAndina.git
cd ConstructoraAndina
```

### 3. Configurar y Ejecutar el Backend
```bash
cd server
npm install
npm start
```
*El servidor iniciará en `http://localhost:3001` y la base de datos se sembrará automáticamente con datos de prueba.*

### 4. Configurar y Ejecutar el Frontend
En una nueva terminal:
```bash
cd client
npm install
npm run dev
```
*La aplicación estará disponible en `http://localhost:5173`.*

## 👥 Credenciales de Prueba (Seed Data)
El sistema viene precargado con los siguientes usuarios para pruebas:

| Rol | Usuario | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `password123` | Gestión total y configuración. |
| **Bodeguero** | `bodeguero` | `user123` | Registro de movimientos (Input/Output). |
| **Supervisor** | `supervisor` | `user123` | Visualización de reportes y validación. |

## 📂 Estructura del Proyecto
```
/client       # Código fuente del Frontend (React + Vite)
/server       # Código fuente del Backend (Node + Express)
/database     # Archivos de base de datos SQLite
```
