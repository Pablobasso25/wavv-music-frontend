import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArtistasSidebar from "../../components/artistsSidebar/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TopSongs from "../../components/topSongs/TopSongs";
import { useSongs } from "../../context/SongContext";
import { getAlbumsRequest, getAlbumByIdRequest } from "../../api/songs";

const PlaylistScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  const [artists, setArtists] = useState([]);
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userPlaylist, getUserPlaylist } = useSongs();
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadPlaylist(),
        loadArtists(),
        getUserPlaylist(1, 1000)
      ]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const loadPlaylist = async (page = 1) => {
    const data = await getUserPlaylist(page, 5);
    setPlaylistData(data);
  };

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
    } catch (error) {
      setArtists([]);
    }
  };

  const handleAlbumSelect = async (artist) => {
    try {
      if (artist.albumId) {
        const res = await getAlbumByIdRequest(artist.albumId, 1, 5);
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
      } else if (artist.album) {
        setSelectedAlbumData(artist.album);
        setSelectedAlbum(artist);
      }
    } catch (error) {
      setSelectedAlbumData(null);
    }
  };

  const handleAlbumPageChange = async (page) => {
    if (selectedAlbum) {
      const res = await getAlbumByIdRequest(selectedAlbum.albumId, page, 5);
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
    totalPages: playlistData?.totalPages || 1,
    currentPage: playlistData?.currentPage || 1,
  };

  const displayAlbum = selectedAlbumData || playlistAlbum;

  if (isLoading) {
    return (
      <div className="bg-black min-vh-100 text-white w-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-vh-100 text-white w-100">
      <div className="d-flex flex-column flex-lg-row w-100">
        <div className="d-none d-lg-block flex-shrink-0">
          <ArtistasSidebar
            onAlbumSelect={handleAlbumSelect}
            artistas={artists}
          />
        </div>
        <div
          className="flex-grow-1 d-flex justify-content-center"
          style={{ marginBottom: "100px" }}
        >
          <div
            className="w-100 px-2 px-md-4"
            style={{
              maxWidth: "1200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="w-100 text-center text-md-start">
              {selectedAlbum ? (
                <div className="mb-3 pt-3 d-flex justify-content-center justify-content-md-start">
                  <button
                    className="btn d-flex align-items-center gap-2"
                    onClick={() => {
                      setSelectedAlbum(null);
                      setSelectedAlbumData(null);
                    }}
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
                  >
                    <i className="bi bi-arrow-left"></i>
                    <span>Volver a Mi Playlist</span>
                  </button>
                </div>
              ) : (
                <h2 className="mb-3 pt-3">Mi Playlist</h2>
              )}
            </div>
            <div className="w-100">
              <TopSongs
                album={displayAlbum}
                isPlaylist={!selectedAlbum}
                onPageChange={
                  selectedAlbum ? handleAlbumPageChange : loadPlaylist
                }
                fromHome={false}
              />
            </div>
          </div>
        </div>
        <div className="d-lg-block flex-shrink-0">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default PlaylistScreen;
