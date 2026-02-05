import React, { createContext, useContext, useState } from "react";
import {
  searchExternalSongsRequest,
  getSongsRequest,
  createSongRequest,
  addSongToPlaylistRequest,
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
      // Llamada a la ruta del backend que configuramos en songs.js
      const res = await addSongToPlaylistRequest(songId);
      return { success: true, data: res.data };
    } catch (error) {
      // Si el backend devuelve 403, devolvemos el error para manejarlo en el componente
      return {
        success: false,
        status: error.response?.status,
        code: error.response?.data.code,
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
      }}
    >
      {children}
    </SongContext.Provider>
  );
}
