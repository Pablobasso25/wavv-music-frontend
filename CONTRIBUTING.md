#  Guía de Contribución para Wavv Music

¡Hola! Nos emociona mucho que quieras colaborar con el Frontend de **Wavv Music**. Para mantener el código organizado, limpio y libre de errores, hemos establecido un flujo de trabajo que te pedimos seguir.

##  Regla

**TODO PULL REQUEST (PR) DEBE APUNTAR A LA RAMA `develop`.**
Nunca envíes un PR directo a `main`. La rama `main` es nuestro entorno de producción.

---

##  Flujo de Trabajo (Paso a Paso)

### 1. Haz un Fork y Clona el repositorio

Haz clic en "Fork" en la página del repositorio. Luego, clona tu fork localmente:

```bash
git clone https://github.com/TU_USUARIO/Wavv-Music.git
cd Wavv-Music
```

### 2. Sincronízate con la rama de desarrollo

```bash
git checkout develop
```

### 3. Crea una rama para tu tarea

Usa un nombre descriptivo siguiendo esta convención: `tipo/descripcion-corta`

- `feature/nueva-vista` (Para agregar funcionalidades)
- `fix/error-login` (Para solucionar bugs)
- `refactor/header-nav` (Para mejoras de código sin agregar funciones)

```bash
git checkout -b feature/mi-nueva-funcionalidad
```

### 4. Haz Commits Convencionales

Usa mensajes claros que expliquen el _qué_ y el _por qué_:

- `feat: agrega vista de perfil de usuario`
- `fix: corrige botón de reproducción en móviles`
- `style: ajusta márgenes en las tarjetas de canciones`

### 5. Sube tus cambios y abre un Pull Request

```bash
git push origin feature/mi-nueva-funcionalidad
```

Ve a GitHub y abre un Pull Request. Asegúrate de que la rama base destino sea `develop`. Completa la plantilla de PR verificando que tu código funciona correctamente.

¡Gracias por ayudar a mejorar Wavv Music!
