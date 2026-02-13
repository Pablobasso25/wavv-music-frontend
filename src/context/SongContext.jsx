import React, { createContext, useContext, useState } from "react";
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

  const getUserPlaylist = async () => {
    try {
      const res = await getUserPlaylistRequest();
      setUserPlaylist(res.data);
    } catch (error) {
      console.error("Error al obtener la playlist del usuario:", error);
    }
  };

  const getSongs = async () => {
    try {
      const res = await getSongsRequest();
      setSongs(res.data);
    } catch (error) {
      console.error("Error al obtener canciones de DB:", error);
    }
  };
  const createSong = async (song) => {
    try {
      const res = await createSongRequest(song);
      setSongs([...songs, res.data]);
    } catch (error) {
      console.error("Error al crear canción:", error);
    }
  };
  const searchExternalSongs = async (searchTerm) => {
    try {
      const res = await searchExternalSongsRequest(searchTerm);
      setSearchResults(res.data);
      return res.data;
    } catch (error) {
      console.error("Error en búsqueda externa:", error);
      setSearchResults([]);
    }
  };
  const addSongToPlaylist = async (songId) => {
    try {
      const res = await addSongToPlaylistRequest(songId);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        code: error.response?.data.code,
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
      console.error(error);
      return { success: false, message: "Error al eliminar canción" };
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
