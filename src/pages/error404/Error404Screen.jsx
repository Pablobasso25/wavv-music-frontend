import React from "react";
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LOGO_PATH from '../../assets/images/logo.png';
import '../error404/Error404Screen.css';


const Error404Screen = () => {
  return (
    <div className="not-found-wrapper">
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center py-5">
        <Row className="mb-4">
          <Col>
            <Image
              src={LOGO_PATH}
              alt="Logo de Wavv"
              className="wavv-logo-404"
              fluid
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h1 className="error-code-404">
              4<span className="error-zero">0</span>4
            </h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p className="error-message-404">
              ¡Oops! Parece que la **onda de sonido** se desvanecio.
            </p>
            <p className="error-description-404">
              No pudimos encontrar la pagina que estas buscando.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="prymary" className="back-button-404">
              Volver a la sintonia (inicio)
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error404Screen;

