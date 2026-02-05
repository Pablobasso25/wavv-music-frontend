import React, { useRef } from "react";
import { defaultAlbum } from "../data/dataDefault";

const ArtistasSidebar = ({ onAlbumSelect, artistas = [] }) => {
  const contentRef = useRef(null);

  const displayList =
    artistas.length > 0
      ? artistas
      : [
          {
            id: "default-artist",
            name: "Rion Clarke",
            image: defaultAlbum.image,
            album: defaultAlbum,
          },
        ];

  return (
    <div
      className="artistas-sidebar p-3"
      ref={contentRef}
      style={{ width: "240px", height: "100vh", overflowY: "auto" }}
    >
      <div className="d-flex flex-column">
        <h6
          className="text-white mb-3 text-center"
          style={{ fontSize: "1rem", fontWeight: "600" }}
        >
          TOP ARTISTAS
        </h6>

        {displayList.map((artista, index) => (
          <div
            key={artista.id || index}
            className="artista-item d-flex flex-column align-items-center p-3 border-0 rounded mb-3"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
            }}
            onClick={() => onAlbumSelect(artista.album)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255,255,255,0.1)";
              event.currentTarget.style.backgroundColor = "#2a2a2a";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow = "none";
              event.currentTarget.style.backgroundColor = "#1a1a1a";
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
            <small
              className="text-secondary mt-1"
              style={{ fontSize: "0.75rem" }}
            >
              Reproducir
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistasSidebar;
