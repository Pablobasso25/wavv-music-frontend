import React, { useState } from "react";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/MusicPlayer";
import TrendingSong from "../../components/TrendingSong";
import TopSongs from "../../components/TopSongs";
import { defaultAlbum } from "../../data/dataDefault";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);

  return (
    <div className="d-flex">
      <ArtistasSidebar onAlbumSelect={setSelectedAlbum} />
      <div className="mx-auto">
        <TrendingSong />
        <TopSongs album={selectedAlbum} fromHome={true} />
      </div>
      <MusicPlayer />
    </div>
  );
};

export default HomeScreen;
