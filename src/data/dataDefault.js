// Datos por defecto para la aplicación

export const defaultAdmin = {
  id: 1,
  name: "Admin",
  email: "admin@wavvmusic.com",
  password: "admin123",
  role: "admin",
};

export const defaultUsers = [
  {
    id: 2,
    name: "Usuario Demo",
    email: "demo@wavvmusic.com",
    password: "demo123",
    role: "user",
  },
];

export const defaultSongs = [];

export const defaultAlbum = {
  id: "default",
  name: "Álbum por defecto",
  image: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Album",
  release_date: new Date().toLocaleDateString(),
  total_tracks: 0,
  artists: [{ name: "Artista", id: "default-artist" }],
  tracks: [],
};
