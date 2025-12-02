import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ background: "black", color: "white", padding: "40px" }}>
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4}>
            <h3 style={{ color: "#5773ff", fontWeight: "bold", margin: 0 }}>
              Wavv Music
            </h3>
          </Col>

          <Col
            md={4}
            className="d-flex justify-content-center gap-5 mt-3 mt-md-0"
          >
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              Inicio
            </a>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>
              Nosotros
            </a>
          </Col>

          <Col
            md={4}
            className="d-flex justify-content-center justify-content-md-end gap-3 mt-3 mt-md-0"
            style={{ fontSize: "28px" }}
          >
            <a href="#" style={{ color: "#b56dff" }}>
              <i className="bx bxl-github"></i>
            </a>
            <a href="#" style={{ color: "#b56dff" }}>
              <i className="bx bxl-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
