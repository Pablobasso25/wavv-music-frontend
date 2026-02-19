import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { useSongs } from "../context/SongContext";
import { toast } from "react-toastify";

const TrendingSong = ({ song }) => {
  const { playSong } = useMusicPlayer();
  const { addSongToPlaylist } = useSongs();

  if (!song) return null;

  const handleAddToPlaylist = async () => {
    const songData = { songId: song._id };
    const result = await addSongToPlaylist(songData);
    if (result.success) {
      toast.success("Canción agregada a tu playlist");
    } else if (result.code === "SONG_ALREADY_IN_PLAYLIST") {
      toast.info("Esta canción ya está en tu playlist");
    } else {
      toast.error("No se pudo agregar la canción");
    }
  };
  
  return (
    <Container fluid className="px-2 px-lg-3 mb-3">
      <Row
        className="align-items-center p-3 p-lg-4 rounded-4 mx-0"
        style={{ backgroundColor: "#000000ff" }}
      >
        <Col
          xs={12}
          md={7}
          className="d-flex flex-column gap-2 gap-lg-3 mb-3 mb-md-0"
        >
          <h2 className="h3 h2-lg">{song.title}</h2>
          <h4 className="h5 h4-lg">{song.artist}</h4>
          <div className="d-flex gap-3 mt-4 align-items-center">
            <Button
              className="px-4 py-2 rounded-pill fw-semibold"
              style={{
                backgroundColor: "#5773ff",
                border: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#4562ee"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#5773ff"}
              onClick={() =>
                playSong({
                  title: song.title,
                  artist: song.artist,
                  cover: song.image,
                  audio: song.youtubeUrl,
                  name: song.title,
                })
              }
            >
              <i className="bx bx-play me-2"></i> Reproducir
            </Button>
            <Button
              variant="outline-light"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px", transition: "all 0.3s" }}
              onClick={handleAddToPlaylist}
              title="Agregar a playlist"
            >
              <i className="bx bxs-heart fs-5"></i>
            </Button>
          </div>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <img
            src={song.image}
            alt={song.title}
            width="250"
            className="img-fluid rounded-3"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TrendingSong;
