import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AdminForm from "../../../components/AdminForm";
import SongTable from "./SongTable";

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


    const handleDeleteSong = (songId) => {
        if (!confirm("¿Estás seguro de eliminar esta canción?")) {
            return;
        }

        const updatedSongs = songs.filter((song) => song.id !== songId);
        setSongs(updatedSongs);
        localStorage.setItem("songs", JSON.stringify(updatedSongs));
        window.dispatchEvent(new Event("storage"));
        alert("✅ Canción eliminada correctamente.");
    };


    const handleSaveSong = () => {
        setEditingSong(null);
    };



    return (
        <Row className="mb-5">

            <Col md={5}>
                <AdminForm type="song" editData={editingSong} onSave={handleSaveSong} />
            </Col>

            <Col md={7}>
                <SongTable
                    songs={songs}
                    onEdit={handleEditSong}
                    onDelete={handleDeleteSong}
                />
            </Col>
        </Row>
    );
};

export default SongsSection;