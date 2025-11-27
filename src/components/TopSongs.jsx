import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import trendImg from "../assets/trend.png";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const TopSongs = ({ album, isPlaylist = false, fromHome = false }) => {
  const { playSong, currentSong, isPlaying } = useMusicPlayer();
  const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
    const loadPlaylist = () => {
      const storedPlaylist =
        JSON.parse(localStorage.getItem("userPlaylist")) || [];
      setPlaylist(storedPlaylist);
    };

    loadPlaylist();

    window.addEventListener("storage", loadPlaylist);
    const customListener = () => loadPlaylist();
    window.addEventListener("playlistUpdated", customListener);

    return () => {
      window.removeEventListener("storage", loadPlaylist);
      window.removeEventListener("playlistUpdated", customListener);
    };
  }, []);

    const handleAddToPlaylist = (track) => {
    const songData = {
      id: Date.now(),
      title: track.name,
      artist: album.artists?.[0]?.name || "Artista",
      album: album.name,
      cover: album.image,
      audio: track.preview_url,
      genre: "Music",
      name: track.name,
      duration_ms: track.duration_ms,
    };

    const exists = playlist.some(
      (song) => song.name === track.name && song.album === album.name
    );

    if (exists) {
      alert("⚠️ Esta canción ya está en tu playlist.");
      return;
    }

    const updatedPlaylist = [...playlist, songData];
    setPlaylist(updatedPlaylist);
    localStorage.setItem("userPlaylist", JSON.stringify(updatedPlaylist));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("playlistUpdated"));
    alert(`✅ "${track.name}" agregada a tu playlist.`);
  };

    const handleRemoveFromPlaylist = (track) => {
    if (!confirm(`¿Estás seguro de eliminar "${track.name}" de tu playlist?`)) {
      return;
    }

    const updatedPlaylist = playlist.filter(
      (song) => !(song.name === track.name && song.album === track.album)
    );
    setPlaylist(updatedPlaylist);
    localStorage.setItem("userPlaylist", JSON.stringify(updatedPlaylist));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("playlistUpdated"));
    alert(`✅ "${track.name}" eliminada de tu playlist.`);
  };
  
    const isInPlaylist = (trackName) => {
    return playlist.some(
      (song) => song.name === trackName && song.album === album.name
    );
  };
