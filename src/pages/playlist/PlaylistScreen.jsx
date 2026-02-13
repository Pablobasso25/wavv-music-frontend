import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import  MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TopSongs from "../../components/TopSongs";
import { useSongs } from "../../context/SongContext";

const PlaylistScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const { userPlaylist, getUserPlaylist } = useSongs();

  useEffect(() => {
    getUserPlaylist();
  }, []);

  const playlistAlbum = {
    id: "user-playlist",
    name: "Mi Playlist",
    image: "https://via.placeholder.com/300/8b5cf6/ffffff?text=My+Playlist",
    tracks: (userPlaylist || []).map((song) => ({
      _id: song._id,
      id: song._id,
      name: song.title,
      preview_url: song.youtubeUrl, 
      audio: song.youtubeUrl,
      cover: song.image,
      artist: song.artist,
      duration_ms: song.duration,
    })),
  };

  const displayAlbum = selectedAlbum || playlistAlbum;

  return (
    <div className="bg-black min-vh-100 text-white">
      <div className="d-flex">
        <ArtistasSidebar onAlbumSelect={setSelectedAlbum} artistas={[]} />
        <div className="flex-grow-1 p-4" style={{ marginBottom: "100px" }}>
          <h2>{selectedAlbum ? selectedAlbum.name : "Mi Playlist"}</h2>
          <TopSongs album={displayAlbum} isPlaylist={!selectedAlbum} />
        </div>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default PlaylistScreen;
