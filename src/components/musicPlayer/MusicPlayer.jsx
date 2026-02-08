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
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "./MusicPlayer.css";


const PLAYER_WIDTH = 300;
const MARGIN = 20;
const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, nextTrack, prevTrack, audioRef } =
    useMusicPlayer();
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong, audioRef]);
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
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
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
  if (isMobile) {
    return (
      <div className="music-player mobile-player">
        <input
          aria-label="Mobile progress"
          className="mobile-progress"
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100}
          onChange={handleProgressChange}
          style={{
            background: `linear-gradient(90deg, #5773ff ${(currentTime / duration) * 100}%, rgba(255,255,255,0.12) ${(currentTime / duration) * 100}%)`,
          }}
        />
        <div className="mobile-content">
          <div className="mobile-artwork">
            <img
              src="https://images.pexels.com/photos/6429162/pexels-photo-6429162.jpeg"
              alt="Song artwork"
            />
          </div>
          <div className="mobile-info">
            <p className="song-title">Song Name</p>
            <p className="song-artist">Artist Name</p>
          </div>
          <div className="mobile-controls">
            <button className="control-btn">
              <SkipBack size={16} />
            </button>
            <button
              className="play-btn mobile-play-btn"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="control-btn">
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (!visible) {
    return (
      <button
        className="player-toggle-btn"
        onClick={() => {
          setVisible(true);
          setPosition({
            x: window.innerWidth - PLAYER_WIDTH - MARGIN,
            y: 80,
          });
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        🎵
      </button>
    );
  }
  return (
    <div
      ref={dragRef}
      className={`music-player ${
        isMusicPage ? "fixed-player" : "floating-player"
      } ${minimized ? "minimized" : ""}`}
      style={
        isFloating
          ? {
              position: "fixed",
              left: position.x,
              top: position.y,
              zIndex: 1000,
            }
          : isMusicPage
            ? {
                position: "absolute",
                right: "80px",
                top: "55%",
                transform: "translateY(-50%)",
                zIndex: 1000,
              }
            : {}
      }
      onMouseDown={isFloating ? handleMouseDown : undefined}
    >
      <div className="player-header">
        <span className="now-playing">Now Playing</span>
        {isFloating && (
          <div className="header-actions">
            <button onClick={() => setMinimized(!minimized)}>
              <Minimize2 size={16} />
            </button>
            <button onClick={() => setVisible(false)}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>
      {!minimized && (
        <>
          {isMusicPage && (
            <div className="fixed-artwork">
              <img
                src="https://images.pexels.com/photos/6429162/pexels-photo-6429162.jpeg"
                alt="Song artwork"
              />
            </div>
          )}
          {isMusicPage ? (
            <div className="fixed-song-info">
              <h4 className="title">Song Name</h4>
              <p className="artist">Artist Name</p>
            </div>
          ) : (
            <div className="player-main">
              <img
                className="cover"
                src="https://images.pexels.com/photos/6429162/pexels-photo-6429162.jpeg"
                alt="cover"
              />
              <div className="song-meta">
                <h4 className="title">Song Name</h4>
                <p className="artist">Artist Name</p>
              </div>
            </div>
          )}
          <div className="player-progress">
            <span>{formatTime(Math.floor(currentTime))}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100}
              onChange={handleProgressChange}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="controls">
            <button className={isShuffled ? "active" : ""}>
              <Shuffle size={16} />
            </button>
            <button>
              <SkipBack size={20} />
            </button>
            <button className="play" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button>
              <SkipForward size={20} />
            </button>
            <button className={repeatMode ? "active" : ""}>
              <Repeat size={16} />
            </button>
          </div>
          <div className="extras">
            <button
              className={isLiked ? "liked" : ""}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={16} />
            </button>
            <button
              className={showLyrics ? "active" : ""}
              onClick={() => setShowLyrics(!showLyrics)}
            >
              <FileText size={16} />
            </button>
            <div className="volume">
              <Volume2 size={16} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </div>
          {showLyrics && (
            <div className="lyrics-panel">
              <div className="lyrics-header">
                <span>Lyrics</span>
                <button
                  className="lyrics-close-btn"
                  onClick={() => setShowLyrics(false)}
                  aria-label="Cerrar letras"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="lyrics-body">
                <p>Lyrics will be displayed here...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default MusicPlayer;
