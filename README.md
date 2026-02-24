# Wavv Music

Wavv Music es una aplicación web moderna de streaming de música desarrollada con React y Vite. Permite descubrir, reproducir y gestionar música mediante integración con la Spotify Web API, ofreciendo un catálogo amplio y actualizado.

---

## Descripción General

La plataforma ofrece una experiencia fluida e intuitiva para los usuarios, combinando exploración musical, reproducción en tiempo real y gestión de cuentas. Además, incorpora un sistema de autenticación completo y un panel de administración con control de acceso basado en roles.

---

## Funcionalidades Principales

### Experiencia Musical

- Reproductor integrado con control global (play, pause, skip) gestionado mediante Context API.
- Secciones de Trending y Top Songs para descubrir nueva música.
- Búsqueda en tiempo real conectada a la API de Spotify.
- Creación y gestión de playlists personalizadas con persistencia de datos.

### Gestión de Usuarios

- Registro e inicio de sesión.
- Recuperación y restablecimiento de contraseña mediante tokens y envío de correos con EmailJS.
- Perfil privado para administración de datos de usuario.
- Página de gestión de planes de suscripción.

### Panel de Administración

- Sistema de rutas protegidas.
- Acceso restringido a usuarios autenticados y administradores.
- Dashboard administrativo en /admin para gestión de contenido y usuarios.

### Interfaz y Experiencia de Usuario

- Diseño completamente responsive.
- Tema oscuro con estética moderna.
- Notificaciones con react-toastify.
- Alertas modales con sweetalert2.
- Pantalla de bienvenida animada al iniciar la aplicación.

---

## Tecnologías Utilizadas

### Frontend

- React 19
- Vite
- React Router DOM 6
- Bootstrap 5
- React Bootstrap
- Bootstrap Icons
- Boxicons
- Lucide React

### Gestión de Estado

- Context API:
  - AuthContext
  - MusicPlayerContext
  - SongContext
- Hooks personalizados para encapsular lógica reutilizable.

### Servicios Externos

- Spotify Web API
- EmailJS

---

## Instalación y Configuración

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/Wavv-Music.git  
cd Wavv-Music  

### 2. Instalar dependencias

npm install  

### 3. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto y agregar:

VITE_SPOTIFY_CLIENT_ID=tu_spotify_client_id  
VITE_SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret  
VITE_EMAILJS_SERVICE_ID=tu_emailjs_service_id  
VITE_EMAILJS_TEMPLATE_ID=tu_emailjs_template_id  
VITE_EMAILJS_PUBLIC_KEY=tu_emailjs_public_key  

### 4. Ejecutar el proyecto

npm run dev  

---

## Estructura del Proyecto

src/  
├── api/                 # Llamadas a APIs externas y backend  
├── assets/              # Recursos estáticos  
├── components/          # Componentes reutilizables  
├── context/             # Contextos globales  
├── helpers/             # Funciones de utilidad y validaciones  
├── pages/               # Vistas principales  
│   ├── aboutUs/  
│   ├── admin/  
│   ├── error404/  
│   ├── home/  
│   ├── login/  
│   ├── playlist/  
│   ├── profile/  
│   ├── subscription/  
│   └── welcome/  
├── routes/              # Rutas protegidas  
├── App.jsx              # Componente raíz  
└── main.jsx             # Punto de entrada  

---

## Equipo de Desarrollo

- Pablo  
- Tomás  
- Juan  
- Luhana  

---

## Próximas Mejoras

- Integración con el SDK oficial de Spotify para reproducción completa.
- Implementación como Progressive Web App (PWA).
- Estadísticas personalizadas por usuario.
- Funcionalidades sociales (seguimiento de usuarios y compartición de playlists).

---

## Licencia

Proyecto desarrollado con fines educativos y de práctica profesional.
