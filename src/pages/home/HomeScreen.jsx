import React, { useState } from "react";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/MusicPlayer";
import TrendingSong from "../../components/TrendingSong";
import TopSongs from "../../components/TopSongs";
import { defaultAlbum } from "../../data/dataDefault";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);

  return (
    <div className="home-layout">
      <ArtistasSidebar onAlbumSelect={setSelectedAlbum} />
      <div
        className="home-content"
        style={{ minWidth: 0, overflow: "hidden", width: "100%" }}
      >
        <TrendingSong />
        <TopSongs album={selectedAlbum} fromHome={true} />
      </div>
      <div className="home-player" style={{ width: "100%" }}>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default HomeScreen;
