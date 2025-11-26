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
          aria-controls="basic-navbar-nav"
          className="text-secondary border-0"
        />

        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto my-3 my-lg-0 text-center">
            <NavLink
              to="/"
              className="text-secondary text-uppercase fw-bold mx-2 nav-link-custom"
            >
              <i className="bx bx-home-alt me-1"></i>
              Home
            </NavLink>
            <NavLink
              to="/playlist"
              className="text-secondary text-uppercase fw-bold mx-2 nav-link-custom"
            >
              <i className="bx bx-list-ul me-1"></i>
              Playlist
            </NavLink>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
