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
    name: "UsuarioPrueba",
    email: "usuario@wavvmusic.com",
    password: "usuario123",
    role: "user",
  },
];

export const defaultSongs = [
  {
    id: 1,
    title: "Lost Emotions",
    artist: "Rion Clarke",
    album: "Digital Dreams",
    duration: "03:45",
    cover:
      "https://unsplash.com/es/fotos/un-primer-plano-de-una-criatura-marina-K5u5bXMGIwM",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Electronic",
    year: 2024,
    plays: 63000000,
  },
  {
    id: 2,
    title: "Sunrise",
    artist: "Lila Rivera",
    album: "Morning Light",
    duration: "04:12",
    cover: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Sunrise",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Pop",
    year: 2024,
    plays: 45000000,
  },
  {
    id: 3,
    title: "Voyage",
    artist: "Tyde Brennan",
    album: "Ocean Waves",
    duration: "04:35",
    cover: "https://via.placeholder.com/300x300/4ecdc4/ffffff?text=Voyage",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Rock",
    year: 2024,
    plays: 38000000,
  },
  {
    id: 4,
    title: "Midnight Drive",
    artist: "Rion Clarke",
    album: "Digital Dreams",
    duration: "03:58",
    cover:
      "https://via.placeholder.com/300x300/5773ff/ffffff?text=Midnight+Drive",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: "Electronic",
    year: 2024,
    plays: 52000000,
  },
  {
    id: 5,
    title: "Echoes",
    artist: "Lila Rivera",
    album: "Morning Light",
    duration: "03:22",
    cover: "https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Echoes",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    genre: "Pop",
    year: 2024,
    plays: 41000000,
  },
];

export const defaultAlbum = {
  id: "default-album-1",
  name: "Digital Dreams",
  image:
    "https://images.unsplash.com/photo-1615185990787-0c2561e830e8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  release_date: "2024",
  total_tracks: 5,
  artists: [{ name: "Rion Clarke", id: "rion-clarke" }],
  tracks: [
    {
      name: "Lost Emotions",
      preview_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration_ms: 225000,
    },
    {
      name: "Midnight Drive",
      preview_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration_ms: 238000,
    },
    {
      name: "Neon Lights",
      preview_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration_ms: 252000,
    },
    {
      name: "Digital Sunset",
      preview_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration_ms: 275000,
    },
    {
      name: "Electric Dreams",
      preview_url:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      duration_ms: 202000,
    },
  ],
};
