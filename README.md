#  Wavv Music

![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=for-the-badge&logo=bootstrap)

**Wavv Music** es una plataforma web moderna de streaming de música desarrollada con el stack **MERN**. Esta aplicación permite a los usuarios descubrir nuevas canciones, crear y gestionar sus propias playlists personalizadas, y disfrutar de una experiencia musical intuitiva.

El proyecto se integra con la **API de iTunes** para ofrecer un catálogo de búsqueda en tiempo real y utiliza **MercadoPago** para la gestión de suscripciones Premium.

---

##  Características Principales

-**Reproductor de música integrado:** Control global de reproducción con soporte para avanzar, pausar y gestionar las canciones.
-**Búsqueda en tiempo real:** Explora canciones, álbumes y artistas directamente desde la base de datos de iTunes.
-**Gestión de Playlists:** Creación y edición de tu propia biblioteca musical (almacenada en base de datos).
-**Suscripciones Premium:** Planes de membresía pagos integrados con MercadoPago para levantar los límites de las cuentas gratuitas.
-**Panel Administrativo:** Un dashboard completo protegido por roles (Admin) para gestionar usuarios, cambiar roles, y administrar canciones y álbumes.

---

## Stack Tecnológico (Frontend)

- **Core:** React 19, Vite, React Router DOM
- **Estilos y UI:** Bootstrap 5, React Bootstrap, CSS
- **Notificaciones y Alertas:** SweetAlert2, React Toastify
- **Peticiones HTTP:** Axios (conectado a una API Backend propia con Node.js, Express y MongoDB).

---

## Instalación y Configuración Local

Si deseas correr el proyecto localmente o contribuir al mismo, sigue estos pasos:

1. **Hacer un Fork y Clonar:**
   Haz clic en el botón "Fork" en la parte superior derecha de este repositorio y luego clónalo en tu equipo:

```bash
git clone https://github.com/TU_USUARIO/Wavv-Music.git
cd Wavv-Music
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

> _Nota: Asegúrate de tener corriendo la API del backend de Wavv Music localmente o apuntar a la URL de tu entorno de producción._

4. **Ejecutar la aplicación:**

```bash
npm run dev
```

---

## Equipo de Desarrollo

Este proyecto fue desarrollado en colaboración por:

- **Pablo** (@Pablobasso25)
- **Tomás** (@tomasgomez18)
- **Luhana** (@JLuhanaJakubowicz)
- **Juan** (@JuanFerreyra18)

---

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.
