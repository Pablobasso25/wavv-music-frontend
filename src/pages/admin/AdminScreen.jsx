import React, { useState, useEffect } from "react";
import { Container, Button, Nav, Card } from "react-bootstrap";
import { getSongsRequest, getAlbumsRequest, getUsersRequest } from "../../api/songs";
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
    loadData();
  }, [currentTab]);

  const loadData = async () => {
    try {
      if (currentTab === "songs") {
        const res = await getSongsRequest();
        setSongs(res.data);
      } else if (currentTab === "users") {
        const res = await getUsersRequest();
        setUsers(res.data);
      } else if (currentTab === "artists") {
        const res = await getAlbumsRequest();
        setArtists(res.data);
      }
    } catch (error) {
      console.error(`Error cargando ${currentTab}:`, error);
    }
  };

  return (
    <Container className="pt-5 mt-3" style={{ paddingBottom: "100px" }}>
      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center mb-4 gap-3 gap-xl-5">
        <div className="mb-0 flex-shrink-0">
          <h2 className="text-white fw-bold display-6 mb-1">
            Panel de Control
          </h2>
          <p className="text-secondary m-0">
            Gestión integral de usuarios y contenido
          </p>
        </div>

        <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center gap-3 w-100 w-xl-auto order-xl-2 flex-xl-shrink-0">
          <Nav
            variant="pills"
            activeKey={currentTab}
            onSelect={(selectedKey) => setCurrentTab(selectedKey)}
            className="bg-dark border border-secondary rounded-pill p-1 d-flex flex-row order-xl-2"
          >
            <Nav.Item className="flex-fill">
              <Nav.Link
                eventKey="users"
                className={`rounded-pill px-2 px-xl-4 fw-semibold d-flex align-items-center justify-content-center ${
                  currentTab === "users"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s", fontSize: "0.85rem" }}
              >
                <i className="bi bi-people-fill me-1 me-xl-2"></i>
                <span className="d-none d-xl-inline">Usuarios</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="flex-fill">
              <Nav.Link
                eventKey="songs"
                className={`rounded-pill px-2 px-xl-4 fw-semibold d-flex align-items-center justify-content-center ${
                  currentTab === "songs"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s", fontSize: "0.85rem" }}
              >
                <i className="bi bi-music-note-beamed me-1 me-xl-2"></i>
                <span className="d-none d-xl-inline">Canciones</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="flex-fill">
              <Nav.Link
                eventKey="artists"
                className={`rounded-pill px-2 px-xl-4 fw-semibold d-flex align-items-center justify-content-center ${
                  currentTab === "artists"
                    ? "bg-primary text-white shadow"
                    : "text-secondary hover-text-white"
                }`}
                style={{ transition: "all 0.3s", fontSize: "0.85rem" }}
              >
                <i className="bi bi-mic-fill me-1 me-xl-2"></i>
                <span className="d-none d-xl-inline">Artistas</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          {(currentTab === "songs" || currentTab === "artists") && (
            <Button
              variant="success"
              className="rounded-pill px-4 fw-semibold d-flex align-items-center justify-content-center shadow order-xl-1"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg me-2"></i>
              <span className="d-none d-xl-inline">{currentTab === "songs" ? "Nueva Canción" : "Nuevo Artista"}</span>
              <span className="d-inline d-xl-none">{currentTab === "songs" ? "Canción" : "Artista"}</span>
            </Button>
          )}
        </div>
      </div>

      <Card
        className="border-0 shadow-lg overflow-auto"
        style={{ backgroundColor: "#202026", borderRadius: "1rem", maxHeight: "calc(100vh - 300px)" }}
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
