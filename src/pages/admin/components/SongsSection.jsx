import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AdminForm from "../AdminForm";
import SongTable from "./SongTable";
import { showConfirm, toastSuccess } from "../../../helpers/alerts";

const SongsSection = ({ songs, setSongs }) => {
  const [editingSong, setEditingSong] = useState(null);

  const handleEditSong = (song) => {
    setEditingSong({
      id: song.id,
      title: song.title,
      artist: song.artist,
      url: song.audio,
      cover: song.cover,
      plays: song.plays,
    });
  };

  const handleDeleteSong = async (songId) => {
    const result = await showConfirm(
      "Esta acción no se puede deshacer.",
      "¿Estás seguro de eliminar esta canción?"
    );

    if (!result.isConfirmed) {
      return;
    }

    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
    window.dispatchEvent(new Event("storage"));
    toastSuccess("Canción eliminada correctamente");
  };

  const handleSaveSong = () => {
    setEditingSong(null);
  };

  return (
    <div className="mb-5">
      <h2 className="text-white mb-4"> Gestión de Canciones</h2>
      <Row className="mb-5">
        <Col md={5}>
          <AdminForm
            type="song"
            editData={editingSong}
            onSave={handleSaveSong}
          />
        </Col>

        <Col md={7}>
          <SongTable
            songs={songs}
            onEdit={handleEditSong}
            onDelete={handleDeleteSong}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SongsSection;
