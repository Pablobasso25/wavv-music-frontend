import React, { useState } from "react";
import { Col } from "react-bootstrap";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import  MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TopSongs from "../../components/TopSongs";
import { useSongs } from "../../context/SongContext";

const PlaylistScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { songs } = useSongs();

  const playlistAlbum = {
    id: "user-playlist",
    name: "Mi Playlist",
    image: "https://via.placeholder.com/300/8b5cf6/ffffff?text=My+Playlist",
    tracks: songs.map((song) => ({
      name: song.title,
      preview_url: song.youtubeUrl,
      cover: song.image,
      artist: song.artist,
    })),
  };

  const displayAlbum = selectedAlbum || playlistAlbum;

  return (
    <div className="bg-black min-vh-100 text-white">
      <div className="d-flex">
        <ArtistasSidebar onAlbumSelect={setSelectedAlbum} artistas={[]} />
        <div className="flex-grow-1 p-4">
          <h2>{selectedAlbum ? selectedAlbum.name : "Mi Playlist"}</h2>
          <TopSongs album={displayAlbum} isPlaylist={!selectedAlbum} />
        </div>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default PlaylistScreen;
