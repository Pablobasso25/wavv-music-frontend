import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { useSongs } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import Swal from "sweetalert2";

const TopSongs = ({ album, isPlay = false, fromHome = false }) => {
  const { playSong, currentSong, isPlaying, executeActionWithAd } =
  useMusicPlayer();

  const {
    addSongToPlaylist,
    userPlaylist,
    getUserPlaylist,
    deleteSongFromPlaylist,
  } = useSongs();

  const navigate = useNavigate();

  useEffect(() => {
    getUserPlaylist();
  }, []);

  const handleAddToPlaylist = async (e, track) => {
    e.stopPropagation();
    const trackId = track._id || track.id;

    if(!trackId) {
      toast.error("Error: no se pudo identificar la camción.");
      return;
    }
  }
}
