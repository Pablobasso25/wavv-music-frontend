import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Inicio
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/404");
              }}
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Nosotros
            </a>
          </Col>

          <Col
            md={4}
            className="d-flex justify-content-center justify-content-md-end gap-3 mt-3 mt-md-0"
            style={{ fontSize: "28px" }}
          >
            <a
              href="https://github.com/Pablobasso25/Wavv-Music"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#b56dff", cursor: "pointer" }}
            >
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/404");
              }}
              style={{ color: "#b56dff", cursor: "pointer" }}
            >
              <i className="bx bxl-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
