import { Navbar, Container, Nav, Form, Dropdown, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          Wavv
        </Navbar.Brand>

        <Navbar.Toggle/>

        <NavBar.Collapse>
          <Nav>
            <NavLink>
              Home
            </NavLink>
            <NavLink>
              Playlist
            </NavLink>
            <NavLink>
              NOSOTROS
            </NavLink>
            <NavLink>
              ADMIN
            </NavLink>
          </Nav>
          <div>
            <div>
              <div>
                <span>Buscando...</span>
              </div>
            </div>
          </div>
        </NavBar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
