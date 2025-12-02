import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import trendImg from "../assets/trend.png"; // TODO: Agregar imagen cuando exista
import { defaultAlbum } from "../data/dataDefault";

const ArtistasSidebar = ({ onAlbumSelect }) => {
  const [artistas, setArtistas] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const loadArtists = () => {
      const stored = JSON.parse(localStorage.getItem("artistas")) || [];
      console.log("🎤 Artistas guardados:", stored);

      const defaultArtist = {
        id: "default-artist",
        name: "Rion Clarke",
        image: defaultAlbum.image,
        album: defaultAlbum,
      };
      setArtistas([defaultArtist, ...stored]);
    };

    loadArtists();

    window.addEventListener("storage", loadArtists);
    return () => window.removeEventListener("storage", loadArtists);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleWheel = (e) => {
      e.preventDefault();
      content.scrollTop += e.deltaY;
    };

    content.addEventListener("wheel", handleWheel, { passive: false });
    return () => content.removeEventListener("wheel", handleWheel);
  }, []);

  const handleClick = (album) => {
    console.log("📀 Álbum seleccionado:", album);
    localStorage.setItem("selectedAlbum", JSON.stringify(album));
    onAlbumSelect(album);
  };

  return (
    <div
      className="artistas-sidebar p-3"
      style={{ width: "240px", height: "100vh", overflowY: "auto" }}
    >
      <div className="d-flex flex-column">
        <h6
          className="text-white mb-3 text-center"
          style={{ fontSize: "1rem", fontWeight: "600" }}
        >
          TOP ARTISTAS
        </h6>

        {artistas.map((artista) => (
          <div
            key={artista.id}
            className="artista-item d-flex flex-column align-items-center p-3 border-0 rounded mb-3"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
            }}
            onClick={() => handleClick(artista.album)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255,255,255,0.1)";
              e.currentTarget.style.backgroundColor = "#2a2a2a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mb-2"
              style={{
                width: "70px",
                height: "70px",
                backgroundImage: `url(${
                  artista?.album?.image ||
                  artista?.image ||
                  "https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Artist"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px solid #444",
              }}
            />
            <span
              className="fw-medium text-center text-white"
              style={{ fontSize: "0.9rem" }}
            >
              {artista.name}
            </span>
            <small className="text-muted mt-1" style={{ fontSize: "0.75rem" }}>
              Reproducir
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistasSidebar;
