# 🍔 FastEat – CRUD Full Stack

FastEat es una aplicación **Full Stack** desarrollada como proyecto de práctica, que permite gestionar **clientes y pedidos** de un negocio gastronómico de manera simple y ordenada.

El objetivo del proyecto fue integrar un **backend en Java con Spring Boot** y un **frontend moderno en React**, aplicando buenas prácticas, separación de responsabilidades y una experiencia de usuario clara.

---

## 🚀 Tecnologías utilizadas

### Backend
- **Java 17**
- **Spring Boot**
- Spring Web
- Spring Data JPA
- **H2 (base de datos en memoria)** para desarrollo
- DTOs para transferencia de datos
- Manejo de errores con `ResponseStatusException`

### Frontend
- **React** (Vite)
- **Material UI (MUI)**
- React Router DOM
- Axios
- Componentes reutilizables
- Snackbar y diálogos de confirmación

---

## 📦 Funcionalidades

### 👤 Clientes
- Listado de clientes
- Crear cliente
- Editar cliente
- Eliminar cliente (con confirmación)
- Búsqueda por nombre y apellido
- Notificaciones visuales (Snackbar)

### 📋 Pedidos
- Crear pedidos asociados a un cliente
- Listado de pedidos
- Filtro por descripción o cliente
- Eliminación de pedidos
- Relación Cliente ↔ Pedidos correctamente modelada

### 🧭 Navegación
- Navbar persistente
- Rutas protegidas por layout
- Página **404 – Not Found** para rutas inexistentes

---

## 🗂️ Estructura del proyecto

### Backend
src/main/java/com/backend
├── Controllers
├── Services
├── Repositories
├── Entities
├── DTOs


### Frontend
src
├── api
├── components
│ ├── clientes
│ ├── pedidos
│ └── common
├── pages
└── App.jsx

---

## 🔗 Comunicación Frontend – Backend

- Axios configurado con baseURL
- CORS habilitado en el backend
- Intercambio de datos mediante DTOs
- Manejo de errores y estados de carga

---

## 🧪 Base de datos

Durante el desarrollo se utiliza **H2 en memoria**, lo que permite:
- Levantar el proyecto sin dependencias externas
- Visualizar datos desde la consola H2
- Facilitar pruebas y debugging

> El proyecto está preparado para migrar fácilmente a PostgreSQL u otra base de datos.

---

## ▶️ Cómo ejecutar el proyecto

### Backend
1. Abrir el proyecto en IntelliJ
2. Ejecutar la clase principal de Spring Boot
3. Backend disponible en: http://localhost:8080


### Frontend
1. npm install
2. npm run dev
3. Backend disponible en: http://localhost:5173