import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useToken } from "../../../context/useToken";
import { searchArtistAndAlbums } from "../../../helpers/musicApi";
import AlbumTable from "./AlbumTable";
import {
  showWarning,
  showError,
  showConfirm,
  toastSuccess,
} from "../../../helpers/alerts";

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
      showWarning("Ingresá un nombre de artista válido.");
      return;
    }

    if (!token) {
      showWarning(
        "No hay token de Spotify. Esperá unos segundos y volvé a intentar."
      );
      return;
    }

    try {
      const result = await searchArtistAndAlbums(token, artistName);

      if (!result || !result.artist || !result.album) {
        showError(
          "Artista o álbum no encontrado. Intentá con otro nombre.",
          "No encontrado"
        );
        return;
      }

      const yaExiste = savedArtists.some((a) => a.id === result.artist.id);
      if (yaExiste) {
        showWarning("Este artista ya fue guardado.");
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
      toastSuccess(`Artista "${result.artist.name}" guardado correctamente`);
    } catch (error) {
      console.error("❌ Error al buscar artista:", error);
      showError(
        error.message || "No se pudo conectar con Spotify. Intentá nuevamente.",
        "Error de búsqueda"
      );
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    const result = await showConfirm(
      "Esta acción no se puede deshacer.",
      "¿Estás seguro de eliminar este álbum?"
    );

    if (!result.isConfirmed) {
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

    toastSuccess("Álbum eliminado correctamente");
  };

  return (
    <div className="mb-5">
      <h2 className="text-white mb-4"> Gestión de Artistas</h2>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Body>
              <h4 className="mb-3">Buscar y guardar artista</h4>
              <Form>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del artista</Form.Label>
                      <Form.Control
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Ej: Bad Bunny, Eminem, Dua Lipa..."
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
