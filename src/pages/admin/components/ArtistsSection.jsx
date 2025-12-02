import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useToken } from "../../../context/useToken";
import { searchArtistAndAlbums } from "../../../helpers/musicApi";
import AlbumTable from "./AlbumTable";

const ArtistsSection = ({
  albums,
  setAlbums,
  savedArtists,
  setSavedArtists,
}) => {
  const { token } = useToken();
  const [artistName, setArtistName] = useState("");

  const handleSearchAndSaveArtist = async () => {
    if (!artistName.trim()) {
      alert("⚠️ Ingresá un nombre de artista válido.");
      return;
    }

    if (!token) {
      alert(
        "⚠️ No hay token de Spotify. Esperá unos segundos y volvé a intentar."
      );
      return;
    }

    try {
      const result = await searchArtistAndAlbums(token, artistName);

      if (!result || !result.artist || !result.album) {
        alert("❌ Artista o álbum no encontrado. Intentá con otro nombre.");
        return;
      }

      const yaExiste = savedArtists.some((a) => a.id === result.artist.id);
      if (yaExiste) {
        alert("⚠️ Este artista ya fue guardado.");
        return;
      }

      const artistaConAlbum = {
        ...result.artist,
        album: result.album,
      };

      const updatedArtists = [...savedArtists, artistaConAlbum];
      setSavedArtists(updatedArtists);
      localStorage.setItem("artistas", JSON.stringify(updatedArtists));

      const updatedAlbums = [...albums, result.album];
      setAlbums(updatedAlbums);
      localStorage.setItem("albums", JSON.stringify(updatedAlbums));

      window.dispatchEvent(new Event("storage"));

      setArtistName("");
      alert(`✅ Artista "${result.artist.name}" guardado correctamente.`);
    } catch (error) {
      console.error("❌ Error al buscar artista:", error);
      alert(`❌ Error al buscar el artista: ${error.message}`);
    }
  };

  const handleDeleteAlbum = (albumId) => {
    if (!confirm("¿Estás seguro de eliminar este álbum?")) {
      return;
    }

    const updatedAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(updatedAlbums);
    localStorage.setItem("albums", JSON.stringify(updatedAlbums));

    const updatedArtists = savedArtists.filter(
      (artist) => artist.album.id !== albumId
    );
    setSavedArtists(updatedArtists);
    localStorage.setItem("artistas", JSON.stringify(updatedArtists));

    window.dispatchEvent(new Event("storage"));

    alert("✅ Álbum eliminado correctamente.");
  };

  return (
    <div className="mb-5">
      <h2 className="text-white mb-4"> Gestión de Artistas</h2>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Body>
              <h4 className="mb-3">Buscar y guardar artista desde Spotify</h4>
              <Form>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del artista</Form.Label>
                      <Form.Control
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Ej: Bad Bunny, Taylor Swift, The Weeknd..."
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                    <Button
                      variant="warning"
                      onClick={handleSearchAndSaveArtist}
                      className="mb-3 w-100"
                    >
                      Buscar y Guardar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <AlbumTable albums={albums} onDelete={handleDeleteAlbum} />
        </Col>
      </Row>
    </div>
  );
};

export default ArtistsSection;
