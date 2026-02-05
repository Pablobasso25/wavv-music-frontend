import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer.jsx";
import TopSongs from "../../components/TopSongs";

const PlaylistScreen = () => {
  const [playlistAlbum, setPlaylistAlbum] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadPlaylist = () => {
      const storedPlaylist =
        JSON.parse(localStorage.getItem("userPlaylist")) || [];

      const playlistAsAlbum = {
        id: "user-playlist",
        name: "Mi Playlist",
        image:
          "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=My+Playlist",
        release_date: new Date().toLocaleDateString(),
        total_tracks: storedPlaylist.length,
        artists: [{ name: "Tus Canciones Favoritas", id: "user" }],
        tracks: storedPlaylist.map((song) => ({
          name: song.name,
          preview_url: song.audio,
          duration_ms: song.duration_ms || 0,
          album: song.album,
          artist: song.artist,
          cover: song.cover,
        })),
      };

      setPlaylistAlbum(playlistAsAlbum);
    };

    loadPlaylist();

    window.addEventListener("storage", loadPlaylist);
    window.addEventListener("playlistUpdated", loadPlaylist);
    return () => {
      window.removeEventListener("storage", loadPlaylist);
      window.removeEventListener("playlistUpdated", loadPlaylist);
    };
  }, []);

  useEffect(() => {
    setSelectedAlbum(null);
  }, [location]);

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
  };

  const handleBackToPlaylist = () => {
    setSelectedAlbum(null);
  };

  const displayAlbum = selectedAlbum || playlistAlbum;
  const isShowingPlaylist = !selectedAlbum;

  return (
    <div className="home-layout">
      <ArtistasSidebar onAlbumSelect={handleAlbumSelect} />

      <div className="home-content">
        <div>
          {isShowingPlaylist ? (
            <>
              <h2 className="m-4">Mi Playlist</h2>
              <p className="text-secondary ms-4">
                {playlistAlbum?.total_tracks || 0} canciones guardadas
              </p>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center m-4">
                <i
                  className="bx bx-arrow-back fs-4 text-white me-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleBackToPlaylist}
                  title="Volver a Mi Playlist"
                ></i>
                <h2 className="text-white mb-0">
                  {selectedAlbum?.name || "Álbum"}
                </h2>
              </div>
              <p className="text-secondary ms-4">
                {selectedAlbum?.artists?.[0]?.name || "Artista"} •{" "}
                {selectedAlbum?.total_tracks || 0} canciones
              </p>
            </>
          )}
          {displayAlbum ? (
            <TopSongs album={displayAlbum} isPlaylist={isShowingPlaylist} />
          ) : (
            <div className="text-white text-center py-5">
              <i className="bx bx-music fs-1 text-secondary mb-3"></i>
              <p className="text-secondary">Tu playlist está vacía</p>
            </div>
          )}
        </div>
      </div>

      <div className="home-player">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default PlaylistScreen;
