import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import ArtistasSidebar from "../../components/artistsSidebar/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TrendingSong from "../../components/trendingSong/TrendingSong";
import TopSongs from "../../components/topSongs/TopSongs";
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../register/RegisterScreen";
import { useSongs } from "../../context/SongContext";
import { useAuth } from "../../context/AuthContext";
import { getAlbumsRequest, getAlbumByIdRequest } from "../../api/songs";

const HomeScreen = () => {
  const location = useLocation();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  const [artists, setArtists] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { songs, getSongs } = useSongs();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
        setShowLoginModal(true);
      }
    }, 1000);
    return () => clearTimeout(loadingTimer);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getSongs();
      loadArtists();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getSongs();
    }
  }, [location.pathname]);

  const loadArtists = async () => {
    try {
      const res = await getAlbumsRequest(1, 100);
      const albums = res.data.albums || res.data || [];
      const formattedArtists = albums.map((album) => ({
        id: album._id,
        name: album.artistName,
        image: album.image,
        albumId: album._id,
      }));
      setArtists(formattedArtists);
      if (formattedArtists.length > 0) {
        handleAlbumSelect(formattedArtists[0]);
      }
    } catch (error) {
      setArtists([]);
    }
  };

  const handleAlbumSelect = async (artist) => {
    try {
      const res = await getAlbumByIdRequest(artist.albumId, 1, 4);
      const albumData = res.data.album;

      const formattedAlbum = {
        id: albumData._id,
        name: albumData.name,
        image: albumData.image,
        artistName: albumData.artistName,
        artists: [{ name: albumData.artistName }],
        tracks: (albumData.tracks || []).map((track) => ({
          _id: track._id,
          id: track._id,
          trackId: track.trackId || track._id,
          name: track.name,
          duration_ms: track.duration_ms,
          preview_url: track.preview_url || track.audio,
          audio: track.preview_url || track.audio,
          youtubeUrl: track.preview_url || track.audio,
          cover: track.cover || albumData.image,
        })),
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      };

      setSelectedAlbumData(formattedAlbum);
      setSelectedAlbum(artist);
    } catch (error) {
      setSelectedAlbumData(null);
    }
  };

  const handleAlbumPageChange = async (page) => {
    if (selectedAlbum) {
      const res = await getAlbumByIdRequest(selectedAlbum.albumId, page, 4);
      const albumData = res.data.album;

      const formattedAlbum = {
        id: albumData._id,
        name: albumData.name,
        image: albumData.image,
        artistName: albumData.artistName,
        artists: [{ name: albumData.artistName }],
        tracks: (albumData.tracks || []).map((track) => ({
          _id: track._id,
          id: track._id,
          trackId: track.trackId || track._id,
          name: track.name,
          duration_ms: track.duration_ms,
          preview_url: track.preview_url || track.audio,
          audio: track.preview_url || track.audio,
          youtubeUrl: track.preview_url || track.audio,
          cover: track.cover || albumData.image,
        })),
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      };

      setSelectedAlbumData(formattedAlbum);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <LoginScreen
        show={showLoginModal && !isAuthenticated}
        handleClose={() => {}}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterScreen
        show={showRegisterModal && !isAuthenticated}
        handleClose={() => {}}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <div
        style={{
          filter:
            (showLoginModal || showRegisterModal) && !isAuthenticated
              ? "blur(8px)"
              : "none",
          pointerEvents:
            (showLoginModal || showRegisterModal) && !isAuthenticated
              ? "none"
              : "auto",
        }}
      >
        <NavBar />
        <div className="home-layout">
          <ArtistasSidebar
            artistas={artists}
            onAlbumSelect={handleAlbumSelect}
          />
          <div
            className="home-content"
            style={{ minWidth: 0, overflow: "hidden", width: "100%" }}
          >
            {songs.length > 0 && <TrendingSong songs={songs} />}
            <TopSongs
              album={selectedAlbumData}
              fromHome={true}
              onPageChange={handleAlbumPageChange}
            />
          </div>
          <div className="home-player" style={{ width: "100%" }}>
            <MusicPlayer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomeScreen;
