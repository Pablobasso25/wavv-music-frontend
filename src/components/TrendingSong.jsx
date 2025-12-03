import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const TrendingSong = () => {
  const { playSong } = useMusicPlayer();
  const [trendingSong, setTrendingSong] = useState({
    title: "Lost Emotions",
    artist: "Rion Clarke",
    album: "Digital Dreams",
    cover:
      "https://images.unsplash.com/photo-1737111869062-c96a5514cc08?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    genre: "Electronic",
    plays: "63.234.567 Reproducciones",
  });

  useEffect(() => {
    const loadTrendingSong = () => {
      const storedTrending = localStorage.getItem("trendingSong");
      if (storedTrending) {
        setTrendingSong(JSON.parse(storedTrending));
      }
    };

    loadTrendingSong();
    window.addEventListener("storage", loadTrendingSong);

    return () => window.removeEventListener("storage", loadTrendingSong);
  }, []);

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
          <h2 className="h3 h2-lg">{trendingSong.title}</h2>
          <h4 className="h5 h4-lg">{trendingSong.artist}</h4>
          {trendingSong.plays && (
            <p className="text-secondary mb-0">
              <i className="bx bx-play-circle me-2"></i>
              {trendingSong.plays}
            </p>
          )}
          <div className="d-flex gap-3 mt-4">
            <Button
              variant="primary"
              className="px-4 py-2 rounded-pill"
              onClick={() =>
                playSong({
                  title: trendingSong.title,
                  artist: trendingSong.artist,
                  album: trendingSong.album,
                  cover: trendingSong.cover,
                  audio: trendingSong.audio,
                  genre: trendingSong.genre,
                  name: trendingSong.title,
                })
              }
            >
              <i className="bx bx-play me-2"></i>
              Reproducir
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
            src={
              trendingSong.cover ||
              "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Trending"
            }
            alt={trendingSong.title}
            className="img-fluid rounded-3"
            style={{
              maxWidth: "250px",
              width: "100%",
              height: "auto",
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TrendingSong;
