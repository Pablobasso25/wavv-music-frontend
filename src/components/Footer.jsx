import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaInstagram } from "react-icons/fa";
import logo from "./logo.jpeg";

const Footer = () => {
  return (
    <footer style={{ background: "black", color: "white", padding: "40px" }}>
      <Container>
        <Row className="align-items-center text-center text-md-start">

          <Col md={4}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "90px", objectFit: "contain" }}
            />
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
              <FaGithub />
            </a>
            <a href="#" style={{ color: "#b56dff" }}>
              <FaInstagram />
            </a>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
