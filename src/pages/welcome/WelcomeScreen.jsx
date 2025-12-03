import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import LogoWelcome from "../../assets/images/logo1.png";

const WelcomeScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3.33;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#000",
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
      }}
    >
      <Row className="align-items-center text-white text-center">
        <Col>
          <div className="mb-4">
            <img
              src={LogoWelcome}
              alt="Wavv Music Logo"
              height="100"
              className="mb-3"
              style={{
                filter: "drop-shadow(0 0 20px rgba(13, 110, 253, 0.5))",
              }}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-secondary mb-3">Sintonizando...</h3>
            <Spinner
              animation="grow"
              variant="primary"
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "4px",
                backgroundColor: "#0d6efd",
                borderRadius: "2px",
                transition: "width 0.1s ease",
              }}
            />
          </div>

          <p className="text-white-50 mt-3">
            Cargando tu experiencia musical...
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeScreen;
