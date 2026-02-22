import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSongs } from "../../context/SongContext";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo2.svg";
import { showConfirm } from "../../helpers/alerts";
import "./NavBar.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    className="spotify-profile"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));
const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSong } = useMusicPlayer();
  const { addSongToPlaylist, getUserPlaylist } = useSongs();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const searchRef = useRef(null);
  const lastSearchRef = useRef("");
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  useEffect(() => {
    const phrases = [
      "Buscar canciones...",
      "Buscar artistas...",
      "Buscar álbumes...",
    ];
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    const handleType = () => {
      setPlaceholder(
        isDeleting
          ? fullText.substring(0, placeholder.length - 1)
          : fullText.substring(0, placeholder.length + 1),
      );
      setTypingSpeed(isDeleting ? 50 : 100);
      if (!isDeleting && placeholder === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && placeholder === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum, typingSpeed]);
  const handleLogout = async () => {
    const result = await showConfirm(
      "¿Estás seguro que deseas cerrar sesión?",
      "Cerrar Sesión",
    );
    if (result.isConfirmed) {
      logout();
      navigate("/");
    }
  };
  const isAdminPage = location.pathname === "/admin";
  const isPremiumUser = user?.role?.toLowerCase() === "premium" || user?.role?.toLowerCase() === "familiar";
  const showPremiumButton = !isAdminPage && user?.role !== "admin" && !isPremiumUser;
  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      lastSearchRef.current = "";
      return;
    }
    if (searchQuery.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    if (lastSearchRef.current === searchQuery) return;
    const timer = setTimeout(async () => {
      lastSearchRef.current = searchQuery;
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            searchQuery,
          )}&media=music&limit=5`,
        );
        const data = await response.json();
        setSearchResults(data.results || []);
        setShowDropdown(true);
      } catch (error) {
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handlePlaySong = (track) => {
    const songData = {
      _id: track.trackId,
      id: track.trackId,
      title: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      cover: track.artworkUrl100?.replace("100x100", "600x600"),
      image: track.artworkUrl100?.replace("100x100", "600x600"),
      audio: track.previewUrl,
      name: track.trackName,
    };
    playSong(songData);
    setShowDropdown(false);
    setSearchQuery("");
  };
  const handleAddSong = async (track) => {
    const songData = {
      externalSong: {
        title: track.trackName,
        artist: track.artistName,
        image: track.artworkUrl100?.replace("100x100", "600x600"),
        youtubeUrl: track.previewUrl,
        duration: track.trackTimeMillis
          ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(
              Math.floor((track.trackTimeMillis % 60000) / 1000)
            ).padStart(2, "0")}`
          : "--:--",
      },
    };

    const res = await addSongToPlaylist(songData);
    if (res.success) {
      toast.success("Canción agregada a tu playlist");
      getUserPlaylist();
    } else if (res.code === "SONG_ALREADY_IN_PLAYLIST") {
      toast.info("Esta canción ya está en tu playlist");
    } else {
      toast.error("No se pudo agregar la canción");
    }
  };
  return (
    <nav className="spotify-navbar fixed-top">
      <div className="spotify-navbar-left">
        <img
          src={Logo}
          alt="Logo"
          className="spotify-logo text-white fw-bold m-0"
          style={{ cursor: "pointer", width: "120px" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="spotify-navbar-center" ref={searchRef}>
        <div className="spotify-search">
          <i className="bi bi-search spotify-search-icon"></i>
          <input
            type="text"
            className="spotify-search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
              style={{ width: "1rem", height: "1rem" }}
            >
              <span className="visually-hidden">Buscando...</span>
            </div>
          )}
        </div>
        <button
          className="spotify-nav-icon d-none d-lg-flex"
          onClick={() => navigate("/playlist")}
        >
          <i className="bi-music-note-list"></i>
        </button>
        {showDropdown && searchResults.length > 0 && (
          <div className="spotify-search-dropdown">
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((track) => (
                    <div
                      key={track.trackId}
                      className="spotify-track-item"
                      onClick={() => handlePlaySong(track)}
                    >
                      <img
                        src={track.artworkUrl100}
                        alt={track.trackName}
                        width="50"
                        height="50"
                        className="rounded"
                      />
                      <div className="flex-grow-1 ms-2">
                        <div className="text-white fw-semibold">
                          {track.trackName}
                        </div>
                        <div className="text-secondary small">
                          {track.artistName}
                        </div>
                      </div>
                      <button
                        className="btn btn-link text-primary p-0 ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSong(track);
                        }}
                        title="Agregar a playlist"
                      >
                        <i className="bi bi-plus-circle fs-5"></i>
                      </button>
                    </div>
                ))}
              </>
            ) : (
              <div className="p-3 text-center text-secondary">
                No se encontraron resultados
              </div>
            )}
          </div>
        )}
      </div>
      <div className="spotify-navbar-right">
        <Dropdown
          align="end"
          show={showUserDropdown}
          onToggle={(isOpen) => setShowUserDropdown(isOpen)}
        >
          <Dropdown.Toggle as={CustomToggle}>
            <div
              className="spotify-profile-circle"
              style={{
                overflow: "hidden",
              }}
            >
              <img
                src={
                  user?.avatar ||
                  "https://previews.123rf.com/images/jemastock/jemastock2001/jemastock200126608/137694549-user-avatar-with-earphones-audio-device-vector-illustration-design.jpg"
                }
                alt="Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <span className="spotify-username">
              {user?.username || "Usuario"}
            </span>
            <i className="bi bi-caret-down-fill spotify-caret"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              onClick={() => {
                navigate("/playlist");
                setShowUserDropdown(false);
              }}
              className="d-lg-none text-white d-flex align-items-center"
            >
              <i className="bi bi-music-note-list me-2"></i>
              Mi Playlist
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                navigate("/subscription");
                setShowUserDropdown(false);
              }}
              className="text-white d-flex align-items-center"
            >
              <i className="bi bi-gem me-2"></i>
              Explorar Premium
            </Dropdown.Item>
            {!isAdminPage && user?.role !== "admin" && (
              <Dropdown.Item
                onClick={() => {
                  navigate("/profile");
                  setShowUserDropdown(false);
                }}
                className="text-white d-flex align-items-center"
              >
                <i className="bi bi-crown me-2"></i>
                Perfil
              </Dropdown.Item>
            )}
            {!isAdminPage && user?.role === "admin" && (
              <Dropdown.Item
                onClick={() => {
                  navigate("/admin");
                  setShowUserDropdown(false);
                }}
                className="text-warning d-flex align-items-center"
              >
                Panel Admin
              </Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                handleLogout();
                setShowUserDropdown(false);
              }}
              className="text-white d-flex align-items-center"
            >
              <i className="bx bx-log-out me-2"></i>
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavBar;
