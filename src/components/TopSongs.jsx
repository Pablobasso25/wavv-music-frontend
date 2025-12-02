import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
//import trendImg from "../assets/trend.png"; // Agregar imagen cuando exista
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { toast } from "react-toastify";

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
      toast.success("✅ Esta canción ya está en tu playlist.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });

      const updatedPlaylist = [...playlist, songData];
      setPlaylist(updatedPlaylist);
      localStorage.setItem("userPlaylist", JSON.stringify(updatedPlaylist));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("playlistUpdated"));
      toast.success(`✅ "${track.name}" agregada a tu playlist.`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
    };

    const handleRemoveFromPlaylist = (track) => {
      if (!confirm(`¿Eliminar "${track.name}" de tu playlist?`)) {
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

    if (!album || !album.tracks || album.tracks.length === 0) {
      return (
        <Col xs={12}>
          <div className="music-list bg-dark text-white rounded p-3 h-100">
            <h5>⚠️ No hay canciones disponibles</h5>
            <p className="text-secondary">
              Seleccioná un artista del sidebar o agregá uno desde el panel de
              administración.
            </p>
          </div>
        </Col>
      );
    }

    return (
      <Container style={{ width: "60vw" }}>
        <div
          className="music-list p-3 rounded-4"
          style={{
            backgroundColor: "#111111",
            height: fromHome ? "calc(80vh - 280px)" : "80vh",
            overflowY: "auto",
          }}
        >
          <div className="header d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Canciones de {album.name}</h5>
            <span className="text-secondary small">{album.release_date}</span>
          </div>

          <div className="items">
            {album.tracks.map((track, index) => {
              const isCurrentTrack = currentSong?.name === track.name;

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
                    const songData = {
                      title: track.name,
                      artist: album.artists?.[0]?.name || "Artista",
                      album: album.name,
                      cover: track.cover || album.image,
                      audio: track.preview_url,
                      genre: "Music",
                      name: track.name,
                    };
                    playSong(songData);
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="fw-bold" style={{ minWidth: "30px" }}>
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
                    {track.preview_url && (
                      <i
                        className={`bx ${isCurrentTrack && isPlaying ? "bx-pause" : "bx-play"
                          } cursor-pointer fs-2`}
                        title={
                          isCurrentTrack && isPlaying ? "Pausar" : "Reproducir"
                        }
                      ></i>
                    )}

                    {isPlaylist ? (
                      <i
                        className="bx bxs-trash text-danger fs-4"
                        style={{ cursor: "pointer" }}
                        title="Eliminar de playlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromPlaylist(track);
                        }}
                      ></i>
                    ) : (
                      <i
                        className={`bx ${isInPlaylist(track.name)
                          ? "bxs-check-circle text-success"
                          : "bxs-plus-square text-secondary"
                          } fs-4`}
                        style={{ cursor: "pointer" }}
                        title={
                          isInPlaylist(track.name)
                            ? "Ya está en tu playlist"
                            : "Agregar a playlist"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          !isInPlaylist(track.name) && handleAddToPlaylist(track);
                        }}
                      ></i>
                    )}

                    <span style={{ color: "#494D4E" }}>
                      {track.duration_ms
                        ? Math.floor(track.duration_ms / 1000 / 60) +
                        ":" +
                        String(
                          Math.floor((track.duration_ms / 1000) % 60)
                        ).padStart(2, "0")
                        : "0:00"}
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
