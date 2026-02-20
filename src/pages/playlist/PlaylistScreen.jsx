import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TopSongs from "../../components/TopSongs";
import { useSongs } from "../../context/SongContext";
import { getAlbumsRequest } from "../../api/songs";

const PlaylistScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [artists, setArtists] = useState([]);
  const { userPlaylist, getUserPlaylist } = useSongs();
  const location = useLocation();

  useEffect(() => {
    getUserPlaylist();
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const res = await getAlbumsRequest();
      const formattedArtists = res.data.map((album) => ({
        id: album._id,
        name: album.artistName,
        image: album.image,
        album: {
          name: album.name,
          image: album.image,
          artists: [{ name: album.artistName }],
          tracks: album.tracks.map((track) => ({
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

  const playlistAlbum = {
    id: "user-playlist",
    name: "Mi Playlist",
    image: "https://via.placeholder.com/300/8b5cf6/ffffff?text=My+Playlist",
    tracks: (userPlaylist || []).map((song) => {
      let durationMs = song.duration_ms || song.duration;
      if (typeof durationMs === "string" && durationMs.includes(":")) {
        const [min, sec] = durationMs.split(":").map(Number);
        durationMs = (min * 60 + sec) * 1000;
      }
      return {
        _id: song._id,
        id: song._id,
        name: song.title,
        preview_url: song.youtubeUrl,
        audio: song.youtubeUrl,
        cover: song.image,
        artist: song.artist,
        duration_ms: durationMs,
      };
    }),
  };

  const displayAlbum = selectedAlbum || playlistAlbum;

  return (
    <div className="bg-black min-vh-100 text-white">
      <div className="d-flex">
        <ArtistasSidebar onAlbumSelect={setSelectedAlbum} artistas={artists} />
        <div className="flex-grow-1 p-4" style={{ marginBottom: "100px" }}>
          {selectedAlbum ? (
            <div className="px-2 px-lg-3 mb-3">
              <button
                className="btn d-flex align-items-center gap-2"
                onClick={() => setSelectedAlbum(null)}
                style={{
                  backgroundColor: "#8b5cf6",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#7c3aed")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#8b5cf6")
                }
              >
                <i className="bi bi-arrow-left"></i>
                <span>Volver a Mi Playlist</span>
              </button>
            </div>
          ) : (
            <h2 className="mb-3 px-2 px-lg-3">Mi Playlist</h2>
          )}
          <TopSongs album={displayAlbum} isPlaylist={!selectedAlbum} />
        </div>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default PlaylistScreen;
