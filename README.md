# 📚 Library Management System

Sistema de gestión de biblioteca desarrollado con Angular 21 y ASP.NET Core.

## 🚀 Descripción

Library Management System es una aplicación web que permite administrar:

- Autores
- Categorías
- Libros
- Lectores
- Préstamos
- Usuarios

La aplicación consume una API REST protegida mediante JWT y utiliza una arquitectura basada en componentes standalone.

---

## 🛠 Tecnologías Utilizadas

### Frontend

- Angular 21
- TypeScript
- Signals
- Reactive Forms
- Angular Router
- HttpClient
- Standalone Components
- SweetAlert2
- SCSS

### Backend

- ASP.NET Core
- Entity Framework Core
- SQL Server
- JWT Authentication

---

## ✨ Funcionalidades

### 🔐 Seguridad

- Login mediante JWT
- Auth Guard
- Admin Guard
- Role Guard
- Auth Interceptor
- Control de acceso por roles

### 👤 Usuarios

- Listado paginado
- Registro
- Edición
- Eliminación lógica
- Protección del último administrador

### ✍️ Autores

- Listado
- Detalle
- Registro
- Edición
- Eliminación

### 🏷️ Categorías

- Listado
- Detalle
- Registro
- Edición
- Eliminación

### 📖 Libros

- Listado paginado
- Registro
- Edición
- Detalle
- Eliminación

### 👥 Lectores

- Listado paginado
- Registro
- Edición
- Detalle
- Eliminación

### 📚 Préstamos

- Registro de préstamos
- Consulta de detalle
- Devolución de préstamos
- Control de stock
- Validaciones de negocio

---

## 🎯 Valor Agregado

- SweetAlert2 para mensajes y confirmaciones.
- Componente de paginación reutilizable.
- Loading state en formularios.
- Pantalla Forbidden (403).
- Pantalla Not Found (404).
- Protección contra eliminación del último administrador.
- Arquitectura basada en Features.

---

## 📂 Estructura del Proyecto

```text
src
│
├── app
│   ├── core
│   │   ├── constants
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── models
│   │   └── services
│   │
│   ├── features
│   │   ├── auth
│   │   ├── authors
│   │   ├── books
│   │   ├── categories
│   │   ├── dashboard
│   │   ├── errors
│   │   ├── loans
│   │   ├── readers
│   │   └── users
│   │
│   ├── layout
│   └── shared
│       └── components
│           └── pagination
│
└── environments
```

---

## ⚙️ Instalación

### Instalar dependencias

```bash
npm install
```

### Ejecutar aplicación

```bash
ng serve
```

Aplicación disponible en:

```text
http://localhost:4200
```

---

## 🏗️ Build de Producción

```bash
ng build
```

Los archivos compilados se generan en:

```text
dist/library-frontend
```

---

## 👨‍💻 Autor

**Jorge Luis Palomino Garcia**

Proyecto desarrollado para el curso **Angular 21 – Web Apps**.