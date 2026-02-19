import React, { useState, useEffect } from "react";
import { Container, Button, Nav, Card } from "react-bootstrap";
import { defaultSongs, defaultUsers } from "../../data/dataDefault";
import UsersTable from "./components/UsersTable";
import SongsTable from "./components/SongsTable";
import ArtistsTable from "./components/ArtistsTable";
import SearchModal from "./components/SearchModal";

const AdminScreen = () => {

  const [currentTab, setCurrentTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    let storedSongs = JSON.parse(localStorage.getItem("songs"));
    const storedArtists = JSON.parse(localStorage.getItem("artistas")) || [];

    if (!storedUsers || storedUsers.length === 0) {
      storedUsers = defaultUsers;
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    if (!storedSongs || storedSongs.length === 0) {
      storedSongs = defaultSongs;
      localStorage.setItem("songs", JSON.stringify(storedSongs));
    }

    setUsers(storedUsers);
    setSongs(storedSongs);
    setArtists(storedArtists);
  }, []);

  return (
    <Container className="my-5 pt-5">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 mt-4">
        <div className="mb-3 mb-md-0">
          <h2 className="text-white fw-bold display-6 mb-1">
            Panel de Control
          </h2>
          <p className="text-secondary m-0">
            Gestión integral de usuarios y contenido
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          {(currentTab === "songs" || currentTab === "artists") && (
            <Button
              variant="success"
              className="rounded-pill px-4 fw-semibold d-flex align-items-center shadow"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg me-2"></i>
              {currentTab === "songs" ? "Nueva Canción" : "Nuevo Artista"}
            </Button>
          )}

          <Nav
            variant="pills"
            activeKey={currentTab}
            onSelect={(selectedKey) => setCurrentTab(selectedKey)}
            className="bg-dark border border-secondary rounded-pill p-1"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="users"
                className={`rounded-pill px-4 fw-semibold d-flex align-items-center ${
                  currentTab === "users"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s" }}
              >
                <i className="bi bi-people-fill me-2"></i>
                Usuarios
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="songs"
                className={`rounded-pill px-4 fw-semibold d-flex align-items-center ${
                  currentTab === "songs"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s" }}
              >
                <i className="bi bi-music-note-beamed me-2"></i>
                Canciones
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="artists"
                className={`rounded-pill px-4 fw-semibold d-flex align-items-center ${
                  currentTab === "artists"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s" }}
              >
                <i className="bi bi-mic-fill me-2"></i>
                Artistas
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>

      <Card
        className="border-0 shadow-lg overflow-hidden"
        style={{ backgroundColor: "#202026", borderRadius: "1rem" }}
      >
        <Card.Body className="p-0">

          {currentTab === "users" && (
            <UsersTable users={users} setUsers={setUsers} />
          )}

          {currentTab === "songs" && (
            <SongsTable songs={songs} setSongs={setSongs} />
          )}

          {currentTab === "artists" && (
            <ArtistsTable artists={artists} setArtists={setArtists} />
          )}

        </Card.Body>
      </Card>

      <SearchModal
        show={showModal}
        onHide={() => setShowModal(false)}
        currentTab={currentTab}
        songs={songs}
        setSongs={setSongs}
        artists={artists}
        setArtists={setArtists}
      />
    </Container>
  );
};

export default AdminScreen;
