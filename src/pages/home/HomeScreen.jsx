import React, { useState, useEffect } from "react";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TrendingSong from "../../components/TrendingSong";
import TopSongs from "../../components/TopSongs";
import { useSongs } from "../../context/SongContext";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { songs, getSongs } = useSongs();
  useEffect(() => {
    getSongs();
  }, []);
  const artistsFromDB = songs.map((song) => ({
    id: song._id,
    name: song.artist,
    image: song.image,
    album: {
      name: song.title,
      image: song.image,
      tracks: [{ name: song.title, audio: song.youtubeUrl, cover: song.image }],
    },
  }));
  return (
    <div className="home-layout">
      <ArtistasSidebar
        artistas={artistsFromDB}
        onAlbumSelect={setSelectedAlbum}
      />
      <div
        className="home-content"
        style={{ minWidth: 0, overflow: "hidden", width: "100%" }}
      >
        {songs.length > 0 && <TrendingSong song={songs[0]} />}
        <TopSongs album={selectedAlbum} fromHome={true} />
      </div>
      <div className="home-player" style={{ width: "100%" }}>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default HomeScreen;
