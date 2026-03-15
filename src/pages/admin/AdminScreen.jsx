import React from "react";
import { Container, Button, Nav, Card, Spinner } from "react-bootstrap";
import UsersTable from "./components/UsersTable";
import SongsTable from "./components/SongsTable";
import ArtistsTable from "./components/ArtistsTable";
import SearchModal from "./components/SearchModal";
import PlansManager from "./components/PlansManager";
import { useAdminData } from "./useAdminData";

const AdminScreen = () => {
  const {
    currentTab,
    setCurrentTab,
    users,
    setUsers,
    songs,
    setSongs,
    artists,
    setArtists,
    plans,
    loading,
    showModal,
    setShowModal,
    loadData,
  } = useAdminData();

  const renderNavLink = (key, icon, label) => (
    <Nav.Item className="flex-fill">
      <Nav.Link
        eventKey={key}
        className={`rounded-pill px-2 px-xl-4 fw-semibold d-flex align-items-center justify-content-center ${
          currentTab === key
            ? "bg-primary text-white shadow"
            : "text-secondary hover-text-white"
        }`}
        style={{ transition: "all 0.3s", fontSize: "0.85rem", border: "none" }}
      >
        <i className={`bi ${icon} me-1 me-xl-2`}></i>
        <span className="d-none d-xl-inline">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );

  return (
    <Container className="pt-5 mt-3" style={{ paddingBottom: "100px" }}>
      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center mb-4 gap-3 gap-xl-5">
        <div className="mb-0 flex-shrink-0">
          <h2 className="text-white fw-bold display-6 mb-1">
            Panel de Control
          </h2>
        </div>
        <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center gap-3 w-100 w-xl-auto order-xl-2 flex-xl-shrink-0">
          <Nav
            variant="pills"
            activeKey={currentTab}
            onSelect={(k) => setCurrentTab(k)}
            className="bg-dark border border-secondary rounded-pill p-1 d-flex flex-row order-xl-2"
          >
            {renderNavLink("users", "bi-people-fill", "Usuarios")}
            {renderNavLink("songs", "bi-music-note-beamed", "Canciones")}
            {renderNavLink("artists", "bi-mic-fill", "Artistas")}
            {renderNavLink("plans", "bi-credit-card-fill", "Planes")}
          </Nav>

          {(currentTab === "songs" || currentTab === "artists") && (
            <Button
              variant="success"
              className="rounded-pill px-4 fw-semibold d-flex align-items-center justify-content-center shadow order-xl-1"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg me-2"></i>
              <span>
                {currentTab === "songs" ? "Nueva Canción" : "Nuevo Artista"}
              </span>
            </Button>
          )}
        </div>
      </div>
      <Card
        className="border-0 shadow-lg"
        style={{
          backgroundColor: "var(--bg-card, #202026)",
          borderRadius: "1rem",
          minHeight: "400px",
        }}
      >
        <Card.Body className="p-0">
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
              <Spinner animation="border" variant="primary" className="mb-2" />
              <span className="text-secondary">Cargando {currentTab}...</span>
            </div>
          ) : (
            <div>
              {currentTab === "users" && (
                <UsersTable users={users} setUsers={setUsers} />
              )}
              {currentTab === "songs" && (
                <SongsTable songs={songs} setSongs={setSongs} />
              )}
              {currentTab === "artists" && (
                <ArtistsTable artists={artists} setArtists={setArtists} />
              )}
              {currentTab === "plans" && (
                <PlansManager plans={plans} reloadPlans={loadData} />
              )}
            </div>
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
        reloadData={loadData}
      />
    </Container>
  );
};

export default AdminScreen;