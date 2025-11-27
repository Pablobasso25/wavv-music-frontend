import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/MusicPlayer";
import TopSongs from "../../components/TopSongs";

const PlaylistScreen = () => {
  const [playlistAlbum, setPlaylistAlbum] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadPlaylist = () => {
      const storedPlaylist =
        JSON.parse(localStorage.getItem("userPlaylist")) || [];

      const playlistAsAlbum = {
        id: "user-playlist",
        name: "Mi Playlist",
        image:
          "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=My+Playlist",
        release_date: new Date().toLocaleDateString(),
        total_tracks: storedPlaylist.length,
        artists: [{ name: "Tus Canciones Favoritas", id: "user" }],
        tracks: storedPlaylist.map((song) => ({
          name: song.name,
          preview_url: song.audio,
          duration_ms: song.duration_ms || 0,
          album: song.album,
          artist: song.artist,
        })),
      };

      setPlaylistAlbum(playlistAsAlbum);
    };

    loadPlaylist();

    window.addEventListener("storage", loadPlaylist);
    window.addEventListener("playlistUpdated", loadPlaylist);
    return () => {
      window.removeEventListener("storage", loadPlaylist);
      window.removeEventListener("playlistUpdated", loadPlaylist);
    };
  }, []);
};

export default PlaylistScreen;