import React, { useRef } from "react";
import { defaultAlbum } from "../../data/dataDefault";

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
    <>
      <style>
        {`
    .artistas-sidebar {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    .artistas-list {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      gap: 1rem;
      padding-bottom: 10px;
      flex-wrap: nowrap;
      -webkit-overflow-scrolling: touch;
    }
    .artistas-list::-webkit-scrollbar {
      height: 6px;
    }
    .artistas-list::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }
    .artistas-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
    .artista-item {
      min-width: 110px;
      flex-shrink: 0;
    }
    @media (max-width: 991px) {
      .artistas-sidebar {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
    @media (min-width: 992px) {
      .artistas-sidebar {
        width: 240px;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        position: sticky;
        top: 0;
        flex-shrink: 0;
      }
      .artistas-list {
        flex-direction: column;
        overflow-x: hidden;
        gap: 1rem;
        padding-bottom: 0;
      }
      .artista-item {
        width: 100%;
        min-width: auto;
      }
    }
  `}
      </style>
      <div className="artistas-sidebar p-3" ref={contentRef}>
        <div className="d-flex flex-column">
          <h6
            className="text-white mb-3 text-center"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            TOP ARTISTAS
          </h6>
          <div className="artistas-list">
            {displayList.map((artista, index) => (
              <div
                key={artista.id || index}
                className="artista-item d-flex flex-column align-items-center p-3 border-0 rounded"
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
                      defaultAlbum.image
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
      </div>
    </>
  );
};

export default ArtistasSidebar;
