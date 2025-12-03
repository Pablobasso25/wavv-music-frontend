# 🎵 Wavv Music

**Wavv Music** es una aplicación web moderna de streaming de música que te conecta con tus canciones favoritas. Desarrollada con React y Vite, ofrece una experiencia fluida y responsive para descubrir, reproducir y gestionar tu música.

## ✨ Características

### 🎧 Reproducción de Música

- **Reproductor integrado** con controles completos (play, pause, skip)
- **Barra de progreso interactiva** con control de tiempo
- **Previsualizaciones de Spotify** de alta calidad
- **Modo shuffle y repeat**

### 🔍 Búsqueda Inteligente

- **Búsqueda en tiempo real** con la API de Spotify
- **Resultados instantáneos** con debounce optimizado
- **Vista previa de canciones** directamente desde el buscador

### 📝 Gestión de Playlists

- **Crear y gestionar playlists personalizadas**
- **Agregar canciones** desde búsqueda o trending
- **Persistencia local** con LocalStorage
- **Eliminar canciones** de tu playlist

### 🎨 Interfaz Moderna

- **Diseño responsive** optimizado para mobile, tablet y desktop
- **Tema oscuro** con paleta de colores personalizada
- **Animaciones suaves** y transiciones fluidas
- **Grid layout** adaptativo para diferentes pantallas

### 👥 Gestión de Usuarios

- **Sistema de autenticación** (Login/Register)
- **Roles de usuario** (Usuario/Admin)
- **Panel de administración** para gestionar contenido
- **Confirmación de logout** con Sweet Alert

### 🎵 Sección Trending

- **Canciones populares** destacadas
- **Álbumes destacados** de artistas top
- **Artistas destacados** con sus álbumes

### 📱 Diseño Responsive

- **Mobile First**: Cards verticales, sidebar oculto
- **Tablet**: Layout horizontal con sidebar y reproductor optimizados
- **Desktop**: Grid de 3 columnas (sidebar, contenido, reproductor)

## 🚀 Tecnologías

### Frontend

- **React 19.2.0** - Biblioteca de UI
- **Vite 7.2.4** - Build tool y dev server
- **React Router DOM 6.30** - Navegación
- **Bootstrap 5.3.8** - Framework CSS
- **React Bootstrap 2.10** - Componentes de React

### APIs y Servicios

- **Spotify Web API** - Catálogo de música
- **EmailJS** - Servicio de email
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
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
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

## 🏗️ Estructura del Proyecto

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

## 🎮 Uso

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

### Tablet (768px - 1023px)

- Sidebar horizontal con scroll
- Reproductor horizontal (imagen + info + controles)
- Layout optimizado de 1 columna

### Desktop (≥1024px)

- Grid de 3 columnas
- Sidebar fijo izquierda (200-250px)
- Contenido central expandible
- Reproductor fijo derecha (280-400px)

## 🎨 Paleta de Colores

```css
--bg-primary: #000000
--bg-secondary: #1a1a1a
--bg-card: #202026
--accent-blue: #5773ff
--accent-red: #ff2e2e
--text-main: #f5f5f5
--text-secondary: #919191
```

## 🔐 Autenticación

El sistema utiliza localStorage para gestionar sesiones:

- **Registro**: Validación con React Hook Form
- **Login**: Autenticación con credenciales almacenadas
- **Roles**: Usuario estándar y Administrador
- **Rutas protegidas**: Middleware para verificar autenticación

## 🌐 API de Spotify

### Endpoints Utilizados

- `GET /search` - Búsqueda de canciones
- `GET /albums` - Información de álbumes
- `GET /artists` - Información de artistas

### Token Management

- Token generado en servidor Express
- Renovación automática
- Context API para compartir token globalmente

## 🚢 Despliegue

### Netlify (Recomendado)

1. Conectar repositorio de GitHub
2. Configurar variables de entorno en Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Variables de entorno en Netlify

```
VITE_SPOTIFY_CLIENT_ID
VITE_SPOTIFY_CLIENT_SECRET
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

## 👥 Equipo

- **Pablo** - Organizado, responsable y siempre dispuesto a dar una mano
- **Alvaro** - Proactivo, resolutivo y con visión clara
- **Romina** - Enfocada, detallista y con energía contagiosa
- **Juan** - Creativo, curioso e impulsor del grupo
- **Patricio** - Analítico, tranquilo y enfocado en soluciones

## 📄 Licencia

Este proyecto es privado y de uso educativo.

## 🤝 Contribuciones

Actualmente este es un proyecto privado. Si deseas contribuir, contacta al equipo.

## 📞 Contacto

- **GitHub**: [Pablobasso25/Wavv-Music](https://github.com/Pablobasso25/Wavv-Music)
- **Email**: A través del formulario en la sección "Nosotros"

## 🙏 Agradecimientos

- Spotify Web API por el catálogo de música
- React y Vite por las excelentes herramientas de desarrollo
- Bootstrap por el framework CSS
- La comunidad open source

---

**Wavv Music** - Lo que te conecta 🎵
