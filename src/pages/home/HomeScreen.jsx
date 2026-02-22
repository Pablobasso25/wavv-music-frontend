import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TrendingSong from "../../components/TrendingSong";
import TopSongs from "../../components/TopSongs";
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../register/RegisterScreen";
import { useSongs } from "../../context/SongContext";
import { useAuth } from "../../context/AuthContext";
import { getAlbumsRequest } from "../../api/songs";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
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

  const loadArtists = async () => {
    try {
      const res = await getAlbumsRequest();
      const formattedArtists = res.data.map(album => ({
        id: album._id,
        name: album.artistName,
        image: album.image,
        album: {
          name: album.name,
          image: album.image,
          artists: [{ name: album.artistName }],
          tracks: album.tracks.map(track => ({
            id: track.trackId,
            name: track.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url,
            cover: track.cover,
          })),
        },
      }));
      setArtists(formattedArtists);
    } catch (error) {
      console.error("Error cargando artistas:", error);
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
          filter: (showLoginModal || showRegisterModal) && !isAuthenticated ? "blur(8px)" : "none",
          pointerEvents: (showLoginModal || showRegisterModal) && !isAuthenticated ? "none" : "auto",
        }}
      >
        <NavBar />
        <div className="home-layout">
      <ArtistasSidebar
        artistas={artists}
        onAlbumSelect={setSelectedAlbum}
      />
      <div
        className="home-content"
        style={{ minWidth: 0, overflow: "hidden", width: "100%" }}
      >
        {songs.length > 0 && <TrendingSong song={songs.find(s => s.isTrending) || songs[0]} />}
        <TopSongs album={selectedAlbum} fromHome={true} />
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
