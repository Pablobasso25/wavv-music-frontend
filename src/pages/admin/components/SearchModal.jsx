import React, { useState } from "react";
import { Modal, Form, InputGroup, Button, Image } from "react-bootstrap";
import { createSongRequest, createAlbumRequest } from "../../../api/songs";
import { showSuccess, showError, showWarning } from "../../../helpers/alerts";

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
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      let url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&limit=10`;

      if (currentTab === "artists") {
        url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=album&limit=10`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching iTunes:", error);
      showError("No se pudo conectar con iTunes");
    } finally {
      setIsSearching(false);
    }
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
      centered
      contentClassName="bg-dark text-white border-secondary"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="border-secondary"
      >
        <Modal.Title>
          {currentTab === "artists" ? "Buscar Artista" : "Buscar Canción"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-4">
            <Form.Control
              placeholder="Buscar por canción o artista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black text-white border-secondary"
              autoFocus
            />
            <Button variant="primary" type="submit" disabled={isSearching}>
              {isSearching ? "Buscando..." : <i className="bi bi-search"></i>}
            </Button>
          </InputGroup>
        </Form>
        <div
          className="search-results"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((track) => (
              <div
                key={track.trackId || track.collectionId}
                className="d-flex align-items-center justify-content-between p-2 mb-2 rounded"
                style={{ borderBottom: "1px solid #333" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <Image
                    src={track.artworkUrl100}
                    rounded
                    width={50}
                    height={50}
                  />
                  <div>
                    <div className="fw-bold">
                      {currentTab === "artists"
                        ? track.collectionName
                        : track.trackName}
                    </div>
                    <div className="text-white-50 small">
                      {track.artistName}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {track.previewUrl && (
                    <audio
                      controls
                      src={track.previewUrl}
                      className="d-none d-md-block"
                      style={{ height: "30px", width: "200px" }}
                    />
                  )}
                  <Button
                    variant="outline-success"
                    size="sm"
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
                  ? "No se encontraron resultados"
                  : "Escribe algo para buscar"}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
