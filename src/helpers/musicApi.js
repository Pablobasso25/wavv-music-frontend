export const getTokenApi = async () => {
  // En producción usa Netlify Functions, en desarrollo usa el servidor local
  const apiUrl = import.meta.env.VITE_API_URL || "/.netlify/functions";
  const endpoint = apiUrl.startsWith("http")
    ? `${apiUrl}/api/token`
    : `${apiUrl}/token`;
  const response = await fetch(endpoint);
  const data = await response.json();
  const expiresAt = Date.now() + data.expires_in * 1000;
  return { access_token: data.access_token, expires_at: expiresAt };
};

export const searchTrack = async (token, query) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items[0];
};

export const searchTracks = async (token, query, limit = 10) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
};

export const searchArtistAndAlbums = async (token, artistName) => {
  const artistRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=artist&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const artistData = await artistRes.json();
  const artist = artistData.artists.items[0];
  if (!artist) return null;

  const artistId = artist.id;
  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=AR&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const albumsData = await albumsRes.json();
  const firstAlbum = albumsData.items[0];

  if (!firstAlbum) return null;

  const tracksRes = await fetch(
    `https://api.spotify.com/v1/albums/${firstAlbum.id}/tracks?market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const tracksData = await tracksRes.json();

  const formattedAlbum = {
    id: firstAlbum.id,
    name: firstAlbum.name,
    image: firstAlbum.images[0]?.url,
    release_date: firstAlbum.release_date,
    total_tracks: firstAlbum.total_tracks,
    artists: [{ name: artist.name, id: artist.id }],
    tracks: tracksData.items.map((track) => ({
      name: track.name,
      preview_url: track.preview_url,
      duration_ms: track.duration_ms,
    })),
  };

  return {
    artist: {
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url,
      genres: artist.genres,
    },
    album: formattedAlbum,
  };
};
