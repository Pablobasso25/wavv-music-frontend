import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { useSongs } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import Swal from "sweetalert2";
import { showPremiumAlert } from "../helpers/alerts";
import publicidad2 from "../assets/images/publicidad2.png";

const TopSongs = ({ album, isPlaylist = false, fromHome = false }) => {
  const {
    playSong,
    currentSong,
    isPlaying,
    executeActionWithAd,
    audioRef,
    setIsPlaying,
    playUISound,
  } = useMusicPlayer();
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
    const trackId = track._id || track.id || track.trackId;
    const songData = track._id 
      ? { songId: trackId }
      : {
          externalSong: {
            title: track.name,
            artist: album.artists?.[0]?.name || album.artistName || "Artista",
            image: track.cover || album.image,
            youtubeUrl: track.preview_url || track.audio,
            duration: track.duration_ms
              ? `${Math.floor(track.duration_ms / 60000)}:${String(
                  Math.floor((track.duration_ms % 60000) / 1000),
                ).padStart(2, "0")}`
              : "--:--",
          },
        };
    const result = await addSongToPlaylist(songData);
    if (result.success) {
      playUISound("success");
      toast.success(`"${track.name}" agregada a tu playlist.`, {
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
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      playUISound("error");
      showPremiumAlert(navigate, publicidad2);
    } else {
      playUISound("warning");
      toast.info(result.message || "Esta canción ya está en tu playlist.", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };
  const handleRemoveFromPlaylist = async (e, track) => {
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
      const result = await deleteSongFromPlaylist(trackId);
      if (result.success) {
        playUISound("success");
        toast.info("Canción eliminada", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 2000,
        });
        getUserPlaylist();
      } else {
        playUISound("error");
        toast.error("Error al eliminar", {
          theme: "dark",
          position: "bottom-right",
        });
      }
    }
  };
  const isInPlaylist = (track) => {
    if (!userPlaylist || userPlaylist.length === 0) return false;
    const trackId = track._id || track.id || track.trackId;
    return userPlaylist.some(
      (song) => 
        song._id === trackId || 
        song.id === trackId ||
        (song.title === track.name &&
          song.artist === (album.artists?.[0]?.name || album.artistName)),
    );
  };
  if (!album || !album.tracks || album.tracks.length === 0) {
    return (
      <Col xs={12}>
        <div className="music-list bg-dark text-white rounded p-3 h-100">
          <h5>⚠️ No hay canciones disponibles</h5>
        </div>
      </Col>
    );
  }
  return (
    <Container
      fluid
      className={`px-2 px-lg-3 ${!fromHome ? "top-songs-wrapper" : ""}`}
      style={{ width: "100%", maxWidth: "100%" }}
    >
      <style>
        {`
          @media (max-width: 1280px) {
            .top-songs-wrapper {
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: -1.5rem;
              margin-right: -1.5rem;
              width: calc(100% + 3rem);
            }
            .top-songs-wrapper .music-list {
              border-radius: 0 !important;
              height: auto !important;
              max-height: none !important;
            }
          }
        `}
      </style>
      <div
        className="music-list p-3 rounded-4"
        style={{
          backgroundColor: "#111111",
          height: fromHome ? "auto" : "80vh",
          minHeight: fromHome ? "400px" : "auto",
          maxHeight: fromHome ? "calc(100vh - 350px)" : "80vh",
          overflowY: "auto",
        }}
      >
        <div className="header d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-white">Canciones de {album.name}</h5>
          {album.release_date && (
            <span className="text-secondary small">{album.release_date}</span>
          )}
        </div>
        <div className="items">
          {album.tracks.map((track, index) => {
            const isCurrentTrack = currentSong?.title === track.name;
            const trackId = track._id || track.id || track.trackId;
            const added = isInPlaylist(track);
            return (
              <div
                key={index}
                className="item d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 cursor-pointer"
                style={{
                  backgroundColor: "#191B1B",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#35393B")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#191B1B")
                }
                onClick={() => {
                  executeActionWithAd(() => {
                    const songToPlay = {
                      title: track.name,
                      artist:
                        album.artists?.[0]?.name || album.name || "Artista",
                      album: album.name,
                      cover: track.cover || album.image,
                      audio:
                        track.preview_url || track.audio || track.youtubeUrl,
                      name: track.name,
                      _id: trackId,
                    };
                    const fullAlbumQueue = album.tracks.map((t) => ({
                      title: t.name,
                      artist: album.artists?.[0]?.name || album.name,
                      cover: t.cover || album.image,
                      audio: t.preview_url || t.audio || t.youtubeUrl,
                      name: t.name,
                      _id: t._id || t.id,
                    }));
                    playSong(songToPlay, fullAlbumQueue);
                  });
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="fw-bold text-white"
                    style={{ minWidth: "30px" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={track.cover || album.image}
                    className="rounded me-2 me-md-3"
                    width="40"
                    height="40"
                    alt={track.name}
                  />
                  <div className="details">
                    <h6
                      className="mb-0 small"
                      style={{
                        color: isCurrentTrack ? "#0d6efd" : "white",
                      }}
                    >
                      {track.name}
                    </h6>
                  </div>
                </div>
                <div className="actions d-flex align-items-center gap-3">
                  <i
                    className={`bx ${
                      isCurrentTrack && isPlaying ? "bx-pause" : "bx-play"
                    } cursor-pointer fs-2 text-white`}
                    title={
                      isCurrentTrack && isPlaying ? "Pausar" : "Reproducir"
                    }
                  ></i>
                  {isPlaylist ? (
                    <i
                      className="bx bxs-trash text-danger fs-4"
                      onClick={(e) => handleRemoveFromPlaylist(e, track)}
                    ></i>
                  ) : (
                    <i
                      className={`bx ${
                        added
                          ? "bxs-check-circle text-success"
                          : "bxs-plus-square text-secondary"
                      } fs-4`}
                      style={{ cursor: added ? "default" : "pointer" }}
                      title={
                        added ? "Ya está en tu playlist" : "Agregar a playlist"
                      }
                      onClick={(e) => {
                        if (!added) handleAddToPlaylist(e, track);
                      }}
                    ></i>
                  )}
                  <span style={{ color: "#494D4E" }}>
                    {track.duration_ms
                      ? Math.floor(track.duration_ms / 1000 / 60) +
                        ":" +
                        String(
                          Math.floor((track.duration_ms / 1000) % 60),
                        ).padStart(2, "0")
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default TopSongs;
