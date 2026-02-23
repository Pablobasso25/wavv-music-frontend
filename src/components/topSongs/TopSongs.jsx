import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { useSongs } from "../../context/SongContext";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import Swal from "sweetalert2";
import { showPremiumAlert } from "../../helpers/alerts";
import publicidad2 from "../../assets/images/publicidad2.png";

const TopSongs = ({ album, isPlaylist = false, fromHome = false, onPageChange }) => {
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
    if (!fromHome) {
      getUserPlaylist(1, 1000);
    }
  }, [fromHome]);

 const handleAddToPlaylist = async (e, track) => {
  e.stopPropagation();
  
  const songData = isPlaylist && track._id
    ? { songId: track._id }
    : {
        externalSong: {
          title: track.name,
          artist: album.artists?.[0]?.name || album.artistName || "Artista",
          image: track.cover || album.image,
          youtubeUrl: track.preview_url || track.audio || track.youtubeUrl,
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
        theme: "dark",
        transition: Slide,
      });
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
        if (onPageChange && album.currentPage) {
          onPageChange(album.currentPage);
        } else {
          getUserPlaylist();
        }
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
      className="px-0 px-md-2"
      style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}
    >
      <div
        className="music-list p-3 rounded-4 d-flex flex-column"
        style={{
          backgroundColor: "#111111",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div className="header d-flex justify-content-between align-items-center mb-3 flex-shrink-0">
          <h5 className="mb-0 text-white w-100 text-center text-md-start">
            Canciones de {album.name}
          </h5>
        </div>

        <div
          className="items w-100 flex-grow-1"
          style={{
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {album.tracks.map((track, index) => {
            const isCurrentTrack = currentSong?.title === track.name;
            const trackId = track._id || track.id || track.trackId;
            const added = isInPlaylist(track);

            return (
              <div
                key={index}
                className="item d-flex align-items-center justify-content-between p-2 p-md-3 rounded-3 mb-2 cursor-pointer w-100"
                style={{
                  backgroundColor: "#191B1B",
                  transition: "0.2s",
                  border: isCurrentTrack
                    ? "1px solid #5773ff"
                    : "1px solid transparent",
                }}
                onClick={() => {
                  executeActionWithAd(() => {
                    const songToPlay = {
                      title: track.name,
                      artist:
                        album.artists?.[0]?.name ||
                        album.artistName ||
                        "Artista",
                      album: album.name,
                      cover: track.cover || album.image,
                      audio:
                        track.preview_url || track.audio || track.youtubeUrl,
                      name: track.name,
                      _id: trackId,
                    };
                    const fullAlbumQueue = album.tracks.map((t) => ({
                      title: t.name,
                      artist: album.artists?.[0]?.name || album.artistName,
                      cover: t.cover || album.image,
                      audio: t.preview_url || t.audio || t.youtubeUrl,
                      name: t.name,
                      _id: t._id || t.id,
                    }));
                    playSong(songToPlay, fullAlbumQueue);
                  });
                }}
              >
                <div className="d-flex align-items-center gap-2 gap-md-3 flex-grow-1 overflow-hidden">
                  <img
                    src={track.cover || album.image}
                    className="rounded flex-shrink-0"
                    width="45"
                    height="45"
                    alt={track.name}
                  />
                  <div className="details overflow-hidden">
                    <h6
                      className="mb-0 text-truncate"
                      style={{
                        fontSize: "0.9rem",
                        maxWidth: "150px",
                        color: isCurrentTrack ? "#5773ff" : "white",
                      }}
                    >
                      {track.name}
                    </h6>
                  </div>
                </div>
                <div className="actions d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">
                  <i
                    className={`bx ${
                      isCurrentTrack && isPlaying ? "bx-pause" : "bx-play"
                    } fs-3`}
                    style={{
                      color: isCurrentTrack ? "#5773ff" : "white",
                      cursor: "pointer",
                    }}
                  ></i>
                  {isPlaylist ? (
                    <i
                      className="bx bxs-trash text-danger fs-5"
                      onClick={(e) => handleRemoveFromPlaylist(e, track)}
                    ></i>
                  ) : (
                    <i
                      className={`bx ${
                        added
                          ? "bxs-check-circle text-success"
                          : "bxs-plus-square text-secondary"
                      } fs-5`}
                      style={{ cursor: added ? "default" : "pointer" }}
                      onClick={(e) => {
                        if (!added) handleAddToPlaylist(e, track);
                      }}
                    ></i>
                  )}
                  <span
                    className="small text-secondary"
                    style={{ minWidth: "35px" }}
                  >
                    {track.duration_ms
                      ? `${Math.floor(track.duration_ms / 60000)}:${String(
                          Math.floor((track.duration_ms % 60000) / 1000),
                        ).padStart(2, "0")}`
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {album.totalPages > 1 && onPageChange && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-3 pt-3 border-top border-secondary flex-shrink-0">
            <button
              className="btn btn-sm btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "35px", height: "35px" }}
              onClick={() => onPageChange(album.currentPage - 1)}
              disabled={album.currentPage === 1}
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <span className="text-white small">
              Página {album.currentPage} de {album.totalPages}
            </span>
            <button
              className="btn btn-sm btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "35px", height: "35px" }}
              onClick={() => onPageChange(album.currentPage + 1)}
              disabled={album.currentPage === album.totalPages}
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TopSongs;
