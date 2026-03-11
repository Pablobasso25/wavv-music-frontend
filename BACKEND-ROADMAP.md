# Wavv Music Backend Roadmap

Este documento ofrece un recorrido didáctico por el backend de Wavv Music, explicando cómo se interconectan los ficheros y qué datos entrega cada endpoint al frontend.

---
## 1. Estructura general

```
src/
  controllers/          # lógica de negocio (usuarios, canciones, playlists...)
  middlewares/          # autenticación, validación, subida de archivos
  models/               # esquemas Mongoose (User, Song, Album, Playlist)
  routes/               # define las rutas de la API y aplica middlewares
  schemas/              # validadores Zod para datos entrantes
  libs/                 # utilidades (JWT, cloudinary, etc.)
  jobs/                 # tareas periódicas (suscripciones)
  config.js             # variables de entorno
  db.js                 # conexión a MongoDB
  app.js                # configuración de Express + rutas
  index.js              # inicialización del servidor
```

La API sirve bajo el prefijo `/api` y cada grupo de rutas está en un archivo independiente.

---
## 2. Autenticación y autorización

- **middlewares/validateToken.js** (`authRequired`): extrae `token` de cookies, verifica con `jsonwebtoken` y rellena `req.user` con `{id, role}`. Devuelve 401/403 si falla.
- **middlewares/isAdmin.js**: asegura `req.user.role === 'admin'`.

El `AuthController` (en el mismo fichero que otras funciones, mezclado en el paste) expone:

```js
register(req,res)
login(req,res)
logout(req,res)
forgotPassword(req,res)
resetPassword(req,res)
```

- `register`, `login` devuelven al frontend un objeto con `id, username, email, subscription, role` y además colocan la cookie `token` (httpOnly, sameSite none, secure).
- `logout` borra la cookie.

**Esquemas Zod** (`schemas/auth.schema.js`) validan datos de entrada.

> El frontend consume estos endpoints para manejar el flujo de autenticación, guardando el usuario en `AuthContext`.

---
## 3. Usuarios

### Modelo (`models/user.model.js`)
Campos relevantes: `username,email,password,role,subscription,isActive` + tokens de reset.

### Controladores (`user.controller.js`) y rutas
- `getProfile` → GET `/api/profile` (authRequired). Envía el usuario con `-password`. También controla expiración de premium.
- `updateProfile` → PUT `/api/profile` (authRequired + upload). Recibe campos editables, puede subir avatar a Cloudinary.
- `changePassword` → PUT `/api/password`.
- `getAllUsers` → GET `/api/users` (admin).
- `getUsers` → GET `/api/users?page=&limit=` (admin) retorna página con `users, currentPage, totalPages, totalUsers`.
- `deactivateUser`/`activateUser` → PUT `/api/users/:id/deactivate` y `/activate` (admin).
- `updateUser` → PUT `/api/users/:id` (admin) permite modificar nombre/email/plan.
- `deleteUser` → DELETE `/api/users/:id` (admin) borra usuario **y también su playlist y canciones propias**.

> **Respuesta al frontend**: los endpoints devuelven mensajes de éxito/objetos actualizados. El panel de administración usa la paginación para mostrar tablas.

---
## 4. Canciones y Trending

### Modelo (`models/song.model.js`)
- Campos: `title, artist, image, youtubeUrl, duration, isTrending, user, source`.
- `source` sirve para distinguir canciones creadas por admins (`admin`) de las generadas por usuarios (`user`).

### Rutas y controladores (`song.controller.js`)
- `GET /api/songs` (authRequired) paginado; fi ltra `source:"admin"` por defecto. Si escribe `?includeUser=true` y es admin, entrega todo.
  - Resp.: `{ songs, currentPage, totalPages, totalSongs }` con canciones pobladas con el creador.
- `POST /api/songs` (admin) crea canción nueva y devuelve el documento completo.
- `GET /api/search-external?search=` (authRequired) consulta iTunes y mapea resultados.
- `PUT /api/songs/:id/trending` (admin) marca una canción como trending, devuelve `{ message, song }`.
- `GET /api/songs/trending` devuelve la canción actual marcada.
- `DELETE /api/songs/:id` (admin) elimina una canción.

> El frontend usa estos datos para tablas de admin (`SongsTable`), lista de trending (`TrendingSong.jsx`) y búsqueda/creación en `SearchModal`.

---
## 5. Álbumes (Artistas)

### Modelo (`models/album.model.js`)
Guarda `collectionId, name, artistName, image, tracks, user`.

### Controladores y rutas
- `GET /api/albums` (authRequired) paginado. Devuelve `{ albums, currentPage, totalPages, totalAlbums }`.
- `POST /api/albums` (admin) crea álbum desde iTunes.
- `GET /api/albums/:id` devuelve un álbum con pistas paginadas (`limit`, `page`). Retorna `{ album: { ... , tracks: [...] }, currentPage, totalPages, totalTracks }`.
- `DELETE /api/albums/:id` (admin).

> Los datos pasan al frontend para mostrar `ArtistasSidebar` y permitir al usuario abrir un álbum y ver sus pistas (TopSongs).

---
## 6. Playlist del usuario

### Modelo (`models/playlist.model.js`)
Cada usuario tiene un documento único (`user` con `unique:true`) con un array de `songs` (IDs de canciones).

### Controladores (`playlist.controller.js`)
- `POST /api/playlist/add` (authRequired) añade una canción:
  * si llega `songId` valida y puede ser global (admin) o propia.
  * si llega `externalSong` crea (o reutiliza) una canción con `source:"user"` y `user: req.user.id`.
  * comprueba límite para usuarios free y evita duplicados.
  * devuelve `{ message, song }`.
- `GET /api/playlist` (authRequired) devuelve la propia playlist paginada: `{ songs, currentPage, totalPages, totalSongs }` ordenadas como en la lista.
- `DELETE /api/playlist/:songId` (authRequired) elimina la pista.
- `POST /api/playlist/clean` (authRequired) depura IDs rotas.

> El frontend solicita estas rutas desde `SongContext` (`getUserPlaylistRequest`, etc.) y transforma los resultados para `PlaylistScreen` y `TopSongs`.

---
## 7. Pagos y suscripciones

- `POST /api/payments/create-preference` usa MercadoPago para generar un `init_point`. Es consumido por la pantalla de suscripción.
- `POST /api/payments/webhook` procesa notificaciones y actualiza el usuario a premium.
- Endpoints `GET /payments/{success,failure,pending}` redirigen al frontend.

> El proceso culmina con el frontend consultando `GET /api/profile` para refrescar el estado `subscription` después del pago.

---
## 8. Email y utilidades

- `controllers/email.controller.js` usa la librería `resend` para mandar correos con temas personalizados.
- `libs/jwt.js` expone `createAccessToken` (envoltorio de `jsonwebtoken.sign` con expiración 1 día).
- `libs/initAdmin.js` se ejecuta al iniciar el servidor para crear un administrador inicial.
- `jobs/subscriptionChecker.js` cron every minute para enviar avisos de expiración y degradar planes.

---
## 9. Conexión frontend-backend

1. **Autenticación**: `/register`, `/login` devuelven usuario y cookie. El frontend guarda la info en `AuthContext` y usa `verifyToken` en el arranque.
2. **Pantallas admin**: piden `/albums`, `/songs?includeUser=true`, `/users`, postean en `/songs`, `/albums` y eliminan/actualizan con PUT / DELETE.
3. **Playlists**: operaciones (`addSongToPlaylist`, `getUserPlaylist`, `deleteSongFromPlaylist`) mediante rutas del contexto de canciones.
4. **Reproducción & trending**: `/songs/trending` obtiene la canción rotatoria.
5. **Profile & subscription**: `/profile`, `/payments/create-preference`, `/payments/webhook`.
6. **Búsqueda externa**: `/search-external` para rellenar modales.

El frontend interpreta las respuestas JSON, actualiza estado y renderiza tablas, listas y formularios. El contrato es simple: todos los endpoints devuelven datos claros o un mensaje de error (capturado en los `catch`).

---
## 10. Consejos didácticos

- **Paginación**: casi todos los list endpoints admiten `page` y `limit` query params. El frontend calcula `currentPage` y `totalPages`.
- **Seguridad**: todas las rutas sensibles usan `authRequired`; sólo las de administración agregan `isAdmin`.
- **Manejo de errores**: los controladores devuelven status apropiado y mensajes legibles que las UI muestran con `Swal` o `toast`.

Con este mapa tienes una visión completa de cómo el backend provee datos al frontend y cómo fluyen las peticiones. Mantener esa separación clara (admin vs usuario, global vs personal) evita la mezcla de contenidos que antes te daba problemas.

¡Suerte con la implementación y cualquier otra duda me avisás!