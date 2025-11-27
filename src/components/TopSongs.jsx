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
