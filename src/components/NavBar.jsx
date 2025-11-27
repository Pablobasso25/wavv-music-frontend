import { Navbar, Container, Nav, Form, Dropdown, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="py-3" style={{ backgroundColor: "#000" }}>
      <Container>
        <Navbar.Brand href="#" className="text-white fw-bold logo-custom">
          Wavv
        </Navbar.Brand>

        <Navbar.Toggle   
          className="text-secondary border-0" />

        <NavBar.Collapse>
          <Nav className="mx-auto my-3 my-lg-0 text-center">
            <NavLink  className="text-secondary text-uppercase fw-bold mx-2 nav-link-custom">
              <i className="bx bx-home-alt me-1"></i>
              Home
              </NavLink>
            <NavLink  
            className="text-secondary text-uppercase fw-bold mx-2 nav-link-custom"
            >
              <i className="bx bx-list-ul me-1"></i>
              Playlist
              </NavLink>
            <NavLink  
            className="text-secondary text-uppercase fw-bold mx-2 nav-link-custom"
            >
              NOSOTROS
            </NavLink>
            <NavLink  
            className="text-warning text-uppercase fw-bold mx-2 nav-link-custom"
            >
              <i className="bx bx-cog me-1"></i>
              ADMIN
              </NavLink>
          </Nav>
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
            <div className="search position-relative">
               <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50"></i>
              <div  className="spinner-border spinner-border-sm position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ width: "1rem", height: "1rem" }}
              >
                <span className="visually-hidden">Buscando...</span>
              </div>
            </div>
          </div>

          <Form.Control 
            type="text"
            className="ps-5 border-dark text-white custom-search-input"
            placeholder="Buscar canciones..." 
            style={{
                    width: "250px",
                    backgroundColor: "#1a1a1a",
                    borderColor: "#000000ff",
                    color: "#fff",
                  }}
          />
          <div
           className="search-dropdown position-absolute mt-2 rounded-3 shadow-lg"
                    style={{
                      backgroundColor: "#202026",
                      width: "400px",
                      maxHeight: "500px",
                      overflowY: "auto",
                      zIndex: 1050,
                      border: "1px solid #333",
                    }}
          >
            <div className="p-3 text-center text-secondary">
              <div  className="spinner-border spinner-border-sm me-2">
                <span className="visually-hidden">Buscando...</span>
              </div>
              Buscando...
            </div>
            <div className="p-2 border-bottom border-secondary">
              <small className="text-secondary fw-bold"
              >resultados
              </small>
            </div>
            <div
             className="search-result-item d-flex align-items-center p-3 border-bottom border-dark"
                            style={{
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
            >
              <img src="" alt=""
              width="50"
              height="50"
               className="rounded me-3" 
               />
              <div className="flex-grow-1">
                <h6
                 className="mb-0 text-white"
                 style={{ fontSize: "0.9rem" }}
                >

                </h6>
                <small className="text-secondary">

                </small>
              </div>
              <div className="d-flex gap-2">
                <i  className="bx bx-play-circle fs-4 text-primary"
                    style={{ cursor: "pointer" }}
                ></i>
                <i className="bx bx-plus-circle fs-4 text-secondary"
                   style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
          </div>
          <div className="p-3 text-center text-secondary">
            <i className="bx bx-search-alt fs-2 d-block mb-2"></i>
            No se encontraron resultados
          </div>

          <div className="d-flex align-items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle
               className="d-flex align-items-center  profile-toggle"
               style={{ backgroundColor: "transparent" }} 
              >
                <div className="d-flex align-items-center">
                  <div className="bg-secondary rounded-start p-1">
                    <img src=""  
                      className="rounded"
                      width="35"
                      height="35"
                      alt="" />
                  </div>
                  <div className="rounded-end p-2  d-md-block">
                    <h6 className="mb-0 text-white">

                    </h6>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className=" border-secondary"
                style={{ backgroundColor: "#000", borderColor: "#000" }}
              >
                <Dropdown.Item
                  className="text-white d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-log-out me-2"></i>
                  <span>Cerrar Sesión</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-white d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-user me-2"></i>
                  <span>Perfil</span>
                </Dropdown.Item>
                <Dropdown.Item 
                  className="text-white d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-cog me-2"></i>
                  <span>Configuración</span>
                </Dropdown.Item>

                <Dropdown.Item 
                  className="text-white d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-crown me-2"></i>
                  <span>Premium</span>
                  <Badge bg="warning" text="dark" className="ms-2">
                    PRO
                  </Badge>
                </Dropdown.Item>

                <Dropdown.Item 
                  className="text-warning d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-shield me-2"></i>
                  <span>Panel Admin</span>
                </Dropdown.Item>

                <Dropdown.Divider className="border-secondary" />
                <Dropdown.Item
                  className="text-white d-flex align-items-center dropdown-item-custom"
                  style={{ backgroundColor: "#000" }}
                >
                  <i className="bx bx-log-out me-2"></i>
                  <span>Cerrar Sesión</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </NavBar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
