import React from "react";
import { Container, Col } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { useSongs } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import Swal from "sweetalert2";

const TopSongs = ({ album, isPlaylist = false, fromHome = false }) => {
  const { playSong, currentSong, isPlaying } = useMusicPlayer();
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

    if (!trackId) {
      toast.error("Error: No se pudo identificar la canción.");
      return;
    }

    const result = await addSongToPlaylist(trackId);

    if (result.success) {
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
      Swal.fire({
        title: "¡Pásate a Premium!",
        text: "Solo puedes agregar 5 canciones con el plan gratuito. Pásate a Premium para tener playlist ilimitada.",
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
      toast.info(result.message || "Esta canción ya está en tu playlist.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
    }
  };
  if (!album || !album.tracks || album.tracks.length === 0) {
    return (
      <Col xs={12}>
        <div className="music-list bg-dark text-white rounded p-3 h-100">
          <h5>⚠️ No hay canciones disponibles</h5>
          <p className="text-secondary">
            Seleccioná un artista para ver sus canciones.
          </p>
        </div>
      </Col>
    );
  }
  return (
    <Container fluid className="px-2 px-lg-3">
      <div
        className="music-list p-3 rounded-4"
        style={{
          backgroundColor: "#111111",
          height: fromHome ? "auto" : "80vh",
          overflowY: "auto",
        }}>
        <h5 className="text-white mb-3">Canciones de {album.name}</h5>
        <div className="items">
          {album.tracks.map((track, index) => {
            const isCurrentTrack = currentSong?.title === track.name;
            return (
              <div
                key={index}
                className="item d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 cursor-pointer"
                style={{ backgroundColor: "#191B1B" }}
                onClick={() => {
                  const songToPlay = {
                    title: track.name,
                    artist: album.name,
                    cover: track.cover || album.image,
                    audio: track.preview_url || track.audio || track.youtubeUrl,
                  };
                  const fullAlbumQueue = album.tracks.map((t) => ({
                    title: t.name,
                    artist: album.name,
                    cover: t.cover || album.image,
                    audio: t.preview_url || t.audio || t.youtubeUrl,
                  }));
                  playSong(songToPlay, fullAlbumQueue);
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white">{index + 1}</span>
                  <img
                    src={track.cover || album.image}
                    width="40"
                    height="40"
                    className="rounded"
                    alt=""
                  />
                  <h6
                    className="mb-0 small"
                    style={{ color: isCurrentTrack ? "#5773ff" : "white" }}
                  >
                    {track.name}
                  </h6>
                </div>
                <div className="actions d-flex align-items-center gap-3">
                  <i
                    className="bx bxs-plus-square text-secondary fs-4"
                    onClick={(e) => handleAddClick(e, track._id || track.id)}
                  ></i>
                  <i
                    className={`bx ${isCurrentTrack && isPlaying ? "bx-pause" : "bx-play"} fs-2 text-white`}
                  ></i>
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