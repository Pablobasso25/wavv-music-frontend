import React from "react"
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function WelcomeScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Generate irregular waveform pattern
  const generateIrregularHeight = (index, isActive) => {
    if (!isActive) return 10;
    
    // Create irregular pattern with multiple sine waves
    const wave1 = Math.sin(index * 0.3) * 30;
    const wave2 = Math.sin(index * 0.15) * 20;
    const wave3 = Math.cos(index * 0.5) * 15;
    const randomness = Math.sin(index * 1.2) * 10;
    
    return 40 + wave1 + wave2 + wave3 + randomness;
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0f0a2e] via-[#1a1447] to-[#0a0520] flex items-center justify-center"
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
