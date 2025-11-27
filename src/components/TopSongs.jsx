import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import trendImg from "../assets/trend.png";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const TopSongs = ({ album, isPlaylist = false, fromHome = false }) => {
  const { playSong, currentSong, isPlaying } = useMusicPlayer();
  const [playlist, setPlaylist] = useState([]);
