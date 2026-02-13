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

    const result = await addSongToPlaylist(trackId);

    if (result.success) {
      toast.success(`"${track.name}" agregagda a tu playlist.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
      getUserPlaylist();
    } else if (result.status === 403 && result.code === "PREMIUM_REQUIRED") {
      Swal.fire({
        title: "¡Pásate a Premium!",
        text: "Solo puedes agregar 5 canciones con el plan gratuito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ver Planes",
        cancelButtonText: "Seguir en el plan gratuito",
        confirmButtonColor: "#8b5cf6",
        cancelButtonColor: "#d33",
        background: "#191B1B",
        color: "#fff",
        iconColor: "#ffbb33",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/subscription");
        }
      });
    } else {
      toast.info(result.message || "Esta canción ya está en tu playlist", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  const handleRemoveFormPlaylist = async (e, track) => {
    e.stopPropagation();
    const trackId = track._id || track.id;

    const confirm = await Swal.fire({
      title: "¿Borrar canción?",
      text: "Se eliminará de tu playlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      background: "#191B1B",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      const result = await deleteSongFormPlaylist(trackId);
      if (result.success) {
        toast.success("Canción eliminada", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 2000,
        });
        getUserPlaylist();
      } else {
        toast.error("Error al eliminar", { theme: "dark" });
      }
    }
  };

  
  }
