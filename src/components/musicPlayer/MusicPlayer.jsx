import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  Minimize2,
  FileText,
  Heart,
  Activity,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { useSongs } from "../../context/SongContext";
import { toast } from "react-toastify";
import publicidad2 from "../../assets/images/publicidad2.png";
import { showPremiumAlert } from "../../helpers/alerts";
import "./MusicPlayer.css";

const PLAYER_WIDTH = 300;
const MARGIN = 20;

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    audioRef,
    executeActionWithAd,
    isAdPlaying,
    setIsPlaying,
    playUISound,
  } = useMusicPlayer();

  const {
    addSongToPlaylist,
    deleteSongFromPlaylist,
    userPlaylist,
    getUserPlaylist,
  } = useSongs();

  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    if (currentSong && userPlaylist) {
      const isSaved = userPlaylist.some(
        (s) => s._id === currentSong._id || s.id === currentSong._id,
      );
      setIsLiked(isSaved);
    } else {
      setIsLiked(false);
    }
  }, [currentSong, userPlaylist]);

  const handleLike = async () => {
    if (!currentSong) return;
    const trackId = currentSong._id || currentSong.id;

    try {
      if (isLiked) {
        const res = await deleteSongFromPlaylist(trackId);

        if (res.success) {
          setIsLiked(false);
          playUISound("success");
          toast.info("Eliminada de tu playlist", {
            theme: "dark",
            autoClose: 1500,
            position: "bottom-right",
          });
          getUserPlaylist();
        }
        return;
      } else {
        const res = await addSongToPlaylist(trackId);

        if (res.success) {
          setIsLiked(true);
          playUISound("success");
          toast.success("Agregada a tu playlist", {
            theme: "dark",
            autoClose: 1500,
            position: "bottom-right",
          });
          getUserPlaylist();
        } else if (res.status === 403 && res.code === "PREMIUM_REQUIRED") {
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          playUISound("error");
          showPremiumAlert(navigate, publicidad2);
        } else {
          playUISound("error");
          toast.error(res.message || "No se pudo agregar la canción", {
            theme: "dark",
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      playUISound("error");
      toast.error("Error de conexión. Intentá más tarde.", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    const handleEnded = () => executeActionWithAd(nextTrack);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, nextTrack, executeActionWithAd]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume, audioRef]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setPosition((prev) => ({
          x: Math.max(MARGIN, window.innerWidth - PLAYER_WIDTH - MARGIN),
          y: prev.y,
        }));
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
  const handleMouseUp = () => setIsDragging(false);
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
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const handleProgressChange = (e) => {
    if (isAdPlaying) return;

    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const blockedStyle = isAdPlaying
    ? {
        pointerEvents: "none",
        opacity: 0.5,
        filter: "blur(2px)",
        transition: "all 0.3s ease",
      }
    : { transition: "all 0.3s ease" };

  const songImage =
    currentSong?.image ||
    currentSong?.cover ||
    currentSong?.album?.images?.[0]?.url ||
    "https://via.placeholder.com/150";

  if (isMobile) {
    if (!currentSong) return null;
    return (
      <div className="music-player mobile-player" style={blockedStyle}>
        <input
          className="mobile-progress"
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleProgressChange}
          style={{
            background: `linear-gradient(90deg, #5773FF ${
              duration ? (currentTime / duration) * 100 : 0
            }%, rgba(255,255,255,0.12) ${
              duration ? (currentTime / duration) * 100 : 0
            }%)`,
          }}
        />
        <div className="mobile-content">
          <div className="mobile-artwork">
            <img
              src={songImage}
              alt="Artwork"
            />
          </div>
          <div className="mobile-info" style={{ overflow: "hidden" }}>
            <p
              className="song-title"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentSong?.title}
            </p>
            <p
              className="song-artist"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentSong?.artist}
            </p>
          </div>
          <div className="mobile-controls">
            <button
              className="control-btn"
              onClick={() => executeActionWithAd(prevTrack)}
            >
              <SkipBack size={16} />
            </button>
            <button className="play-btn mobile-play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              className="control-btn"
              onClick={() => executeActionWithAd(nextTrack)}
            >
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
        onClick={() => setVisible(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          ...blockedStyle,
        }}
      >
        <Play size={24} />
      </button>
    );
  }

  return (
    <div
      ref={dragRef}
      className={`music-player ${isMusicPage ? "fixed-player" : "floating-player"} ${
        minimized ? "minimized" : ""
      }`}
      style={{
        ...(isFloating
          ? {
              position: "fixed",
              left: position.x,
              top: position.y,
              zIndex: 10000,
            }
          : isMusicPage
            ? {
                position: "absolute",
                right: "10px",
                top: "45%",
                transform: "translateY(-50%)",
                zIndex: 1000,
              }
            : {}),
        ...blockedStyle,
      }}
      onMouseDown={isFloating ? handleMouseDown : undefined}
    >
      <style>
        {`
          @keyframes pulse-animation {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <div className="player-header">
        <Activity
          size={16}
          style={{
            marginRight: "8px",
            animation: isPlaying
              ? "pulse-animation 1.5s infinite ease-in-out"
              : "none",
            color: isPlaying ? "#5773ff" : "inherit",
          }}
        />
        <span
          className="now-playing"
          style={{
            flex: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {currentSong?.artist || "Now Playing"}
        </span>
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
          <div className={isMusicPage ? "fixed-artwork" : "player-main"}>
            <img
              className={isMusicPage ? "" : "cover"}
              src={songImage}
              alt="cover"
            />
            {!isMusicPage && (
              <div
                className="song-meta"
                style={{
                  overflow: "hidden",
                  width: "100%",
                  textAlign: "center",
                  padding: "0 10px",
                }}
              >
                <h4
                  className="title"
                  title={currentSong?.title}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentSong?.title || "Seleccione canción"}
                </h4>
                <p
                  className="artist"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentSong?.artist || "--"}
                </p>
              </div>
            )}
          </div>
          {isMusicPage && (
            <div className="fixed-song-info" style={{ overflow: "hidden" }}>
              <h4
                className="title"
                title={currentSong?.title}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentSong?.title || "Seleccione canción"}
              </h4>
              <p
                className="artist"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentSong?.artist || "--"}
              </p>
            </div>
          )}
          <div className="player-progress">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              disabled={!currentSong}
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="controls">
            <button
              onClick={() => executeActionWithAd(prevTrack)}
              disabled={!currentSong}
            >
              <SkipBack size={20} />
            </button>
            <button
              className="play"
              onClick={togglePlay}
              disabled={!currentSong}
              style={{ opacity: !currentSong ? 0.5 : 1 }}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button
              onClick={() => executeActionWithAd(nextTrack)}
              disabled={!currentSong}
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="extras">
            <button
              className={isLiked ? "liked" : ""}
              onClick={handleLike}
              disabled={!currentSong}
              title={isLiked ? "Quitar de Playlist" : "Guardar en Playlist"}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button
              className={showLyrics ? "active" : ""}
              onClick={() => setShowLyrics(!showLyrics)}
              disabled={!currentSong}
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
                >
                  <X size={14} />
                </button>
              </div>
              <div className="lyrics-body">
                <p>
                  {currentSong?.lyrics || "No lyrics available for this track."}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MusicPlayer;