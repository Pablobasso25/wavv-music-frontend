import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import ArtistasSidebar from "../../components/artistsSidebar/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TrendingSong from "../../components/trendingSong/TrendingSong";
import TopSongs from "../../components/topSongs/TopSongs";
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../register/RegisterScreen";
import { useHomeData } from "./useHomeData";

const HomeScreen = () => {
  const {
    selectedAlbumData,
    artists,
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    isLoading,
    songs,
    isAuthenticated,
    handleAlbumSelect,
    handlePageChange,
  } = useHomeData();

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
