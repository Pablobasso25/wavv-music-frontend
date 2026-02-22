import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { useSongs } from "../../context/SongContext";
import { toast } from "react-toastify";
import defaultImage from "../../assets/images/publicidad2.png";

const TrendingSong = ({ songs }) => {
  const { playSong } = useMusicPlayer();
  const { addSongToPlaylist } = useSongs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!songs || songs.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setFade(true);
      }, 500);
    }, 2700);

    return () => clearInterval(interval);
  }, [songs]);

  if (!songs || songs.length === 0) return null;

  const song = songs[currentIndex];

  const handleAddToPlaylist = async () => {
    const songData = song._id
      ? { songId: song._id }
      : {
          externalSong: {
            title: song.title,
            artist: song.artist,
            image: song.image,
            youtubeUrl: song.youtubeUrl,
            duration: song.duration || "--:--",
          },
        };
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
        style={{
          backgroundColor: "#000000ff",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Col xs={7} md={7} className="d-flex flex-column gap-2 gap-lg-3">
          <h2 className="h4 h3-lg">{song.title}</h2>
          <h4 className="h6 h5-lg">{song.artist}</h4>
          <div className="d-flex gap-3 mt-3 mt-lg-4 align-items-center">
            <Button
              className="px-3 px-lg-4 py-2 rounded-pill fw-semibold"
              style={{
                backgroundColor: "#5773ff",
                border: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4562ee")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5773ff")}
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
        <Col
          xs={5}
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={song.image || defaultImage}
            alt={song.title}
            className="img-fluid rounded-3"
            style={{
              maxHeight: "180px",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TrendingSong;
