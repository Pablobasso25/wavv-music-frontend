import React, { useState, useEffect } from "react";
import {Container, Row, Col, Spinner} from "react-bootstrap";

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
          <h1
            className="text-primary mb-4"
           style={{ fontSize:"3.5rem", fontWeight: "bold"}}
          >
            Wavv
          </h1>
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

          <p className="text-muted mt-3">Cargando tu experiencia musical...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeScreen;