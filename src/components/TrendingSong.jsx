import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const TrendingSong = ({ song }) => {
  const { playSong } = useMusicPlayer();

  if (!song) return null;
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
          <div className="d-flex gap-3 mt-4">
            <Button
              variant="primary"
              className="px-4 py-2 rounded-pill"
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
            <i
              className="bx bxs-heart text-primary fs-5 border border-white rounded-circle p-2"
              style={{ cursor: "pointer" }}
              title="Agregar a favoritos"
            ></i>
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
