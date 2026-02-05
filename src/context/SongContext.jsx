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
}
