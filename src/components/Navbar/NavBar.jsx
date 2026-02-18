import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form, Dropdown, Badge } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSongs } from "../../context/SongContext"; 
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import Logo from "../assets/images/logo.png"
import { showConfirm } from "../../helpers/alerts";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSong } = useMusicPlayer();
  const { searchExternalSongs } = useSongs();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const lastSearchRef = useRef("");

  const handleLogout = async () => {
    const result = await showConfirm(
      "¿Estás seguro que deseas cerrar sesión?",
      "Cerrar Sesión",
    );

    if (result.isConfirmed) {
      logout();
      navigate("/login");
    }
  };

  const isAdminPage = location.pathname === "/admin";
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
        const results = await searchExternalSongs(searchQuery);
        setSearchResults(results || []);
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
      title: track.title,
      artist: track.artist,
      album: track.album,
      cover: track.image,
      audio: track.audio,
      name: track.title,
    };
    playSong(songData);
    setShowDropdown(false);
    setSearchQuery("");
  };

  return (
    <NavBar className="spotify-navbar fixed-top">
      <div className="spotify-navbar-left">
        <img src={Logo}
          alt="Wavv Music Logo"
          height="50"
        />
      </div>

      {!isAdminPage && (
        <div className="spotify-navbar-center" ref={searchRef}>
          <div className="spotify-search">
            <i className="bi bi-search spotify-search-icon"></i>

            <input
              type="text"
              className="spotify-search-input"
              placeholder="Buscar canciones..."
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

          {!isAdminPage && (
            <button
              className="spotify-nav-icon"
              onClick={() => navigate("/playlist")}
            >
              <i className="bi-music-note-list"></i>
            </button>
          )}
          {showDropdown && (
            <div className="spotify-search-dropdown">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((track, index) => (
                    <div
                      key={index}
                      className="spotify-track-item"
                      onClick={() => {
                        const songData = {
                          title: track.name,
                          artist:
                            track.artists?.map((a) => a.name).join(", ") ||
                            "Unknown",
                          album: track.album?.name || "Unknown Album",
                          cover: track.album.images[0]?.url,
                          audio: track.preview_url,
                          genre: "Music",
                          name: track.name,
                        };

                        playSong(songData);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={
                          track.album.images[2]?.url ||
                          track.album.images[0]?.url
                        }
                        alt={track.name}
                        width="50"
                        height="50"
                        className="rounded"
                      />

                      <div className="flex-grow-1">
                        <div className="text-white fw-semibold">
                          {track.name}
                        </div>
                        <div className="text-secondary small">
                          {track.artists?.map((a) => a.name).join(", ")}
                        </div>
                      </div>

                      {track.preview_url && (
                        <i className="bx bx-play-circle fs-4 text-primary"></i>
                      )}
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
      )}
      <div className="spotify-navbar-rigth">
        {!isAdminPage && (
          <button
            className="btn-premium"
            onClick={() => navigate("/premium")}
          >
            Explorar Premium
          </button>
        )}
        <Dropdown
          align="end"
          show={showUserDropdown}
          onToggle={(isOpen) => setShowUserDropdown(isOpen)}>
          <Dropdown.Toggle
            as="div"
            className="spotify-profile"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div
              className="spotify-profile-circle"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
              style={{ cursor: "pointer", overflow: "hidden" }}
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
    </NavBar>
  );
};

export default NavBar;
