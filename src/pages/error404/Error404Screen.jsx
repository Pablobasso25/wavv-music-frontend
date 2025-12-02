import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";

const Error404Screen = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="not-found-wrapper">
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center py-5">
        <Row className="mb-4">
          <Col>
            <Image
              src={Logo}
              alt="Logo de Wavv"
              className="wavv-logo-404"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h1 className="error-code-404">
              4<span className="error-zero">0</span>4
            </h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <p className="error-message-404">
              ¡Oops! Parece que la **onda de sonido** se desvaneció.
            </p>
            <p className="error-description-404">
              No pudimos encontrar la página que estás buscando.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="primary"
              className="back-button-404"
              onClick={handleGoHome}
            >
              Volver a la sintonía (inicio)
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error404Screen;
