import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSongs } from "../../context/SongContext";
import { useAuth } from "../../context/AuthContext";
import { getAlbumsRequest, getAlbumByIdRequest } from "../../api/songs";
import { PAGINATION } from "../../config/constants";

export const useHomeData = () => {
  const location = useLocation();
  const [selectedAlbumData, setSelectedAlbumData] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { songs, getSongs } = useSongs();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
        setShowLoginModal(true);
        setShowRegisterModal(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getSongs();
      loadArtists();
      setShowLoginModal(false);
      setShowRegisterModal(false);
    }
  }, [isAuthenticated, location.pathname]);

  const loadArtists = async () => {
    try {
      const res = await getAlbumsRequest(1, PAGINATION.ARTISTS_SIDEBAR_LIMIT);
      const albums = res.data.albums || res.data || [];
      const formattedArtists = albums.map((album) => ({
        id: album._id,
        name: album.artistName,
        image: album.image,
        albumId: album._id,
      }));
      setArtists(formattedArtists);
      if (formattedArtists.length > 0) handleAlbumSelect(formattedArtists[0]);
    } catch (error) {
      setArtists([]);
    }
  };

  const handleAlbumFetch = async (artist, page = 1) => {
    const albumId = artist.albumId || artist._id || artist.id;
    if (!albumId) return;
    try {
      const res = await getAlbumByIdRequest(
        albumId,
        page,
        PAGINATION.HOME_ALBUM_TRACKS,
      );
      const albumData = res.data.album;
      setSelectedAlbumData({
        ...albumData,
        id: albumId,
        tracks: (albumData.tracks || []).map((t) => ({
          ...t,
          _id: t._id,
          id: t._id,
          name: t.name || t.title,
          audioUrl: t.audioUrl || t.preview_url || t.audio,
          cover: t.cover || albumData.image,
        })),
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (error) {
      setSelectedAlbumData(null);
    }
  };

  const handleAlbumSelect = (artist) => {
    setSelectedArtist(artist);
    handleAlbumFetch(artist, 1);
  };

  const handlePageChange = (page) => {
    if (selectedArtist) handleAlbumFetch(selectedArtist, page);
  };

  return {
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
  };
};
