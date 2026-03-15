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

- **React 19.2.0** - Biblioteca de UI
- **Vite 7.2.4** - Build tool y dev server
- **React Router DOM 6.30** - Navegación
- **Bootstrap 5.3.8** - Framework CSS
- **React Bootstrap 2.10** - Componentes de React

### APIs y Servicios

- **Spotify Web API** - Catálogo de música
- **Express + CORS** - Backend para tokens

### Librerías UI/UX

- **SweetAlert2** - Alertas modernas
- **React Toastify** - Notificaciones toast
- **Boxicons** - Iconografía
- **React Hook Form** - Gestión de formularios

## 📦 Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta de desarrollador de Spotify

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/Pablobasso25/Wavv-Music.git
cd Wavv-Music
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SPOTIFY_CLIENT_ID=tu_client_id
VITE_SPOTIFY_CLIENT_SECRET=tu_client_secret
```

4. **Iniciar el servidor backend** (para tokens de Spotify)

```bash
cd server
node index.js
```

5. **Iniciar la aplicación**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
Wavv-Music/
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   ├── components/          # Componentes reutilizables
│   │   ├── ArtistasSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── NavBar.jsx
│   │   ├── TopSongs.jsx
│   │   └── TrendingSong.jsx
│   ├── context/             # Context API para estado global
│   │   ├── AuthContext.jsx
│   │   ├── MusicPlayerContext.jsx
│   │   └── useToken.jsx
│   ├── helpers/             # Funciones auxiliares
│   │   ├── alerts.js
│   │   └── musicApi.js
│   ├── pages/               # Páginas de la aplicación
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── playlist/
│   │   ├── admin/
│   │   ├── aboutUs/
│   │   └── error404/
│   ├── routes/              # Rutas protegidas
│   ├── data/                # Datos estáticos
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── server/                  # Backend para tokens
│   └── index.js
├── netlify/                 # Funciones serverless
│   └── functions/
│       └── token.js
├── package.json
└── README.md
```

## Uso

### Para Usuarios

1. **Registro/Login**: Crea una cuenta o inicia sesión
2. **Explorar música**: Navega por las canciones trending
3. **Buscar**: Usa el buscador para encontrar tus canciones favoritas
4. **Reproducir**: Haz clic en cualquier canción para reproducirla
5. **Crear playlist**: Agrega canciones a tu playlist personal
6. **Gestionar**: Elimina canciones de tu playlist cuando quieras

### Para Administradores

1. **Acceder al panel**: Navega a `/admin`
2. **Gestionar usuarios**: Ver y editar usuarios del sistema
3. **Gestionar contenido**: Administrar canciones y álbumes
4. **Ver estadísticas**: Dashboard con métricas del sistema

## 📱 Diseño Responsive

### Mobile (<768px)

- Sidebar oculto
- Cards verticales
- Reproductor full-width
- Menú hamburguesa

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
