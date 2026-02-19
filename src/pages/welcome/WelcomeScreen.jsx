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
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #0f0a2e, #1a1447, #0a0520)",
        background: "#000000",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c]/30 to-transparent" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(30, 10, 60, 0.3), transparent)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c]/30 to-transparent" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)" }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-16" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4rem", position: "relative", zIndex: 10 }}>
        {/* Logo with Progressive Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative flex items-center">
            {/* Text "wav" with outline style */}
            <div className="flex items-center">
              <span 
                className="text-8xl font-bold tracking-tight"
              style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px #3d5a7e',
                  textShadow: '0 0 20px rgba(61, 90, 126, 0.5)',
                  fontSize: "6rem",
                  fontWeight: "bold",
                }}
              >
                wav
              </span>
              
              {/* Waveform SVG integrated into logo */}
              <svg 
                width="200" 
                height="120" 
                viewBox="0 0 200 120" 
                className="ml-1"
                style={{ filter: 'drop-shadow(0 0 10px rgba(100, 200, 255, 0.6))' }}
              >
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#7b9fff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#b84fff', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                <motion.path
                  d="M 10 60 Q 25 20, 40 60 T 70 60 Q 85 30, 100 60 Q 115 90, 130 60 Q 145 40, 160 60 T 190 60"
                  stroke="url(#waveGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  style={{ filter: 'blur(0.5px)' }}
                />
                
                <motion.path
                  d="M 10 60 Q 25 20, 40 60 T 70 60 Q 85 30, 100 60 Q 115 90, 130 60 Q 145 40, 160 60 T 190 60"
                  stroke="url(#waveGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  style={{ filter: 'blur(4px)' }}
            />
              </svg>
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
