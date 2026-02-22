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

  const generateIrregularHeight = (index, isActive) => {
    if (!isActive) return 10;

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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c]/30 to-transparent" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(30, 10, 60, 0.3), transparent)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c]/30 to-transparent" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)" }} />
      <div className="relative z-10 flex flex-col items-center gap-16" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4rem", position: "relative", zIndex: 10 }}>
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-96"
          style={{ width: "24rem" }}
        >
          <div className="h-32 flex items-center justify-center gap-1" style={{ height: "8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }}>
            {[...Array(60)].map((_, i) => {
              const isActive = i < (progress / 100) * 60;
              const height = generateIrregularHeight(i, isActive);
              const animationHeight1 = height + Math.sin(i * 0.5) * 8;
              const animationHeight2 = height - Math.cos(i * 0.3) * 6;

              return (
                <motion.div
                  key={i}
                  className="w-1 rounded-full transition-all duration-300"
                  animate={
                    isActive
                      ? {
                        height: [`${height}%`, `${animationHeight1}%`, `${animationHeight2}%`, `${height}%`],
                      }
                      : {}
                  }
                  transition={{
                    duration: 1.2 + (i % 3) * 0.2,
                    repeat: Infinity,
                    delay: i * 0.01,
                    ease: "easeInOut",
                  }}
                  style={{
                    height: isActive ? `${height}%` : '10%',
                    background: isActive
                      ? `linear-gradient(to top, #00d4ff, #7b5cff, #ff00ea)`
                      : '#2a2057',
                    width: "0.25rem",
                    borderRadius: "9999px",
                  }}
                />
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-[#7b5cff] text-sm font-light tracking-widest"
          >
            {progress}%
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default WelcomeScreen;