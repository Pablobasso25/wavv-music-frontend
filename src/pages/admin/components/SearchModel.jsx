import React, { useState } from "react";
import { Modal, Form, InputGroup, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";

const SearchModal = ({ show, onHide, currentTab, songs, setSongs, artists, setArtists }) => {
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
      Swal.fire("Error", "No se pudo conectar con iTunes", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const addSongFromSearch = (track) => {
    const exists = songs.some(
      (s) => s.title === track.trackName && s.artist === track.artistName
    );

    if (exists) {
      Swal.fire({
        title: "Ya existe",
        text: "Esta canción ya está en tu lista",
        icon: "info",
        background: "#1a1a1a",
        color: "#fff",
      });
      return;
    }

    const newSong = {
      _id: Date.now(),
      title: track.trackName,
      name: track.trackName,
      artist: track.artistName,
      album: track.collectionName || "Single",
      cover: track.artworkUrl100?.replace("100x100", "600x600"),
      audio: track.previewUrl,
      duration: track.trackTimeMillis
        ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(
            Math.floor((track.trackTimeMillis % 60000) / 1000)
          ).padStart(2, "0")}`
        : "--:--",
      plays: "0",
    };

    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));

    Swal.fire({
      title: "¡Agregada!",
      text: `${track.trackName} se agregó correctamente.`,
      icon: "success",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const addArtistFromSearch = (item) => {
    const exists = artists.some((a) => a.name === item.artistName);

    if (exists) {
      Swal.fire({
        title: "Ya existe",
        text: "Este artista ya está en tu lista",
        icon: "info",
        background: "#1a1a1a",
        color: "#fff",
      });
      return;
    }

    const newArtist = {
      id: Date.now(),
      name: item.artistName,
      image: item.artworkUrl100?.replace("100x100", "600x600"),
      album: {
        name: item.collectionName,
        image: item.artworkUrl100?.replace("100x100", "600x600"),
        artist: item.artistName,
      },
    };

    const updatedArtists = [...artists, newArtist];
    setArtists(updatedArtists);
    localStorage.setItem("artistas", JSON.stringify(updatedArtists));

    Swal.fire({
      title: "¡Agregado!",
      text: `${item.artistName} se agregó correctamente.`,
      icon: "success",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      contentClassName="bg-dark text-white border-secondary"
    >
      <Modal.Header closeButton closeVariant="white" className="border-secondary">
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

        <div className="search-results" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {searchResults.length > 0 ? (
            searchResults.map((track) => (
              <div
                key={track.trackId || track.collectionId}
                className="d-flex align-items-center justify-content-between p-2 mb-2 rounded"
                style={{ borderBottom: "1px solid #333" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <Image src={track.artworkUrl100} rounded width={50} height={50} />
                  <div>
                    <div className="fw-bold">
                      {currentTab === "artists" ? track.artistName : track.trackName}
                    </div>
                    <div className="text-white-50 small">
                      {currentTab === "artists" ? track.collectionName : track.artistName}
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
