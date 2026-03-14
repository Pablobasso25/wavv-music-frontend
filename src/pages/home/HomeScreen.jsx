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
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { songs, getSongs } = useSongs();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
        setShowLoginModal(true);
        setShowRegisterModal(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getSongs();
      loadArtists();
      setShowLoginModal(false);
      setShowRegisterModal(false);
    }
  }, [isAuthenticated, location.pathname]);

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
      if (formattedArtists.length > 0) handleAlbumSelect(formattedArtists[0]);
    } catch (error) {
      setArtists([]);
    }
  };

  const handleAlbumFetch = async (artist, page = 1) => {
    const albumId = artist.albumId || artist._id || artist.id;
    if (!albumId) return;

    try {
      const res = await getAlbumByIdRequest(albumId, page, 4);
      const albumData = res.data.album;
      setSelectedAlbumData({
        ...albumData,
        id: albumId,
        tracks: (albumData.tracks || []).map((t) => ({
          ...t,
          _id: t._id,
          id: t._id,
          name: t.name || t.title,
          audioUrl: t.audioUrl || t.preview_url || t.audio,
          cover: t.cover || albumData.image,
        })),
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (error) {
      setSelectedAlbumData(null);
    }
  };

  const handleAlbumSelect = (artist) => {
    setSelectedArtist(artist);
    handleAlbumFetch(artist, 1);
  };

  const handlePageChange = (page) => {
    if (selectedArtist) {
      handleAlbumFetch(selectedArtist, page);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-border text-primary" />
        </div>
      )}
      <LoginScreen
        show={showLoginModal && !isAuthenticated}
        handleClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterScreen
        show={showRegisterModal && !isAuthenticated}
        handleClose={() => setShowRegisterModal(false)}
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
          transition: "filter 0.3s ease",
        }}
      >
        <NavBar />
        <div className="home-layout">
          <ArtistasSidebar
            artistas={artists}
            onAlbumSelect={handleAlbumSelect}
          />
          <div className="home-content">
            {songs.length > 0 && <TrendingSong songs={songs} />}
            <TopSongs
              album={selectedAlbumData}
              fromHome={true}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="home-player">
            <MusicPlayer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomeScreen;

