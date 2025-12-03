import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo1.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{ background: "black", color: "white", padding: "20px 40px" }}
    >
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col
            md={4}
            className="d-flex justify-content-center justify-content-md-start"
          >
            <img
              src={Logo}
              alt="Wavv Music"
              height="40"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Col>

          <Col
            md={4}
            className="d-flex justify-content-center gap-4 mt-2 mt-md-0"
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
              INICIO
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about-us");
              }}
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              NOSOTROS
            </a>
          </Col>

          <Col
            md={4}
            className="d-flex justify-content-center justify-content-md-end gap-3 mt-2 mt-md-0"
            style={{ fontSize: "24px" }}
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
