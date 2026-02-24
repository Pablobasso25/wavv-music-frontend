import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  searchExternalSongsRequest,
  getSongsRequest,
  createSongRequest,
  addSongToPlaylistRequest,
  getUserPlaylistRequest,
  removeSongFromPlaylistRequest,
} from "../api/songs";

const SongContext = createContext();
export const useSongs = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSongs debe usarse dentro de SongProvider");
  return context;
};
export function SongProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const { user } = useAuth();
  React.useEffect(() => {
    if (!user) {
      setUserPlaylist([]);
    }
  }, [user]);
  const getUserPlaylist = async (page = 1, limit = 5) => {
    try {
      const res = await getUserPlaylistRequest(page, limit);
      setUserPlaylist(res.data.songs || []);
      return res.data;
    } catch (error) {
      setUserPlaylist([]);
      return { songs: [], totalPages: 0, currentPage: 1, totalSongs: 0 };
    }
  };
  const getSongs = async (page = 1, limit = 5, includeUser = false) => {
    try {
      const res = await getSongsRequest(page, limit, includeUser);
      const songsData = res.data.songs || res.data || [];
      setSongs(songsData);
      return res.data;
    } catch (error) {
      setSongs([]);
      return { songs: [], totalPages: 0, currentPage: 1, totalSongs: 0 };
    }
  };
  const createSong = async (song) => {
    try {
      const res = await createSongRequest(song);
      setSongs([...songs, res.data]);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };
  const searchExternalSongs = async (searchTerm) => {
    try {
      const res = await searchExternalSongsRequest(searchTerm);
      setSearchResults(res.data);
      return res.data;
    } catch (error) {
      setSearchResults([]);
      return [];
    }
  };
  const addSongToPlaylist = async (songData) => {
    try {
      const res = await addSongToPlaylistRequest(songData);
      if (res.data.song) {
        setUserPlaylist((prev) => [...prev, res.data.song]);
      }
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        code: error.response?.data?.code,
        message: error.response?.data?.message || "Error al agregar canción",
      };
    }
  };
  const deleteSongFromPlaylist = async (songId) => {
    try {
      await removeSongFromPlaylistRequest(songId);
      setUserPlaylist(
        userPlaylist.filter(
          (song) => song._id !== songId && song.id !== songId,
        ),
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al eliminar canción",
      };
    }
  };
  return (
    <SongContext.Provider
      value={{
        songs,
        getSongs,
        createSong,
        searchExternalSongs,
        searchResults,
        addSongToPlaylist,
        getUserPlaylist,
        userPlaylist,
        deleteSongFromPlaylist,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}
