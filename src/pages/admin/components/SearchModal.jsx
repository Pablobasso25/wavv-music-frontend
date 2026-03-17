import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, InputGroup, Button, Image } from "react-bootstrap";
import { createSongRequest, createAlbumRequest } from "../../../api/songs";
import { showSuccess, showError, showWarning } from "../../../helpers/alerts";
import "../../../index.css";

const SearchModal = ({
  show,
  onHide,
  currentTab,
  songs,
  setSongs,
  artists,
  setArtists,
  reloadData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    audioRef.current.pause();
    setPlayingTrackId(null);
  }, [currentTab, show]);

  const performSearch = async (query) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      let url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=20`;

      if (currentTab === "artists") {
        url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=20`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching iTunes:", error);
      showError("No se pudo conectar con iTunes");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    if (searchQuery.trim().length < 3) return;

    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, currentTab]);

  useEffect(() => {
    const handleEnded = () => setPlayingTrackId(null);
    const audio = audioRef.current;
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlay = (previewUrl, trackId) => {
    if (playingTrackId === trackId) {
      audioRef.current.pause();
      setPlayingTrackId(null);
    } else {
      audioRef.current.pause();
      audioRef.current.src = previewUrl;
      audioRef.current.play();
      setPlayingTrackId(trackId);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };
  const addSongFromSearch = async (track) => {
    const exists = songs?.some(
      (s) => s.title === track.trackName && s.artist === track.artistName,
    );
    if (exists) {
      showWarning("Esta canción ya está en tu lista", "Ya existe");
      return;
    }
    try {
      const newSong = {
        title: track.trackName,
        artist: track.artistName,
        image: track.artworkUrl100?.replace("100x100", "600x600"),
        audioUrl: track.previewUrl,
        duration: track.trackTimeMillis
          ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(
              Math.floor((track.trackTimeMillis % 60000) / 1000),
            ).padStart(2, "0")}`
          : "--:--",
      };
      const res = await createSongRequest(newSong);

      setSongs([...songs, res.data]);
      if (reloadData) reloadData();
      showSuccess(`${track.trackName} se agregó correctamente.`, "¡Agregada!");
    } catch (error) {
      showError("No se pudo procesar el audio en el servidor");
    }
  };
  const addArtistFromSearch = async (album) => {
    const exists = artists.some(
      (a) => a.album?.collectionId === album.collectionId,
    );
    if (exists) {
      showWarning("Este álbum ya está en tu lista", "Ya existe");
      return;
    }
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${album.collectionId}&entity=song`,
      );
      const data = await response.json();
      const tracks = data.results.slice(1);
      const newAlbum = {
        collectionId: album.collectionId,
        name: album.collectionName,
        artistName: album.artistName,
        image: album.artworkUrl100?.replace("100x100", "600x600"),
        tracks: tracks.map((track) => ({
          trackId: track.trackId,
          name: track.trackName,
          duration_ms: track.trackTimeMillis,
          audioUrl: track.previewUrl,
          cover: track.artworkUrl100?.replace("100x100", "600x600"),
        })),
      };
      const res = await createAlbumRequest(newAlbum);
      setArtists([...artists, res.data]);
      if (reloadData) reloadData();
      showSuccess(
        `${album.collectionName} se agregó correctamente.`,
        "¡Agregado!",
      );
    } catch (error) {
      showError("No se pudo agregar el álbum");
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      style={{ paddingTop: "90px" }}
      contentClassName="search-modal-content text-white shadow-lg"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-bottom border-secondary border-opacity-25"
      >
        <Modal.Title className="fw-bold fs-4">
          {currentTab === "artists" ? "Buscar Álbum" : "Buscar Canción"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-4">
            <Form.Control
              placeholder={
                currentTab === "artists"
                  ? "Escribe el nombre del artista o del álbum..."
                  : "Buscar por canción o artista..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black text-white border-secondary white-placeholder search-input py-2"
              autoFocus
            />
            <Button
              variant="primary"
              type="submit"
              disabled={isSearching}
              className="px-4"
              style={{ backgroundColor: "#5773ff", borderColor: "#5773ff" }}
            >
              {isSearching ? "Buscando..." : <i className="bi bi-search"></i>}
            </Button>
          </InputGroup>
        </Form>
        <div
          className="search-results pe-2 custom-scrollbar"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((track) => (
              <div
                key={track.trackId || track.collectionId}
                className="d-flex align-items-center justify-content-between p-3 mb-3 rounded-4 search-result-item"
              >
                <div className="d-flex align-items-center gap-3">
                  <Image
                    src={track.artworkUrl100}
                    rounded
                    width={50}
                    height={50}
                    className="shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="fw-bold">
                      {currentTab === "artists"
                        ? track.collectionName
                        : track.trackName}
                    </div>
                    <div className="text-white-50 small mt-1">
                      {track.artistName}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {track.previewUrl && (
                    <Button
                      variant="outline-light"
                      className="rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderColor: "rgba(255,255,255,0.2)",
                      }}
                      onClick={() =>
                        togglePlay(
                          track.previewUrl,
                          track.trackId || track.collectionId,
                        )
                      }
                      title={
                        playingTrackId === (track.trackId || track.collectionId)
                          ? "Pausar preview"
                          : "Escuchar preview"
                      }
                    >
                      <i
                        className={`bi ${playingTrackId === (track.trackId || track.collectionId) ? "bi-pause-fill" : "bi-play-fill"} fs-5`}
                        style={{
                          marginLeft:
                            playingTrackId ===
                            (track.trackId || track.collectionId)
                              ? "0"
                              : "2px",
                        }}
                      ></i>
                    </Button>
                  )}
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill px-3 fw-semibold border-2 d-flex align-items-center gap-1"
                    onClick={() =>
                      currentTab === "artists"
                        ? addArtistFromSearch(track)
                        : addSongFromSearch(track)
                    }
                  >
                    <i className="bi bi-plus-lg"></i> Agregar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-secondary py-4">
              {isSearching
                ? "Buscando..."
                : searchQuery
                  ? searchQuery.trim().length < 3
                    ? "Ingresa al menos 3 caracteres..."
                    : "No se encontraron resultados"
                  : "Escribe algo para buscar"}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
