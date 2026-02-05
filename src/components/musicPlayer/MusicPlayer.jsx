import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  Minimize2,
  Shuffle,
  Repeat,
  FileText,
  Heart,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import "./MusicPlayer.css";

const PLAYER_WIDTH = 300;
const MARGIN = 20;
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);
  const [volume, setVolume] = useState(50);
  const [isLiked, setIsLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setPosition({
          x: Math.max(MARGIN, window.innerWidth - PLAYER_WIDTH - MARGIN),
          y: 80,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMusicPage =
    location.pathname === "/" || location.pathname === "/home";
  const isFloating = !isMusicPage && visible && !isMobile;
  const handleMouseDown = (e) => {
    if (!e.target.closest(".player-header")) return;
    const rect = dragRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDragging(true);
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxX = window.innerWidth - PLAYER_WIDTH - MARGIN;
    const maxY = window.innerHeight - 120;
    setPosition({
      x: Math.min(Math.max(MARGIN, e.clientX - offsetRef.current.x), maxX),
      y: Math.min(Math.max(MARGIN, e.clientY - offsetRef.current.y), maxY),
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };
  useEffect(() => {
    if (isDragging && isFloating) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, isFloating]);
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev < duration ? prev + 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, duration]);
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const handleProgressChange = (e) => {
    setCurrentTime((e.target.value / 100) * duration);
  };

  return (
    <Container
      className="music-player rounded-4 p-3 p-lg-4 d-flex flex-column gap-3 gap-lg-4"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        minHeight: "500px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {currentSong?.audio && (
        <audio
          ref={audioRef}
          src={currentSong.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
        />
      )}

      <div className="song-info text-center flex-grow-1">
        <img
          className="rounded-3 w-100 mb-3"
          src={
            currentSong?.cover ||
            "https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Music"
          }
          alt={currentSong?.title || "Album cover"}
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
        />

        <div className="description mb-3 mb-lg-4">
          <h3 className="fw-bold mb-2 fs-5 fs-lg-4">
            {currentSong?.title || "Ripple Echoes"}
          </h3>
          <h5 className="text-white-50 mb-1 fs-6">
            {currentSong?.artist || "Kael Fischer"}
          </h5>
          <p className="text-secondary small fw-bold mb-0">
            {currentSong?.album || "Best of 2024"} •{" "}
            {currentSong?.genre || "Electronic"}
          </p>
        </div>

        <div className="progress-container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-white-50 small">
              {formatTime(currentTime)}
            </span>
            <span className="text-white-50 small">
              {duration ? `-${formatTime(duration - currentTime)}` : "0:00"}
            </span>
          </div>

          <div
            className="progress bg-secondary position-relative"
            style={{
              height: "6px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = (x / rect.width) * 100;
              handleSeek(percentage);
            }}
          >
            <ProgressBar
              now={progress || 0}
              className="bg-white"
              style={{ height: "100%" }}
            />
            <div
              className="position-absolute top-50 translate-middle"
              style={{
                left: `${progress}%`,
                width: "16px",
                height: "16px",
              }}
            >
              <div className="bg-white border border-dark rounded-circle w-100 h-100 shadow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="player-actions bg-primary rounded p-2 p-lg-3 mt-auto">
        <div className="buttons d-flex justify-content-center align-items-center gap-3 gap-lg-4 mb-2 mb-lg-3">
          <i
            className="bx bx-repeat fs-5 cursor-pointer hover-scale"
            title="Repeat"
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="bx bx-skip-previous fs-4 cursor-pointer hover-scale"
            title="Anterior (próximamente)"
            style={{ cursor: "not-allowed", opacity: 0.4 }}
          ></i>
          <i
            className={`bx ${
              isPlaying ? "bx-pause" : "bxs-right-arrow"
            } play-button bg-white text-primary rounded-circle p-3 fs-4 cursor-pointer hover-scale`}
            title={isPlaying ? "Pause" : "Play"}
            style={{ cursor: "pointer" }}
            onClick={togglePlay}
          ></i>
          <i
            className="bx bx-skip-next fs-4 cursor-pointer hover-scale"
            title="Siguiente (próximamente)"
            style={{ cursor: "not-allowed", opacity: 0.4 }}
          ></i>
          <i
            className="bx bx-shuffle fs-5 cursor-pointer hover-scale"
            title="Shuffle"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div className="lyrics text-center cursor-pointer">
          <i className="bx bx-chevron-up d-block fs-6 mb-1"></i>
          <h6 className="mb-0 small fw-bold">LYRICS</h6>
        </div>
      </div>
    </Container>
  );
};

export default MusicPlayer;
