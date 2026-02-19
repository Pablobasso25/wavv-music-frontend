import React, { useState, useEffect } from "react";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import TrendingSong from "../../components/TrendingSong";
import TopSongs from "../../components/TopSongs";
import { useSongs } from "../../context/SongContext";
import { getAlbumsRequest } from "../../api/songs";

const HomeScreen = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [artists, setArtists] = useState([]);
  const { songs, getSongs } = useSongs();
  
  useEffect(() => {
    getSongs();
    loadArtists();
  }, []);

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
  );
};

export default HomeScreen;
